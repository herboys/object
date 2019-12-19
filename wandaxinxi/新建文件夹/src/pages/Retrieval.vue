<template>
    <div class="retrieval">
        <!-- <LeftNav></LeftNav> -->
         <div class="header-box">
            <div class="header-main">
                <div id="parallax">
                    <div class="layer" data-depth="0.4">
                        <div id="particles-js"></div>
                    </div>
                </div>
            </div>
        </div>
    <div class="main">
        <div class="top">
            <div class="top-img">
                <img class="imgs1" src="../assets/images/img.png"  style="cursor:pointer;" @click="()=>{this.$router.push('/main')}"/>
                <div class="top-div">
                    <span>王医生，欢迎您！</span>
                    <img src="../assets/images/1.png" />
                </div>
            </div>
            <div class="top-search">
                <div class="search-div1">
                    <span></span>
                </div>
                <div class="search-div2">
                    <p>
                        <input type="text" v-model="querystring" @keyup.enter="search"/>
                        <span id="common-search" @click="search">
                            <a></a>
                            <label>搜索</label>
                         
                        </span>
                    </p>
                    <router-link to="/advanced" class="la1" id="high-search" style="text-decoration:none;">高级检索</router-link>
                </div>
                <div class="search-div3">
                    <p>
                        <span>
                            <el-checkbox ref="checkbox" v-model="checked1">全部</el-checkbox>
                        </span>
                        <span>
                            <el-checkbox ref="checkbox" v-model="checked2">影像检验报告(住院)</el-checkbox>
                        </span>
                        <span>
                            <el-checkbox ref="checkbox" v-model="checked3">实验室检验报告(住院)</el-checkbox>
                        </span>
                        <span>
                            <el-checkbox ref="checkbox" v-model="checked4">病程记录</el-checkbox>
                        </span>
                    </p>
                    <p>
                        <span>
                            <el-checkbox ref="checkbox" v-model="checked5">出院小结报告</el-checkbox>
                        </span>
                        <span>
                            <el-checkbox ref="checkbox" v-model="checked6">手术明细报告</el-checkbox>
                        </span>
                        <span>
                            <el-checkbox ref="checkbox" v-model="checked7">病案首页主题报告</el-checkbox>
                        </span>
                        <span>
                            <el-checkbox ref="checkbox" v-model="checked8">其他</el-checkbox>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="main-cloud">
            <div class="main-change">
                <p class="p p-font1 p-change1" id="record">
                    <a></a><span>检索记录</span></p>
                <p class="p p-font2 p-change2" id="save">
                    <a></a><span>已保存的检索条件</span></p>
            </div>
            <p class="ul-p1"></p>
            <div class="main-ul">
                <ul class="ul1" style="display:flex;flex-flow:row wrap;">
                    <li 
                        style="width:40%;margin-right:5%;"
                        v-if="searchRecord.length > 0"
                        v-for="(item,index) of searchRecord"
                        :key="index"
                        
                    >
                        <a href="javascript:;" @click="search2(item.value)">
                            <span class="li-sp1"></span>
                            <label>{{item.value}}</label> 
                          
                        </a>
                        <i class="el-icon-delete" @click="deleteSearchRecord(item.id)"></i>
                    </li>
                    <h3 v-if="searchRecord.length == 0">{{tips}}</h3>

                </ul>
                <ul class="ul2">

                </ul>
            </div>
            <p class="ul-p2"></p>
        </div>
    </div>
    </div>
    
</template>

<script>
import $ from 'jquery';
// import LeftNav from '../components/LeftNav.vue'
export default {
    name:'retrieval',
    data(){
        return {
            fullscreenLoading: false,
            checked1:false,
            checked2:false,
            checked3:false,
            checked4:false,
            checked5:false,
            checked6:false,
            checked7:false,
            checked8:false,
            querystring:'',
            SearchData:[],
            searchRecord:[],
            index:0,
            tips:''
        }
    },
    // components:{
    //     LeftNav
    // },
    methods:{
        search(){
            if(this.querystring !== ""){
                this.index++;
                this.searchRecord.push({value:this.querystring,id:this.index})
                localStorage.setItem("searchRecord",JSON.stringify(this.searchRecord))

            }
            if(this.querystring == ""){
                    this.$message({
                    message: '请输入搜索值',
                    type: 'warning',
                    duration:1000
                });
                    return
            }
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
           
            axios({
                url:'api/search/ptsearch',
                method:'post',
                data:{
                    page:1,
                    querystring:this.querystring,
                    filters:[]
                },
            }).then(res => {
                this.SearchData = res.data;
                localStorage.setItem('searchresult',JSON.stringify(this.SearchData))
                localStorage.setItem('count',JSON.stringify(res.data.count))
                if(res.status == 200){
                    this.$router.push({path:'/searchResult',query:{name:'retrieval',data:this.SearchData,value:this.querystring,count:res.data.count}})
                    loading.close();
                }
            }).catch(()=>{
                loading.close();
            })
        },
        search2(value){
            this.querystring = value;
            this.search()
        },
        deleteSearchRecord(id){
          let newArr = JSON.parse(localStorage.getItem("searchRecord")).filter(val => val.id !== id)
        //   console.log(newArr)
           localStorage.setItem('searchRecord',JSON.stringify(newArr))
           this.searchRecord = JSON.parse(localStorage.getItem("searchRecord"))
 
        }
    },
    created(){
        if(localStorage.getItem("searchRecord") == null || localStorage.getItem("searchRecord") == "[]"){
                this.tips = '暂无搜索记录'
        }else{

            this.searchRecord = JSON.parse(localStorage.getItem("searchRecord"))
            this.index = this.searchRecord[this.searchRecord.length-1].id;
        }
    },
    mounted(){
        $(function() {
        $(".main-change .p").click(function() {
            $(this).addClass("p-change1").removeClass("p-change2");
            $(this).siblings(".main-change .p").addClass("p-change2").removeClass("p-change1");
        });
        $("#record").click(function() {
            $(".ul2").css("display", "none");
            $(".ul1").css("display", "block");
        });
        $("#save").click(function() {
            $(".ul1").css("display", "none");
            $(".ul2").css("display", "block");
        });
    })
    }
}
</script>

<style scoped src="../assets/css/retrieval.css"></style>
<style scoped src="../assets/css/particles.css"></style>
<style scoped>
    /* .main{
        top:20
    } */
</style>
