<template>
    <div>
        <div class="pc-con">
            <div class="pc-cloud">
                <div class="pc-con-det">
                    <div class="det-header"></div>
                    <div class="det-bottom">
                        <div class="title-top">
                            <p>{{formlist.formName}}</p>
                            <div>欢迎参加调查！答案数据仅用于统计分析，不会涉及您的隐私，请放心填写。题目选项无对错之分按照实际情况选择即可。感谢您的帮助！</div>
                        </div>
                        <div class="item-con">
                            <div v-for="item in Tempalates" :key="item">
                                <!--单选框-->
                                <div v-if="item.TempalateHeader.questionFormat==1">
                                    <v-Pcsex :passlist='item'  ref="child"  v-on:child="showchild"></v-Pcsex>
                                </div>
                                <!-- 多选框-->
                                <div v-if="item.TempalateHeader.questionFormat==2">
                                    <v-PcForm :passlist='item'  ref="child"  v-on:child="showchild"></v-PcForm>
                                </div>
                                <!--填空框-->
                                <div v-if="item.TempalateHeader.questionFormat==3">
                                    <v-PcTemplateCompletion :passlist='item'  ref="child"  v-on:child="showchild"></v-PcTemplateCompletion>
                                </div>
                                <!--表格-->
                                <div v-if="item.TempalateHeader.questionFormat==4"></div>
                            </div>
                        </div>
                    </div>
                    <div class="operationclass">
                        <button class="button button-primary" @click="baocun">保存</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import PcForm from "../CrfSmallTemplate/PcForm";
    import PcTemplateCompletion from "../CrfSmallTemplate/PcTemplateCompletion";
    import PcSex from "../CrfSmallTemplate/PcSex";

    export default {
        name: "UserFillInForm",
        data() {
            return {
                userid: "",
                formid: "",
                formlist: [],
                ClickIndex: 0,
                // 表单
                formlist: [],
                Tempalates: [],
                child: []
            }
        },
        components: {
            'v-Pcsex': PcSex,
            'v-PcTemplateCompletion': PcTemplateCompletion,
            'v-PcForm': PcForm
        },
        mounted() {
            this.userid = this.$route.query.UserId
            this.formid = Base64.decode(this.$route.query.FormId)
            this.fast()
        },

        methods: {
            // 获取当前表单
            fast() {
                let para = {
                    formId: this.formid
                }
                axios({
                    url: 'api/template/getForm',
                    method: 'get',
                    params: para
                }).then(res => {
                    this.formlist = res.data
                    console.log(res.data)
                    this.child = res.data
                    let questionsid = {}
                    questionsid = res.data.questions
                    questionsid = questionsid.map(item => item.id)
                    console.log(questionsid)
                    // 获取答案
                    let questionlist = {
                        querstions: questionsid.join(','),
                        uid: Base64.decode(this.userid)
                    }
                    axios({
                        url: 'api/questionnaire/getAnswers',
                        method: 'get',
                        params: questionlist
                    }).then(res => {
                        let nextlist = res.data
                        for (let i = 0; i < this.child.questions.length; i++) {
                            for (let j = 0; j < nextlist.length; j++) {
                                if (this.child.questions[i].id === nextlist[j].question.id) {
                                    this.child.questions[i].Answerlist = nextlist[j]
                                }
                            }
                        }
                        console.log(this.child, '设置答案与问题的对应关系')
                        this.child.questions.map(item => {
                            console.log(item)
                            this.Tempalate = {
                                TempalateHeader: item,
                                TempalateRoom: item.questionOption.split(',')
                            }
                            this.Tempalates.push(this.Tempalate)
                            this.Tempalates.sort(function(a,b){
                                return a.TempalateHeader.id - b.TempalateHeader.id
                            })
                        })
                        console.log(this.Tempalates)
                    })
                })
            },
            showchild(res){
                console.log(res)
            },
            baocun(){
                this.$confirm('此操作将永久保存, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ChildListAndContainAnswer = this.$refs.child
                    console.log(ChildListAndContainAnswer,'99999')
                    let  NoAnswerlist = []
                    for (let i = 0; i < ChildListAndContainAnswer.length; i++) {
                        //No answer
                        let NoAnswer = {
                            "answerId": ChildListAndContainAnswer[i].passlist.TempalateHeader.Answerlist.id, // 答案id
                            "answerOption": ChildListAndContainAnswer[i].passlist.TempalateHeader.Answerlist.answerOption, //答案内容
                            "questionType": ChildListAndContainAnswer[i].passlist.TempalateHeader.questionFormat, //问题类型
                            "question_Id": ChildListAndContainAnswer[i].passlist.TempalateHeader.id,// 问题id
                            "user_Id":  Base64.decode(this.userid) //当前用户id
                        }
                        NoAnswerlist.push(NoAnswer)
                    }
                    console.log(NoAnswerlist,'1111111111111111111111')
                    axios({
                        url: 'api/questionnaire/submitAnswer',
                        method: 'post',
                        data: NoAnswerlist,
                        params: {type: 2}
                    }).then(res => {

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .operationclass {
        text-align: center;
        padding: 20px;
    }

    .nav-top {
        position: relative;
    }

    .center-tool {
        text-align: center;
        position: absolute;
        margin: -31px auto 0 auto;
        left: 0;
        right: 0;
    }

    header {
        width: 100%;

        div {
            margin: 5px 20px 0px 20px;
            background: #F5F5F5;

            .form-main {
                text-align: center;

                div {
                    margin: auto;

                    a {
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
    .phone-con {
        margin: 0px 20px;
        background: #F5F5F5;
    }


    /* PC端 */

    .pc-con {
        /*position: fixed;*/
        width: 100%;
        height: 100%;
        margin: 0px 0px;
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

    .button-default {
        background: #3b88d9;

    }

    .button-secondary {
        background: #278f58;

    }

    .button {
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
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        cursor: pointer;
        text-align: center;
        min-width: 30px;
    }
</style>