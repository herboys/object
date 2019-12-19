<template>
  <div class="main-footer"
       v-loading="loading">
    <div class="footer-con">
      <div class="footer-btn" >
        <button @click="AddTempaleBtn"><label>+</label><span>新模版</span></button>
      </div>
      <div class="footer-con-1">
        <div class="con-1-1"
             v-for="item in templatelist"
             style="margin-bottom: 30px">
          <div>
            <p class="con-sty-1">
              <label>{{item.templateName}}</label>
              <span>创建时间：
<!--                <i>{{new Date(item.createTime).getFullYear()+'.'+new Date(item.createTime).getMonth() + 1+'.'+new Date(item.createTime).getDate()}}</i>-->
                <i>{{item.createTime.split("T")[0]}}</i>
              </span>
            </p>
            <p class="con-sty-2">{{item.templateDescirbe}}</p>
            <p class="con-sty-3">
              <span @click="templatelistitem(item)">
                <a href="#">
                  <img src="../assets/images/crf-images/icon-7.png" />
                  <label>预览</label>
                </a>
                <i></i>
              </span>
              <span @click="ChildItemClicEditkBtn(item)"  v-if="item.stutus!=='已发布'" >
                <img src="../assets/images/crf-images/icon-9.png" />
                <label>编辑</label>
                <i></i>
              </span>
              <span @click="UserBtn(item)" v-if="item.stutus=='已发布'">
                <img class="img1"
                     src="../assets/images/crf-images/icon-11.png" />
                <label>用户管理</label>
                <i></i>
              </span>
                <span class="img2">
                   <img class="img2"
                        src="../assets/images/crf-images/icon-12.png" />
            <ul class="ClassStyle">
            <li v-for="items in SmallMenu" :key="items.MeunId" @click="MenuItemGoing(items,item)">
              <img :src="items.ImgTrue"/>
