<template>
    <div>
        <nav class="nav-top"
             style="position: relative;z-index: 99999999999999">
            <div class="left-tool">
                <i class="icon-home" @click="routertypebtn"
                   style="position: absolute;top: 13px;margin-top: 0px"></i><span style="margin-left: 30px" class="check-text">{{CrfTemplateEditItems.templateName}}<i
                    class="icon-arrow-down"></i>
          <div class="tool-tip">
            <ul class="tool-tip-content">
              <li>
                <label class="label-text"><i class="round"></i>项目类型：</label>
                <div class="text-wrap">
                  慢病研究类
                </div>
              </li>
              <li>
                <label class="label-text"><i class="round"></i>项目描述：</label>
                <div class="text-wrap">{{CrfTemplateEditItems.templateDescirbe}}
                </div>
              </li>
                <!--              <li>-->
                <!--                <label class="label-text"><i class="round"></i>起止时间：</label>-->
                <!--                <div class="text-wrap">2018-04-20至2019-11-20</div>-->
                <!--              </li>-->
            </ul>
          </div>
        </span>
            </div>
            <div class="right-tool">
                <span class="span-text">参照标准： 数据集TEXTI</span>
                <span class="span-text">创建时间：2019-08-01</span>
                <a class="save-btn"
                   href="javascript:void(0);">完成模板</a>
            </div>
        </nav>
        <section class="main" style="background-color: #e0e2e4">
            <aside id="left"
                   class="left-slider"
                   v-if="isHideleft==true">
                <div class="left-tool-nav" v-if="this.$route.query.preview==undefined">
                    <a class="search-bar"
                       href="javascript:void(0);"><i class="icon-search"></i></a>
                    <i class="line"></i>
                    <input class="search-input"
                           v-model.trim="keyWords"
                           placeholder="请输入关键词"
                           @input="handleQuery"
                           type="text"/>
                    <div class="right-tool">
                        <i class="line"></i>
                        <el-tooltip class="item"
                                    effect="dark"
                                    content="添加组件"
                                    placement="top-start">
                            <i class="icon-add"
                               @click="AddAssemblyClick()"></i>
                        </el-tooltip>
                        <i class="icon-folder"
                           @click="AddFolderClick()"></i>
                    </div>
                </div>
                <ul>
                    <v-draggable id="LeftNav" class="nav-list" v-model="leftlist" @update="dragEnd">
                        <li :class="item.chickbtn==false?'active':''"
                            v-for="(item,index) in leftlist"
                            @click="LeftListItemClickBtn(item,index)">
                            <div @contextmenu.stop.prevent="$refs.ctxshow.showMenu($event, item)"
                                 @click.right="leftchild(item)">
                                <a class="first-a" @click="ChildItemName(index,item)"><span
                                        :style="ItemName==item.id?'color:blue':''"
                                        @click="ClickItemName($event,item,index)">{{item.leftlistname}}</span></a>
                            </div>
                            <ul class="sub-nav"
                                v-for="child in item.leftchild"
                                :class="index==Clickitemindex?'':'action'">
                                <li @click="ChildItemRouter(child)"
                                    class="active" @contextmenu.stop.prevent="$refs.ctxshowchild.showMenu($event, item)"
                                    @click.right="leftchildchild(child)"><a class="sub-link" target="mainFrame"><i
                                        class="icon-tree-file"></i>{{child.formName}}</a></li>
                            </ul>
                            <ul class="sub-nav"
                                :style="index==Clickitemindex?'':'display:none'"
                                v-if="AddTemplateItem==1">
                                <li class="active">
                                    <a class="sub-link"
                                       target="mainFrame">
                                        <i class="icon-tree-file"></i>
                                        <input type="text" style="margin: -20px;
