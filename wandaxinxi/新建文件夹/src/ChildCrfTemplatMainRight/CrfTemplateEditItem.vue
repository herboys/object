<template v-show="isshow">
  <div v-show="isshow"
       class="pages">
    <div class="centents"><h2>{{passageway.formName}}</h2></div>
    <div>
    </div>
    <div class="templatemain">
      <div class="templatemainchild">
        <div v-for="(item,index) in Tempalates" :key="index">
          <div><span class="classindex" style=" position: relative !important;top: 57px;
    left: 22px;">{{index+1}}</span>
          <div v-if="item.TempalateHeader.questionFormat==1">
            <v-SmallTemplateSex :passlist='item'  ref="child"  v-on:child="showchild"></v-SmallTemplateSex>
          </div>
          <div v-if="item.TempalateHeader.questionFormat==2">
            <v-SmallTemplateForm :passlist='item'  ref="child" v-on:child="showchild"></v-SmallTemplateForm>
          </div>
           <div v-if="item.TempalateHeader.questionFormat==3">
            <v-pushTemplateCompletion :passlist='item'  ref="child" v-on:child="showchild"></v-pushTemplateCompletion>
          </div>
          <div  v-if="item.TempalateHeader.questionFormat==4">
            <v-pushTemplateGe :passlist='item' ref="child" v-on:child="showchild"></v-pushTemplateGe>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ModalBox" v-if="ModalType==true">
      <div class="item-box">
        <aside class="ui-alert-box">
          <header class="alert-header">
            <span class="name">发布问卷</span>
            <a class="close" title="关闭" @click="ModalTypeFale" href="javascript:void(0);"></a>
          </header>
          <div class="alert-content">
            <div class="alert-form">
              <div class="form-item">
                <label class="form-label">问卷名称：</label>
                <div class="form-inline">
                  <input v-model="ModalName" class="ui-input-text" type="text" />
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">问卷状态：</label>
                <div class="form-inline">
                  <input v-model="ModalStatus" class="ui-input-text" type="text" />
                </div>
              </div>
            </div>
          </div>
          <footer class="alert-footer">
              <a class="button button-default"  @click="ModalTypeFale" href="javascript:void(0);">取消</a>
            <a class="button button-primary" @click="GitQuestionnaireBtn" href="javascript:void(0);">确认</a>
          </footer>
        </aside>
      </div>
    </div>
    <div v-if="previews!==1&&previews!==2">
      <div v-if="passageway.formName!=undefined &&passageway.formName.length>0" class="centents"  style="border: 0px;text-align: center" >
   <span style="margin: 0px 5px">
     <div class="buttons" @click="btn">点我编辑</div></span>
        <span style="margin: 0px 5px" v-if="Tempalates.length>0">
          <div class="buttons" @click="PushQuestionnaire">点我发布成问卷</div></span>
      </div>
    </div>
    <div v-if="previews===2 && Tempalates.length>0" class="operation">

     <span><div class="buttons" @click="PreservationFillBtn">自动填充</div></span>
     <span><div class="buttons" @click="userbtn">发送用户</div></span>
     <span><div class="buttons" @click="PreservationBtn">点我保存</div></span>
    </div>
  </div>
</template>

<script>
  import {mapState} from  'vuex'
import pushSex from '../CrfSmallTemplate/pushSex'
import SmallTemplateForm from '../CrfSmallTemplate/pushForm'
import pushTemplateCompletion from '../CrfSmallTemplate/pushTemplateCompletion'
 import pushTemplateGe from '../CrfSmallTemplate/pushTemplateGe'
