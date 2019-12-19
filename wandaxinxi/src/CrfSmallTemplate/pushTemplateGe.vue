<template>
    <div>
        <div class="part part3" id="part3">
            <div class="title">
                <span class="num"></span>
                <span>.</span>
                <div class="content_editable"><input class="q_title"
                                                     style=" width:100%;border:0px"
                                                     readonly="true"
                                                     v-model="mian[0].title"/>
                </div>
            </div>
            <div class="table-box">
                <table>
                    <tbody>
                    <tr class="head">
                        <td class="left1"></td>
                        <td contenteditable="true" class="column " v-for="item in mian[0].line" :key="item">
                            <div class="content_editable">
                                <div class="q_title" contenteditable="true">{{item.linename}}</div>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(item,index) in mian[1].column" :key="item">
                        <td contenteditable="true">
                            <div class="content_editable">
                                <div class="q_title" contenteditable="true">{{item.columnname}}</div>
                            </div>
                        </td>
                        <td v-for="(childitem,childindex) in item.child">
                            <input  v-model="childitem.value"
                                   @blur.prevent="YesChildItem(index,childindex,childitem)"/>
<!--                            <input v-if="childitem.value!==''" :value="childitem.value"-->
<!--                                   @blur.prevent="YesChildItem(index,childindex,childitem)"/>-->
<!--                            <input :style="childitem.value==''?'':'display:none'" v-model="ChildInputValue"-->
<!--                                   @input="ChildItemClick(index,childindex,childitem,event)"/>-->
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'pushTemplateGe',
        data() {
            return {
                mian: [],
                childname: '',
                childlistno: false,
                childindex: '',
                ChildInputValue: '',
                TableContents: [],
                aaa: this.passlist
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
                    console.log(this.passlist, '查看传递给问题得是什么')
                    let paras = this.passlist.TempalateHeader.questionOption.split('-')
                    let ccc = []
                    let bbb = []
                    paras.map((item, index) => {
                        if (index == 0) {
                            let robe = item.split(',')
                            robe.map((itemdd) => {
                                let a = {
                                    linename: itemdd
                                }
                                ccc.push(a)
                            })
                        } else {
                            let robe = item.split(',')
                            robe.map((itemdd) => {
                                let a = {
                                    columnname: itemdd
                                }
                                bbb.push(a)
                            })
                        }
                    })
                    let para = {
                        title: this.passlist.TempalateHeader.questionTitle,
                        line: ccc
                    }
                    let para1 = {
                        title: this.passlist.TempalateHeader.questionTitle,
                        column: bbb
                    }
                    this.mian.push(para)
                    this.mian.push(para1)
                    if (this.$route.query.preview == 2) {
                        for (let i = 0; i < this.mian[1].column.length; i++) {
                            this.mian[1].column[i].child = []
                            for (let j = 0; j < this.mian[0].line.length; j++) {
                                let aa = {
                                    value: ''
                                }
                                this.mian[1].column[i].child.push(aa)
                            }
                        }
                        this.mian[1].column = this.mian[1].column
                        console.log(this.passlist, '当填写答案的时候')
                        if (this.passlist.TempalateHeader.Answerlist !== undefined&&this.passlist.TempalateHeader.Answerlist.answerOption !==undefined&&this.passlist.TempalateHeader.Answerlist.answerOption.length>0) {
                            this.mian[1].column = JSON.parse(this.passlist.TempalateHeader.Answerlist.answerOption)
                        } else {

                        }

                    } else {
                        for (let i = 0; i < this.mian[1].column.length; i++) {
                            this.mian[1].column[i].child = []
                            for (let j = 0; j < this.mian[0].line.length; j++) {
                                let aa = {
                                    value: ''
                                }
                                this.mian[1].column[i].child.push(aa)
                            }
                        }
                        this.mian[1].column = this.mian[1].column
                    }
                    console.log(this.main, '111111111111')
                    return `${this.passlist}`
                }
            }
        },
        mounted() {
            let sum = 0
            for (let i = 0; i < this.mian[0].line.length; i++) {
                for (let j = 0; j < this.mian[1].column.length; j++) {
                    sum++
                    let tbaspara = {
                        value: '',
                        id: sum
                    }
                    this.TableContents.push(tbaspara)
                }
            }
            this.TableContents = this.ObjectRemovalFor(this.TableContents)
            console.log(this.TableContents, '111111111')
        },
        ObjectRemovalFor(arr) {
            let result = [];
            let obj = {};
            for (let i = 0; i < arr.length; i++) {
                if (!obj[arr[i].id]) {
                    result.push(arr[i]);
                    obj[arr[i].id] = true;
                }
            }
            return result
        },
        methods: {
            // 获取点击填答案得位置

            YesChildItem(index, childindex, childitem, event) {
                    this.aaa.TempalateHeader.Answerlist.answerOption = JSON.stringify(this.mian[1].column)
                    this.$emit("child", this.aaa)
                    console.log(this.aaa, '总表数据')
            },
            // ChildItemClick(index, childindex, childitem, event) {
            //     this.clearTimer();
            //     this.timer = setTimeout(() => {
            //         console.log('行', index, '列', childindex, '点击的item值', childitem)
            //         console.log(this.mian[1].column[index], '99')
            //         this.$set(this.mian[1].column[index].child, childindex, {value: this.ChildInputValue})
            //         this.aaa.TempalateHeader.Answerlist.answerOption = JSON.stringify(this.mian[1].column)
            //         this.ChildInputValue = ''
            //         this.$emit("child", this.aaa)
            //         console.log(this.mian, '总表数据')
            //     }, 500);
            // },
            // YesChildItem(index, childindex, childitem) {
            //     console.log(index, '33333333')
            //     console.log(this.mian[1].column[index].child, '总表数据')
            //     this.$set(this.mian[1].column[index].child, childindex, {value: ''})
            //     this.mian.push()
            //     console.log(this.mian, '总表数据')
            // }
        }
    }
</script>
<style scoped src='@/assets/css/crf_css/page.css'></style>
