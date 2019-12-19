<template>
    <div>
        <v-header></v-header>
        <!-- nav tool start -->
        <nav class="nav-top">
            <div class="left-tool">
                <i class="icon-home"></i>
                <span class="check-text">
        用户管理
      </span>
            </div>
            <div class="right-tool">
                <span class="span-text">参照标准： 数据集TEXTI</span>
                <span class="span-text">创建时间：2019-08-01</span>
            </div>
        </nav>
        <!-- nav tool end -->

        <!-- main start -->

        <!-- main  -->
        <section class="main yhgl-main">

            <!-- main  top-->
            <div class="t-part">

                <div class="top clearfix">
                    <div class="t-left floatleft">
                        <img src="../assets/images/yhgl/head.png" alt="" class="head">
                        <span>用户管理</span>
                    </div>
                    <div class="t-right floatright">
                        <div class="btn" @click="FaSearch">
                            <img src="../assets/images/yhgl/search.png" alt="" class="search">
                            <span>查询</span>
                        </div>
                    </div>
                </div>

                <div class="mid clearfix">
                    <div class="item">
                        <div class="m-name">
                            <span class="icon"></span>
                            <span class="name">项目编号 </span>
                        </div>
                        <div class="input-box">
                            <input type="text"  v-model="serialNum">
                        </div>
                    </div>
                    <div class="item">
                        <div class="m-name">
                            <span class="icon"></span>
                            <span class="name">姓名 </span>
                        </div>
                        <div class="input-box">
                            <input type="text"  v-model="name">
                        </div>
                    </div>
                    <div class="item">
                        <div class="m-name">
                            <span class="icon"></span>
                            <span class="name">性别 </span>
                        </div>
                        <div class="input-box">
                            <input type="text"  v-model="sex">
                        </div>
                    </div>
                    <div class="item">
                        <div class="m-name">
                            <span class="icon"></span>
                            <span class="name">手机号码 </span>
                        </div>
                        <div class="input-box">
                            <input type="text" v-model="phoneNum">
                        </div>
                    </div>
                    <div class="item">
                        <div class="m-name">
                            <span class="icon"></span>
                            <span class="name">证件号码 </span>
                        </div>
                        <div class="input-box">
                            <input type="text" v-model="cardId">
                        </div>
                    </div>

                </div>
                <!-- main  top-->
            </div>

            <div class="b-part">
                <div class="kailong"></div>

                <div class="btn-box floatright">
                    <button v-on:click="importData($event)">导入用户</button>
                    <button @click="UserPussTmeplateBtn">下载模板</button>
                    <button @click="UserAddBtn">新增用户</button>
                </div>

                <div class="ui-table-box">
                    <table class="ui-table-data">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>身份证</th>
                            <th>手机号</th>
                            <th>邮箱</th>
                            <th>微信</th>
                            <th>现居地</th>
                            <th class="operate">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in  tableData">
                            <td>{{index+1}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.sex}}</td>
                            <td>{{item.cardId}}</td>
                            <td>{{item.phoneNumber}}</td>
                            <td>{{item.email}}</td>
                            <td>{{item.wx}}</td>
                            <td>{{item.address}}</td>
                            <td>
                                <a href="javascript:void(0);"><i class="icon icon01"></i>基本信息</a>
                                <a href="javascript:void(0);"><i class="icon icon02"></i>项目情况</a>
                                <a href="javascript:void(0);"  @click="FillInBtn(item)"><i class="icon icon03"></i>填报</a>
                                <a href="javascript:void(0);" class="del" @click="deleteBtn(item)"><i class="icon icon04"></i>删除</a>
                                <a href="javascript:void(0);"><i class="icon icon05"></i></a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </section>
        <!-- main -->

<!--        导入用户名单-->
        <div class="ModalFrame" @click="ModalFrameBtnYes" v-if="ModalFrameRoom">
            <div class="Child" @click.stop="ModalFrameBtnNo">
                <div>用户名单</div>
                <button  v-on:click="importData($event)" class="button-secondary button">点我上传Excel</button>
            </div>
        </div>
        <form>
            <input type="file" name="fileup" id="uploadEventFile" v-on:change="fileChange($event)" style="display:none" />
        </form>
    </div>
</template>

