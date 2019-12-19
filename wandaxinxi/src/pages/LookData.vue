<template>
    <section>
    <div class="header-box">
        <div class="header-title" style="cursor:pointer;" @click="()=>{this.$router.push('/main')}"></div>
        <div class="header-name">
            <a>王医生，欢迎您！</a>
            <span></span>
        </div>
    </div>
    <div class="main">
        <div class="main-bottom">
            <div class="search-result">
                <div class="result-left">
                    <span><label>数据集名称：</label><a ref="dataName">{{this.dataCollectName}}</a></span>
                    <span><label>数据集说明：</label><a>{{this.dataCollectDesc}}</a></span>
                </div>
                <div class="result-center">
                    <a id="remove-font"  @click="noRepeat">
                        <img src="../assets/images/look-data1.png" />
                        <label>去重</label>
                    </a>
                    <a id="fil-font" @click="shaixuan">
                        <img src="../assets/images/look-data2.png" />
                        <label>筛选</label>
                    </a>
                    <a id="sort-font">
                        <img src="../assets/images/look-data3.png" />
                        <label>排序</label>
                    </a>
                    <a 
                        id="group-font" @click="eject">
                        <img src="../assets/images/look-data4.png" />
                        <label>分组</label>
                        <p 
                            v-show = 'fenzu' 
                            id="fenzu">
                            <el-select v-model="value" placeholder="分组类型" @change="select">
                            <!-- <option >分组类型</option> -->
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>

                        </p>
                    </a>
                </div>
                <div class="result-right">
                    <a @click="checkGroup" style="width:78px;height:28px;background:#529AFB;line-height:28px;">查看当前分组</a>
                    <a class="a1" @click="exportExcel">
                        <img src="../assets/images/look-data5.png" />
                        <label>导出申请</label>
                    </a>
                    <a class="a2">
                        <img src="../assets/images/look-data6.png" />
                        <label>添加至科研项目</label>
                    </a>
                    <a class="a3">
                        <img src="../assets/images/look-data7.png" />
                        <label>使用数据集</label>
                    </a>
                </div>
            </div>
        </div>
       <el-table
            id='exportTab'
            :header-row-style="{height:'40px',padding:'0'}" 
            :header-cell-style="{padding:'1px'}"
            :cell-style="{padding:'1px'}"
            :data="tableData"
            :fit="true"
            border
            style="width: 100%">
                <el-table-column 
                        prop="id" label="ID" width="100" height="60" align="center" sortable>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="姓名"
                        >
                </el-table-column>
                <!-- <el-table-column
                        align="center"
                        :formatter="common.formatDate"
                        prop="date"
                        label="出生日期"
                        width="110"
                        sortable>
                </el-table-column> -->
                <el-table-column
                        align="center"
                        prop="age"
                        label="年龄"
                      
                        sortable>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="sex"
                        label="性别"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="zzd"
                        label="主诊断"
                        >
                        <template slot-scope="scope">
                                    <p v-html="scope.row.zzd" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openzzd(scope.row.zzd)"></p>
                        </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="jzks"
                        label="就诊科室"
                        >
                        <template slot-scope="scope">
                                    <p v-html="scope.row.jzks" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;"></p>
                        </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="zyzz"
                        label="主要症状"
                       >
                        <template slot-scope="scope">
                                    <p v-html="scope.row.zyzz" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openzyzz(scope.row.zyzz)"></p>
                        </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="jws"
                        label="既往史"
                        >
                        <template slot-scope="scope">
                                    <p v-html="scope.row.jws" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openjws(scope.row.jws)"></p>
                        </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="jzs"
                        label="家族史"
                      >
                        <template slot-scope="scope">
                                    <p v-html="scope.row.jzs" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openjzs(scope.row.jzs)"></p>
                        </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="sysjc"
                        label="实验室检查"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="yxjc"
                        label="影像检查"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="zlfa"
                        label="治疗方案(含手术)"
                        width="150"
                       >
                        <template slot-scope="scope">
                                    <p v-html="scope.row.zlfa" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openzlfa(scope.row.zlfa)"></p>
                        </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="jzyy"
                        label="就诊医院"
                     >
                        <template slot-scope="scope">
                                    <p v-html="scope.row.jzyy" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openjzyy(scope.row.jzyy)"></p>
                        </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="rysj"
                        label="入/出院时间"
                        >
                        <template slot-scope="scope">
                                    <p v-html="scope.row.rysj" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openrysj(scope.row.rysj)"></p>
                        </template>
                </el-table-column>
        <el-table-column
                fixed='right'
                align="center"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="checkdCollect(scope.row)" style="border:0px;" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
            <div class="con-grouping alert-box1" v-show="alertbox">
                <div class="alert-header">参数设置<img @click="close" class="close-img" src="../assets/images/close-img.png" /></div>
                <div class="alert-body">
                    <div class="div1"><i style="font-style:normal;margin-right:10px;">组别名称</i>　<span>|　点击“+”、“-” 可添加或删除组别 </span></div>
                    <div class="div2">
                        <div class="div-cloud">
                            <div id="scroll-con">
                                <ul style="position:relative;">
                                    <span style="width:90px;height:29px;position:absolute;right:100px;top:5px;">
                                        <img @click="add" src="../assets/images/grouping-img2.png" style="width:29px;height:29px;"/>
                                        <img @click="cut" class="con-img" src="../assets/images/grouping-img3.png" style="width:29px;height:29px;margin-left:23px;">
                                    </span>
                                    <!-- <li>
                                        <label>组一：</label>
                                        <input type="" placeholder="请命名" />
                                    </li>
                                    <li>
                                        <label>组二：</label>
                                        <input type="" placeholder="请命名"/>
                                    </li> -->
                                    <li
                                        v-for="(item,index) of defaultGroup"
                                        :key = "index"
                                        
                                    >
                                        <label>{{item.name}}：</label>
                                        <input ref="groupName" type="" placeholder="请命名"/>
                                    </li>
                            </ul>
                            </div>
                            <div class="con-ratio">
                                    <span>组间数据比例</span>
                                    <p style="width:100%;text-indent:27px;">
                                        <input type="text" v-model="rate1" />&nbsp;&nbsp;:&nbsp;&nbsp;<input type="text" v-model="rate2" />
                                        <span 
                                        style="width:200px;text-indent:10px;display:inline;"
                                          v-for="(item,index) in arr"
                                          :key = "index"
                                        >&nbsp;&nbsp;{{item.colon}}&nbsp;&nbsp;<input ref="groupRate" type="text"/></span>
                                    </p>
                                    <div>是否打乱数据顺序？　　是 <i class="i-selected"></i>　否 <i class="i-selected"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="div3">
                        <button class="btn1" @click="submit">确　定</button>
                    </div>
                </div>
            </div>
            <!-- 筛选弹出框 -->
            <div class="alert-box2" v-show="alertbox2">
                <div class="div1">筛 选<img @click="closeSX" class="close-img" src="../assets/images/close-img.png" /></div>
                <div class="div2">
                    <div class="div2-1">
                        <label>内容筛选:</label>
                        <p>
                            <input type="text" v-model="query" placeholder="请输入搜索字段" />
                            <img @click="searchQuery" src="../assets/images/search-gray.png" style="cursor:pointer;"/>
                        </p>
                    </div>
                    <div class="div2-2">
                        <div class="div-change">
                            <div class="div-change1">
                                <p ref="searchContent"></p>
                                <div id="scollbar-fil1">
                                    <ul>
                                        <!-- <li class="list-1"><i></i><span>男生</span><label>(60例)</label></li>
                                        <li><i></i><span>女生</span><label>(66例)</label></li> -->

                                        <el-checkbox 
                                            style="display:block;margin-bottom:5px;"
                                            ref="checkbox"
                                            v-for="(item,index) of optionArr" 
                                            :key = index
                                            @change="checkedOption(item,index)"
                                            >{{item.name}}:({{item.num}}例)</el-checkbox>
                                        
                                    </ul>
                                </div>
                            </div>
                            <div class="div-change1" style="display: none">
                                <p>主诊所</p>
                                <div id="scollbar-fil2">
                                    <ul>
                                        <li class="list-1"><i></i><span>2型糖尿病+高甘油三脂血症</span><label>(60例)</label></li>
                                        <li><i></i><span>2型糖尿病+高血压病</span><label>(66例)</label></li>
                                        <li><i></i><span>2型糖尿病+高甘油三脂血症</span><label>(66例)</label></li>
                                        <li><i></i><span>2型糖尿病</span><label>(66例)</label></li>
                                        <li><i></i><span>2型糖尿病+高血压病</span><label>(66例)</label></li>
                                        <li><i></i><span>2型糖尿病</span><label>(66例)</label></li>
                                        <li><i></i><span>2型糖尿病+高血压病</span><label>(66例)</label></li>
                                        <li><i></i><span>2型糖尿病</span><label>(66例)</label></li>
                                        <li><i></i><span>2型糖尿病+高血压病</span><label>(66例)</label></li>
                                        <li><i></i><span>2型糖尿病</span><label>(66例)</label></li>
                                        <li><i></i><span>2型糖尿病+高血压病</span><label>(66例)</label></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div3">
                    <button id="fil-btn1" @click="closeSX" class="btn1">取 消</button>
                    <button class="btn2" @click="startShaixuan">确 定</button>
                </div>
            </div>
    </div>
    <div id="delete" class="delete" v-show="alertbox3" >
        <div class="alert-header">去重<img @click="closeQC" class="close-img" src="../assets/images/close-img.png" /></div>
        <div class="delete-bottom">
            <div class="bottom-cloud">
                <div class="font-bottom">请选择一个或者多个包含重复项的列</div>
                <div class="select-bottom">
                    <ul>
                        <li class="li-1 li-1-1">列名</li>
                        <div id="scollbar">
                            <div>
                                <!-- <li class="li-1">
                                    <i></i>
                                    <span>全部</span>
                                </li> -->
                              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                        <div style="margin: 15px 0;"></div>
                                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <li class="li-last">
                            找到<label class="la-1"> 123 </label>条重复项，删除后将保留<label class="la-2"> 456 </label>条唯一项
                        </li>
                    </ul>
                </div>
                <div class="button-bottom">
                    <button id="btn1" @click="closeQC" class="btn1">取 消</button>
                    <button class="btn2" @click="deleteRepeat">删除重复项</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 弹框阴影 -->
    <div v-show="shadow" class="layui-layer-shade" id="layui-layer-shade62" times="62" style="z-index: 5; background-color: rgb(0, 0, 0); opacity: 0.3;top: 0;left: 0; width: 100%;height: 100%;position: fixed;"></div>
    </section>