<!--              <img class="sty-4-img" :src="item.ImgFale"/>-->
              <label>{{items.MenuLabel}}</label>
            </li>
          </ul>
                </span>
            </p>
          </div>
          <span class="img2">
          </span>
        </div>
      </div>
    </div>
    <div v-if="templatelist.length>0"
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
import { mapState, mapMutations } from 'vuex'
export default {
  name: "CrfMyTemeplate",
  data () {
    return {
      currentPage4: 0,
      total: null,
      limit:6,
      page:1,
      list:[],
      loading: false,
      templatelist: [],
      templatelisting: [],
      SmallMenu:[
        {
          MeunId:1,
          ImgTrue:require('../assets/images/crf-images/icon-change1.png'),
          ImgFale:require('../assets/images/crf-images/icon-change1-1.png'),
          MenuLabel:'数据填充设置'
        },{
          MeunId:2,
          ImgTrue:require('../assets/images/crf-images/icon-change2.png'),
          ImgFale:require('../assets/images/crf-images/icon-change2-1.png'),
          MenuLabel:'重命名'
        },{
          MeunId:3,
          ImgTrue:require('../assets/images/crf-images/icon-change3.png'),
          ImgFale:require('../assets/images/crf-images/icon-change3-1.png'),
          MenuLabel:'复制模版'
        },{
          MeunId:4,
          ImgTrue:require('../assets/images/crf-images/icon-change4.png'),
          ImgFale:require('../assets/images/crf-images/icon-change4-1.png'),
          MenuLabel:'删除模版'
        },{
          MeunId:5,
          ImgTrue:require('../assets/images/crf-images/icon-change5.png'),
          ImgFale:require('../assets/images/crf-images/icon-change5-1.png'),
          MenuLabel:'发布模板'
        },{
          MeunId:6,
          ImgTrue:require('../assets/images/crf-images/icon-change6.png'),
          ImgFale:require('../assets/images/crf-images/icon-change6-1.png'),
          MenuLabel:'数据填充'
        }
      ]
    }
  },
  created () {
    let para = {
      type: 2
    }
    this.fistgetAllCollects(para)
  },
  methods: {
    ...mapMutations(['CRFTEMPLATEEDITEMS']),
    AddTempaleBtn(){
      this.$router.push({ path: '/AddTempale' })
    },
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
    fistgetAllCollects (para) {
      this.loading = true
      axios({
        url: 'api/template/getAllCollects',
        method: 'get',
        params: para
      }).then(res => {
        this.templatelisting = res.data
        this.total = this.templatelisting.length
        this.loading = false
        this.getList()
      }).catch(err => {
        console.log(err)
      })
    },
    getList() {
      this.templatelist = this.templatelisting.filter((item, index) =>
              index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
  },
    templatelistitem(item){
      console.log(item)
      this.CRFTEMPLATEEDITEMS(item)
      this.$router.push({ path: '/CrfTemplateMain', query:{preview:1}})
    },
    ChildItemClicEditkBtn (item) {
      this.CRFTEMPLATEEDITEMS(item)
      this.$router.push({ path: '/CrfTemplateMain' })
    },
    UserBtn(item){
      this.CRFTEMPLATEEDITEMS(item)
      this.$router.push({path:'/UserAdministration'})
    },
    functiondata(row, column, cellValue, index) {
      if (cellValue == null || cellValue == "") return "";
      let date = new Date(parseInt(cellValue) * 1000);
      let Y = date.getFullYear() + '-';
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      // let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      // let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      // let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D;
    },
    MenuItemGoing(items,item){
      switch (items.MeunId) {
        case 6:
          this.$router.push({path:'/CrfTemplateMain', query: {preview:4,id:item.templateId}})
          break;
          case 4:
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let paras={
                templateId:item.templateId
              }
              axios({
                url: 'api/template/deleteTemplate',
                method: 'get',
                params: paras
              }).then(res=>{
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                let para = {
                  type: 2
                }
                this.fistgetAllCollects(para)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
              break;
        case 5:
          console.log(items,item)
          this.$confirm('此操作将发布该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let id5={
              createTime:item.createTime,
              endTime:item.endTime,
              templateDescirbe:item.templateDescirbe,
              templateId:item.templateId,
              templateName:item.templateName,
              status:'已发布'
            }
            axios({
              url:'api/template/addTemplate',
              method:'post',
              data:id5,
              params:{type:2}
            }).then(res=>{
              this.$message({
                message: '恭喜您，发布成功',
                type: 'success'
              });
            })
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
          break;
        case 3:
          this.$confirm('此操作将复制当前模板, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          let para={
            templateId:item.templateId
          }
          axios({
            url: 'api/template/addTemplateToMyCrf',
            method: 'get',
            params: para
          }).then(res=>{
            console.log(item.templateId,'11111111111111111111111')
            let para111 = {
              type: 2
            }
            this.fistgetAllCollects(para111)
            this.$message({
              message: '恭喜您，复制成功',
              type: 'success'
            });

          })
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
          break;
        case 2:
          this.$router.push({path: '/AddTempale',query:{type:2,templateId:item.templateId}})
          break;
        default:
          break;
      }
    }
  }
}
</script>
<style scoped src="../assets/css/crf_css/mould.css"></style>
<style scoped lang="scss">
  .main .main-footer .footer-con-1 .con-1-1 div{
     overflow: unset;
  }
  .footer-con-1{
    overflow: unset;
  }
  .con-sty-2{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
.img2{
  .ClassStyle{
    background: white;
    border: 1px solid #D6D6D6;
    width: 140px;
    position: absolute;
    margin-top: -10px;
    right: 0px;
    z-index: 99!important;
    border-radius: 4px;
    padding-bottom: 5px;
    padding-top: 13px;
    li{
      text-align: center;
      padding-left: 14px;
      cursor: pointer;
      color: #278F58;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: start;
      align-items: center;
      &:hover{
        label{
          color: white !important;
        }
        background-color: #2875CA;
      }
    }
    display: none;
  }
  &:hover{
.ClassStyle{
  display: block;
  }
}
}
</style>