margin-left: 0px"
                                               ref="IsInputTemplateRef"
                                               onfocus="this.select()"
                                               @keyup.enter="AddTemplateEnter(item)"
                                               v-model="AddTemplateValue">
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </v-draggable>
                    <div class="nav-list"
                         style="border-top:0px">
                        <li class="active"
                            v-if="IsHide==true">
                            <a class="first-a"
                               href="javascript:void(0);">
                                <input type="text"
                                       ref="IsInputRef"
                                       onfocus="this.select()"
                                       @keyup.enter="AddFoldEnter"
                                       v-model="AddFolderValue">
                            </a>
                        </li>
                    </div>
                </ul>
            </aside>
            <aside class="slider-bar">
        <span class="span"
              v-if="isHideleft==true"
              @click="HideBtn"></span>
                <span class="span active"
                      v-if="isHideleft==false"
                      @click="DisplayBtn"></span>
            </aside>
            <aside class="right-main">
                <v-ChildCrfTemplatFii v-if="hideType==true"></v-ChildCrfTemplatFii>
                <div class="page-content" v-if="hideType==false">
                    <div  v-if="previewing==4">
                        <V-UserDataBase :passageway="FatherPassageway"></V-UserDataBase>
                    </div>
                    <v-CrfTemplateEditItem v-if="previewing!==4" :passageway="FatherPassageway"></v-CrfTemplateEditItem>
                    <router-view v-if="previewing!==4"></router-view>
                </div>
            </aside>
        </section>
        <e-vue-contextmenu ref="ctxshow" id="contextStyle" @ctx-show="show" @ctx-hide="hide">
            <div style="padding-left:20px" @click="handlerSql">删除</div>
        </e-vue-contextmenu>
        <e-vue-contextmenu ref="ctxshowchild" id="contextStyle" @ctx-show="shows" @ctx-hide="hides">
            <div style="padding-left:20px" @click="handlerSqlchild">删除</div>
        </e-vue-contextmenu>
    </div>
</template>

