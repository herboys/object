<template>
    <div class="search-result" style="padding-bottom:20px;">
        <div class="header-box">
            <div class="header-title" style="cursor:pointer;" @click="()=>{this.$router.push('/main')}"></div>
            <div class="header-name">
                <a>王医生，欢迎您！</a>
                <span></span>
            </div>
        </div>
    <div class="main">
        <div class="main-top">
            <p> 
                <input type="text" v-model="value" @keyup.enter="search"/>
                <span @click="search" style="cursor:pointer;"><img src="../assets/images/blue-search.png"/><label style="cursor:pointer;">搜索</label></span>
            </p>
           <router-link to='/Advanced' style="text-decoration:none;"><button class="btn1">高级检索</button></router-link> 
            
            <button class="btn1">从高级中检索</button>
             <button class="btn1" @click="qwjsback">返回上一层</button>
        </div>
        <div class="main-bottom">
            <div class="search-result" style="height:40px;margin-bottom:10px;margin-top:10px;">
                <div class="result-left">
            
                    <div class="DisplayFieldClass" >展示字段</div>
               <div class="mockselectclass">
                    <div><el-checkbox v-model="checkedGender">性别</el-checkbox></div>
                      <div><el-checkbox v-model="Outpatientdiagnosis">门诊诊断</el-checkbox></div>
                       <div><el-checkbox v-model="Admissiondiagnosis">入院诊断</el-checkbox></div>
                       <div><el-checkbox v-model="Dischargediagnosis">出院诊断</el-checkbox></div>
                        <div><el-checkbox v-model="VisitingDepartment">就诊科室</el-checkbox></div>
                         <div><el-checkbox v-model="HistoryofPresentIllness">现病史</el-checkbox></div>
                           <div><el-checkbox v-model="Pasthistory">既往史</el-checkbox></div>
                  <div><el-checkbox v-model="familyhistory">家族史</el-checkbox></div>
                      <div><el-checkbox v-model="Treatmentprocess">治疗过程</el-checkbox></div>
                          <div><el-checkbox v-model="Inspectionitems">检查项目</el-checkbox></div>
                              <div><el-checkbox v-model="Checkvalue1">检查值</el-checkbox></div>
                              <div><el-checkbox v-model="Inspectiontime">检查时间</el-checkbox></div>
                              <div><el-checkbox v-model="Visitinghospital">就诊医院</el-checkbox></div>
                    </div>
                </div>
                <div class="result-right">
                    <!-- <a class="a1" id="save-search" style="height:26px;"> -->
                        <!-- <img src="../assets/images/save-search.png" /> -->
  
                           <el-button type="success" plain  @click="seeAllCollection">查看已有数据集</el-button>
                                <el-dialog title="已创建的数据集" :visible.sync="dialogTableVisible">
                                    <el-table :data="gridData" height="350">
                                        <el-table-column property="data_Name" label="数据集名称" width="150" align="center"></el-table-column>
                                        <el-table-column property="date_desc" label="数据集描述" width="200" align="center"></el-table-column>
                                        <el-table-column label="操作" align="center">
                                            <template slot-scope="scope">
                                                <el-button @click="checkCollection(scope.row)" type="text" size="small" style="border:0px;">查看</el-button>
                                                <el-button @click="deleteCollection(scope.$index, scope.row)" type="text" size="small" style="border:0px;color:red;">删除</el-button>
                                        </template></el-table-column>
                                    </el-table>
                                </el-dialog>
              
    
                        <el-button type="warning" plain @click="dialogFormVisible = true" style="margin-left:10px;">添加至数据集</el-button>
                        <el-dialog title="添加数据集" :visible.sync="dialogFormVisible" style="" center>
                                <el-dialog
                                    id="dialog"
                                    width="60%"
                                    height="200px"
                                    title="创建成功"
                                    center
                                    :visible.sync="innerVisible"
                                    append-to-body>
                                    <img src="../assets/images/success.png" style="margin-bottom:40px;" />
                                    <el-button type="primary" plain style="position:absolute;right:44%;bottom:5%;" @click="viewData">查看数据集</el-button>
                                </el-dialog>
                            <el-form :model="form">
                                <el-form-item label="数据集名称：" :label-width="formLabelWidth">
                                    <el-input v-model="form.region" placeholder="输入数据集名称" style="width:200px;"></el-input>
                                </el-form-item>
                                <el-form-item label="数据集描述：" :label-width="formLabelWidth">
                                    <el-input type="textarea" v-model="form.desc" placeholder="请输入描述内容" ></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="addData">确定创建</el-button>
                            </div>
                        </el-dialog>
                        <el-button type="primary" plain style="margin-left:10px;" @click="goSearchDetail">检索结果</el-button>
                </div>
            </div>
            <div id="viewTable" class="view">
                 <el-table
                  :header-row-style="{height:'40px',padding:'0'}" 
                  :header-cell-style="{padding:'1px'}"
                  :cell-style="{padding:'1px'}"
                    ref="multipleTable"
                    :data="tableData"
                    border
                    highlight-current-row 
                    style="width:100;font-size: 14px;"
                    @selection-change="handleSelectionChange"
                    :row-class-name="tableRowClassName"
                    :default-sort="{prop: 'ID', order: 'descending'}">
                    <!-- <el-table-column prop="select" type="selection" width="60" height="60" align="center">
                         <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.checked" @change="getdata(scope.row)"></el-checkbox> 
                        </template> 
                    </el-table-column> -->
                    <el-table-column 
                     prop="id" label="ID" width="100" height="80" align="center" sortable>
                    </el-table-column>
                    <el-table-column  prop="name" label="姓名" width="100" height="60" align="center">
                          <template slot-scope="scope">
                            <p v-html="scope.row.name"></p>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column :formatter="common.formatDate" prop="birthDate" label="出生日期" width="110" height="60" align="center" sortable>
                    </el-table-column> -->
                    <el-table-column prop="age" label="年龄" width="80" height="60" align="center" sortable>
                        <template slot-scope="scope">
                            <p v-html="scope.row.age"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sex"  v-if='checkedGender==true' label="性别" width="80" height="60" align="center">
                        <template slot-scope="scope">
                            <p v-html="scope.row.sex"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="qutpatient" v-if="Outpatientdiagnosis==true" label="门诊诊断" width="120" height="120" align="center">
                         <template slot-scope="scope">
                            <p v-html="reg(scope.row.qutpatient)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openQutpatient(scope.row.qutpatient)">
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="admission" v-if="Admissiondiagnosis==true" label="入院诊断" width="120" height="120" align="center">
                        <template slot-scope="scope">
                            <p v-html="reg(scope.row.admission)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openAdmission(scope.row.admission)">
                            </p>
                        </template> 
                    </el-table-column> 
                    <el-table-column prop="discharge" v-if="Dischargediagnosis==true " label="出院诊断" width="120" height="120" align="center">
                        <template  slot-scope="scope">
                            <p v-html="reg(scope.row.discharge)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openDischarge(scope.row.discharge)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="departments" v-if="VisitingDepartment==true" label="就诊科室" width="120" align="center">
                        <template  slot-scope="scope">
                            <p v-html="reg(scope.row.departments)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openDepartments(scope.row.departments)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="present" v-if="HistoryofPresentIllness==true"  label="现病史" width="120" align="center">
                        <template slot-scope="scope">
                            <p v-html="reg(scope.row.present)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openPresent(scope.row.present)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="past" v-if="Pasthistory==true" label="既往史" width="120" align="center">
                        <template slot-scope="scope">
                            <p v-html="reg(scope.row.past)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openPast(scope.row.past)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="family" v-if="familyhistory==true" label="家族史" width="120" align="center">
                        <template slot-scope="scope">
                            <p v-html="reg(scope.row.family)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openFamily(scope.row.family)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="treatment" v-if="Treatmentprocess==true" label="治疗经过" width="120" align="center">
                        <template slot-scope="scope">
                            <p v-html="reg(scope.row.treatment)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openTreatment(scope.row.treatment)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="inspect" v-if="Inspectionitems==true" label="检查项目" width="100" align="center">
                        <template slot-scope="scope">
                            <p v-html="scope.row.inspect"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="CheckValue" v-if="Checkvalue1==true" label="检查值" width="100" align="center">
                        <template slot-scope="scope">
                            <p v-html="scope.row.CheckValue"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="CheckTime" v-if="Inspectiontime==true" label="检查时间" width="120" align="center">
                          <template slot-scope="scope">
                            <p v-html="reg(scope.row.CheckTime)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openCheckTime(scope.row.CheckTime)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="hospital" v-if="Visitinghospital==true" label="就诊医院" width="120" align="center">
                        <template slot-scope="scope">
                            <p v-html="reg(scope.row.hospital)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openHospital(scope.row.hospital)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" label="入/出院时间" width="120" align="center">
                        <template slot-scope="scope">
                            <p v-html="reg(scope.row.time)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openTime(scope.row.time)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="80" align="center">
                          <template slot-scope="scope">
                            <el-button style="border:0px;" type="text" size="small" @click="getDetails(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
            <el-pagination 
                    @current-change="handleCurrentChange" 
                    :current-page="currentPage" 
                    :page-sizes="pageSizes" 
                    :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                    :total="totalCount"
                    style='padding-left:20%;'>
              </el-pagination>
    <el-dialog :visible-sync="getA">
         <my-component :rowaa=row></my-component>
         <!-- {{this.row}} -->
    </el-dialog>
    </div>
