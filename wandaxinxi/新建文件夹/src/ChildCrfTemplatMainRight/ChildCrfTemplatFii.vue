<template>
    <div>
        <section class="page-content per-test">
            <!--<aside class="box-title">表格展示</aside>-->
            <aside class="box-title">
                <div class="title-det1">
                    <span class="title-sp1" v-if="title!==undefined&&title.length>0"><i></i> {{title}}</span>
                    <span class="title-sp2"><label>答卷数：</label><i>20</i></span>
                    <span class="title-sp3">
                <label>状态运行中</label>
                <img src="../assets/images/icon-personal-1.png"/>
                <img src="../assets/images/icon-personal-2.png"/>
            </span>
                </div>
                <div class="title-det2">
                    <button class="button button-line-primary"><i class="fa fa-edit"></i>编辑</button>
                    <button class="button button-line-primary"><i class="fa fa-cog"></i>填充设置</button>
                    <button class="button button-line-primary"><i class="fa-filling"></i>自动填充</button>
                </div>
            </aside>
            <!--search top start-->
            <div class="search-top-box">
                <span class="top-box-sp1"><label>编码</label><input type="text"/></span>
                <span><label>姓名</label><input type="text"/></span>
                <span><label>身份证</label><input type="text"/></span>
                <span>
            <label>性别</label>
            <select>
                <option>男</option>
                <option>女</option>
            </select>
        </span>
            </div>
            <!--search top end-->
            <!-- content start-->
            <div class="container">
                <div class="ui-top">
                    <div class="ui-top-left">
                        <span><label>未填写人数：</label><i>9</i></span>
                        <span><label>已填写人数：</label><i>59</i></span>
                        <span><label>已审批人数：</label><i>0</i></span>
                    </div>
                    <div class="ui-top-right">
                        <button class="button button-primary">按钮</button>
                    </div>
                </div>
                <aside class="ui-table-box">
                    <table class="ui-table-data">
                        <thead>
                        <tr>
                            <th class="checked-sp"><span></span>全选</th>
                            <th>项目</th>
                            <th class="text-center">中心</th>
                            <th class="text-center">编辑</th>
                            <th class="text-center">姓名</th>
                            <th class="text-center">身份证</th>
                            <th class="text-center">性别</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="checked-sp"><span></span></td>
                            <td>神经一课</td>
                            <td class="text-center">北京大学附属耳鼻喉医院</td>
                            <td class="text-center">20</td>
                            <td class="text-center">张三</td>
                            <td class="text-center">230921190380383997</td>
                            <td class="text-center">男</td>
                            <td class="text-center">
                                <a class="tool-a" href="javascript:void(0);"><i class="fa fa-eraser"></i>修改</a>
                                <a class="tool-a" href="javascript:void(0);"><i class="fa fa-print"></i>打印</a>
                            </td>
                        </tr>
<!--    -->
                        </tbody>
                    </table>
                    <div class="ui-page-sort">
                        <div class="left-tool"><span class="span-state">第1页／共3页</span></div>
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
            <!-- content  end-->
        </section>
    </div>
</template>

<script>
    import {mapState} from  'vuex'
    export default {
        name: "ChildCrfTemplatFii",
        data(){
            return{
                title:''
            }
        },
        computed:{
            ...mapState(['CrfTemplateChildFrom'])
        },
        mounted() {
            console.log(this.CrfTemplateChildFrom,'12313123123')
            this.title=this.CrfTemplateChildFrom.formName
        }
    }
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped src="../assets/css/crf_css/base_info.css"></style>
<style scoped>

</style>