<script>
    import ChildCrfTemplatMainRightHeader from '../ChildCrfTemplatMainRight/ChildCrfTemplatMainRightHeader'
    import CrfTemplateEditItem from "../ChildCrfTemplatMainRight/CrfTemplateEditItem";
    import ChildCrfTemplatFii from "../ChildCrfTemplatMainRight/ChildCrfTemplatFii";
    import draggable from 'vuedraggable'
    import {mapState, mapMutations} from 'vuex'
    import UserDataBase from "../User/UserDataBase";
    import {type} from 'os';

    import VueContextMenu from '@xunlei/vue-context-menu'
    import {async} from 'q';

    export default {
        name: "CrfTemplateMain",
        components: {
            'v-draggable': draggable,
            'v-ChildCrfTemplatMainRightHeader': ChildCrfTemplatMainRightHeader,
            'v-ChildCrfTemplatFii': ChildCrfTemplatFii,
            'v-CrfTemplateEditItem': CrfTemplateEditItem,
            'VueContextMenu': VueContextMenu,
            'V-UserDataBase': UserDataBase,

        },
        data() {
            return {
                ItemName: '',
                FatherPassageway: {},
                ChildLists: [],
                keyWords: '',
                AddFolderValue: '新建文件夹',
                AddTemplateValue: '新建组件',
                IsHide: false,
                isHideleft: true,
                LeftListItemIndex: 0,
                AddTemplateItem: 0,
                hideType: false,
                Clickitemindex: '',
                leftlist: [
                    {
                        fromId: 1,
                        leftlistname: '入组信息1',
                        leftchild: [
                            {
                                childlistname: "echart图表参考"
                            }, {
                                childlistname: "echart图表参考"
                            },
                        ]
                    }
                ],
                DelChildId: '',
                parassss: '',
                previewing: ''
            };
        },
        computed: {
            ...mapState(['CrfTemplateEditItems', 'tempaltetypes', 'template_user_id','ispreview']),
            listData() {
                return this.$store.state.tempaltetypes
            }
        },
        watch: {
            listData(val) {
                this.fistgetTempale()
                let type = 1
                this.TEMPALTETYPES(type)
            }
        },
        mounted() {
            console.log(this.CrfTemplateEditItems)
            this.previewing = this.$route.query.preview
            if (this.$route.query.preview === 2) {
                this.hideType = true
            }
            this.fistgetTempale()
        },
        methods: {
            ...mapMutations(['ISPREVIEW','CRFTEMPLATELEFTCHILDRENITEM', 'TEMPALTETYPES', 'CTFTEMPLATECHILDFROM', 'TEMPLATELIST']),
            leftchild(item) {
                let para = {
                    paperId: item.fromId,
                    paperName: item.paperName,
                    type: 2
                }
                this.DelChildId = para
            },
            routertypebtn() {
                this.$router.push({path: '/CrfTemplateFistPage'})
            },
            hideMenu() {
                this.$refs.ctxshow.hideMenu();
            },
            show(data) {
            },
            hide(data) {
            },
            ChildItemName(index, item) {
                console.log(item)
                if (item.chickbtn == false) {
                    this.$set(this.leftlist, index, {
                        chickbtn: true,
                        forms: item.forms,
                        fromId: item.fromId,
                        id: item.id,
                        leftchild: item.leftchild,
                        leftlistname: item.leftlistname,
                        paperName: item.paperName
                    })
                } else {
                    this.$set(this.leftlist, index, {
                        chickbtn: false,
                        forms: item.forms,
                        fromId: item.fromId,
                        id: item.id,
                        leftchild: item.leftchild,
                        leftlistname: item.leftlistname,
                        paperName: item.paperName
                    })
                }
            },
            leftchildchild(child) {
                this.parassss = {
                    formId: child.id,
                    form_desc: "string",
                    form_name: "string",
                    paper_id: 0,
                    questionList: [
                        {
                            questionId: 0,
                            question_option: "string",
                            question_title: "string",
                            questron_Format: "string"
                        }
                    ],
                    type: 3
                }
            },
            hideMenuchild() {
                this.$refs.ctxshowchild.hideMenu();
            },
            shows(data) {
            },
            hides(data) {
            },
            handlerSql() {
                axios({
                    url: 'api/template/updatePaper',
                    method: 'get',
                    params: this.DelChildId
                }).then(res => {
                    this.fistgetTempale()
                })
                this.$refs.ctxshow.hideMenu();
            },
            handlerSqlchild() {
                axios({
                    url: 'api/template/addForm',
                    method: 'post',
                    data: this.parassss
                }).then(res => {
                    this.fistgetTempale()
                })
                this.$refs.ctxshow.hideMenu();
            },
            sortlist(para) {
                axios({
                    method: 'post',
                    url: "api/template/paperSequence",
                    data: para
                }).then(res => {
                    this.fistgetTempale()
                })
            },
            dragEnd(e) {
                e.preventDefault();
                console.log(e.oldIndex)
                console.log(e.newIndex)
                console.log(this.leftlist)
                let data = {}
                for (let i = 0; i < this.leftlist.length; i++) {
                    data[i] = this.leftlist[i].id
                }
                this.sortlist(data)
            },
            HideBtn() {
                this.isHideleft = false
            },
            DisplayBtn() {
                this.isHideleft = true
            },
            fistgetTempale() {
                let para = {
                    temgplateId:this.CrfTemplateEditItems.templateId
                }
                axios({
                    url: 'api/template/getTemplate',
                    method: 'get',
                    params: para
                }).then(res => {
                    res.data.papers.forEach(item => {
                        item.forms.forEach(Child => {
                        })
                    })
                    this.TEMPLATELIST(res.data)
                    let papers = res.data.papers
                    papers.forEach((item) => {
                        item.leftlistname = item.paperName
                        item.fromId = item.id
                        item.leftchild = item.forms
                        item.chickbtn = false
                    })
                    this.leftlist = papers
                }).catch(err => {

                })
            },
            LeftListItemClickBtn(item, index) {
                this.LeftListItemIndex = index
            },
            AddFolderClick() {
                this.IsHide = true
                this.$nextTick((x) => {
                    this.$refs.IsInputRef.focus();
                })
            },
            AddFoldEnter() {
                let paras = {
                    templateId: this.CrfTemplateEditItems.templateId,
                    paperName: this.AddFolderValue
                }
                axios({
                    url: 'api/template/addPaper',
                    method: 'get',
                    params: paras
                }).then(res => {
                    this.fistgetTempale()
                }).catch(err => {
                })
                this.IsHide = false
            },
            AddAssemblyClick(item) {
                console.log(item)
                this.AddTemplateItem = 1
            },
            AddTemplateEnter(item) {
                let a = []
                let paras =
                    {
                        formId: 0,
                        form_desc: 'string',
                        paper_id: item.fromId,
                        form_name: this.AddTemplateValue,
                        questionList: [],
                        type: 1
                    }
                axios({
                    url: 'api/template/addForm',
                    method: 'post',
                    data: paras
                }).then(res => {
                    this.fistgetTempale()
                }).catch(err => {

                })
                this.AddTemplateItem = 0
            },
            // 点击左侧item
            ChildItemRouter(child) {
                //当前item下面有组件问题
                if (child.questions.length > 0) {
                    //当前item下面有组件问题=> preview==1的情况下 （预览状态）
                    if (this.ispreview === 1) {
                        this.FatherPassageway = child // 将答案以及组件问题传递给CrfTemplateEditItem组件
                        this.CTFTEMPLATECHILDFROM(child) // 此时将有答案后得表达问题保存起来
                        this.ChildLists = child
                        this.fistgetTempale()
                        this.ISPREVIEW(1)
                        console.log("预览状态下")
                        this.$router.push({path: '/CrfTemplateMain', query: {preview: 1}})
                    }
                    //当前item下面有组件问题=> preview==2的情况下（医生填报状态）
                    if (this.ispreview === 2) {
                        let querstions = {}  // 获取当前item中所有组件问题得id
                        let childquerstions = child.questions
                        querstions = child.questions.map(item => item.id)
                        // 通过该id集合查询答案
                        let para = {
                            querstions: querstions.join(','),
                            uid: this.template_user_id
                        }
                        axios({
                            url: 'api/questionnaire/getAnswers',
                            method: 'get',
                            params: para
                        }).then(res => {
                            //如果改item下面有组件有答案
                            if (res.data !== "") {
                                let nextlist = res.data
                                // 将组件问题与查询到得答案进行一一对应
                                for (let i = 0; i < child.questions.length; i++) {
                                    for (let j = 0; j < nextlist.length; j++) {
                                        if (child.questions[i].id === nextlist[j].question.id) {
                                            child.questions[i].Answerlist = nextlist[j]
                                        }
                                    }
                                }
                                this.fistgetTempale()
                                this.CTFTEMPLATECHILDFROM(child) // 此时将有答案后得表达问题保存起来
                                this.FatherPassageway = child // 将答案以及组件问题传递给CrfTemplateEditItem组件
                                this.ChildLists = child
                                this.hideType = false
                                this.ISPREVIEW(2)
                                console.log(this.FatherPassageway,"我现在有答案我要去传参数")
                                this.$router.push({path: '/CrfTemplateMain', query: {preview: 2}})
                            } else {
                                //如果没有答案
                                let goods = []
                                for (let i = 0; i < child.questions.length; i++) {
                                    let NoAnswer = {
                                        "answerId": 0,
                                        "answerOption": "", //答案内容
                                        "questionType": child.questions[i].questionFormat, //问题类型
                                        "question_Id": child.questions[i].id,// 问题id
                                        "user_Id": this.template_user_id //当前用户id
                                    }
                                    goods.push(NoAnswer)
                                }
                                axios({
                                    url: 'api/questionnaire/submitAnswer',
                                    method: 'post',
                                    data: goods,
                                    params: {type: 1}
                                }).then(res => {
                                    let querstions = {}  // 获取当前item中所有组件问题得id
                                    let childquerstions = child.questions
                                    querstions = child.questions.map(item => item.id)
                                    // 通过该id集合查询答案
                                    let para = {
                                        querstions: querstions.join(','),
                                        uid: this.template_user_id
                                    }
                                    axios({
                                        url: 'api/questionnaire/getAnswers',
                                        method: 'get',
                                        params: para
                                    }).then(res => {
                                        //如果改item下面有组件有答案
                                        if (res.data !== undefined) {
                                            let nextlist = res.data
                                            // 将组件问题与查询到得答案进行一一对应
                                            for (let i = 0; i < child.questions.length; i++) {
                                                for (let j = 0; j < nextlist.length; j++) {
                                                    if (child.questions[i].id === nextlist[j].question.id) {
                                                        child.questions[i].Answerlist = nextlist[j]
                                                    }
                                                }
                                            }
                                        }
                                        this.FatherPassageway = child // 将答案以及组件问题传递给CrfTemplateEditItem组件
                                        this.CTFTEMPLATECHILDFROM(child) // 此时将有答案后得表达问题保存起来
                                        this.ChildLists = child
                                        this.fistgetTempale()
                                        this.hideType = false
                                        this.ISPREVIEW(2)
                                        this.$router.push({path: '/CrfTemplateMain', query: {preview: 2}})
                                    })
                                })

                            }
                        })
                    }
                    //当前item下面有组件问题=> preview==2的情况下（医生填报状态）
                    if (this.ispreview == 4) {
                        this.FatherPassageway = child
                        this.fistgetTempale()
                        this.hideType = false
                        this.ISPREVIEW(4)
                        this.$router.push({path: '/CrfTemplateMain', query: {preview: 4}})
                    }

                    //当前item下面有组件问题=> 没有preview字段的情况下 （编辑状态）
                    else {

                        this.FatherPassageway = child // 将答案以及组件问题传递给CrfTemplateEditItem组件
                        this.CTFTEMPLATECHILDFROM(child) // 此时将有答案后得表达问题保存起来
                        this.ChildLists = child
                        this.fistgetTempale()
                        // this.ISPREVIEW(2)
                        this.$router.push({path: '/CrfTemplateMain'})
                    }
                }
                // 点击表单 表单里面没有问题
                else {
                    this.FatherPassageway = child
                    this.CTFTEMPLATECHILDFROM(child)
                    this.ChildLists = child
                    this.fistgetTempale()
                    // 表单里面没有问题=>preview==1的情况下 （预览状态）
                    if (this.ispreview == 1) {
                        this.ISPREVIEW(1)
                        this.$router.push({path: '/CrfTemplateMain', query: {preview: 1}})
                    }
                    // 表单里面没有问题=>preview==2的情况下 （医生填报状态）
                    if (this.ispreview == 2) {
                        this.hideType = false
                        this.ISPREVIEW(2)
                        this.$router.push({path: '/CrfTemplateMain', query: {preview: 2}})
                    }
                    // 表单里面没有问题=>preview=4的情况下 （进入编程模式）
                    if (this.ispreview == 4) {
                        this.hideType = false
                        this.ISPREVIEW(4)
                        this.$router.push({path: '/CrfTemplateMain', query: {preview: 4}})
                    }
                    // 表单里面没有问题=>没有preview的情况下 （编辑状态）
                    else {
                        this.ISPREVIEW(0)
                        this.$router.push({path: '/CrfTemplateMain'})
                    }
                }

            },
            clearTimer() {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            handleQuery(event) {
                this.clearTimer();
                this.timer = setTimeout(() => {
                    let paras = {}
                    if (this.keyWords == '') {
                        paras = {
                            templateId: this.CrfTemplateEditItems.templateId
                        }
                    } else {
                        paras = {
                            searchText: this.keyWords,
                            templateId: this.CrfTemplateEditItems.templateId
                        }
                    }

                    axios({
                        url: 'api/template/searchComponentAndPaper',
                        method: 'get',
                        params: paras
                    }).then(res => {
                        // =====
                        res.data.papers.forEach(item => {
                            item.forms.forEach(Child => {
                            })
                        })
                        this.TEMPLATELIST(res.data)
                        let papers = res.data.papers
                        papers.forEach((item) => {
                            item.leftlistname = item.paperName
                            item.fromId = item.id
                            item.leftchild = item.forms
                            item.chickbtn = false
                        })
                        this.leftlist = papers
                        for (let i = 0; i < this.leftlist.length; i++) {
                            this.leftlist.sort(function (a, b) {
                                return a.id - b.id
                            })
                            for (let j = 0; j < this.leftlist[i].forms.length; j++) {
                                this.leftlist[i].forms.sort(function (a, b) {
                                    return a.id - b.id
                                })
                            }
                        }

                        console.log(this.leftlist, '111111111111')
                    }).catch(err => {
                    })
                }, 500);
            },
            ClickItemName(event, item, index) {
                this.ItemName = item.id
                this.Clickitemindex = index
                event.stopPropagation();
                console.log(item)
            }
        }
    }
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped>
    .nav-top {
        background-color: #e0e2e4 !important;
    }

    .search-text {
        color: red !important;
    }

    .main {
    }

    .left-slider {
        margin-left: 0px;
    }

    .action {

    }

    @media (min-width: 1024px) and (max-width: 1680px) {
        .main {
            padding: 0 0px 0px 25px !important;
            min-width: 1200px;
        }
    }

    .right-main {
        background: #fff;
        overflow-y: scroll;
        min-height: 150px
    }
</style>