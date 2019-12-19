<template>
    <div style=" background: #e0e2e4;">
         <!-- <v-HeaderCrf></v-HeaderCrf> -->
         <!-- main start -->
        <div class="header-box">
            <div class="header-title"></div>
            <div class="header-name">
                <a>王医生，欢迎您！</a>
                <span></span>
            </div>
    </div>
    <section>
        <div class="main-con">
            <div class="main-cloud">
                <div class="nav-con">
                    <div class="nav-con-1">
                        <diV class="nav-con-cloud">
                            <div class="img-con">
                                <img src="../assets/images/shouye-1.png" style="margin-top:27px;"/>
                                <router-link style="display:block;" to="/retrieval" href="#"><p style="margin-top:8px;">全文检索</p></router-link>
                            </div>
                        </diV>
                        <diV class="nav-con-cloud">
                            <div class="img-con">
                                <img src="../assets/images/shouye-2.png" style="margin-top:22px;"/>
                                <a href="#" style="display:block;"><p style="margin-top:8px;">数据分析</p></a>
                            </div>
                        </diV>
                        <diV class="nav-con-cloud">
                            <div class="img-con">
                                <img src="../assets/images/shouye-3.png" style="margin-top:27px;"/>
                                <a href="#"><p style="margin-top:16px;">数据集管理</p></a>
                            </div>
                        </diV>
                        <diV class="nav-con-cloud" @click="CrfTemplateAdmin">
                            <div class="img-con">
                                <img src="../assets/images/shouye-4.png" style="margin-top:35px;"/>
                                <a href="#"><p style="margin-top:18px;">模型管理</p></a>
                            </div>
                        </diV>
                    </div>
                    
                </div>
                <div class="nav-con">
                    <div class="nav-con-1">
                        <div class="nav-con-cloud">
                            <div class="img-con">
                                <img src="../assets/images/shouye-5.png" style="margin-top:22px;"/>
                                <a href="#"><p style="margin-top:-3px;">科研项目管理</p></a>
                            </div>
                        </diV>
                        <diV class="nav-con-cloud">
                            <div class="img-con">
                                <img src="../assets/images/shouye-6.png" style="margin-top:23px;"/>
                                <a href="#" style="display:block;"><p style="margin-top:13px;">问卷管理</p></a>
                            </div>
                        </diV>
                        <diV class="nav-con-cloud">
                            <div class="img-con">
                                <img src="../assets/images/shouye-7.png" style="margin-top:40px;"/>
                                <a href="#"><p style="margin-top:17px;">用户管理</p></a>
                            </div>
                        </diV>
                        <diV class="nav-con-cloud">
                            <div class="img-con">
                                <img src="../assets/images/shouye-8.png" style="margin-top:23px;"/>
                                <a href="#" style="display:block;"><p style="margin-top:6px;">分类</p></a>
                            </div>
                        </diV>
                    </div>
                </div>
                <div class="nav-con nav-con-3">
                    <div class="con-det">
                        <div class="con-det-1">
                            <p><img src="../assets/images/shouye-icon1.png"/></p>
                            <div>
                                <span>平台说明</span>
                                <ul>
                                    <li><a href="#">平台介绍</a></li>
                                    <li><a href="#">卫生健康大数据简介</a></li>
                                    <li><a href="#">机器学习简介</a></li>
                                </ul>
                                <a class="con-det-more" href="#">更多...</a>
                            </div>
                            <i></i>
                        </div>
                    </div>
                    <div class="con-det con-det-dif">
                        <div class="con-det-1">
                            <p><img src="../assets/images/shouye-icon2.png"/></p>
                            <div>
                                <span>新手引导</span>
                                <ul>
                                    <li><a href="#">新手入门</a></li>
                                    <li><a href="#">问卷功能介绍</a></li>
                                    <li><a href="#">内置模型介绍</a></li>
                                </ul>
                                <a class="con-det-more" href="#">更多...</a>
                            </div>
                            <i></i>
                        </div>
                    </div>
                    <div class="con-det">
                        <div class="con-det-1">
                            <p><img src="../assets/images/shouye-icon3.png"/></p>
                            <div>
                                <span>常见问题</span>
                                <ul>
                                    <li><a href="#">Q&A</a></li>
                                    <li><a href="#">在线客服</a></li>
                                    <li><a href="#">模型使用案例</a></li>
                                </ul>
                                <a class="con-det-more" href="#">更多...</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- main end -->
    </div>
</template>
<script>
    // import HeaderCrf from "../components/HeaderCrf";
    export default {
        components:{
        //   'v-HeaderCrf':HeaderCrf,
        },
        methods:{
            CrfTemplateAdmin(){
                // this.$router.push({path:'/CrfTemplateFistPage'})
            }
        }
    }
</script>
<style scoped src="../assets/css/top.css"></style>
<style scoped src="../assets/css/shouye.css"></style>

