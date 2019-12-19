<template>
    <div class="main-footer">
    <div class="footer-con form-con">
        <div class="ChildList">
                <ul>
                    <li v-for="item in list" :key="item.id">
                        <div>
                        <span class="form-det1"><i class="leftheader"></i><label>{{item.formName}}</label></span>
                        <span class="form-det2">
                                    <i class="centerheader"></i>
                                    <a @click="LookItem(item)"><img src="../assets/images/crf-images/icon-7.png"/><label>预览</label></a>
                                    <span @click="CopyBtn(item)"><img src="../assets/images/crf-images/icon-10.png"/><label>复制到自定义表单</label></span>
                                </span>
                        </div>
                    </li>
                </ul>
        </div>
    </div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "CrfFormTemplate",
        data(){
            return{
list:[],
                parass:{
    type:1
                }
            }
        },
        mounted() {
let parass={
    type:1
}
            this.fast(parass)
        },
        methods:{
            ...mapMutations(['LOOKFROM','ISPREVIEW']),

            fast(parass){
                axios({
                    url: 'api/template/getAllForm',
                    method: 'get',
                    params:parass
                }).then(res => {
                    console.log(res.data)
                    this.list=res.data
                })
            },
            LookItem(item){
                this.LOOKFROM(item)
                this.ISPREVIEW(1)
                this.$router.push({path:'/LookCrfCoustom',query:{preview:1}})
            },
            CopyBtn(item){
                let parass={
                    formId:item.id
                }
                axios({
                    url: 'api/template/addFormToTemplate',
                    method: 'get',
                    params:parass
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '复制成功'
                    });
                })
            }
        }
    }
</script>

<style scoped src="../assets/css/crf_css/mould.css"></style>
<style lang="scss" scoped>
    .ChildList{
ul{
    li{
        width: 46%;
        display: inline-block;
        height: 64px;
        line-height: 64px;
        border-bottom: 1px dashed #D8D8D8;
        position: relative;
        margin-bottom: 25px;
        transition: .5s;
        margin:  2%;
        div{
            display: flex;
            justify-content: space-between;
            label{
                font-size: 16px;
                margin-left: 12px;
            }
            .leftheader{
                width: 3px;
                height: 20px;
                background: #00A178;
                vertical-align: -3px;
            }
            img{
                width: 18px;
                height: 18px;
                vertical-align: -2px;
            }
            a{
                margin-right: 10px;
            }
        }

&:hover{
    background-color: #DDF1FF;
}
    }
}
    }
</style>