</template>

<script>
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
//去重弹出框的选项
const noRepeatOptions  = ['姓名', '年龄', '主诊断','就诊科室'];
export default {
    name:'lookData',
    data() {
      return {
            fenzu:false,
            alertbox:false, //分组弹框
            alertbox2:false, //筛选弹框
            alertbox3:false, //去重弹框
            shadow:false,
            checkedAllSex: false,
            tableData: [],
            options: [{
            value: '条件分组',
            label: '条件分组'
            }, {
            value: '随机分组',
            label: '随机分组'
            }],
            value:'',
            rate1:'',
            rate2:'',
            defaultGroup:[{name:"组一",value:"请命名"},{name:"组二",value:"请命命名"}],
            checkedCities: [],
            arr:[],
            checkAll: false,
            cities: noRepeatOptions,
            isIndeterminate: true,
            dataId:null,
            query:'',
            optionArr:[],//专门用来放筛选的数组
            optionObj:[],//筛选后的对象

            ageArr:[],//年龄数组
            sexArr:[],//性别数组
            patientNameArr:[], //患者姓名去重数组
            zzdArr:[],   //主诊断去重数组
            jzksArr:[],  //就诊科室数组
            newLookData:[],
            esIdData:[],
            dataCollectName:'',//数据集名称
            dataCollectDesc:'',//数据集描述
            nameArr:[]
        }
    },
    watch:{
        query(val){
            if(val ==''){
                this.$refs.searchContent.innerHTML = val;
                this.optionArr = this.selectQuery([])
            }
        }
    },
    methods: {
      //在数据集里点击查看
      checkdCollect(row) {
        this.$router.push({name:'reportDetails',params:{aid:row.id,name:'lookData'}})
      },
      openzzd(a){
          this.$alert(`${a}`, "主诊断",{ dangerouslyUseHTMLString: true});
      },
      openzyzz(a){
          this.$alert(`${a}`, "主要症状",{ dangerouslyUseHTMLString: true});
      },
      openjws(a) {
            this.$alert(`${a}`, "既往史",{ dangerouslyUseHTMLString: true});
        },
      openjzs(a) {
            this.$alert(`${a}`, "家族史",{ dangerouslyUseHTMLString: true});
        },
      openzlfa(a) {
            this.$alert(`${a}`, "治疗方案",{ dangerouslyUseHTMLString: true});
        },
      openjzyy(a){
            this.$alert(`${a}`, "就诊医院",{ dangerouslyUseHTMLString: true});
     },
      openrysj(a){
            this.$alert(`${a}`, "入/出院时间",{ dangerouslyUseHTMLString: true});
     },
     //对姓名加密处理
    transferName(str){
        var reg = /(?<=.)./g;
        return str.replace(reg,'*')
    },
      eject(){
        // document.querySelector("#fenzu").style.display = "block"
        this.fenzu = !this.fenzu
     },
     select(value){
        if(this.value == "随机分组"){
            this.alertbox = true;
            this.shadow = true;
        }
        if(this.value == "条件分组"){
                // this.$router.push({path:'./conditionGrouping',query:{name:'lookData',data:this.$refs.dataName.innerHTML,dataId:this.dataId}})
                this.$router.push({name:'conditionGrouping',params:{data:this.$refs.dataName.innerHTML,dataId:this.dataId}})
        }
     },
     close(){
            this.alertbox = false;
            this.shadow = false;
     },
     closeSX(){
            this.alertbox2 = false;
            this.shadow = false;
     },
     closeQC(){
            this.alertbox3 = false;
            this.shadow = false;
     },
     add(){
        let groupObj = {name:`组${this.defaultGroup.length+1}`,value:''}
        this.defaultGroup.push(groupObj);

        let obj = {colon:":",value:1}
        this.arr.push(obj)
     },
     cut(){
        this.defaultGroup.length > 2 && this.defaultGroup.pop()
        this.arr.pop()
     },
     //确定随机分组
     submit(){
        let groupNameArr = [];
        this.$refs.groupName.map((item,index,arr)=>{
                groupNameArr.push(item.value)
        })
            let groupRateString = '';
        if(this.$refs.groupRate && this.$refs.groupRate.length > 0){
            let str = ''
            this.$refs.groupRate.map((item,index,arr)=>{
                    str = str + ':' + item.value;
            })
          groupRateString = groupRateString + this.rate1 + ':' + this.rate2 + str;
        }
        if(!this.$refs.groupRate || this.$refs.groupRate.length == 0){
          groupRateString = groupRateString + this.rate1 + ':' + this.rate2;
        }
        this.$router.push({path:'/aftergrouping',query:{name:'lookData','groupName':groupNameArr,'str':groupRateString,'dataId':this.$route.params.dataId}})

        
     },
     //筛选
     shaixuan(){
        this.alertbox2 = true;
        this.shadow = true;
     },
     //对输入的字段进行筛选判断
     searchQuery(){
        if(this.query == '性别'){
            // this.optionArr = this.sexArr
            this.$refs.searchContent.innerHTML = this.query;
            this.optionArr = this.selectQuery(this.sexArr)
        }
        if(this.query == '就诊科室'){
            this.$refs.searchContent.innerHTML = this.query;
            this.optionArr = this.selectQuery(this.jzksArr)
        }

     },
     //定义一个筛选方法
     selectQuery(arr){
        let obj = {};
        for (var i = 0; i < arr.length; i++) {
            if (obj[arr[i]]) {
                obj[arr[i]]++
            } else {
                obj[arr[i]] = 1
            }
        }
        
        let newArr = []
        for (let k in obj) {
                let json = {}
                json["name"] = k
                json["num"] = obj[k]
                json["index"] = 0
                newArr.push(json)
        }
        return newArr;
     },
     //判断点击的是哪个筛选出来的复选框
     checkedOption(val,i){
        let judgeIndex = sessionStorage.getItem("index")
        if(judgeIndex == 0){
             val.index = 1;
             if(val.index == 1 && this.query == '性别'){
                let lookData = JSON.parse(sessionStorage.getItem('lookData'))
                this.newLookData = lookData.filter(item => item.sex == val.name)
                sessionStorage.setItem("newLookData",JSON.stringify(this.newLookData))
                return;
            }
             if(this.$refs.checkbox[i].isChecked == true && this.query == '就诊科室'){
                 this.nameArr.push(val.name)
                // this.newLookData = this.esIdData.filter(item => item.ryjl.ksmc == val.name)
            }else if(this.$refs.checkbox[i].isChecked == false && this.query == '就诊科室'){
                this.nameArr.splice(i,1)
            }
                let lookData = JSON.parse(sessionStorage.getItem('lookData'))
                    this.newLookData = [];          
                this.nameArr.map(val =>{
                    // this.newLookData = this.esIdData.filter(item => item.ryjl.ksmc == val)
                        lookData.map(item => {
                            if(item.departments == val){
                                this.newLookData.push(item)
                            }
                        })
                })
                sessionStorage.setItem("newLookData",JSON.stringify(this.newLookData))
    
        }else if(judgeIndex == 1){
             val.index = 1;
             if(val.index == 1 && this.query == '性别'){
                this.newLookData = this.esIdData.filter(item => item.hzjbxx.sex == val.name)
                sessionStorage.setItem("newLookData",JSON.stringify(this.newLookData))
                return;
            }
             if(this.$refs.checkbox[i].isChecked == true && this.query == '就诊科室'){
                 this.nameArr.push(val.name)
                // this.newLookData = this.esIdData.filter(item => item.ryjl.ksmc == val.name)
            }else if(this.$refs.checkbox[i].isChecked == false && this.query == '就诊科室'){
                this.nameArr.splice(i,1)
            }
                    this.newLookData = [];          
                this.nameArr.map(val =>{
                    // this.newLookData = this.esIdData.filter(item => item.ryjl.ksmc == val)
                        this.esIdData.map(item => {
                            if(item.ryjl.ksmc == val){
                                this.newLookData.push(item)
                            }
                        })
                })
                sessionStorage.setItem("newLookData",JSON.stringify(this.newLookData))
    
        }    
     },

     //确定筛选
     startShaixuan(){
        this.closeSX()
        const loading = this.$loading({
                    lock: true,
                    text: '加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
        this.tableData.length = 0;
        let index = sessionStorage.getItem("index")
        switch(index){
            case '0':
            let queryData =  JSON.parse(sessionStorage.getItem('newLookData'));
                    for(let i=0;i<queryData.length;i++){
                               this.tableData.push({
                                   id:queryData[i].id,
                                   name:this.transferName(queryData[i].name),
                                //    date:queryData[i].birthDate,
                                   age: queryData[i].age,
                                   sex: queryData[i].sex,
                                   zzd: queryData[i].qutpatient,
                                   jzks: queryData[i].departments,
                                   zyzz: queryData[i].present,
                                   jws: queryData[i].past,
                                   jzs: queryData[i].family,
                                   sysjc: queryData[i].inspect,
                                   yxjc: "无",
                                   zlfa: queryData[i].treatment,
                                   jzyy: queryData[i].hospital,
                                   rysj: queryData[i].time,
                               })
                           }
                           loading.close();
                           break;
                           
                case "1" :
                let queryData1 =  JSON.parse(sessionStorage.getItem('newLookData'));
                for(let i=0;i<queryData1.length;i++){
                    this.tableData.push({
                        id:queryData1[i].hzjbxx.id,
                        name:queryData1[i].hzjbxx.name,
                        age:queryData1[i].hzjbxx.age,
                        sex: queryData1[i].hzjbxx.sex,
                        zzd: queryData1[i].zybasy.mjzzdmc,
                        jzks: queryData1[i].ryjl.ksmc,
                        zyzz: queryData1[i].ryjl.zkqk,
                        jws: queryData1[i].jbjkxx.rbs,
                        jzs: queryData1[i].jbjkxx.jzs,
                        sysjc:"血常规",
                        yxjc: "无",
                        zlfa: queryData1[i].cyxj.zlgcms,
                        jzyy: queryData1[i].zybasy.yymc,
                        rysj: "2016.03.11/2016.03.17",
                    })
                }
                loading.close();
                break;
        }

        },
     //去重
     noRepeat(){
        this.alertbox3 = true;
        this.shadow = true;
     },
     //去重弹出框的复选框
     handleCheckAllChange(val) {
        this.checkedCities = val ? noRepeatOptions : [];
        this.isIndeterminate = false;
      },
      //选择要去重的字段
      handleCheckedCitiesChange(value) {
          let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        for(let i=0;i<value.length;i++){
                value[i].indexOf('')
        }
        let newEaData = this.esDataRemoveRepeat(this.esIdData,value)
        sessionStorage.setItem("newLookData",JSON.stringify(newEaData))
    
      }, 
       //定义一个对json去重的方法
      esDataRemoveRepeat(x,valueArr){
        let result = [];
        for (let i = 0; i < x.length; i++) {
            let flag = true;
            let temp = x[i];
            for (let j = 0; j < result.length; j++) {
                // 普通数组 (temp === result[j])
                if(valueArr.indexOf('姓名') !== -1 && temp.hzjbxx.name === result[j].hzjbxx.name){
                        flag = false;
                        break;
                }
                if (valueArr.indexOf('年龄') !== -1 && temp.hzjbxx.age === result[j].hzjbxx.age) {
                    flag = false;
                    break;
                }
                if (valueArr.indexOf('主诊断') !== -1 && temp.zybasy.mjzzdmc === result[j].zybasy.mjzzdmc) {
                    flag = false;
                    break;
                }
                if(valueArr.indexOf('就诊科室') !== -1 && temp.ryjl.ksmc === result[j].ryjl.ksmc){
                    flag = false;
                    break;
                }
            }
            if (flag) {
                result.push(temp);
            }
        }
        return result;
      },
    //点击删除重复项
      deleteRepeat(){
            this.alertbox3 = false;
            this.shadow = false;
            this.startShaixuan();
      },   
      //查看此数据集分组
      checkGroup(){
             const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
            this.$router.push({name:'groupQuery',params:{dataId:this.dataId}});
            loading.close();
      },
     
      //导出表格
     exportExcel(){
         /* generate workbook object from table */
      let xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
      let wb = XLSX.utils.table_to_book(document.querySelector('#exportTab'), xlsxParam)

      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '数据集表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
        }
      }
      return wbout
     },
    },
    created(){
        this.dataId = this.$route.params.dataId;
        let index = sessionStorage.getItem("index")
        
        switch(index){
                case "0" :
                this.dataCollectName = sessionStorage.getItem('region')
                this.dataCollectDesc = sessionStorage.getItem('desc')

                let queryData = JSON.parse(sessionStorage.getItem('lookData'))
                for(let i=0;i<queryData.length;i++){
                    this.sexArr.push(queryData[i].sex) //性别组
                    this.jzksArr.push(queryData[i].departments) //就诊科室组
                    this.tableData.push({
                        id:queryData[i].id,
                        name:this.transferName(queryData[i].name),
                        // date:queryData[i].birthDate,
                        age: queryData[i].age,
                        sex: queryData[i].sex,
                        zzd: queryData[i].qutpatient,
                        jzks: queryData[i].departments,
                        zyzz: queryData[i].present,
                        jws: queryData[i].past,
                        jzs: queryData[i].family,
                        sysjc: queryData[i].inspect,
                        yxjc: "无",
                        zlfa: queryData[i].treatment,
                        jzyy: queryData[i].hospital,
                        rysj: queryData[i].time,
                    })
                }
                break;
                case "1" :
                this.dataCollectName = sessionStorage.getItem('region')
                this.dataCollectDesc = sessionStorage.getItem('desc')

                let esIdArr = JSON.parse(sessionStorage.getItem('lookData'))
                let idsArr = [];
                esIdArr.map(item => {
                    idsArr.push(item.es_id)
                })
                axios({
                    url:'api/data/getes',
                    method:'post',
                    data:idsArr
                }).then(res => {
                this.esIdData = res.data;
                
                for(let i=0;i<this.esIdData.length;i++){
                    this.patientNameArr.push(this.esIdData[i].hzjbxx.name) //患者姓名数组
                    this.ageArr.push(this.esIdData[i].hzjbxx.age) //年龄数组
                    this.sexArr.push(this.esIdData[i].hzjbxx.sex) //性别组
                    this.zzdArr.push(this.esIdData[i].zybasy.mjzzdmc) //主诊断数组
                    this.jzksArr.push(this.esIdData[i].ryjl.ksmc) //就诊科室组
                    this.tableData.push({
                        id:this.esIdData[i].hzjbxx.id,
                        name:this.transferName(this.esIdData[i].hzjbxx.name),
                        // date:this.esIdData[i].hzjbxx.datatime,
                        age: this.esIdData[i].hzjbxx.age,
                        sex: this.esIdData[i].hzjbxx.sex,
                        zzd:this.esIdData[i].zybasy.mjzzdmc,
                        jzks: this.esIdData[i].ryjl.ksmc,
                        zyzz: this.esIdData[i].ryjl.zkqk,
                        jws: this.esIdData[i].jbjkxx.rbs,
                        jzs: this.esIdData[i].jbjkxx.jzs,
                        sysjc:"血常规",
                        yxjc: "无",
                        zlfa: this.esIdData[i].cyxj.zlgcms,
                        jzyy: this.esIdData[i].zybasy.yymc,
                        rysj: "2016.03.11/2016.03.17",
                    })
                  }
                })
                break;
                case undefined :
        }
    },
    mounted(){
    },

}
</script>

<style scoped src="../assets/css/search-result.css"></style>
<style scoped src="../assets/css/top.css"></style>
<style scoped src="../assets/css/layer.css"></style>
<style scoped src="../assets/css/perfect-scrollbar.css"></style>
<style scoped src="../assets/css/look-data.css"></style>
<style scoped>
/* #el-popover-204{height:200px;} */

</style>