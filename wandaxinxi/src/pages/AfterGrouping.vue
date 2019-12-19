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
                        <span><label>数据集名称：</label><a>数据集TEXTI</a></span>
                        <span><label>数据集说明：</label><a>长宁区糖尿病患者</a></span>
                    </div>
                    <div class="result-center">
                        <a id="remove-font">
                            <img src="../assets/images/look-data1.png"/>
                            <label>去重</label>
                        </a>
                        <a id="fil-font">
                            <img src="../assets/images/look-data2.png"/>
                            <label>筛选</label>
                        </a>
                        <a id="sort-font">
                            <img src="../assets/images/look-data3.png"/>
                            <label>排序</label>
                        </a>
                        <a id="group-font-1" @click="cancelRandomGroup">
                            <img src="../assets/images/look-data4.png"/>
                            <label>取消当前分组</label>
                            <p style="display:none;">
                                <select>
                                    <option>分组类型</option>
                                    <option>条件分组</option>
                                    <option>随机分组</option>
                                    <option>匹配分组</option>
                                </select>
                            </p>
                        </a>
                    </div>
                    <div class="result-right">
                        <a class="a1">
                            <img src="../assets/images/look-data5.png"/>
                            <label>导出申请</label>
                        </a>
                        <a class="a2">
                            <img src="../assets/images/look-data6.png"/>
                            <label>添加至科研项目</label>
                        </a>
                        <a class="a3">
                            <img src="../assets/images/look-data7.png"/>
                            <label>使用数据集</label>
                        </a>
                    </div>
                </div>
                <el-table
                        :header-row-style="{height:'40px',padding:'0'}"
                        :header-cell-style="{padding:'1px'}"
                        :cell-style="{padding:'1px'}"
                        :data="tableData"
                        border
                        :fit="true"
                        style="width: 100%">
                    <el-table-column
                            align='center'
                            prop="group"
                            label="别组"
                           >
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="name"
                            label="姓名"
                            >
                    </el-table-column>
                    <!-- <el-table-column
                            :formatter="common.formatDate"
                            align='center'
                            prop="date"
                            label="出生日期"
                            width="100">
                    </el-table-column> -->
                    <el-table-column
                            align='center'
                            prop="age"
                            label="年龄"
                            >
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="sex"
                            label="性别"
                            >
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="zzd"
                            label="主诊断"
                            >
                        <template slot-scope="scope">
                            <p v-html="transferData(scope.row.zzd)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openzzd(scope.row.zzd)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="jzks"
                            label="就诊科室"
                            >
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="zyzz"
                            label="主要症状"
                            >
                        <template slot-scope="scope">
                            <p v-html="scope.row.zyzz" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openzyzz(scope.row.zyzz)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="jws"
                            label="既往史"
                            >
                        <template slot-scope="scope">
                            <p v-html="scope.row.jws" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openjws(scope.row.jws)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="jzs"
                            label="家族史"
                            >
                        <template slot-scope="scope">
                            <p v-html="transferData(scope.row.jzs)" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openjzs(scope.row.jzs)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="sysjc"
                            label="实验室检查"
                            >
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="yxjc"
                            label="影像检查"
                            >
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="zlfa"
                            label="治疗方案(含手术)"
                            width="150"
                            >
                        <template slot-scope="scope">
                            <p v-html="scope.row.zlfa" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openzlfa(scope.row.zlfa)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="jzyy"
                            label="就诊医院"
                          >
                        <template slot-scope="scope">
                            <p v-html="scope.row.jzyy" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openjzyy(scope.row.jzyy)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="rysj"
                            label="入院时间/出院时间"
                           >
                        <template slot-scope="scope">
                            <p v-html="scope.row.rysj" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer;" @click="openrysj(scope.row.rysj)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作"
                            >
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" style="border:0px;" type="text" size="small">查看</el-button>
                            <!-- <el-button type="text" size="small">编辑</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name:"aftergrouping",
        data(){
            return{
                tableData:[],
                groupData:[],
            }
        },
        methods:{
            openzzd(a) {
                this.$alert(`${a}`, "主诊断",{ dangerouslyUseHTMLString: true});
            },
            openzyzz(a) {
                this.$alert(`${a}`, "主要症状",{ dangerouslyUseHTMLString: true});
            },
            openjws(a){
                this.$alert(`${a}`, "既往史",{ dangerouslyUseHTMLString: true});
            },
            openjzs(a){
                this.$alert(`${a}`, "家族史",{ dangerouslyUseHTMLString: true});
            },
            openzlfa(a){
                this.$alert(`${a}`, "治疗方案",{ dangerouslyUseHTMLString: true});
            },
            openjzyy(a){
                this.$alert(`${a}`, "就诊医院",{ dangerouslyUseHTMLString: true});
            },
            openrysj(a){
                this.$alert(`${a}`, "入/出院时间",{ dangerouslyUseHTMLString: true});
            },
            //如果数据为null转为"无"
            transferData(str){
                if(str == null){
                    return str = "无";
                }else{
                    return str;
                }
            },
            //随机分组页面里点击查看
            handleClick(row){
                console.log(row)
            },
            //取消当前分组
            cancelRandomGroup(){

            },
            getData(){
                //新修改
                var that = this
                axios({
                    url:'api/data/randomgroup',
                    method:'post',
                    data:{
                        //  "dataName": this.$route.query.region,
                        "dataId":this.$route.query.dataId,
                        "groupName":this.$route.query.groupName,
                        "str": this.$route.query.str
                    }
                }).then(res => {
                    let groupData = res.data;
                    // this.$router.push({path:'/aftergrouping',query:{name:'lookData',groupData:groupData,dataId:this.$route.query.dataId}})
                    groupData.map((item1,index,arr)=>{

                        that.groupData.push(item1.emrCases)
                        item1.emrCases.map(item2=>{
                            item2.name = item1.groupName
                        })
                    })
                    this.groupData.flat(Infinity).map((val,index,arr)=>{
                        this.tableData.push({
                            group:val.name,
                            name:val.hzjbxx.name,
                            // date:val.hzjbxx.datatime,
                            age:val.hzjbxx.age,
                            sex: val.hzjbxx.sex,
                            zzd: val.ryjl.xbs,
                            jzks: val.ryjl.ksmc,
                            zyzz: val.zybasy.zyzdmc,
                            jws: val.ryjl.zs,
                            jzs: val.jbjkxx.jzs,
                            sysjc: "血红蛋白",
                            yxjc: "无",
                            zlfa: val.cyxj.zlgcms,
                            jzyy: val.zybasy.yymc,
                            rysj: '2016.03.11/2016.03.17',
                        })
                    })

            
                })
            }
        },
        mounted(){
            console.log(this.$route.query.groupData)
        },
        created(){
            var that = this
            
            this.getData()
    
            
        }
    }
</script>

<style scoped src="../assets/css/search-result.css"></style>
<style scoped src="../assets/css/top.css"></style>
<style scoped src="../assets/css/layer.css"></style>
<style scoped src="../assets/css/perfect-scrollbar.css"></style>
<style scoped src="../assets/css/look-data.css"></style>