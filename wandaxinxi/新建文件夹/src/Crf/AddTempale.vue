<template>
    <div class="AddTempaleStyle" >
        <v-header></v-header>
        <!-- main start -->

        <!-- main  -->
        <section class="xzyh-main xjxm-main">
            <div class="header-name">
                <img src="../assets/images/xjxm-img.png"/>
                <label>新建项目</label>
            </div>
            <div class="xjxm-con">
                <div class="con-det clearfix">
                    <div class="con-left con-same">
                        <div class="itemBg">
                            <div class="con-list clearfix">
                                <div class="list-left">
                                    <label>项目名称</label><span>*</span>
                                </div>
                                <div class="list-right">
                                    <input type="text" v-model="templapeName"/>
                                </div>
                            </div>
                            <div class="con-list clearfix">
                                <div class="list-left">
                                    <label>项目类型</label><span></span>
                                </div>
                                <div class="list-right">
                                    <input type="text" v-model="templateType"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="con-right con-same">
                        <div class="itemBg">
                            <div class="con-list clearfix">
                                <div class="list-left">
                                    <label>负责人</label><span></span>
                                </div>
                                <div class="list-right">
                                    <input type="text" v-model="principal"/>
                                </div>
                            </div>
                            <div class="con-list clearfix">
                                <div class="list-left">
                                    <label>样本量</label><span></span>
                                </div>
                                <div class="list-right">
                                    <input type="text" v-model="sampleSize"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="center clearfix">
                    <div class="center-cloude">
                        <div class="con-list">
                            <div class="list-left">
                                <label>课题描述</label><span>*</span>
                            </div>
                            <div class="list-right">
                                <textarea v-model="templateDescirbe"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="con-det clearfix">
                    <div class="con-left con-same">
                        <div class="itemBg">
                            <div class="con-list clearfix diff">
                                <div class="list-left">
                                    <label>起止时间</label><span>*</span>
                                </div>
                                <div class="list-right">
                                    <input class="in1" type="text"  v-model="createTime"/>
                                    <div class="input">
                                        <label>TO</label>
                                        <input type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div class="con-list clearfix">
                                <div class="list-left">
                                    <label>项目注册号</label><span></span>
                                </div>
                                <div class="list-right">
                                    <input type="text" v-model="registrationNumber" />
                                </div>
                            </div>
                            <div class="con-list clearfix">
                                <div class="list-left">
                                    <label>伦理备案号</label><span></span>
                                </div>
                                <div class="list-right">
                                    <input type="text" v-model="putOnRecords"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="con-right con-same">
                        <div class="itemBg">
                            <div class="con-list clearfix">
                                <div class="list-left">
                                    <label>数据导入</label><span></span>
                                </div>
                                <div class="list-right">
                                    <select v-model="data">
                                        <option>选择数据集</option>
                                        <option>选择数据集</option>
                                        <option>选择数据集</option>
                                    </select>
                                </div>
                            </div>
                            <div class="con-list clearfix">
                                <div class="list-left">
                                    <label>邀请合作人</label><span></span>
                                </div>
                                <div class="list-right">
                                    <select v-model="cooperator">
                                        <option>填写合作人账号</option>
                                        <option>填写合作人账号</option>
                                        <option>填写合作人账号</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="con-det clearfix">
                    <div class="con-left con-same">
                        <div class="itemBg">
                            <div class="con-list clearfix">
                                <div class="list-left">
                                    <label></label><span></span>
                                </div>
                                <div class="list-right">
                                    <button class="btn" @click="SubmissionBtn">提交</button>
                                    <button style="margin-left: 20px" class="btn" @click="SubmissiontypeBtn">返回</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import HeaderCrf from "../components/HeaderCrf";
    export default {
        name: "AddTempale",
        components:{
            'v-header':HeaderCrf
        },
        data(){
            return{
                templapeName:'',
                principal:'',
                templateType:'',
                sampleSize:'',
                templateDescirbe:'',
                createTime:'',
                endTime:'',
                registrationNumber:'',
                putOnRecords:'',
                data:'',
                cooperator:'',
            }
        },
        mounted(){
            if(this.$route.query.type==2){
                axios({
                    url: 'api/template/getTemplate',
                    method: 'get',
                    params:{temgplateId:this.$route.query.templateId}
                }).then(res=>{
                    this.templapeName=res.data.templateName,
                        this.principal=res.data.principal,
                        this.templateType=res.data.templateType,
                        this.sampleSize=res.data.sampleSize,
                        this.templateDescirbe=res.data.templateDescirbe,
                        this.createTime=res.data.createTime,
                        this.endTime=res.data.endTime,
                        this.registrationNumber=res.data.registrationNumber,
                        this.putOnRecords=res.data.putOnRecords,
                        this.data=res.data.data,
                        this.cooperator=res.data.cooperator
                })
            }

        },
        methods:{
            SubmissiontypeBtn(){
                this.$router.push({path:'/CrfTemplateFistPage'})
            },
            SubmissionBtn(){
                if(this.$route.query.type==2){
                    let para2={
                        // templateName:this.templapeName,
                        // principal:this.principal,
                        // templateType:this.templateType,
                        // sampleSize:this.sampleSize,
                        // templateDescirbe:this.templateDescirbe,
                        // createTime:this.createTime,
                        // endTime:this.endTime,
                        // registrationNumber:this.registrationNumber,
                        // putOnRecords:this.putOnRecords,
                        // data:this.data,
                        // cooperator:this.cooperator,
                        "cooperator": "string",
                        "createTime": "string",
                        "data": "string",
                        "endTime": "string",
                        "principal": "string",
                        "putOnRecords": "string",
                        "registrationNumber": "string",
                        "sampleSize": 0,
                        "status": "string",
                        templateDescirbe:this.templateDescirbe,
                        "templateId": this.$route.query.templateId,
                        templateName:this.templapeName,
                        templateType:this.templateType
                    }
                    console.log(para2)
                    axios({
                        url: 'api/template/addTemplate',
                        method: 'post',
                        data: para2,
                        params:{type:2}
                    }).then(res=>{
                        this.$message({
                            message: '恭喜您,修改成功',
                            type: 'success'
                        });
                    })
                }else {
                    let para1={
                        templateName:this.templapeName,
                        principal:this.principal,
                        templateType:this.templateType,
                        sampleSize:this.sampleSize,
                        templateDescirbe:this.templateDescirbe,
                        createTime:this.createTime,
                        endTime:this.endTime,
                        registrationNumber:this.registrationNumber,
                        putOnRecords:this.putOnRecords,
                        data:this.data,
                        cooperator:this.cooperator,
                    }
                    axios({
                        url: 'api/template/addTemplate',
                        method: 'post',
                        data: para1,
                        params:{type:1}
                    }).then(res=>{
                        this.$message({
                            message: '恭喜您，添加成功',
                            type: 'success'
                        });
                    })
                }
            }
        }
    }
