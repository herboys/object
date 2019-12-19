<template>
    <div>
    <div>
        <div class="part part4">
            <div class="title">
                <span class="num"></span>
                <span>.</span>
                <div class="content_editable">
                    <input class="q_title"
                           style=" width:100%;border:0px"
                           contenteditable="true"
                           v-model="mian[0].title"/>
                </div>
            </div>
            <div class="c-box">
                <div class="FaterTable"
                     v-for="(item,index) in mian[0].mainchild">
                    <div  contenteditable="true" class="ChildHeader" @focus='test(index,item)'>
                        <div  class="ChildStyle"  :style="childindex===index?'display: none':''">{{item.SexTitle}}</div>
                        <input class="ChildStyle" style="outline: none;" :style="childindex===index?' border:0px':'display: none; border:0px'" v-model="childname" @blur.prevent="changeCount(index,item)" />
                    </div>
                    <input style="border:1px solid #d6d6d6; margin: 10px 0px;" />
                    <img @click="deleteBtn(item,index)" class="icon-Add1"  src="../assets/images/crf-images/images/tkbj05.png" />
                </div>
                <div class="bot"
                     id="add-option">
                    <img class="icon-Add"  src="../assets/images/crf-images/images/tkbj-add.png"
                         alt="">
                    <span @click="AddSex">添加单个选项</span>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "SmallTemplateCompletion",
        props: {
            pushitem: Object
        },
        data(){
            return{
                mian: [],
                childname: '',
                childlistno: false,
                childindex: ''
            }
        },
        watch:{
            addressa: {
                handler(newValue, oldValue) {
                },
                deep: true
            }
        },
        computed:{
            addressa(){
                if(this.pushitem){
                    let paras = this.pushitem.list.questionOption.split(',')
                    let passageway = []
                    paras.map((item, index) => {
                        let a = {
                            SexTitle: item
                        }
                        passageway.push(a)
                    })
                    let para = {
                        title: this.pushitem.list.questionTitle,
                        mainchild: passageway
                    }
                    this.mian.push(para)
                    return `${this.pushitem}`
                }
            }
        },
        methods: {
            AddSex() {
                let para = {
                    SexTitle: '新增选项'
                }
                this.mian[0].mainchild.push(para)
            },
            test(index, item) {
                this.childindex = index
            },
            changeCount(index, item) {
                this.childindex = index
                if(this.childname){
                    this.$set(this.mian[0].mainchild, index, {SexTitle: this.childname});
                }
            },
            deleteBtn(item,index){
                let Fater=index
                this.mian[0].mainchild.splice(this.mian[0].mainchild.findIndex(index => index === Fater), 1)

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
    .ChildHeader{
        margin: 10px 0px;
        width: 180px;
        height: 32px;
        line-height: 32px;
        border:1px solid white;
        &:hover{
            border:1px dashed #d6d6d6;
        }
        input{
        }
    }
.ChildStyle{
    width: 150px !important;
    height: 32px;
    line-height: 32px;
}
    .FaterTable{
        display: flex;
        justify-content: start;
    }
    .bot{
        margin-top: 10px;
    }
    .icon-Add{
        width: 18px;
        height: 18px;
        vertical-align: -4px;
        margin-left: 7px;
        margin-right: 2px;
    }
    .icon-Add1{
        width: 18px;
        height: 18px;
        margin-top:20px
    }
</style>