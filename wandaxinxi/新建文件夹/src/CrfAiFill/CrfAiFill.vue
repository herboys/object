<template>
    <div style="background-color: white !important;">
        <section class="main">
            <aside id="left"
                   class="left-slider"
                   v-if="isHideleft==true">
                <div class="left-tool-nav">
                    <a class="search-bar"
                       href="javascript:void(0);"><i class="icon-search"></i></a>
                    <i class="line"></i>
                    <input class="search-input"
                           v-model.trim="keyWords"
                           placeholder="请输入关键词"
                           @input="handleQuery"
                           type="text" />
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
                <ul id="LeftNav">
                    <v-draggable v-model="leftlist"
                                 class="nav-list"
                                 @update="dragEnd">
                        <li class="active"
                            v-for="(item,index) in leftlist"
                            @click="LeftListItemClickBtn(item,index)" >
                            <div @contextmenu.stop.prevent="$refs.ctxshow.showMenu($event, item)" @click.right="leftchild(item)">
                                <a class="first-a" :style="index==LeftListItemIndex?'':'background:#FFF'"  href="javascript:void(0);" v-html='item.leftlistname'
                                   style="background-color: #F3F6F8">{{item.leftlistname}}</a>
                            </div>

                            <ul class="sub-nav"
                                v-for="child in item.leftchild"
                                :class="index==LeftListItemIndex?'':'action'">
                                <li @click="ChildItemRouter(child)"
                                    class="active" @contextmenu.stop.prevent="$refs.ctxshowchild.showMenu($event, item)" @click.right="leftchildchild(child)"><a class="sub-link"
                                                                                                                                                                 target="mainFrame"><i class="icon-tree-file"></i>{{child.formName}}</a></li>
                            </ul>
                            <ul class="sub-nav"
                                :style="index==LeftListItemIndex?'':'display:none'"
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
                <div
                        class="page-content">
                    <v-CrfTemplateEditItem :passageway="FatherPassageway"></v-CrfTemplateEditItem>
                    <router-view></router-view>
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
    import draggable from 'vuedraggable'
    import { mapState, mapMutations } from 'vuex'
    import { type } from 'os';

    import VueContextMenu from '@xunlei/vue-context-menu'
    export default {
        name: "CrfAiFill",
        components: {
            'v-draggable': draggable,
            'v-ChildCrfTemplatMainRightHeader': ChildCrfTemplatMainRightHeader,
            'v-CrfTemplateEditItem': CrfTemplateEditItem,
            'VueContextMenu':VueContextMenu
        },
        data () {
            return {
                FatherPassageway: {},
                ChildLists: [],
                keyWords: '',
                AddFolderValue: '新建文件夹',
                AddTemplateValue: '新建组件',
                IsHide: false,
                isHideleft: true,
                LeftListItemIndex: 0,
                AddTemplateItem: 0,
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
                DelChildId:'',
                parassss:''
            };
        },
        computed: {
            ...mapState(['CrfTemplateEditItems', 'tempaltetypes']),

            listData () {
                return this.$store.state.tempaltetypes
            }
        },
        watch: {
            listData (val) {
                this.fistgetTempale()
                let type = 1
                this.TEMPALTETYPES(type)

            }
        },
        mounted () {
            this.fistgetTempale()
        },
        methods: {
            ...mapMutations(['CRFTEMPLATELEFTCHILDRENITEM', 'TEMPALTETYPES', 'CTFTEMPLATECHILDFROM','TEMPLATELIST']),
            leftchild(item){
                let para={
                    paperId:item.fromId,
                    paperName:item.paperName,
                    type:2
                }
                this.DelChildId=para
            },
            hideMenu() {
                this.$refs.ctxshow.hideMenu();
            },
            show(data) {
            },
            hide(data) {
            },
            leftchildchild(child){
                this.parassss={
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
                }).then(res=>{
                    this.fistgetTempale()
                })
                this.$refs.ctxshow.hideMenu();
            },
            handlerSqlchild() {
                axios({
                    url: 'api/template/addForm',
                    method: 'post',
                    data: this.parassss
                }).then(res=>{
                    this.fistgetTempale()
                })
                this.$refs.ctxshow.hideMenu();
            },
            dragEnd (e) {
                e.preventDefault();
                // console.log(e.oldIndex)
                // console.log(e.newIndex)
            },
            HideBtn () {
                this.isHideleft = false
            },
            DisplayBtn () {
                this.isHideleft = true
            },
            fistgetTempale () {
                let para = {
                    temgplateId: this.CrfTemplateEditItems.templateId
                }
                axios({
                    url: 'api/template/getTemplate',
                    method: 'get',
                    params: para
                }).then(res => {
                    this.TEMPLATELIST(res.data)
                    let papers = res.data.papers
                    papers.forEach((item) => {
                        item.leftlistname = item.paperName
                        item.fromId = item.id
                        item.leftchild = item.forms

                    })
                    this.leftlist = papers
                }).catch(err => {

                })
            },
            LeftListItemClickBtn (item, index) {
                this.LeftListItemIndex = index
            },
            AddFolderClick () {
                this.IsHide = true
                this.$nextTick((x) => {
                    this.$refs.IsInputRef.focus();
                })
            },
            AddFoldEnter () {
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
            AddAssemblyClick (item) {
                console.log(item)
                this.AddTemplateItem = 1
            },
            AddTemplateEnter (item) {
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
            ChildItemRouter (child) {
                this.FatherPassageway=child
                this.CTFTEMPLATECHILDFROM(child)
                this.ChildLists = child
                this.fistgetTempale()
                this.$router.push({ path: '/CrfTemplateMain' })
            },
            clearTimer () {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            handleQuery (event) {
                this.clearTimer();
                this.timer = setTimeout(() => {
                    let paras={
                        searchText:this.keyWords,
                        templateId:this.CrfTemplateEditItems.templateId
                    }
                    axios({
                        url: 'api/template/searchComponentAndPaper',
                        method: 'get',
                        params: paras
                    }).then(res=>{
                    }).catch(err=>{})
                }, 500);
            },
        }
    }
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped>
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
            padding: 0 37px 0px 25px !important;
            min-width: 1200px;
        }
    }
    .right-main{
        background:#fff;overflow-y: scroll;
        min-height: 150px
    }
</style>