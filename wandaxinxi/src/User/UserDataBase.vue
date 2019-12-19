<template>
    <div>
        <header>
            <h1>自动填充设置</h1>
            <div style="display: flex;justify-content: flex-start">
                <div class="form-item">
                    <div class="form-inline">
                        <input class="ui-input-text" v-model="url" placeholder="服务器地址" type="text">
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-inline">
                        <input class="ui-input-text" v-model="userName" placeholder="用户名" type="text">
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-inline">
                        <input class="ui-input-text" v-model="passWord" placeholder="密码" type="text">
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content:flex-start">
                <div class="form-item">
                    <div class="form-inline">
                        <select class="ui-select-text">
                            <option>-请选择数据库类型-</option>
                            <option>mysql</option>
                            <option>corcel</option>
                        </select>
                    </div>
                </div>
                <div class="form-item" v-if="dataBaseList[0]!=undefined &&dataBaseList.length>0">
                    <div class="form-inline">
                        <select class="ui-select-text" v-model="dataBase">
                            <option>-选择数据名-</option>
                            <option v-for="item in dataBaseList" v-bind:value="item">{{item}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-item" v-if="tableNameList[0]!=undefined &&tableNameList.length>0">
                    <div class="form-inline">
                        <select class="ui-select-text" v-model="tableName">
                            <option>-选择主表-</option>
                            <option v-for="item in tableNameList" v-bind:value="item">{{item}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-item" v-if="tableNameList[0]!=undefined &&admincolumn.length>0">
                    <div class="form-inline">
                        <select class="ui-select-text" v-model="admincolumnName">
                            <option>-选择主键-</option>
                            <option v-for="item in admincolumn" v-bind:value="item">{{item}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-item">
                <a class="button button-primary" href="javascript:void(0);" @click="ConnectBtn">连 接</a>
            </div>

        </header>
        <main>
            <div class="lift">
                <h1>{{this.passageway.formName}}</h1>
                <el-dialog style="margin-top: 100px"
                           title="设置对应关系"
                           :visible.sync="dialogVisible"
                           width="50%"
                           :before-close="handleClose">
                    给{{goodstitle}}设置对应关系
                       <button @click="addmysql">新增</button>
                       <div v-for="(item,indexs) in  newmtksj">
                           <div class="form-inline">
                               <select class="ui-select-text"   @change='publicTableNameItemmainfatherBtn(indexs,$event)'>
                            <option value="volvo">--选择次表--</option>
                            <option v-for="childitems in item.pubilcTableNameList.pubilcTableNameList">{{childitems.label}}
                            </option>
                        </select> 
                    </div>
                        <div class="form-inline">
                        <div>在主表中选择外键</div>
                        <select class="ui-select-text" @change='publicTableNameItemmainBtn(indexs,$event)'>
                            <option value="volvo">--在主表中选择外键--</option>
                            <option v-for=" childitems in item.admincolumnpublic.admincolumnpublic">{{childitems}}
                            </option>
                        </select>
                    </div>
                     <div>
                        <div>在次表中选择主键</div>
                        <select class="ui-select-text"  @change='SelectPrimaryKeyInSecondaryTable(indexs,$event)'>
                            <option value="volvo">--在次表中选择主键--</option>
                            <option v-for=" childitems in item.childpubilcTableNameList.childpubilcTableNameList" >{{childitems.label}}
                            </option>
                        </select>
                    </div>
                    <div class="form-inline">
                        <div>在次表中选择字段</div>
                        <select class="ui-select-text"  @change='publicTableNameItemmainfatherchildBtn(indexs,$event)'>
                            <option value="volvo">--在次表中选择字段--</option>
                            <option v-for=" childitems in item.childpubilcTableNameLists.childpubilcTableNameLists">{{childitems.label}}
                            </option>
                        </select>
                    </div>          
</div>
                
                    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisibletruebtn()">确 定</el-button>
  </span>
                </el-dialog>

                <ul>
                    <li v-for="item in Tempalates" :key="item">
                        <a style="margin-left: 20px">{{item.TempalateHeader.questionTitle}}</a>
                        <ol v-if="item.TempalateHeader.questionFormat=='1'">
                                <li style="margin-left: 40px"   class="ChildTypeMysqlClass">
                                <div>单选题答案</div>
                            
                                <div>{{item.TempalateRoom[0].Secondarytable}}</div>
                                <div>{{item.TempalateRoom[0].Secondarytablechild}}</div>
                                <div>{{item.TempalateRoom[0].SelectPrimaryKeyInSecondaryTableValue}}</div>
                                <div>{{item.TempalateRoom[0].publicTableNameItemmainBtnValue}}</div>
                                <span @click="dialogVisiblebtns(item)">设置对应关系</span>
                            </li>
                        </ol>
                        <ol v-if="item.TempalateHeader.questionFormat=='2'">
                            <li style="margin-left: 40px"   class="ChildTypeMysqlClass">
                                <div>多选题答案</div>
                                <div>{{item.TempalateRoom[0].Secondarytable}}</div>
                                <div>{{item.TempalateRoom[0].Secondarytablechild}}</div>
                                <div>{{item.TempalateRoom[0].SelectPrimaryKeyInSecondaryTableValue}}</div>
                                <div>{{item.TempalateRoom[0].publicTableNameItemmainBtnValue}}</div>
                                <span @click="dialogVisiblebtns(item)">设置对应关系</span>
                            </li>
                        </ol>
                        <ol v-if="item.TempalateHeader.questionFormat=='3'">
                            <li style="margin-left: 40px" v-for="items in item.TempalateRoom" :key="items" class="ChildTypeMysqlClass">
                               <div>{{items.busLineId}}</div>
                                <div>{{items.Secondarytable}}</div>
                                <div>{{items.Secondarytablechild}}</div>
                                <div>{{items.SelectPrimaryKeyInSecondaryTableValue}}</div>
                                <div>{{items.publicTableNameItemmainBtnValue}}</div>
                                <span @click="dialogVisiblebtn(item,items)">设置对应关系</span>
                            </li>
                        </ol>
                        <ol v-if="item.TempalateHeader.questionFormat=='4'">
                            <li>我是表格题</li>
                        </ol>
                    </li>
                </ul>
            </div>
        </main>
        <div>
            <button @click="PreservationBtn">click</button>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import UserFillTemplate from "./UserFillTemplate";

    export default {
        name: "UserDataBase",
        data() {
            return {
                newmtksj:[],
                value: [],
                isshow: true,
                list: [],
                Tempalate: '',
                Tempalates: [],
                ModalType: false,
                ModalStatus: '',
                ModalName: '',
                previews: "",
                url: '10.1.192.118:3306',
                userName: 'skxywy',
                passWord: 'SKxywy@2018',
                type: 'mysql',
                dataBaseList: [],
                dataBase: '',
                tableNameList: [],
                pubilcTableNameList: [],
                tableName: '',
                admincolumn: [],
                admincolumnpublic: [],
                admincolumnName: '',
                publicTableNameItemBtnvalue: '',
                publiccolumnNameList: [],
                newpubliccolumnNameList: [],
                querstionlists: [],
                options:
                    [{
                        label: '表',
                        children: [{
                            label: '表字段',
                        }]
                    }],
                dialogVisible: false,
                goodstitle: '',
                childpubilcTableNameList: [],
                childzhubiao: [],
                childlistmain: '',
                biaoge: '',
                Secondarytable: '', // 弹框选中得次表
                Secondarytablechild: '', //  弹框选中次表下的字段
                SelectPrimaryKeyInSecondaryTableValue:'',
                publicTableNameItemmainBtnValue:''
            }
        },
        components: {
            'V-UserFillTemplate': UserFillTemplate
        },
        props: {
            passageway: Object
        },
        computed: {
            ...mapState(['template_user_id']),
            address() {
                console.log(this.passageway, '更新值')
                return `${this.passageway}`
            }
        },
        watch: {
            address: {
                handler(newV, oldV) {
                    console.log(this.passageway, '传参')
                    this.isshow = true
                    this.Tempalates = []
                    if (this.passageway.questions) {
                        this.passageway.questions.map(item => {
                            console.log(item.questionOption)
                            let istitle = []
                            let newtitle = []
                            istitle = item.questionOption.split(',')
                            newtitle = istitle.map(item => ({
                                busLineId: item,
                                Secondarytable: this.Secondarytable,
                                Secondarytablechild: this.Secondarytablechild,
                                SelectPrimaryKeyInSecondaryTableValue: this.SelectPrimaryKeyInSecondaryTableValue,
                                publicTableNameItemmainBtnValue: this.publicTableNameItemmainBtnValue,
                            }));
                            this.Tempalate = {
                                TempalateHeader: item,
                                TempalateRoom: newtitle,
                            }
                            this.Tempalates.push(this.Tempalate)
                            this.Tempalates.sort(function (a, b) {
                                return a.TempalateHeader.id - b.TempalateHeader.id
                            })
                        })
                    }
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            addmysql(){
                console.log('111111111111')
                let para={
                    pubilcTableNameList:{pubilcTableNameList:this.pubilcTableNameList,name:''},   
                    admincolumnpublic:{admincolumnpublic:this.admincolumnpublic,name:''},
                    childpubilcTableNameList:{childpubilcTableNameList:[],name:''},
                    childpubilcTableNameLists:{childpubilcTableNameLists:[],name:''}
                }
                this.newmtksj.push(para)
            },
            // 点击分表     获取次表
            publicTableNameItemmainfatherBtn(indexs,e) {
                     for (let i = 0; i < this.pubilcTableNameList.length; i++) {
                    if (this.pubilcTableNameList[i].label == e.target.value) {
                        this.childpubilcTableNameList = this.pubilcTableNameList[i].children
                        this.childpubilcTableNameLists = this.pubilcTableNameList[i].children
                    }

                }
                  this.newmtksj.forEach((element,index) => {
                      if(index==indexs){ 
                      element.pubilcTableNameList.name=e.target.value
                        element.childpubilcTableNameList={name:''}
                        element.childpubilcTableNameList={childpubilcTableNameList:this.childpubilcTableNameList,name:''}
                         element.childpubilcTableNameLists={name:''}
                        element.childpubilcTableNameLists={childpubilcTableNameLists:this.childpubilcTableNameLists,name:''}
                      }
                       })
                       console.log( this.newmtksj)
           
            },
             // 在主表中获取次表对应得外键
                publicTableNameItemmainBtn(indexs,e) {
                    this.newmtksj.forEach((element,index) => {
                      if(index==indexs){
                      element.admincolumnpublic.name=e.target.value
                      }
                       })
                       console.log( this.newmtksj)
            },
           // 在次表中获取次表对应得主键
            SelectPrimaryKeyInSecondaryTable(indexs,e){
                      this.newmtksj.forEach((element,index) => {
                      if(index==indexs){
                      element.childpubilcTableNameList.name=e.target.value
                      }
                       })
                       console.log( this.newmtksj)

            },
            publicTableNameItemmainfatherchildBtn(indexs,e){
  this.newmtksj.forEach((element,index) => {
                      if(index==indexs){
                      element.childpubilcTableNameLists.name=e.target.value
                      }
                       })
                       console.log( this.newmtksj)
            },
                dialogVisiblebtns(item) {
                    console.log(item)
                this.dialogVisible = true
                this.childzhubiao.push(item)
            
                console.log(item.TempalateRoom[0].busLineId)
                this.goodstitle = item.TempalateRoom[0].busLineId

                //this.newmtksj=[{pubilcTableNameList:this.pubilcTableNameList,childpubilcTableNameList:this.childpubilcTableNameList,admincolumnpublic:this.admincolumnpublic}]
            },
            // 点击出现设置对应关系弹框
            dialogVisiblebtn(item, items) {
                this.dialogVisible = true
                this.childzhubiao.push(item)
                console.log(items, '给谁设计对应关系')
                this.goodstitle = items.busLineId

                //this.newmtksj=[{pubilcTableNameList:this.pubilcTableNameList,childpubilcTableNameList:this.childpubilcTableNameList,admincolumnpublic:this.admincolumnpublic}]
            },
            // 点击关闭对应关系弹框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            // 点击确认关闭弹框
            dialogVisibletruebtn() {
                 this.dialogVisible=false
                 let ziduan=[]
                      console.log(this.newmtksj)
                      let nameString=''
                      this.newmtksj.forEach((item,index)=>{
                        //   let para={
                        //       name:
                        //   }
                          nameString=`${item.admincolumnpublic.name}#${item.pubilcTableNameList.name}#${item.childpubilcTableNameList.name}`+';'+nameString
                        //   ziduan.push(para)
                      })
                      nameString=nameString.substring(0,nameString.length-1)
                     console.log(nameString,'22222222222222')
                     console.log(this.newmtksj[this.newmtksj.length-1].childpubilcTableNameLists.name,'对应得字段')
                for (let i = 0; i < this.childzhubiao.length; i++) {
                    for (let j = 0; j < this.childzhubiao[i].TempalateRoom.length; j++) {
                        console.log(this.goodstitle)
                        if (this.childzhubiao[i].TempalateRoom[j].busLineId == this.goodstitle) {   
                            this.childzhubiao[i].TempalateRoom[j].Secondarytable =this.newmtksj[this.newmtksj.length-1].childpubilcTableNameLists.name// 次表
                            this.childzhubiao[i].TempalateRoom[j].Secondarytablechild = nameString// 次表
                            this.childzhubiao[i].TempalateRoom[j].sequence=j
                            this.childzhubiao[i].TempalateRoom[j].SelectPrimaryKeyInSecondaryTableValue = this.SelectPrimaryKeyInSecondaryTableValue// 次表
                            this.childzhubiao[i].TempalateRoom[j].publicTableNameItemmainBtnValue = this.publicTableNameItemmainBtnValue// 次表
    
                        }
                    }
                }
      
                this.newmtksj=[]
                console.log('1111111111111')
               
            },

            ConnectBtn() {
                if (this.dataBase == '') {
                    //选择数据库名
                    let para = {
                        url: this.url,
                        userName: this.userName,
                        passWord: this.passWord,
                        type: this.type,
                    }
                    axios({
                        url: 'api/switchoverDataSource/changeDataSource',
                        method: 'post',
                        data: para
                    }).then(res => {
                        this.dataBaseList = res.data
                    })
                }
                // 选择表名
                if (this.dataBase !== '') {
                    let para = {
                        url: this.url,
                        userName: this.userName,
                        passWord: this.passWord,
                        type: this.type,
                        dataBase: this.dataBase,
                    }
                    axios({
                        url: 'api/switchoverDataSource/changeDataSource',
                        method: 'post',
                        data: para
                    }).then(res => {
                        this.tableNameList = res.data
                        let paramain = {
                            dataBase: this.dataBase,
                            type: this.type,
                            url: this.url,
                            passWord: this.passWord,
                            userName: this.userName
                        }
                        axios({
                            url: 'api/switchoverDataSource/getAllTableAndColumns',
                            method: 'post',
                            data: paramain
                        }).then(res => {
                            console.log(res.data)
                            //
                            this.pubilcTableNameList = res.data
                        })

                    })
                    if (this.tableName == '') {
                        console.log('请选择数据库')
                    }
                    // 选择列名
                    if (this.tableName !== '') {
                        let para = {
                            url: this.url,
                            userName: this.userName,
                            passWord: this.passWord,
                            type: this.type,
                            dataBase: this.dataBase,
                            tableName: this.tableName,
                        }
                        axios({
                            url: 'api/switchoverDataSource/changeDataSource',
                            method: 'post',
                            data: para
                        }).then(res => {
                            console.log(res.data, '我是所有的列铭')
                            this.admincolumn = res.data
                            this.admincolumnpublic = res.data
                        })
                    }
                }

            },
            handleChange(value) {
                console.log(value);
                console.log(this.value)
            },
            // 将预设格式发送后端
            PreservationBtn() {
                console.log(this.Tempalates)
           
                let IsProps=[]
                for (let i = 0; i <this.Tempalates.length ; i++) {
                    for (let j = 0; j <this.Tempalates[i].TempalateRoom.length; j++) {
                    
                            console.log(this.Tempalates[i].TempalateHeader.id,'问题id')
                            console.log(this.Tempalates[i].TempalateHeader.questionFormat,'问题类型')
                            console.log(this.Tempalates[i].TempalateRoom[j].Secondarytable,'次表次表字段',)
                            console.log(this.Tempalates[i].TempalateRoom[j].Secondarytablechild,'次表',)
                            console.log( this.childzhubiao[i].TempalateRoom[j].sequence,'字段位置')
                            let para={
                                id:this.Tempalates[i].TempalateHeader.id,
"columnName":this.Tempalates[i].TempalateRoom[j].Secondarytable,
   "relationChain":this.Tempalates[i].TempalateRoom[j].Secondarytablechild,
   "sequence":this.childzhubiao[i].TempalateRoom[j].sequence,
                            }
                            IsProps.push(para)
                    }
                }
                console.log(IsProps,'111')
                var result = [], obj = {};
                 let requestQuestionMap={}
                for (var i = 0; i < IsProps.length; i++) {
                    if (!obj[IsProps[i].id]) {
                        result.push(IsProps[i])
                           obj[IsProps[i].id] = true
                        requestQuestionMap[IsProps[i].id]=requestQuestionMap[IsProps[i].id]||[{columnName:IsProps[i].columnName,relationChain:IsProps[i].relationChain,sequence:IsProps[i].sequence}]
                    }else {
                        for(let key in requestQuestionMap){
                            console.log(IsProps[i].id)
                            if(key==IsProps[i].id){
                                if( IsProps[i].columnName.length>0){
                                requestQuestionMap[key].push({columnName:IsProps[i].columnName,relationChain:IsProps[i].relationChain,sequence:IsProps[i].sequence})

                                }
                                
                            }
                        }
                        console.log(requestQuestionMap)
                    }
                }
                console.log(requestQuestionMap)
                console.log(result)
                let ispara = {
                    cardIdCol: 'card_id',
                    formId: this.passageway.id, //表单id
                    mainTableName: this.tableName,
                    url: this.url,// 数据库地址
                    type: this.type,//数据库类型
                    userName: this.userName,// 数据库账号
                    passWord: this.passWord,//数据库密码
                    dataBase: this.dataBase,// 数据库名
                    requestQuestionMap:requestQuestionMap
                }
                console.log(ispara)


                axios({
                    url: 'api/switchoverDataSource/addMapChange',
                    method: 'post',
                    data: ispara 
                })

            }
        }
    }
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped lang="scss">
    .ChildTypeMysqlClass{
        display: flex;
        justify-content: flex-start;
        div{
            font-size: 16px;
            width: 18%;
            margin-top:5px ;
            margin-bottom: 5px;
        }
    }
    header {
        width: 100%;
        background-color: royalblue;
        text-align: center;
        padding: 10px;
    }

    main {
        display: flex;

        .lift {
            width: 100%;
            background-color: #e4eced;
            h1{
                font-size: 20px;
                font-weight: bold;
            }
            ul{
                li{
                    a{
                        font-size: 18px;
                    }
                }

            }
        }
    }

    .motai {
        position: fixed;
        top: 20%;
    }
</style>