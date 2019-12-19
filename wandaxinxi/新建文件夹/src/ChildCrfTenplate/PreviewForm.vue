<template>
    <div>
        <v-header></v-header>
        <div>
            <nav class="nav-top">
                <div class="left-tool">
            <span class="check-text">
                <button class="button button-default fa fa-sign-out" href="javascript:void(0);" @click="GoBack"> 退出预览</button>
            </span>
                </div>
                <div class="right-tool">
                    <a class="save-btn" href="javascript:void(0);">保存并分享</a>
                </div>
            </nav>
            <div class="center-tool">
                <span>提示：当前为预览页面，答案不被记录。</span>
            </div>
            <header>
                <div>
                    <div class="form-main">
                        <div class="title-change">
                            <a class="save-btn" target="form-mainFrame"  @click="ClickBtn(index)" v-for="(item,index) in list" :key="index"  >
                                <button class="button" :class="ClickIndex===index?'button-secondary':'button-default'"><i style="margin-right: 4px" class="fa" :class="index===1?'fa-desktop':'fa-tablet'" ></i>{{item.name}}</button>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <div v-if="ClickIndex===0" class="phone-con">
                <div class="phone-con-bg">
                    <div class="phone-con-det" style="overflow-x: hidden; overflow-y: auto;">
                        <div class="det-header"></div>
                        <div class="det-bottom">
                            <div class="title-top">
                                <p>{{formlist.formName}}</p>
                                <div>欢迎参加调查！答案数据仅用于统计分析，不会涉及您的隐私，请放心填写。题目选项无对错之分按照实际情况选择即可。感谢您的帮助！</div>
                            </div>
                            <div class="item-con"  id="formBeautify">
                                <div v-for="item in Tempalates">
                                    <v-SmallTemplateSex :passlist='item'></v-SmallTemplateSex>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="ClickIndex===1" class="pc-con">
                <div class="pc-cloud">
                    <div class="pc-con-det">
                        <div class="det-header"></div>
                        <div class="det-bottom">
                            <div class="title-top">
                                <p>{{formlist.formName}}</p>
                                <div>欢迎参加调查！答案数据仅用于统计分析，不会涉及您的隐私，请放心填写。题目选项无对错之分按照实际情况选择即可。感谢您的帮助！</div>
                            </div>
                            <div class="item-con">
                                <div v-for="item in Tempalates">
                                    <v-SmallTemplateSex :passlist='item'></v-SmallTemplateSex>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SmallSex from "../CrfSmallTemplate/SmallSex";
    import HeaderCrf from "../components/HeaderCrf";
    import {mapState} from 'vuex'
    export default {
        name: "PreviewForm",
        components: {
            'v-header': HeaderCrf,
            'v-SmallTemplateSex': SmallSex
        },
        data(){
            return{
                list:[
                    {name:'手机'},
                    {name:'电脑'}
                ],
                ClickIndex:0,
                // 表单
                formlist:[],
                Tempalates: []
            }
        },
        computed: {
            ...mapState(['CrfTemplateChildFrom'])
        },
        mounted(){
            this.formlist=this.CrfTemplateChildFrom
            this.Tempalates = []
            if (this.formlist.questions) {
                this.formlist.questions.map(item => {
                    if (item.questionFormat == 1) {
                        this.Tempalate = {
                            TempalateHeader: item,
                            TempalateRoom: item.questionOption.split(',')
                        }
                        this.Tempalates.push(this.Tempalate)
                    }
                })
            }
        },
        methods:{
            ClickBtn(index){
                this.ClickIndex=index
            },
            GoBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-top{
        position: relative;
    }
    .center-tool {
        text-align: center;
        position: absolute;
        margin:-31px  auto 0  auto;
        left:0;
        right:0;
    }
    header{
        width: 100%;
        div{
         margin: 5px 20px 0px 20px;
            background: #F5F5F5;
            .form-main{
                text-align: center;
                div{
                    margin: auto;
                    a{
                        margin: 14px 10px;
                    }
                }
            }
        }
    }

</style>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped>
    /* 手机端 */
    .phone-con{
        margin: 0px 20px;
        background: #F5F5F5;
    }
    .phone-con .phone-con-bg{
        margin:0 auto;
        width: 320px;
        height: 588px;
        background: url("../assets/images/form-pre-1.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .phone-con .phone-con-bg .phone-con-det{
        width: 248px;
        height: 470px;
        border: 1px solid #CBD4E1;
        position: relative;
        top: 36px;
        left: 34px;
        overflow-y: scroll;
    }
    .phone-con .phone-con-bg .phone-con-det .det-header{
        width: 100%;
        height: 156px;
        background: url("../assets/images/form-pre-2.png") no-repeat;
        background-size: 100% 100%;
    }
    .phone-con .phone-con-bg .phone-con-det .det-bottom{
        padding: 25px 5px 10px 16px;
    }
    .phone-con .phone-con-bg .phone-con-det .det-bottom .title-top p{
        font-size: 16px;
        text-align: center;
        font-weight: bold;
    }
    .phone-con .phone-con-bg .phone-con-det .det-bottom .title-top div{
        margin-top: 14px;
        color: #666666;
        line-height: 18px;
        font-size: 12px;
    }
    .phone-con .phone-con-bg .phone-con-det .det-bottom .item-con .items{
        margin-top: 18px;
    }
    .phone-con .phone-con-bg .phone-con-det .det-bottom .item-con .items .form-inline{
        margin-top: 7px;
    }
    .label-checkbox{
        line-height: 0;
    }

    /* PC端 */

    .pc-con {
        margin: 0px 20px;
        background: #F5F5F5;
    }

    .pc-con .pc-cloud {
        width: 835px;
        margin: 0 auto;
        background: white;
    }

    .pc-con .pc-cloud .pc-con-det .det-header {
        height: 150px;
        background: url("../assets/images/pc-pre-bg.png") no-repeat;
        background-size: 100% 100%;
    }

    .pc-con .pc-cloud .pc-con-det .det-bottom {
        padding: 28px 57px 22px 70px;
        margin-bottom: 15px;
    }

    .pc-con .pc-cloud .pc-con-det .det-bottom .title-top p {
        font-size: 18px;
        font-weight: bold;
        text-align: center
    }

    .pc-con .pc-cloud .pc-con-det .det-bottom .title-top div {
        color: #666666;
        margin-top: 26px;
        padding-bottom: 22px;
        border-bottom: 2px solid #84B7EE;
    }

    .pc-con .pc-cloud .pc-con-det .det-bottom .item-con {
        margin-top: 27px;
    }

    .pc-con .pc-cloud .pc-con-det .det-bottom .item-con .items {
        margin-top: 35px;
    }

    .pc-con .pc-cloud .pc-con-det .det-bottom .item-con .items p {
        margin-bottom: 15px;
    }

    .pc-con .pc-cloud .pc-con-det .det-bottom .item-con .items-2 .label-checkbox {
        display: block;
        margin-bottom: 10px;
    }

    .pc-con-det .det-bottom .item-con .items-3 .table-box .head {
        background: #F5F7F9;
    }

    .pc-con-det .det-bottom .item-con .items-3 .table-box tr td {
        border: 1px solid #D6D6D6;
        padding: 13px 11px;
    }

    .pc-con-det .det-bottom .item-con .items-3 .table-box .head td {
        text-align: center;
    }

    .pc-con-det .det-bottom .item-con .items-3 .table-box tr td input {
        height: 30px;
        border: 1px solid #D6D6D6;
        border-radius: 4px;
        text-indent: 10px;
    }

    .pc-con .pc-cloud .pc-con-det .det-bottom .item-con .items-4 .items-box div {
        margin-top: 10px;
    }

    .pc-con .pc-cloud .pc-con-det .det-bottom .item-con .items-4 .items-box2 {
        margin-top: 10px;
    }
    .button-default{
        background: #3b88d9;

    }
    .button-secondary{
        background: #278f58;

    }
    .button{
        display: inline-block;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        line-height: 28px;
        border-radius: 3px;
        color: white;
        font-size: 14px;
        padding: 0 15px;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        cursor: pointer;
        text-align: center;
        min-width: 30px;
    }
</style>