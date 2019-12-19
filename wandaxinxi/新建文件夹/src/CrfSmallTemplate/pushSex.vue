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
                <div class="option content_editable"
                     v-for="(item,index) in passlist.TempalateRoom"
                     :key="index"
                     @click="ChildclickBtn(index)">
          <span class="icon"
                :class="{open:index==n}"></span>
                    <div class="q_title">{{item}}</div>
                    <img src="../assets/images/crf-images/images/tkbj05.png"
                         alt=""
                         class="right-icon"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pushSex",
        data() {
            return {
                AnswerSet: [],
                aaa: this.passlist,
                cities: ["上海", "北京", "广州", "重庆"],
                n: ''
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
                    // 如果是填答案状态
                    if (this.$route.query.preview == 2) {
                        this.n = JSON.parse(this.passlist.TempalateHeader.Answerlist.answerOption)
                    } else {

                    }
                }

            }
        },
        methods: {
            changeList(index) {
                this.n = index;//this指向app
            },

            ChildclickBtn(index) {
                this.n = index;//this指向app
                this.passlist.TempalateHeader.Answerlist.answerOption = JSON.stringify(index)
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

    part1 .option-list .open {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFW…+wqFs22C282f5dHdv6BKyp7v0YNq38TPyJ+gSknT4B1wIMAKXt47ihyCpYAAAAAElFTkSuQmCC) no-repeat;
        background-size: 100% 100%;
    }
</style>