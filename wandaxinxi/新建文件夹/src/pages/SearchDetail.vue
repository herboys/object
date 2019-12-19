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
        <div class="main-top">
            <p>
                <input type="text" />
                <span><img src="../assets/images/blue-search.png"/><label>搜索</label></span>
            </p>
            <button class="btn1">高级检索</button>
        </div>
        <div class="main-bottom">
            <div class="search-result">
                <div class="result-left">
                    <span><i></i><label>全选所有</label></span>
                    <span class="sp2">全选本页</span>
                    <select>
                        <option>相关度</option>
                        <option>相关度</option>
                        <option>相关度</option>
                        <option>相关度</option>
                        <option>相关度</option>
                    </select>
                    <p>找到相关纪录 <i>2384</i> 条，<i>10</i> 条 / 页</p>
                </div>
                <div class="result-right">
                    <a class="a1" id="save-search">
                        <img src="../assets/images/result-1.png" />
                        <label>检索结果</label>
                    </a>
                </div>
            </div>
            <div class="search-content">
                <div class="se-cloud">
                    <div class="con-left">
                        <div class="left-all">
                            <div class="con-left1 con-left-same">
                                <p><img src="../assets/images/result-2.png" /><label>全部来源</label></p>
                                <ul>
                                    <li><i class="bg-change"></i><span>病案首页主题报告</span></li>
                                    <li><i class="bg-change"></i><span>出院小结报告</span></li>
                                    <li><i class="bg-change"></i><span>实验室检验报告(门诊)</span></li>
                                    <li><i class="bg-change"></i><span>影像检验报告(门诊)</span></li>
                                    <li><i class="bg-change"></i><span>实验室检验报告(住院)</span></li>
                                    <li><i class="bg-change"></i><span>影像检验报告(住院）</span></li>
                                    <li><i class="bg-change"></i><span>手术明细报告</span></li>
                                    <li><i class="bg-change"></i><span>病程记录</span></li>
                                    <li><i class="bg-change"></i><span>其他</span></li>
                                </ul>
                            </div>
                            <div class="con-left2 con-left-same">
                                <p><img src="../assets/images/result-3.png" /><label>历史检索</label></p>
                                <div>白血病 and 血红蛋白[实验室检验报告：项目明细] and 年龄
                                    &lt;30岁</div>
                                        <div>餐后血糖 and 胰岛素抵抗</div>
                                        <div>白血病 and 血红蛋白[实验室检验报告：项目明细] and 年龄
                                            &lt;30岁</div>
                                                <div>餐后血糖 and 胰岛素抵抗</div>
                                        </div>
                                </div>
                            </div>
                            <div class="con-right">
                                <div class="right-all">
                                    <div class="con-cloud" id="scollbar">
                                        <div class="cloud-mud" 
                                                v-for="(item,index) in detailData"
                                                :key = index
                                        >
                                            <div class="mud-1">
                                                <i class="bg-change"></i>
                                                <label>{{index+1}}</label>
                                                <span >{{item.hzjbxx.jmjkCard}}，{{item.hzjbxx.name}}，{{item.hzjbxx.age}}岁，{{item.ryjl.ksmc}}</span>
                                                <span>出院诊断：二型糖尿病，高血压三级，极高危</span>
                                            </div>
                                            <div class="mud-2">
                                                <p v-html="item.cyxj.ryqk">{{item.cyxj.ryqk}}</p>
                                                <div class="mud-2-1">
                                                    <span><label>病例生成时间 ：</label><i>2014/07/07</i></span>
                                                    <span><label>费用 ：</label><i>2388.00元</i></span>
                                                    <div>
                                                        <button class="btn2">病例全文</button>
                                                        <button class="btn2">实验室检验报告</button>
                                                        <button class="btn2">影像报告</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="clear:both;"></div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
</template>

<script>
export default {
    name:'searchDetail',
    data(){
        return{
            detailData:[],
        }
    },
    created(){
        this.detailData = JSON.parse(localStorage.getItem("searchresult")).results
        console.log(this.detailData)
    }
}
</script>

<style scoped src="../assets/css/search-result.css"></style>
<style scoped src="../assets/css/top.css"></style>
<style scoped src="../assets/css/layer.css"></style>
<style scoped src="../assets/css/search-detail.css"></style>
<style scoped src="../assets/css/perfect-scrollbar.css"></style>