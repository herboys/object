<template>
    <section>
        <div class="header-box">
            <div class="header-title" style="cursor:pointer;" @click="()=>{this.$router.push('/main')}"></div>
            <div class="header-name">
                <a>王医生，欢迎您！</a>
                <span></span>
            </div>
       </div>
       <div class="content">
            <div class="con-header">
                <span class="con-header-bg1">病例全文</span>
                <span class="con-header-bg2">实验室检查报告</span>
                <span class="con-header-bg2">影像检查报告</span>
            </div>
          <!-- 病例全文页面 -->
         <div class="con-text con-box">
                        <div class="text-info">
                            <div class="info-top">
                                <img src="../assets/images/report-img1.png" />
                                <label>个人影像报告信息</label>
                            </div>
                            <div v-if="detailsData.hzjbxx" class="info-bottom">
                                <div class="info-btm1">
                                    <span><label>姓名：</label><i>{{detailsData.hzjbxx.name}}</i></span>
                                    <span><label>性别：</label><i>{{detailsData.hzjbxx.sex}}</i></span>
                                    <span><label>年龄：</label><i>{{detailsData.hzjbxx.age}}</i></span>
                                    <span><label>科室：</label><i>{{detailsData.ryjl.ksmc}}</i></span>
                                    <span><label>影像号：</label><i>C0040888X</i></span>
                                </div>
                                <div class="info-btm2"><span><label>检查日期：</label><i>2014/08/04</i></span></div>
                            </div>
                        </div>
                        <div class="text-det">
                            <div id="scroll">
                                <div class="text-cloud">
                                    <div class="med-info text-same">
                                        <p><img src="../assets/images/report-img2.png" /><span>用药信息</span></p>
                                        <table>
                                            <tr>
                                                <th>药品名称</th>
                                                <th>使用方法</th>
                                                <th>用药频次</th>
                                                <th>发药量</th>
                                            </tr>
                                            <tr>
                                                <td>阿司匹林肠溶片（拜耳）</td>
                                                <td>口服</td>
                                                <td>1#2日</td>
                                                <td>1盒</td>
                                            </tr>
                                            <tr>
                                                <td>苯磺酸左旋氨氯地平片（施惠达）</td>
                                                <td>口服</td>
                                                <td>1#3日</td>
                                                <td>2盒</td>
                                            </tr>
                                            <tr>
                                                <td>蚓激酶肠溶胶囊（百奥）</td>
                                                <td>口服</td>
                                                <td>2#2日</td>
                                                <td>2盒</td>
                                            </tr>
                                            <tr>
                                                <td>(新亚丹硝）单硝酸异山梨酯</td>
                                                <td>口服</td>
                                                <td>1#1日</td>
                                                <td>1盒</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="cli-exam1 text-same">
                                        <p><img src="../assets/images/report-img3.png" /><span> 临床检验</span></p>
                                        <table>
                                            <tr>
                                                <th>申请时间</th>
                                                <th>申请科室</th>
                                                <th>报告单类型</th>
                                                <th>检验样本</th>
                                                <th>查看</th>
                                            </tr>
                                            <tr>
                                                <td>2014/0707</td>
                                                <td>0</td>
                                                <td>一般临床检验</td>
                                                <td>静脉全血</td>
                                                <td>
                                                    <a href=""><img src="../assets/images/report-img9.png" /></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="cli-exam2 text-same">
                                        <p><img src="../assets/images/report-img4.png" /><span> 临床检查</span></p>
                                        <table>
                                            <tr>
                                                <th>申请时间</th>
                                                <th>申请科室</th>
                                                <th>检查类型</th>
                                                <th>检查项目</th>
                                                <th>检查部位</th>
                                                <th>检查名称</th>
                                                <th>查看</th>
                                            </tr>
                                            <tr>
                                                <td>2014/07/10</td>
                                                <td>0</td>
                                                <td>其他检查</td>
                                                <td></td>
                                                <td>HOTTLE</td>
                                                <td>HOTTLE常规</td>
                                                <td>
                                                    <a href=""><img src="../assets/images/report-img9.png" /></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2014/07/10</td>
                                                <td>0</td>
                                                <td>其他检查</td>
                                                <td></td>
                                                <td>HOTTLE</td>
                                                <td>HOTTLE常规</td>
                                                <td>
                                                    <a href=""><img src="../assets/images/report-img9.png" /></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2014/07/10</td>
                                                <td>0</td>
                                                <td>其他检查</td>
                                                <td></td>
                                                <td>HOTTLE</td>
                                                <td>HOTTLE常规</td>
                                                <td>
                                                    <a href=""><img src="../assets/images/report-img9.png" /></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="text-oper text-same">
                                        <p><img src="../assets/images/report-img5.png" /><span> 临床检查</span></p>
                                        <div class="oper-cloud">
                                            <div class="oper-cloud1">
                                                <span class="oper-sp1"><label>手术日期：</label><i>2014/08/14</i></span>
                                                <span><label>手术医生：</label><i>林依升</i></span>
                                                <span><label>手术名称：</label><i>双侧甲状腺全切除术+颈淋巴结清扫</i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="doc-ad text-same">
                                        <p><img src="../assets/images/report-img6.png" /><span> 临床检查</span></p>
                                        <div class="oper-cloud">
                                            <div class="oper-cloud1">
                                                <span class="oper-sp1"><label>开立时间：</label><i>2014/08/14</i></span>
                                                <span><label>开立医生：</label><i>李一三</i></span>
                                                <span><label>医嘱类型：</label><i>长期医嘱</i></span>
                                            </div>
                                            <div><span><label>医嘱内容：</label><i>嘱门诊随访，注意加强日常生活护理，防止肺部感染、尿路感染、褥疮等并发症</i></span></div>
                                        </div>
                                    </div>
                                    <div class="doc-ad text-same">
                                        <p><img src="../assets/images/report-img7.png" /><span> 临床检查</span></p>
                                        <div class="oper-cloud">
                                            <div class="oper-cloud1">
                                                <span class="oper-sp1"><label>入院类型：</label><i>急诊</i></span>
                                                <span><label>入院病区：</label><i>2909</i></span>
                                                <span><label>入院情况：</label><i>一般</i></span>
                                                <span><label>出院病区：</label><i>2909</i></span>
                                                <span><label>出院方式：</label><i>常规</i></span>
                                            </div>
                                            <div><span><label>住院天数：</label><i>9</i></span></div>
                                        </div>
                                    </div>
                                    <div v-if="detailsData.zybasy" class="dis-abs text-same">
                                        <p><img src="../assets/images/report-img8.png" /><span> 临床检查</span></p>
                                        <div class="oper-cloud">
                                            <div>
                                                <span><label>门诊诊断：</label>{{detailsData.zybasy.zyzdmc}}</span>
                                                <span><label>入院诊断：</label>{{detailsData.ryjl.xbs}}</span>
                                                <span><label>出院诊断：</label>{{detailsData.cyxj.cyszz}}</span>
                                                <span><label>入院时主要体征：</label>{{detailsData.ryjl.tgjc}}</span>
                                                <span><label>实验室检查：</label>血常规、尿常规、粪常规正常</span>
                                                <span><label>主要会诊记录：</label>无</span>
                                                <span><label>治疗过程：</label>{{detailsData.cyxj.zlgcms}}</span>
                                                <span><label>出院时情况：</label>{{detailsData.cyxj.cyqk}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>
        <!-- 实验室检查报告页面 -->
        <div class="con-lab con-box">
            <div class="lab-center">
                <div class="lab-header">
                    <img src="../assets/images/lab-img1.png" />
                    <label>检测编号：</label>
                    <span>LX0043</span>
                </div>
                <div v-if="detailsData.hzjbxx" class="lab-con">
                    <div class="lab-con-left">
                        <div class="lab-per">
                            <div class="lab-per1"><img src="../assets/images/lab-img5.png" /></div>
                            <div class="lab-per2">
                                <label>{{detailsData.hzjbxx.name}}</label>
                                <p>
                                    <span>{{detailsData.hzjbxx.sex}}
                                        <img  class="img1" src="../assets/images/lab-img2.png"/>
                                        <img class="img2" src="../assets/images/lab-img3.png"/>
                                    </span>
                                    <i>{{detailsData.hzjbxx.age}}</i>
                                </p>
                            </div>
                        </div>
                        <div class="lab-per-det">
                            <ul>
                                <li><label>科　　室：</label><span>{{detailsData.ryjl.ksmc}}</span></li>
                                <li><label>病　　区：</label><span>{{detailsData.ryjl.bqmc}}</span></li>
                                <li><label>床　　号：</label><span>NO.0101</span></li>
                                <li><label>标本类型：</label><span>血</span></li>
                                <li><label>送检日期：</label><span>2011/08/03</span></li>
                                <li><label>采样日期：</label><span>2011/08/03</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="lab-con-right">
                        <aside id="scoll">
                            <div id="viewTable" class="view">
                                <div class="fixed-header-table"></div>
                                <table class="table-data">
                                    <thead>
                                        <tr>
                                            <th>编号</th>
                                            <th>项目</th>
                                            <th>结果</th>
                                            <th>参考值</th>
                                            <th>编号</th>
                                            <th>项目</th>
                                            <th>结果</th>
                                            <th>参考值</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>45</td>
                                            <td>MCHC</td>
                                            <td>343</td>
                                            <td>320-362g/L<img src="../assets/images/lab-img4.png" /></td>
                                            <td>45</td>
                                            <td>MCHC</td>
                                            <td>343</td>
                                            <td>320-362g/L</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>淋巴细胞%</td>
                                            <td>23.3</td>
                                            <td>20-40%</td>
                                            <td>6</td>
                                            <td>淋巴细胞%</td>
                                            <td>23.3</td>
                                            <td>20-40%</td>
                                        </tr>
                                        <tr>
                                            <td>43</td>
                                            <td>MCV</td>
                                            <td>98.9</td>
                                            <td>82.6-99.1fL<img src="../assets/images/lab-img6.png" /></td>
                                            <td>43</td>
                                            <td>MCV</td>
                                            <td>98.9</td>
                                            <td>82.6-99.1fL</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>单核细胞</td>
                                            <td>7.8</td>
                                            <td>3-10%</td>
                                            <td>7</td>
                                            <td>单核细胞</td>
                                            <td>7.8</td>
                                            <td>3-10%</td>
                                        </tr>
                                        <tr>
                                            <td>0</td>
                                            <td>中性粒细胞数</td>
                                            <td>5.1</td>
                                            <td>2-7*10^9/L</td>
                                            <td>0</td>
                                            <td>中性粒细胞数</td>
                                            <td>5.1</td>
                                            <td>2-7*10^9/L</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>嗜酸细胞%</td>
                                            <td>0.5</td>
                                            <td>0.5-5%</td>
                                            <td>8</td>
                                            <td>嗜酸细胞%</td>
                                            <td>0.5</td>
                                            <td>0.5-5%</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>血红蛋白（HB）</td>
                                            <td>121</td>
                                            <td>131-172g/L</td>
                                            <td>1</td>
                                            <td>血红蛋白（HB）</td>
                                            <td>121</td>
                                            <td>131-172g/L</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>白细胞（WBC）</td>
                                            <td>7.5</td>
                                            <td>3.97-9.15*10^9/L</td>
                                            <td>4</td>
                                            <td>白细胞（WBC）</td>
                                            <td>7.5</td>
                                            <td>3.97-9.15*10^9/L</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>嗜酸细胞%</td>
                                            <td>0.5</td>
                                            <td>0.5-5%</td>
                                            <td>8</td>
                                            <td>嗜酸细胞%</td>
                                            <td>0.5</td>
                                            <td>0.5-5%</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>血红蛋白（HB）</td>
                                            <td>121</td>
                                            <td>131-172g/L</td>
                                            <td>1</td>
                                            <td>血红蛋白（HB）</td>
                                            <td>121</td>
                                            <td>131-172g/L</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>白细胞（WBC）</td>
                                            <td>7.5</td>
                                            <td>3.97-9.15*10^9/L</td>
                                            <td>4</td>
                                            <td>白细胞（WBC）</td>
                                            <td>7.5</td>
                                            <td>3.97-9.15*10^9/L</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </aside>
                        <p>
                            <span><label>申请医生：</label><i>马嘉嘉</i></span>
                            <span><label>申请日期：</label><i>2014-07-07</i></span>
                            <span><label>打印日期：</label><i>2017-07-07</i></span>
                            <span><label>报告医生：</label><i>王小二</i></span>
                            <span><label>审核医生：</label><i>李大大</i></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="lab-bottom"><a>点击查看更多<img src="../assets/images/pull-down.png"/></a></div>
        </div>
        <!-- 影响检查报告 -->
        <div class="con-img con-box">
            <div class="img-cloud">
                <div class="lab-header">
                    <img src="../assets/images/lab-img7.png" />
                    <label>影像报告单信息</label>
                </div>
                <div class="info-bottom" v-if="detailsData.hzjbxx">
                    <div class="info-btm1">
                        <span><label>姓名：</label><i>{{detailsData.hzjbxx.name}}</i></span>
                        <span><label>性别：</label><i>{{detailsData.hzjbxx.sex}}</i></span>
                        <span><label>年龄：</label><i>{{detailsData.hzjbxx.age}}</i></span>
                        <span><label>科室：</label><i>{{detailsData.ryjl.ksmc}}</i></span>
                        <span><label>影像号：</label><i>C0040888X</i></span>
                    </div>
                    <div class="info-btm2"><span><label>检查日期：</label><i>2014/08/04</i></span></div>
                </div>
                <div class="img-table">
                    <aside id="scroll-img">
                        <div id="view-table" class="view">
                            <div class="fixed-header-table"></div>
                            <table class="table-data">
                                <thead>
                                    <tr>
                                        <th>检查类型</th>
                                        <th>检查名称</th>
                                        <th>检查部位 </th>
                                        <th>影像表现</th>
                                        <th>影像诊断</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>其他检查</td>
                                        <td>H0TTLE常规</td>
                                        <td>HOTTLE</td>
                                        <td class="list-dif">心电图特征：ST段：ⅡⅢ aVF V4-V6压低0.05mV T波：ⅡⅢ aVF V4-V6双向（-+）低平心率：窦性心律电轴（度）：水平面转向：心率（/分）：72 房心率（/分）：心室率（/分）：P-R间隔（秒）：0.16QRS时限（秒）：0.08Q-T间隔（秒）：0.42</td>
                                        <td>窦性心律ST-T改变</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </aside>
                    <p>
                        <span><label>申请医生：</label><i>马嘉嘉</i></span>
                        <span><label>申请日期：</label><i>2014-07-07</i></span>
                        <span><label>打印日期：</label><i>2017-07-07</i></span>
                        <span><label>报告医生：</label><i>王小二</i></span>
                        <span><label>审核医生：</label><i>李大大</i></span>
                    </p>
                </div>
            </div>
            <div class="lab-bottom"><a>点击查看更多<img src="../assets/images/pull-down.png"/></a></div>
        </div>
       </div>
    </section>
</template>

<script>
import $ from "jquery"
export default {
    name:'reportDetails',
    data(){
        return{
            idsArr:[],
            detailsData:{}
        }
    },
    created(){
        
        },
    mounted(){
        let id = this.$route.params.aid;
        this.idsArr.push(id)
        axios({
            url:'api/data/getes',
            method:'post',
            data:this.idsArr
        }).then(res => {
            // console.log(res)
            this.detailsData = res.data[0];
    

        })
        $(function() {
            $(".content .con-header span").click(function() {
                $(this).addClass("con-header-bg1").removeClass("con-header-bg2");
                $(this).siblings("span").removeClass("con-header-bg1").addClass("con-header-bg2");
                $(".con-box").hide().eq($(this).index()).show();
            });
        })
        
    }
}
</script>

<style scoped src="../assets/css/top.css"></style>
<style scoped src="../assets/css/report.css"></style>
<style scoped src="../assets/css/perfect-scrollbar.css"></style>
<style scoped>
    /* .active{
        color:#fff;
        background:url("../assets/images/");
    } */
</style>
