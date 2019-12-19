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
                                    <a  @click="LookItem(item)"><img src="../assets/images/crf-images/icon-7.png"/><label>预览</label></a>
                                    <span style=" margin-right: 10px;" @click="editBtn(item)"><img src="../assets/images/crf-images/icon-10.png"/><label>  编辑</label></span>
                                    <span  @click="deleatBtn(item)"><img src="../assets/images/crf-images/icon-10.png"/><label> 删除</label></span>

                                </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
      <div v-if="list.length>0"
           style="display: block;clear: both;text-align: center">
          <ul>
              <el-pagination @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page="page"
                             :page-sizes="[6,9, 12]"
                             :page-size="limit"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="total">
              </el-pagination>
          </ul>
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
          currentPage4: 0,
          total: null,
          limit:6,
          page:1,
          templatelisting: [],
      }
    },
    mounted() {
        let parass={
            type:2
        }
      this.fast(parass)
    },
    methods:{
      ...mapMutations(['LOOKFROM']),
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
            this.limit = val
            this.getList()
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
            this.page = val
            this.getList()
        },
      fast(parass){
          this.loading = true
        axios({
          url: 'api/template/getAllForm',
          method: 'get',
            params:parass
        }).then(res => {
          console.log(res.data)
          this.templatelisting=res.data
            this.total = this.templatelisting.length
            this.loading = false
            this.getList()
        })
      },
        getList() {
            this.list = this.templatelisting.filter((item, index) =>
                index < this.page * this.limit && index >= this.limit * (this.page - 1)
            )
        },
      LookItem(item){
        this.LOOKFROM(item)
        this.$router.push({path:'/LookCrfCoustom',query:{preview:1}})
      },
      editBtn(item){
        this.LOOKFROM(item)
        this.$router.push({path:'/LookCrfCoustom'})
      },
      deleatBtn(item){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              let para= {
                  formId: item.id,
                  form_desc: "string",
                  form_name: "string",
                  paper_id: 0,
                  questionList: [{
                      questionId: 0,
                      question_option: "string",
                      question_title: "string",
                      questron_Format: "string"
                  }],
                  type: 3
              }
              axios({
                  url: 'api/template/addForm',
                  method: 'post',
                  data: para
              }).then(res=>{
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
                  let parass={
                      type:2
                  }
                  this.fast(parass)
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
        console.log(item)
      }
    }
  }
</script>


<style scoped src="../assets/css/crf_css/mould.css"></style>
<style lang="scss" scoped >
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