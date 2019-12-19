<template>
  <div class="main-footer"
       v-loading="loading">
    <div class="footer-con">
<!--      <div class="footer-btn">-->
<!--        <button><label>+</label><span>新模版</span></button>-->
<!--      </div>-->
      <div class="footer-con-1">
        <div class="con-1-1"
             v-for="item in templatelist"
             style="margin-bottom: 30px">
          <div>
            <p class="con-sty-1">
              <label>{{item.templateName}}</label>
              <span>创建时间：   <i>{{item.createTime.split("T")[0]}}</i></span>
            </p>
            <p class="con-sty-2">{{item.templateDescirbe}}</p>
            <p class="con-sty-3">
              <span  @click="templatelistitem(item)"><img src="../assets/images/crf-images/icon-7.png" /><label>预览</label></span>　　|　　
              <span @click="ChildItemClicEditkBtn(item)"><img src="../assets/images/crf-images/icon-9.png" /><label>使用</label></span>
              <span @click="ChildItemCliceleteBtn(item)"><img src="../assets/images/crf-images/icon-change4.png" /><label>删除</label></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="templatelist.length>0"
         style="display: block;clear: both;text-align: center">
      <ul>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage4"
                       :page-sizes="[6,12, 18, 24,30]"
                       :page-size="100"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="templatelist.length">
        </el-pagination>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "CrfCollectionTemplate",
  data () {
    return {
      currentPage4: 0,
      total: '',
      loading: false,
      templatelist: []
    }
  },
  created () {
    let para = {
      type: 1
    }
    this.fistgetAllCollects(para)
  },
  methods: {
    ...mapMutations(['CRFTEMPLATEEDITEMS','ISPREVIEW']),
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    fistgetAllCollects (para) {
      this.loading = true
      axios({
        url: 'api/template/getAllCollects',
        method: 'get',
        params: para
      }).then(res => {
        this.templatelist = res.data

        this.total = this.templatelist.length
        this.loading = false
      }).catch(err => {
      })
    },
    templatelistitem(item){
      console.log(item)
      this.CRFTEMPLATEEDITEMS(item)
      this.ISPREVIEW(1)
      this.$router.push({ path: '/CrfTemplateMain',query:{preview:1} })
    },
    ChildItemClicEditkBtn (item) {
        let para={
            templateId:item.templateId
        }
        axios({
            url: 'api/template/addTemplateToMyCrf',
            method: 'get',
            params: para
        }).then(res=>{
            console.log(item.templateId,'11111111111111111111111')
            this.$message({
                message: '恭喜您，已经添加到我的CRF',
                type: 'success'
            });

        })
    },
      ChildItemCliceleteBtn(item){
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            axios({
              url: 'api/template/deleteCollectTemplate',
              method: 'get',
              params: {templateId:item.templateId}
            }).then(res=>{
              console.log(res,'11111111111111111111111')
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              let para = {
                type: 1
              }
              this.fistgetAllCollects(para)
            })
          }).catch(()=>{
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          })
      }
  }
}
</script>
<style scoped src="../assets/css/crf_css/mould.css"></style>
<style scoped>
</style>