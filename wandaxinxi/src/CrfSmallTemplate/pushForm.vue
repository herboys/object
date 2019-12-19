<template>
    <div>
        <div class="part part2" id="top2">
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
            <div>
                <ul class="box">
                    <li style="padding: 0px 40px" v-for="(c,index) in passlist.TempalateRoom"
                        @click="checkedBox(index)">
                        <a class="jqTransformCheckbox " :class="{jqTransformChecked:arr.includes(index)}"></a>. <div  style="display: inline">{{c}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pushForm",
        data() {
            return {
                listindex: [],
                aaa: this.passlist,
                cities: ["上海", "北京", "广州", "重庆", "西安"],
                arr: []
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
                    // 如果是填写答案状态
                    if (this.$route.query.preview == 2) {
                        this.arr = JSON.parse(this.passlist.TempalateHeader.Answerlist.answerOption)
                    } else {

                    }
                }
            }
        },
        methods: {
            checkedBox(i) {
                if (this.arr.includes(i)) {
                    this.arr = this.arr.filter((ele) => {
                        return ele != i;
                    });
                } else {
                    this.arr.push(i);
                }
                this.passlist.TempalateHeader.Answerlist.answerOption = JSON.stringify(this.arr)
                this.$emit("child", this.aaa)
            },

            AddSex() {
                let para = {
                    SexTitle: '新增选项'
                }
                this.mian[0].mainchild.push(para)
            },
            hello() {
                console.log(this.mian)
            }
        }
    }
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped lang="scss">
    .part {
        border: 1px solid #d6d6d6;
        border-radius: 10px;
        padding: 19px 25px 15px 37px;
        margin-top: 13px;
        color: #000;
        font-size: 14px;
        position: relative;
    }

    li {

        height: 30px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        margin-left: 5px;
    }


    a.jqTransformCheckbox {
        background: transparent url(../assets/images/crf-images/images/icon-check-bg-03.png) no-repeat center top;
        vertical-align: middle;
        height: 20px;
        width: 20px;
        display: -moz-inline-box;
        -moz-box-orient: vertical;
        display: inline-block;
    }

    a.jqTransformCheckbox.jqTransformChecked {
        background: transparent url(../assets/images/crf-images/images/icon-check-bg-04.png) no-repeat center top;
    }
</style>