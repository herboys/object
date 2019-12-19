<template>
    <div style="background-color: white;margin-top: 40px">
        <div class="content content1">
            <div class="search-top-box">

                <div class="form-item">
                    <label class="form-label">请输入表单名称关键字</label>
                    <div class="form-inline">
                        <input class="ui-input-text" v-model="formname" type="text">
                    </div>
                    <a  @click="formnamebtn" class="button button-primary" href="javascript:void(0);"><i class="fa fa-search"></i>查 询</a>
                </div>
            </div>
            <div class="container">
                <aside class="ui-table-box">
                    <table class="ui-table-data">
                        <thead>
                        <tr>
                            <th class="text-center">表单名称</th>
                            <th class="text-center"></th>
                            <th class="text-center"></th>
                            <th class="text-center"></th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody >
                        <tr v-for="(items,indexs) in list">
                            <td class="text-center">{{items.formName}}</td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center">
                                <a class="tool-a" @click="operation(items)"><i
                                        class="fa fa-check-square-o"></i>使用</a>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                    <div class="ui-page-sort">
                        <div class="left-tool"><span class="span-state">第1页／共1页</span></div>
                        <div class="right-tool">
                            <span class="span-setting">
                                每页条数
                                <select class="select-text">
                                    <option>5</option>
                                    <option>10</option>
                                    <option>25</option>
                                </select>
                            </span>
                            <span class="span-number">
                                转到
                                <input class="input-text" type="text" />
                                <a class="go-btn" href="">GO</a>
                            </span>
                            <span class="span-tool">
                                <a class="page-a" href="javascript:void(0);">首页</a>
                                <a class="page-a" href="javascript:void(0);">下一页</a>
                                <a class="page-a" href="javascript:void(0);">末页</a>
                            </span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapState,mapMutations} from 'vuex'
    export default {
        name: "ChildCrfTemplatMainRightForm",
        data(){
            return{
                list:[],
                formname:''
            }

        },
        mounted() {

            this.fast()
        },
        computed: {
            ...mapState(['CrfTemplateChildFrom'])
        },
        methods:{
            ...mapActions(['getUserList']),
            ...mapMutations(['CTFTEMPLATECHILDFROM']),
            fast(){
                this.getUserList().then(res=>{
                    console.log(res)
                    this.list=res
                })
            },
            formnamebtn(){
                if(this.formname=="") {
                    this.list.papers=this.templatelist.papers
                }else {
                    let  len =  this.list.papers;
                    var  arr = [];
                    for(let i=0;i<len.length;i++){
                        for (let j = 0; j <len[i].leftchild.length;j++) {
                            if(len[i].leftchild[j].formName.indexOf(this.formname)>=0){
                                arr.push(len[i]);
                            }
                        }
                    }
                    this.list.papers=arr
                }
            },
            operation(items){
                console.log(items)
                if(items.questions.length>0){
                    for (let i = 0; i < items.questions.length; i++) {
                        let paras = {
                            formId: this.CrfTemplateChildFrom.id,
                            form_desc: '12312312313',
                            form_name: this.CrfTemplateChildFrom.formName,
                            questionList: [{
                                questionId: 0,
                                question_option:items.questions[i].questionOption,
                                question_title:items.questions[i].questionTitle,
                                questron_Format: items.questions[i].questionFormat
                            }],
                            type: 2
                        }
                            axios({
                                url: 'api/template/addFormToPaper',
                                method: 'post',
                                data: paras
                            }).then(res => {
                                this.CTFTEMPLATECHILDFROM(res.data)
                            })
                    }
                }

            }
        }
    }
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped>

</style>