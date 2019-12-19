<template>
    <div class="AddTempaleStyle">
        <v-header></v-header>
        <div>
            <div class="AddTempaleMain">
<!--                <nav>-->
<!--                    <a @click="GoBack">返回上一页</a>-->
<!--                </nav>-->
                <div style="">
                    <header>
 <img src="../assets/images/crf-images/AddUserHeader.png" />
                        <p>新增用户</p>
                    </header>

                    <ul>
                        <li>
                            <a>
                                <span>姓名</span><input v-model="name"/>
                            </a>
                        </li>
                         <li>
                            <a>
                                <span>性别</span><input v-model="sex"/>
                            </a>
                        </li>
                         <li>
                            <a>
                                <span>出生日期</span><input v-model="dateOfBirth"/>
                            </a>
                        </li>
                         <li>
                            <a>
                                <span>证件号码</span><input v-model="cardId"/>
                            </a>
                        </li>
                         <li>
                            <a>
                                <span>居住地址</span><input v-model="address"/>
                            </a>
                        </li>
                         <li>
                            <a>
                                <span>户籍地址</span><input v-model="permanentResidenceAddress"/>
                            </a>
                        </li>
                         <li>
                            <a>
                                <span>手机号码</span><input v-model="phoneNumber"/>
                            </a>
                        </li>
                         <li>
                            <a>
                                <span>您的邮箱</span><input v-model="email"/>
                            </a>
                        </li>
                         <li>
                            <a>
                                <span>您的 QQ</span><input v-model="qq" />
                            </a>
                        </li> <li>
                            <a>
                                <span>您的微信</span><input v-model="wx" />
                            </a>
                        </li>
                        <li><a><button @click="GoBtn">提交</button><button @click="GoBack">返回</button></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderCrf from "../components/HeaderCrf";
    import TemplateApi from "../Api/TemplateApi";
    import {mapState} from 'vuex'
    export default {
        name: "UserAdd",
        data(){
            return{
                address: '',
                cardId:'',
                dateOfBirth: '',
                email: '',
                id: 0,
                name: '',
                permanentResidenceAddress: '',
                phoneNumber: '',
                qq:'',
                sex:'',
                status: '',
                wx: ''
            }
        },
        components:{
            'v-header':HeaderCrf
        },
        computed:{
          ...mapState(['CrfTemplateEditItems'])
        },
        methods:{
            clearTimer () {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            GoBtn(){
              let requestUser={
                  address: this.address,
                  cardId: this.cardId,
                  dateOfBirth: this.dateOfBirth,
                  email: this.email,
                  id: 0,
                  name: this.name,
                  permanentResidenceAddress: this.permanentResidenceAddress,
                  phoneNumber: this.phoneNumber,
                  qq: this.qq,
                  sex: this.sex,
                  templateId:this.CrfTemplateEditItems.templateId,
                  wx: this.wx,
                  status: 1,
              }
              axios({
                  url: 'api/questionnaire/addUser',
                  method: 'post',
                  data: requestUser
              }).then(res=>{
                  this.$message({
                      type: 'success',
                      message: '添加成功!'
                  });

              })
            },

            GoBack(){
                 this.clearTimer()
                this.timer = setInterval(() => {
                    console.log(this)
                },500);
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
.form-item{
    width: 300px;
    margin: auto;
}
.AddTempaleStyle {
    width: 100%;
    position: fixed;
    height: 100%;
    background-color: #E0E2E4;
    .AddTempaleMain {
        background-color: white;
        margin: 26px 20px;
        border-top: 2px solid #77b0ec;
        border-bottom: 10px solid #E0E2E4;
        div{
            width: 650px;
            margin:30px auto;
            height: 70vh;
            padding: 20px;
            box-shadow: 0px 0px 10px  10px #eeeeee;
            position: relative;
            header{
                position: absolute;
                p{
                    text-align: center;
                    margin-top: -14px;
                }
            }
            ul{
                li{
                    display: flex;
                    justify-content: center;
                    margin: 10px 0px;
                    a{
                        span{
                            text-align: end;
                            width: 70px;
                            padding: 0px 10px;
                        }
                        input{
                            width: 320px;
                            background:rgba(255,255,255,1);
                            border:1px solid rgba(214, 214, 214, 1);
                            border-radius:2px;
                            height: 30px;
                        }
                        button{
                            width:72px;
                            height:30px;
                            background: #1ea15b;
                            border-color: #278f58;
                            border-radius:6px;
                            font-size:14px;
                            font-family:PingFang SC;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                        }
                    }
                }
            }
        }
    }

}
</style>