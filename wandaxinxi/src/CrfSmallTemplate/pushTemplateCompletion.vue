<template>
    <div>
        <div class="part part1"
             id="top1">
            <div class="title">
                <span class="num"></span>
                <span>.</span>
                <div class="content_editable ">
                    <input class="q_title"
                           style=" width:100%;border:0px"
                           readonly="true"
                           v-model="passlist.TempalateHeader.questionTitle"/>
                </div>
            </div>
            <div class="option-list">
                <div
                        v-for="(item,index) in room"
                        :key="index">
                    <div class="FaterTable">
                        <div>{{item.name}}</div>
                        <input  @blur.prevent="ChildclickBtn(index)" v-model="item.value"/>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pushTemplateCompletion",
        data() {
            return {
                AnswerSet: [],
                listindex: '',
                listi: this.passlist.TempalateHeader.Answerlist.answerOption,
                list: [],
                aaa: this.passlist,
                room: []
            }
        },
        props: {
            passlist: Object
        },
        watch: {
            addressa: {
                handler(newValue, oldValue) {
                },
                deep: true
            }
        },
        computed: {
            addressa() {
                if (this.passlist) {
                    console.log(11111111111111111111111111)
                    let bb = []
                    this.list = this.passlist.TempalateRoom
                    this.list.map((item) => {
                        let para11 = {
                            name: item,
                            value: ''
                        }
                        bb.push(para11)
                    })
                    this.room = bb
                    if (this.$route.query.preview == 2) {
                        if (this.passlist.TempalateHeader.Answerlist !== undefined && this.passlist.TempalateHeader.Answerlist.answerOption !== undefined && this.passlist.TempalateHeader.Answerlist.answerOption.length > 0) {
                            this.room = JSON.parse(this.passlist.TempalateHeader.Answerlist.answerOption)
                        }
                    }
                }
            }
        },
        methods: {
            ChildclickBtn(index) {
                console.log(index)
                this.aaa.TempalateHeader.Answerlist.answerOption = JSON.stringify(this.room)
                this.$emit("child", this.aaa)
            },
            AddSex() {
                let para = {
                    SexTitle: '新增选项'
                }
                this.mian[0].mainchild.push(para)
            },
            hello() {
            }
        }
    }
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped lang="scss">
    .bot {
        margin-top: 26px;
        color: #4a95e6;
        font-size: 14px;

        img {
            vertical-align: middle;
            width: 18px;
            height: 18px;
            margin-left: 7px;
            margin-right: 7px;
        }

        span {
            vertical-align: middle;
        }
    }

    .part {
        border: 1px solid #d6d6d6;
        border-radius: 10px;
        padding: 19px 25px 15px 37px;
        margin-top: 13px;
        color: #000;
        font-size: 14px;
        position: relative;
    }

    .FaterTable {
        display: flex;
        justify-content: start;
        margin: 10px 0;

        div {
            width: 100px !important;
            height: 32px;
            line-height: 32px;
        }

        input {
            border: 1px solid #d6d6d6;
            width: 300px;
            border-radius: 3px;
        }
    }
</style>