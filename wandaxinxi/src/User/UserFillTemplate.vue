<template>
    <div>
        <div class="vmain">


        <div class="content content1">
            <div class="search-top-box" style="margin: auto;">
                <h1>连接数据源</h1>
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
                    <label class="form-label">选择数据表</label>
                    <div class="form-inline">
                        <select class="ui-select-text" v-model="tableName">
                            <option>-请选择数据库类型-</option>
                            <option v-for="item in tableNameList" v-bind:value="item">{{item}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-item">
                    <a class="button button-primary" href="javascript:void(0);" @click="ConnectBtn">连  接</a>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import HeaderCrf from "../components/HeaderCrf";

    export default {
        name: "UserFillTemplate",
        components:{
          'v-header':HeaderCrf
        },
        data(){
            return{
                url:'10.1.192.118:3306',
                userName:'root',
                passWord:'!Aa123456',
                type:'mysql',
                dataBaseList:[],
                dataBase:'',
                tableNameList:[],
                tableName:'',
            }
        },
        created(){
            this.IsPc()
        },
        methods:{
            // 判断是否是电脑
            IsPc(){
              var userAgentInfo=navigator.userAgent;
              var Agents=["Android","iPone","SymbianOS","Window Phone","iPad","iPod"];
              var flag=true;
                for (var v = 0; v <Agents.length ; v++) {
                    if(userAgentInfo.indexOf(Agents[v])>0){
                        flag=false;
                        break;
                    }
                }
                return flag
            },
            ConnectBtn(){
                var flag=this.IsPc() // true 是电脑 false 是手机
                console.log(flag)
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
    .vmain{
text-align: center;
    }
.form-label{
    width: 100px;
    text-align: center;
}
.search-top-box{
    width: 360px;
    padding: 20px !important;
    h1{
        line-height: 2;
        font-weight: normal;
        font-size: 24px;
        text-align: center;
        margin-bottom: 10px;
    }
}
    .form-item{
        text-align: center;
        a{
            margin: auto !important;
        }
    }
</style>