<script>
    import HeaderCrf from "../components/HeaderCrf";
    import {mapMutations} from  'vuex'
    import {mapState} from  'vuex'
    import $ from 'jquery'
    export default {
        name: "UserAdministration",
        components: {
            'v-header': HeaderCrf
        },
        computed:{
          ...mapState(['CrfTemplateEditItems'])
        },

        data() {
            return {
                tableData: [],
                ModalFrameRoom:false,
                name:null,
                serialNum:null,
                phoneNum:null,
                cardId:null,
                sex:null,
                imgListimgList:[],
                templateId:null
            }
        },
        mounted() {
            this.templateId=this.CrfTemplateEditItems.templateId
            this.fast()
        },
        methods: {
            ...mapMutations(['TEMPLATE_USER_ID','ISPREVIEW']),
            handleClick(row) {
                console.log(row);
            },
            fast() {
                let para ={
                    templateId:this.templateId,
                }
                axios({
                    url: 'api/questionnaire/getAllUser',
                    method: 'post',
                    params:para
                }).then(res => {
                    console.log(res)
                    this.tableData = res.data.content
                })
            },
            FaSearch(){
                let para={
                    name: this.name,
                    phoneNum: this.phoneNum,
                    serialNum: this.serialNum,
                    cardId: this.cardId,
                    sex:this.sex,
                    templateId:this.templateId,
                }
                axios({
                    url: 'api/questionnaire/getAllUser',
                    method: 'post',
                    params:para
                }).then(res=>{ this.tableData = res.data.content})

            },
            UserPussBtn(){
                this.ModalFrameRoom=true
            },
            UserPussTmeplateBtn(){
                    var iframe =document.createElement("iframe")
                    iframe.style.display ="none";
                    iframe.src = 'api/questionnaire/exportExcel'
                    document.body.appendChild(iframe);
            },
            UserAddBtn(){
                this.$router.push({path:'/UserAdd'})
            },
            AddUserForm(){
              // axios({
              //   url: 'api/questionnaire/importExcel',
              //     method: 'post'
              // })
            },
            ModalFrameBtnYes(){
                console.log(111)
                this.ModalFrameRoom=false
            },
            ModalFrameBtnNo(){
                // this.ModalFrameRoom=false
                console.log(22222)
            },
            // 导入excel文件
            importData: function(event) {
                event.preventDefault();
                $("#uploadEventFile").trigger("click")
            },
            fileChange: function (el) {
                el.preventDefault();//取消默认行为
                let vm = this
                let uploadEventFile = $("#uploadEventFile").val()
                this.file = el.target.files[0]
                if (uploadEventFile == '') {
                    alert("请择excel,再上传");
                } else if (uploadEventFile.lastIndexOf(".xls") > 0 || uploadEventFile.lastIndexOf(".XLS") > 0) {
                    let formData = new FormData();
                    // 向 formData 对象中添加文件

                    formData.append('file',this.file);
                    formData.append('templateId',this.templateId);
                    let config = {
                        // 一定要定义头
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    let url='api/questionnaire/importExcel'
                    axios.post(url,formData,config).then(function (response) {
                        vm.fast()
                    })
                } else {
                    alert("只能上传excel文件");
                }
            },
            FillInBtn(item){
                this.TEMPLATE_USER_ID(item.id)
                console.log(item)
                this.ISPREVIEW(2)
              //  this.$router.push({path:'/UserFillTemplate'})
                this.$router.push({path:'/CrfTemplateMain',query:{preview:2}})
            },
            deleteBtn(item){
                console.log(item,'0000000')
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let para={
                        uid:item.id
                    }
                    axios({
                        url: 'api/questionnaire/deleteUser',
                        method: 'get',
                        params: para
                    }).then(res=>{
                        this.fast()
                    })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })

            }

        },
    }

</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped lang="scss">
    .ModalFrame{
        position: absolute;
        top: 0px;
        z-index: 99;
        width: 100%;
        height: 100%;
        .Child{
            width: 320px;
            height: 200px;
            position: relative;
            top: calc(50vh - 100px);
            left: calc(50vw - 160px);
            background: brown;
            z-index: 999;
        }
    }