</template>

<script>
export default {
    name:'searchResult',
    data() {
      return {
          checkedGender:true,
          Outpatientdiagnosis:true,
          Dischargediagnosis:true,
          Admissiondiagnosis:true,
          VisitingDepartment:true,
          HistoryofPresentIllness:true,
          Pasthistory:true,
          familyhistory:true,
          Treatmentprocess:true,
          Inspectionitems:true,
          Checkvalue1:true,
          Inspectiontime:true,
          Visitinghospital:true,
        dialogTableVisible: false,
        datalist:false,
        gridData:[],//已有数据集
        keywords:'',
        initArr:[],
        multipleSelection: [],
        currentData:[],
        SearchData:[],
        tableData: [],
        index: 1,
        size: 10,
        checkList:[],
        dialogFormVisible: false,
        innerVisible:false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        ids:[],
        formLabelWidth: '120px',
        visible: false,
        getA : false,
        row : '',
        value:'',
        dataId:'',
        value1:'',
        // 总数据
        tableData2:[],
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:0,
        // 个数选择器（可修改）
        pageSizes:[10],
        // 默认每页显示的条数（可修改）
        PageSize:10,
      }
    },
     methods: {
         // 返回上一层
         qwjsback(){
              this.$router.go(-1);
         },
        search(){
            this.$route.query.value = this.value;
            if(this.value == ''){
                 this.$message({
                    message: '请输入搜索值',
                    type: 'warning',
                    duration:1000
                });
                return
            }
            this.initArr.length = 0;   //先清空表格
            this.initArr = this.value.replace(new RegExp("<", "g"), ",").replace(new RegExp(">", "g"), ",").replace(new RegExp("=", "g"), ",").replace(new RegExp("and", "g"), ",").replace(new RegExp("or", "g"), ",").split(",");  //正则过滤一下 搜索值

            const loading = this.$loading({
              lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.tableData.length= 0;
            axios({
                url:'api/search/ptsearch',
                method:'post',
                data:{
                    page:1,
                    querystring:this.value,
                    filters:[]
                },
            }).then(res => {
                this.totalCount = res.data.count;
                localStorage.setItem('count',JSON.stringify(res.data.count))
                localStorage.setItem("searchresult",JSON.stringify(res.data))
                // this.display(res.data.results)
                loading.close();
                let arr = res.data.results
                for(var i=0;i<arr.length;i++){
                this.tableData.push({
                    id:arr[i].hzjbxx.id,
                    name:this.transferName(arr[i].hzjbxx.name),
                    // birthDate:arr[i].zybasy.data,
                    age:arr[i].hzjbxx.age,
                    sex:arr[i].hzjbxx.sex,
                    qutpatient:arr[i].zybasy.mjzzdmc,
                    admission:arr[i].ryjl.xbs,
                    discharge:arr[i].cyxj.cyszz,
                    departments:arr[i].ryjl.ksmc,
                    present:arr[i].ryjl.zkqk,
                    past:arr[i].jbjkxx.rbs,
                    family:arr[i].jbjkxx.jzs,
                    treatment:arr[i].cyxj.zlgcms,
                    inspect:'血红蛋白',
                    CheckValue:'80 0.8',
                    CheckTime:'2016.03',
                    hospital:arr[i].zybasy.yymc,
                    time:'2016.03.11/2016.03.17',
                })
        }

            }).catch(()=>{
                loading.close();
            })
        },
        //点击生成弹出框
        openQutpatient(a) {
            this.$alert(`${a}`, "门诊诊断",{ dangerouslyUseHTMLString: true});
        },
        openAdmission(a) {
            this.$alert(`${a}`, "入院诊断",{ dangerouslyUseHTMLString: true});
        },
        openDischarge(a) {
            this.$alert(`${a}`, "出院诊断",{ dangerouslyUseHTMLString: true});
        },
        openDepartments(a) {
            this.$alert(`${a}`, "就诊科室",{ dangerouslyUseHTMLString: true});
        },
        openPresent(a) {
            this.$alert(`${a}`, "现病史",{ dangerouslyUseHTMLString: true});
        },
        openPast(a) {
            this.$alert(`${a}`, "既往史",{ dangerouslyUseHTMLString: true});
        },
        openFamily(a){
             this.$alert(`${a}`, "家族史",{ dangerouslyUseHTMLString: true});
        },
        openTreatment(a){
             this.$alert(`${a}`, "治疗经过",{ dangerouslyUseHTMLString: true});
        },
        openCheckTime(a){
             this.$alert(`${a}`, "检查时间",{ dangerouslyUseHTMLString: true});
        },
        openHospital(a){
             this.$alert(`${a}`, "就诊医院",{ dangerouslyUseHTMLString: true});
        },
        openTime(a){
             this.$alert(`${a}`, "入/出院时间",{ dangerouslyUseHTMLString: true});
        },
    //隔行变色
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      //后台分页的方法
        getPage(page){
            
            axios({
                url:'api/search/ptsearch',
                method:'post',
                data:{
                    page:page,
                    querystring:this.$route.query.value,
                    filters:[]
                },
            }).then(res => {
                // 将数据赋值给tableData
                    localStorage.setItem('searchresult',JSON.stringify(res.data))
                    this.tableData2 = res.data.results;
                    this.tableData.length = 0; 
                    this.display(this.tableData2)
            })
        },
        // 分页
        //显示第几页
        handleCurrentChange(val) {
            // 改变默认的页数
            this.currentPage=val
            // 切换页码时，要获取每页显示的条数
            this.getPage(val)
        },   
        //查看所有数据集
        seeAllCollection(){
                 const loading = this.$loading({
                    lock: true,
                    text: '加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                axios({
                    url:'api/data/getdata',
                    method:'get'
                }).then(res => {
                    this.gridData = res.data;
                    this.dialogTableVisible = true;
                    loading.close();
                })
        },
        //在查看已有数据集弹框点击查看进入数据集页面
        checkCollection(row){
            sessionStorage.setItem("lookData",JSON.stringify(row.esId))

            sessionStorage.setItem("index",1)
            sessionStorage.setItem("desc",row.date_desc)  //存一下数据集描述
            sessionStorage.setItem("region",row.data_Name) //存一下数据集名称

            this.$router.push({name:'lookData',params:{desc:row.date_desc,region:row.data_Name,esId:row.esId,dataId:row.dataId,index:1}})
        },
        deleteCollection(index, row){
                axios({
                    url:'api/data/deleteUser',
                    method:'get',
                    params:{dataId:row.dataId}
                }).then(res => {
                    if(res.data == "删除成功"){
                          this.seeAllCollection();
                    }
                })
        },
        open2() {
          this.$alert('<div class="div1"><label>数据集名称:</label>  <select><option>选择数据集</option><option>选择数据集</option> <option>选择数据集</option><option>选择数据集</option><option>选择数据集</option></select> </div>', '添加数据集', {
          dangerouslyUseHTMLString: true
        });
      },
      //渲染页面
      display(SearchData){
          for(var i=0;i<SearchData.length;i++){
                this.tableData.push({
                    // number:i+1,
                    id:SearchData[i].hzjbxx.id,
                    // name:this.transferName(SearchData[i].hzjbxx.name),
                    name:SearchData[i].hzjbxx.name,
                    age:SearchData[i].hzjbxx.age,
                    sex:SearchData[i].hzjbxx.sex,
                    qutpatient:SearchData[i].zybasy.mjzzdmc,
                    admission:SearchData[i].cyxj.ryqk,
                    discharge:SearchData[i].cyxj.cyszz,
                    departments:SearchData[i].ryjl.ksmc,
                    present:SearchData[i].ryjl.zkqk,
                    past:SearchData[i].jbjkxx.rbs,
                    family:SearchData[i].jbjkxx.jzs,
                    treatment:SearchData[i].cyxj.zlgcms,
                    inspect:'血常规',
                    CheckValue:'80 0.8',
                    CheckTime:'2016.03.11',
                    hospital:SearchData[i].zybasy.yymc,
                    time:'2016.03.11/2016.03.17',
                })
        }
      },
      //勾选时拿数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
             this.currentData = this.multipleSelection;
        },
        //创建数据集
        addData(){
            if(this.currentData.length<1){
                this.$alert('请选择需要添加的数据集，数据集不能为空', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        // this.$message({
                        //     type: 'info',
                        //     message: `action: ${ action }`
                        // });
                    }
                });
                return
            }
            for(let i=0;i<this.currentData.length;i++){
                    this.ids.push(this.currentData[i].id)
            }  
            axios({
                url:'api/data/adddata',
                method:'post',
                data:{"dataDescribe":this.form.desc,"dataName":this.form.region,ids:this.ids}
            }).then(res => {
                this.dataId = res.data.id;
                if(res.status == 200){
                        this.innerVisible = true;
                }
            })
        },
        //创建数据集后，查看数据集
        viewData(){
            sessionStorage.setItem("desc",this.form.desc)  //存一下数据集描述
            sessionStorage.setItem("region",this.form.region) //存一下数据集名称
            this.$router.push({name:'lookData',params:{desc:this.form.desc,region:this.form.region,data:this.currentData,dataId:this.dataId,index:0}})
             sessionStorage.setItem("lookData",JSON.stringify(this.currentData))
             sessionStorage.setItem("index",0)
        },
        //匹配搜索关键字
        reg(str){
            let newstr = '';
            str = str == null? '' : str;
          for(let i=0;i<this.initArr.length;i++){
              if(str.indexOf(`<span style='color:red'>${this.initArr[i]}</span>`) == -1){
                     newstr = str;
              }else{
                  newstr = str.replace(str.slice(0, str.indexOf(`<span style='color:red'>${this.initArr[i]}</span>`)-2), "...")
              }
          }
            return newstr
        },
        //对姓名加密处理
        transferName(str){
            var reg = /(?<=.)./g;
            return str.replace(reg,'*')
        },
        //点击查看详情
        getDetails(row) {
          this.$router.push({name:'reportDetails',params:{aid:row.id,name:'searchResult'}})
      },
      //点击检索结果
      goSearchDetail(){
          this.$router.push({path:'/searchDetail'})
      },
    },
    computed:{

    },
    watch: {
        '$route': function(to, from) {
        }
    },
    created(){
            this.totalCount = JSON.parse(localStorage.getItem("count"));
        //初始化数据
        if(this.$route.query.name == 'retrieval'){
            this.initArr = this.$route.query.value.replace(new RegExp("<", "g"), ",").replace(new RegExp(">", "g"), ",").replace(new RegExp("=", "g"), ",").replace(new RegExp("and", "g"), ",").replace(new RegExp("or", "g"), ",").split(",");
            let SearchData = JSON.parse(localStorage.getItem("searchresult")).results
            this.display(SearchData);
        }

        if(this.$route.query.name == 'advanced'){
            this.initArr = this.$route.query.value;
            let SearchData = JSON.parse(localStorage.getItem("searchresult")).results
            this.display(SearchData);
        }
    },
    // mounted(){

    // }
}
</script>
<style scoped src="../assets/css/search-result.css"></style>
<style scoped src="../assets/css/top.css"></style>
<style scoped src="../assets/css/layer.css"></style>
<style scoped src="../assets/css/perfect-scrollbar.css"></style>
<style lang="scss" scoped>
.result-left{

.DisplayFieldClass{
    text-indent:5px;
    outline:none;
    width:150px;
    line-height: 40px;
    height:40px;
    border-radius:4px;
    border: 1px solid #D8D8D8;
    margin-left:0;

}
&:hover{
    position: relative;
    .mockselectclass{
        display: block;
        z-index: 99999999999;
        background:white;
        padding-left:5px; 
        width:150px;
        position: absolute;
          div{
        text-align: left
    }
    }
}
.mockselectclass{
    display: none;
    div{
        text-align: left
    }
}
}

</style>
<style >
#dialog .el-dialog--center .el-dialog__body {
    text-align: center!important;
}
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-input__inner ::-webkit-input-placeholder {
        color: #000;
  }

.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
}

</style>