<template>
    <div>
        <div class="items">
            <p><label>1.</label><span>{{passlist.TempalateHeader.questionTitle}}？</span></p>
            <div class="form-inline"  v-for="(item,index) in passlist.TempalateRoom"
                 :key="index"
                 @click="ChildclickBtn(index)">
                <label class="label-checkbox">
                    <a class="jqTransformRadio  "  :class="listindex === index ? 'jqTransformChecked' : '' "></a>
                    {{item}}
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SmallSex",
        data () {
            return {
                listindex: -1
            }
        },
        props: {
            passlist:Array
        },

        methods: {
            ChildclickBtn (index) {
                this.listindex = index
            },
            AddSex () {
                let para = {
                    SexTitle: '新增选项'
                }
                this.mian[0].mainchild.push(para)
            },
            hello () {
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
    .part{
        border: 0px solid #d6d6d6;
        border-radius: 0px;
        padding: 19px 25px 15px 37px;
        margin-top: 0px;
        color: #000;
        font-size: 14px;
        position: relative;
    }
</style>
<style>
    .jqTransformRadio {
        background: transparent url(../assets/images/icon-radio-bg-01.png) no-repeat center top;
        vertical-align: middle;
        height: 20px;
        width: 20px;
        display: -moz-inline-box;
        -moz-box-orient: vertical;
        display: inline-block; /* see http://www.quirksmode.org/css/display.html */
    }
    .jqTransformRadio.jqTransformChecked {
        background: transparent url(../assets/images/icon-radio-bg-04.png) no-repeat center top;
    }
</style>