.form-label{
    width: 60px;
    text-align: center;
}
    .form-item{
        button{
            margin: 0px 10px;
        }
    }
    .pages{
        margin: auto;
        min-width: 1000px;
    }
    .text-center{
        a{
            margin: 0px 5px;
        }
    }



    .floatleft {
        float: left;
    }
    .floatright {
        float: right;
    }
    .clearfix:after {
        content: ".";
        clear: both;
        display: block;
        height: 0;
        visibility: hidden;
        font-size: 0;
        line-height: 0;
    }
    .yhgl-main{
        padding-left: 20px;
        padding-right: 20px;
    }
    .yhgl-main .t-part{
        background:#E8ECF2;
        border-top: 3px solid #3B88D9;
        padding-left: 28px;
        padding-right: 27px;
        padding-bottom: 38px;
    }
    .yhgl-main .t-part .top{
        padding-top: 21px;
        color:#146ECC;
        font-size:16px;
        padding-bottom: 30px;
    }
    .yhgl-main .t-part .top .head{
        width: 40px;
        height: 40px;
        vertical-align: -15px;
        margin-right: 8px;
    }
    .yhgl-main .t-part .top .t-right .btn{
        width: 160px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #278F58;
        border-radius:4px;
        color:#1EA15B;
        text-align: center;
        font-size:14px;
    }
    .yhgl-main .t-part .top .t-right .search{
        width: 17px;
        height: 17px;
        vertical-align: -2px;
        margin-right: 4px;
    }
    .yhgl-main .t-part .item{
        width: 20%;
    }
    .yhgl-main .t-part .mid .m-name{
        width: 35%;
        text-align:right;
        font-size:14px;
        color:#000;
        margin-top: 5px;
    }
    .yhgl-main .t-part .mid .m-name .name{
        margin-right: 6px;
    }
    .yhgl-main .t-part .mid .m-name .icon{
        display: inline-block;
        width: 14px;
        height: 10px;
        background:url("../assets/images/yhgl/icon.png") no-repeat;
        background-size:100% 100%;
    }
    .yhgl-main .t-part .mid div{
        float: left;
    }
    .yhgl-main .t-part .mid .input-box{
        width: 60%;
        height: 30px;
        border-radius:6px;
        border: 1px solid #D6D6D6;
        overflow: hidden;
    }
    .yhgl-main .t-part .mid .input-box input{
        width: 100%;
        height: 100%;
        box-sizing: content-box;
        border:none;
        padding-left: 6px;
        box-sizing: content-box;
    }
    .yhgl-main .b-part{
        background:#fff;
        padding-left: 25px;
        padding-right: 26px;
        position: relative;
    }
    .yhgl-main .b-part .ui-table-box{
        padding-top: 24px;
        padding-bottom: 36px;
    }
    .yhgl-main .b-part .btn-box button{
        background:#1EA15B;
        width: 72px;
        height: 30px;
        border-radius:6px;
        color:#fff;
        font-size:14px;
        border:none;
        margin-top: 25px;
        margin-left: 4px;
        margin-bottom: 24px;
    }
    .yhgl-main .b-part .ui-table-data th{
        color:#333;
        font-size:14px;
        text-align: center;
    }
    .yhgl-main .b-part .ui-table-data td{
        text-align: center;
    }
    .yhgl-main .b-part .ui-table-data .operate{
        color:#666;
    }
    .yhgl-main .b-part .ui-table-data td a{
        color:#666;
        font-size:14px;
        text-decoration: none;
        margin-right: 6px;
    }
    .yhgl-main .b-part .ui-table-data td .del{
        color:#3B88D9;
        font-size:14px;
    }
    .yhgl-main .b-part .ui-table-data td .icon{
        display: inline-block;
        width: 15px;
        height: 16px;
        background:url("../assets/images/yhgl/icon01.png") no-repeat;
        background-size:100% 100%;
        vertical-align: -2px;
        margin-right: 4px;
    }
    .yhgl-main .b-part .ui-table-data td .icon02{
        width: 16px;
        height: 16px;
        background:url("../assets/images/yhgl/icon02.png") no-repeat;
        background-size:100% 100%;
    }
    .yhgl-main .b-part .ui-table-data td .icon03{
        width: 15px;
        height: 14px;
        background:url("../assets/images/yhgl/icon03.png") no-repeat;
        background-size:100% 100%;
    }
    .yhgl-main .b-part .ui-table-data td .icon04{
        width: 14px;
        height: 13px;
        background:url("../assets/images/yhgl/icon04.png") no-repeat;
        background-size:100% 100%;
    }
    .yhgl-main .b-part .ui-table-data td .icon05{
        width: 14px;
        height: 12px;
        background:url("../assets/images/yhgl/icon05.png") no-repeat;
        background-size:100% 100%;
    }

    /* 新增用户页面 */
    .xzyh-main{
        border-top:3px solid #3B88D9;
        background: white;
        margin: 30px 20px 20px 20px;
    }
    .xzyh-main .new-add{
        position: relative;
        margin: 75px auto 20px auto ;
        bottom: 20px;
        width:732px;
        box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    }
    .xzyh-main .new-add .add-header{
        width: 100%;
        position: absolute;
        text-align: center;
        top: -30px;
    }
    .xzyh-main .new-add .add-header p{
        width: 100%;
        position: absolute;
        top: 61px;
        font-size: 16px;
    }
    .xzyh-main .new-add .add-con .add-cloude{
        margin:0 150px 0 100px;
        padding: 70px 0 10px 0;
    }
    .xzyh-main .new-add .add-con .con-list{
        height: 30px;
        line-height: 30px;
        margin-bottom: 16px;
    }
    .xzyh-main .new-add .add-con .con-list .list-left{
        width: 25%;
        float: left;
        text-align: center;
        text-align: right;
        color: red;
    }
    .xzyh-main .new-add .add-con .con-list .list-left label{
        color: black;
    }
    .xzyh-main .new-add .add-con .con-list .list-left span{
        display: inline-block;
        width: 9px;
    }
    .xzyh-main .new-add .add-con .con-list .list-right{
        height: 30px;
        width: 73%;
        float: right;
        position: relative;
    }
    .xzyh-main .new-add .add-con .con-list .list-right input{
        width: 100%;
        height: 100%;
        border-radius: 2px;
        border: 1px solid #D6D6D6;
        text-indent: 7px;
    }
    .xzyh-main .new-add .add-con .con-list .list-right .dif-img{
        position: absolute;
        right: 5px;
        top: 5px;
    }
    .xzyh-main .new-add .add-con .con-list .list-right button{
        width: 72px;
        height: 30px;
        color: white;
        background: #1EA15B;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 6px;
    }
    .xzyh-main .new-add .add-con .con-list .list-right button:hover{
        opacity: .8;
    }
    .xzyh-main .new-add .add-con .con-list .list-right #test1{
        position: absolute;
        z-index: 66;
    }
</style>
