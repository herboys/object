<template>
    <div>
        <header>
            <h1>自动填充设置</h1>
            <div class="form-item">
                <label class="form-label">服务器地址</label>
                <div class="form-inline">
                    <input class="ui-input-text" v-model="url" type="text">
                </div>
            </div>
            <div class="form-item">
                <label class="form-label">用户名</label>
                <div class="form-inline">
                    <input class="ui-input-text" v-model="userName" type="text">
                </div>
            </div>
            <div class="form-item">
                <label class="form-label">密码</label>
                <div class="form-inline">
                    <input class="ui-input-text" v-model="passWord" type="text">
                </div>
            </div>
            <div class="form-item">
                <label class="form-label">数据库类型</label>
                <div class="form-inline">
                    <select class="ui-select-text">
                        <option>-请选择数据库类型-</option>
                        <option>mysql</option>
                        <option>corcel</option>
                    </select>
                </div>
            </div>
            <div class="form-item" v-if="dataBaseList[0]!=undefined &&dataBaseList.length>0">
                <label class="form-label">选择数据名</label>
                <div class="form-inline">
                    <select class="ui-select-text" v-model="dataBase">
                        <option>-请选择数据库类型-</option>
                        <option v-for="item in dataBaseList" v-bind:value="item">{{item}}</option>
                    </select>
                </div>
            </div>
            <div class="form-item" v-if="tableNameList[0]!=undefined &&tableNameList.length>0">
                <label class="form-label">选择主表</label>
                <div class="form-inline">
                    <select class="ui-select-text" v-model="tableName">
                        <option>-请选择数据库类型-</option>
                        <option v-for="item in tableNameList" v-bind:value="item">{{item}}</option>
                    </select>
                </div>
            </div>
            <div class="form-item" v-if="tableNameList[0]!=undefined &&admincolumn.length>0">
                <label class="form-label">选择主键</label>
                <div class="form-inline">
                    <select class="ui-select-text" v-model="admincolumnName">
                        <option>-请选择数据库类型-</option>
                        <option v-for="item in admincolumn" v-bind:value="item">{{item}}</option>
                    </select>
                </div>
            </div>

            <div class="form-item">
                <a class="button button-primary" href="javascript:void(0);" @click="ConnectBtn">连  接</a>
            </div>
        </header>
        <main>
            <div class="lift">
                <h1>{{this.passageway.formName}}</h1>
                <ul>
                    <li v-for="item in Tempalates" :key="item">
                       <a>{{item.TempalateHeader.questionTitle}}</a>
                        <ol v-if="item.TempalateHeader.questionFormat=='3'">
                            <li style="margin-left: 20px" v-for="items in item.TempalateRoom" :key="items">
                                {{items}}
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>
            <div class="right">
                <ul>
                    <li class="form-item" style="display: flex;justify-content: space-between" >
                            <div class="form-inline">
                                <select class="ui-select-text">
                                    <option value="volvo">-请选择表-</option>
                                    <option v-for="item in pubilcTableNameList" v-bind:value="item">{{item}}</option>
                                </select>
                            </div>
                        <div class="form-inline">
                            <select class="ui-select-text">
                                <option value="volvo">-请选择表-</option>
                                <option v-for="item in pubilcTableNameList" v-bind:value="item">{{item}}</option>
                            </select>
                        </div>
                        <div class="form-inline">
                            <select class="ui-select-text">
                                <option value="volvo">-请选择表-</option>
                                <option v-for="item in pubilcTableNameList" v-bind:value="item">{{item}}</option>
                            </select>
                        </div>
                    </li>
                </ul>
            </div>
        </main>

    </div>
</template>
<script>
    import {mapState} from  'vuex'
    import UserFillTemplate from "./UserFillTemplate";
    export default {
        name: "UserDataBase",
        data(){
          return{
              isshow: true,
              list: [
              ],
              Tempalate: '',
              Tempalates: [],
              ModalType:false,
              ModalStatus:'',
              ModalName:'',
              previews:"",
              url:'10.1.192.118:3306',
              userName:'root',
              passWord:'!Aa123456',
              type:'mysql',
              dataBaseList:[],
              dataBase:'',
              tableNameList:[],
              pubilcTableNameList:[],
              tableName:'',
              admincolumn:[],
              admincolumnName:''
          }
        },
        components:{
          'V-UserFillTemplate':UserFillTemplate
        },
        props: {
            passageway: Object
        },
        computed: {
            ...mapState(['template_user_id']),
            address () {
                console.log(this.passageway,'更新值')
                return `${this.passageway}`
            }
        },
        watch: {
            address: {
                handler (newV, oldV) {
                    console.log(this.passageway,'传参')
                    this.isshow = true
                    this.Tempalates = []
                    if (this.passageway.questions) {
                        this.passageway.questions.map(item => {
                            this.Tempalate = {
                                TempalateHeader: item,
                                TempalateRoom: item.questionOption.split(',')
                            }
                            this.Tempalates.push(this.Tempalate)
                            this.Tempalates.sort(function(a,b){
                                return a.TempalateHeader.id - b.TempalateHeader.id
                            })
                        })
                    }
                    console.log(this.Tempalates)
                },
                immediate: true,
                deep: true
            }
        },
        methods:{
            ConnectBtn(){
                if (this.dataBase==''){
                    let para={
                        url:this.url,
                        userName:this.userName,
                        passWord:this.passWord,
                        type:this.type,
                    }
                    axios({
                        url: 'api/switchoverDataSource/changeDataSource',
                        method: 'post',
                        data: para
                    }).then(res=>{
                        this.dataBaseList=res.data
                    })
                }
                if (this.dataBase!==''){
                    let para={
                        url:this.url,
                        userName:this.userName,
                        passWord:this.passWord,
                        type:this.type,
                        dataBase:this.dataBase,
                    }
                    axios({
                        url: 'api/switchoverDataSource/changeDataSource',
                        method: 'post',
                        data: para
                    }).then(res=>{
                        this.tableNameList=res.data
                        this.pubilcTableNameList=res.data
                    })
                    if(this.tableName==''){
                        console.log('请选择数据库')
                    }
                    if (this.tableName!==''){
                        let para={
                            url:this.url,
                            userName:this.userName,
                            passWord:this.passWord,
                            type:this.type,
                            dataBase:this.dataBase,
                            tableName:this.tableName,
                        }
                        axios({
                            url: 'api/switchoverDataSource/changeDataSource',
                            method: 'post',
                            data: para
                        }).then(res=>{
                            console.log(res.data,'我是所有的列铭')
                            this.admincolumn=res.data
                        })
                    }
                }

            }
        }
    }
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped lang="scss">
header{
    width: 100%;
    background-color: royalblue;
    text-align: center;
    padding: 10px;
}
    main{
        display: flex;
        .lift{
            width: 30%;
            background-color: #0cb7f5;
        }
        .right{
            width: 70%;
            background-color: #00A277;
        }
    }
    .motai{
       position: fixed;
        top:20%;
    }
</style>