export default {
  name: "CrfTemplateEditItem",
  data () {
    return {
      isshow: true,
      list: [
      ],
      Tempalate: '',
      Tempalates: [],
      ModalType:false,
      ModalStatus:'',
      ModalName:'',
      previews:""
    }
  },
  created(){
    this.previews=this.$route.query.preview
  },
  components: {
    'v-SmallTemplateSex': pushSex,
    'v-SmallTemplateForm': SmallTemplateForm,
    'v-pushTemplateCompletion': pushTemplateCompletion,
    'v-pushTemplateGe': pushTemplateGe,
  },
  props: {
    passageway: Object
  },
  computed: {
    ...mapState(['template_user_id']),
    address () {
      console.log(this.passageway,'更新值')
      return `${this.passageway}`
    }
  },
  watch: {
    address: {
      handler (newV, oldV) {
        console.log(this.passageway,'传参')
        this.isshow = true
        this.Tempalates = []
        if (this.passageway.questions) {
          this.passageway.questions.map(item => {
              this.Tempalate = {
                TempalateHeader: item,
                TempalateRoom: item.questionOption.split(',')
              }
              this.Tempalates.push(this.Tempalate)
            this.Tempalates.sort(function(a,b){
            	return a.TempalateHeader.id - b.TempalateHeader.id
            })


          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 发送用户
    userbtn(){

      console.log(this.template_user_id,'当前用户id')
      console.log(this.passageway,'表单id')
      console.log(Base64.encode(this.template_user_id))
      this.$router.push({path:"/UserFillInForm",query:{UserId:Base64.encode(this.template_user_id),FormId:Base64.encode(this.passageway.id)}})
    },
    PreservationFillBtn(){
      this.$router.push({path:'/UserFillTemplate'})
    },
    // Doctors keep
    PreservationBtn(){
      this.$confirm('此操作将永久保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ChildListAndContainAnswer = this.$refs.child
      let  NoAnswerlist = []
        for (let i = 0; i < ChildListAndContainAnswer.length; i++) {
          //No answer
          let NoAnswer = {
            "answerId": ChildListAndContainAnswer[i].passlist.TempalateHeader.Answerlist.id, // 答案id
            "answerOption": ChildListAndContainAnswer[i].passlist.TempalateHeader.Answerlist.answerOption, //答案内容
            "questionType": ChildListAndContainAnswer[i].passlist.TempalateHeader.questionFormat, //问题类型
            "question_Id": ChildListAndContainAnswer[i].passlist.TempalateHeader.id,// 问题id
            "user_Id": this.template_user_id //当前用户id
          }
          NoAnswerlist.push(NoAnswer)
        }
        console.log(NoAnswerlist,'1111111111111111111111')
        axios({
          url: 'api/questionnaire/submitAnswer',
          method: 'post',
          data: NoAnswerlist,
          params: {type: 2}
        }).then(res => {

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        })
      })
    },
    showchild(res){
      this.$nextTick(()=>{
      this.Tempalates.push(res)
      this.Tempalates=this.ObjectRemovalFor(this.Tempalates)
      this.Tempalates.push(this.Tempalates[0])
      this.Tempalates.sort(function(a,b){
			return a.TempalateHeader.id - b.TempalateHeader.id
		})
      this.Tempalates.shift()
      })
      console.log(this.Tempalates,'为什么变化')
    },
    ObjectRemovalFor(arr){  
    let  result = [];
    let obj = {};
    for(let i =0; i<arr.length; i++){
      if(!obj[arr[i].TempalateHeader.id]){
        result.push(arr[i]);
        obj[arr[i].TempalateHeader.id] = true;
      }else {
        obj[arr[i].TempalateHeader.Answerlist]=arr[i].TempalateHeader.Answerlist
        obj[arr[i].TempalateHeader.id] = true;
      }
    }
    return result
  },
    btn () {
      this.isshow = false
      this.$router.push({ path: '/ChildCrfTemplatMainRightHeader' })
    },
    PushQuestionnaire(){
this.ModalType=true
    },
    ModalTypeFale(){
this.ModalType=false
    },
    GitQuestionnaireBtn(){
      let para={
        name:this.ModalName,
        formId:this.passageway.id,
        status:this.ModalStatus,
        type:0,
      }
      axios({
        url: 'api/questionnaire/createQuestionnaire',
        method: 'post',
        params:para
      }).then(res=>{

      })
    }
  }
}
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped>
.buttons {
  text-align: center;
  width: 114px;
  margin: auto;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  color: #fff;
  background-color: #4591e2;
  border: 1px solid #2875ca;
  background-size: 100% 100%;
  border-radius: 4px;
}
.pages {
  width: 100%;
  height: 100%;

}
.mains{
  /*width: 100%;*/
}
</style>
<style lang="scss" scoped>
  .templatemain{
    padding: 0 40px;

    .templatemainchild{
      /*border: 1px solid #d6d6d6;*/
      border-radius: 10px;

    }
  }
  .centents{
    width: 100%;
    margin: 10px 0px;
    font-size: 16px;
    border-bottom: 1px solid #d6d6d6;
    h2{
      border-left: 2px solid #3B88D9;
      margin-bottom:10px;
      margin-left: 10px;
      padding-left:5px ;
    }
  }
  .ModalBox{
    position: absolute;
    top: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

  }
  .alert-content{
    background: white;
  }
  .operation{
    display: flex;
    justify-content: center;
    justify-items: center;
    span{
      margin: 0px 20px;
    }
    .classindex{
      position: relative !important;
      left: 100px;
    }
  }
</style>