</script>
<style scoped src="../assets/css/reset.css"></style>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped lang="scss">
.vheader{
    width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: white;
}
    .AddTempaleStyle{
        width: 100%;
        .AddTempaleMain{
            margin: 26px 20px;
            border-top: 2px solid #77b0ec;
            div:nth-child(1){
                margin: 10px 23px ;
                font-size:16px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
            div:nth-child(2){
                margin: 20px 200px;
            }
            ul{
                margin: 20px 200px;
                li{
                    margin: 20px 0px;
                    display: flex;
                    justify-content: space-between;
                    a{
                        span{
                            text-align: start;
                            width: 70px;
                            padding: 0px 10px;
                        }
                        input{
                            width: 320px;
                            background:rgba(255,255,255,1);
                            border:1px solid rgba(214, 214, 214, 1);
                            border-radius:2px;
                            height: 30px;
                        }
                        button{
                            width:72px;
                            height:30px;
                            background: #1ea15b;
                            border-color: #278f58;
                            border-radius:6px;

                            font-size:14px;
                            font-family:PingFang SC;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                        }
                    }
                }
            }
        }
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

/* 新建项目 */
.xjxm-main .header-name{
    margin: 26px 30px 60px 33px;
}
.xjxm-main .header-name img{
    vertical-align: -2px;
}
.xjxm-main .header-name label{
    font-size: 16px;
    margin-left: 5px;
}
.xjxm-main .xjxm-con{
    margin: 0 auto;
    width: 950px;
}
.xjxm-main .xjxm-con>.con-det{
    margin-left: -40px;
    margin-right: -40px;
}
.xjxm-main .xjxm-con>.con-det .con-same{
    float: left;
    width: 50%;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg{
    margin-left: 40px;
    margin-right: 40px;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .con-list{
    margin-bottom: 18px;
    height: 30px;
    line-height: 30px;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .con-list .list-left{
    float: left;
    text-align: right;
    width: 100px;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .con-list .list-left span{
    color: red;
    display: inline-block;
    width: 8px;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .con-list .list-right{
    float: left;
    margin-left: 8px;
    width: 315px;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .con-list .list-right input{
    width: 100%;
    height: 28px;
    border: 1px solid #D6D6D6;
    border-radius: 2px;
    text-indent: 7px;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .con-list .list-right select{
    width: 100%;
    height: 30px;
    border: 1px solid #D6D6D6;
    border-radius: 2px;
    color: #888888;
    background: white;
    text-indent: 7px;
    outline: none;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .diff .list-right .in1{
    width: 120px;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .diff .list-right .input{
    float: right;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .diff .list-right .input label{
    margin-right: 12px;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .diff .list-right .input input{
    width: 120px;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .con-list .list-right>.btn{
    width: 72px;
    height: 30px;
    background: #1EA15B;
    color: white;
    border-radius: 6px;
    outline:none;
    border: none;
    cursor: pointer;
}
.xjxm-main .xjxm-con>.con-det .con-same .itemBg .con-list .list-right>.btn:hover{
    opacity: .8;
}
.xjxm-main .xjxm-con>.center{
    margin-left: -40px;
    margin-right: -40px;
}
.xjxm-main .xjxm-con>.center .center-cloude{
    margin-left: 40px;
    margin-right: 40px;
}
.xjxm-main .xjxm-con>.center{
    margin-bottom: 18px;
}
.xjxm-main .xjxm-con>.center .con-list .list-left{
    float: left;
    width: 100px;
    text-align: right;
}
.xjxm-main .xjxm-con>.center .con-list .list-left span{
    color: red;
    display: inline-block;
    width: 10px;
}
.xjxm-main .xjxm-con>.center .con-list .list-right{
    float: left;
    margin-left: 8px;
    width: 830px;
}
.xjxm-main .xjxm-con>.center .con-list .list-right textarea{
    width: 100%;
    height: 105px;
    border: 1px solid #D6D6D6;
    padding: 8px 0;
    text-indent: 8px;
    outline: none;
    resize: none;
}
</style>