<template>
  <div class="main-footer"
       v-loading="loading">
    <div class="footer-con">
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
              <span @click="templatelistitem(item)"><img src="../assets/images/crf-images/icon-7.png" /><label>预览</label></span>　　|　
              <span v-if="item.type!==1" @click="ChildItemClickBtn(item)"><img src="../assets/images/crf-images/icon-6.png" /><label>添加收藏</label></span>
              <span v-if="item.type==1"><img style="" src="../assets/images/crf-images/Collection.png" /><label>已收藏</label></span>
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
  name: "CrfProjectTemplate",
  data () {
    return {
      currentPage4: 0,
      total: '',
      loading: false,
      templatelist: []
    }
  },
  created () {

    this.fistgetAllCollects()
    this.aaaa()
  },
  methods: {
    ...mapMutations(['CRFTEMPLATEEDITEMS']),
    aaaa(){
      axios({
        url: 'http://47.103.88.0:8080/',
        method: 'post',
        data:  {usernum:18339899917,
          password:123456,
          captcha:8508}
      }).then(res => {
    })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    fistgetAllCollects () {
      let newlists=[]
      let oldlists=[]
          axios({
            url: 'api/template/getAllCollects',
            method: 'get',
            params:  {type:1}
          }).then(res => {
            newlists=res.data
            axios({
              url: 'api/template/getAllCollects',
              method: 'get',
              params:  {type:0}
            }).then(res => {
              oldlists=res.data
              for (let i = 0; i <newlists.length ; i++) {
                for (let j = 0; j <oldlists.length ; j++) {
                  if(newlists[i].templateId==oldlists[j].templateId){
                    oldlists.splice(j,1)
                  }
                }
              }
              newlists.map(item=>{
                item.type=1
              })
              oldlists.map(item=>{
                item.type=2
              })
              let arr=oldlists.concat(newlists)
              this.templatelist = arr
              this.total = this.templatelist.length
            })
          })
    },
    templatelistitem(item){
      console.log(item)
      this.CRFTEMPLATEEDITEMS(item)
      this.$router.push({ path: '/CrfTemplateMain',query:{preview:1} })
    },
    ChildItemClickBtn: async function (item) {

      let para = {
        templateId: await item.templateId
      }
      axios({
        url: 'api/template/addCollectTemplate',
        method: 'get',
        params: para
      }).then(res => {
       this.fistgetAllCollects()
        this.$message({
          message: '恭喜您，收藏模板成功',
          type: 'success'
        });

      }).catch(err => {

      })
    }
  }
}
</script>
<style scoped src="../assets/css/crf_css/mould.css"></style>
