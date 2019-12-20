<template>
  <div>
    <div class="content question-bank">
      <div class="container">1233
        <ul class="c-list clearfix">
          <div>
            <div class="left fixed" id="searchBar" >
              <div class="itembg">
                <div class="type">
                  <div class="title">
                    <span class="icon"></span>
                    <span>题型选择</span>
                  </div>
                  <ul class="type-list">
                    <li
                      v-for="item in IsTopic"
                      :key="item.TopicId"
                      @click="ClickTopicItem(item)"
                    >{{item.TopicName}}</li>
                  </ul>
                </div>
              </div>
              <div class="itembg newClassbg">
                <div class="type">
                  <div class="title">
                    <span class="icon icon2"></span>
                    <span>题型选择</span>
                  </div>
                  <ul class="type-list">
                    <li v-for="item in TrueTopic">{{item.TopicName}}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="itembg">
                <div class="part top-box">
                  <div class="name content_editable">
                    <div class="q_title" contenteditable="true">
                      <input class="yminput" v-model="form_name" />
                    </div>
                  </div>
                  <div class="content_editable content_editable2">
                    <p class="q_title" contenteditable="true">
                      <textarea
                        class="yminput"
                        v-model="ViceTitle"
                        style="outline:none;resize:none;width:100%;height:100%"
                      />
                    </p>
                  </div>
                </div>
                <v-draggable v-model="resultList" @update="dragEnd">
                  <div v-for="(item,index) in resultList" :key="index" class="deleteclass" @click="ClickSelect(index)" >

                    <div class="ymicon">
                      <span class="ymindex">{{index+1}}</span>
                      <img
                        src="../assets/images/crf-images/images/tkbj03.png"
                        alt
                        class="right-img1"
                        data-tippy-content="长按拖动题目"
                      />
                      <img
                        style="z-index:999999"
                        @click="ClickresultListItem(item)"
                        src="../assets/images/crf-images/images/tkbj04.png"
                        alt
                        class="right-img2 delpart"
                        data-tippy-content="删除题目"
                      />
                    </div>
                    <component ref="coma" :is="item.componentName" :pushitem="item" :style="ClickSelectIndex==index?'border:3px solid red ':''"></component>
                  </div>
                </v-draggable>
                <div>
                  <div class="tip">点击左侧题型，添加到此空白区域</div>
                  <div class="btn-box">
                    <span class="btn">操作指南</span>
                    <span class="btn" @click="PreviewFormBtn">预览问卷</span>
                    <span class="btn" @click="handleClick">暂存问卷</span>
                    <span class="btn">发布问卷</span>
                  </div>
                </div>
                <div id="scrollel"></div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import SmallTemplateSex from "../CrfSmallTemplate/SmallTemplateSex";
import SmallTemplateForm from "../CrfSmallTemplate/SmallTemplateForm";
import SmallTemplateCompletion from "../CrfSmallTemplate/SmallTemplateCompletion";
import SmallTemplateGe from "../CrfSmallTemplate/SmallTemplateGe";
import { mapState, mapMutations } from "vuex";
export default {
  name: "ChildCrfTmeplatMainRightItemBank",
  components: {
    "v-draggable": draggable,
    "v-SmallTemplateSex": SmallTemplateSex,
    "v-SmallTemplateForm": SmallTemplateForm,
    "v-SmallTemplateCompletion": SmallTemplateCompletion,
    "v-SmallTemplateGe": SmallTemplateGe
  },
  data() {
    return {
      ClickSelectIndex:'',
      initial: "Initial Value",
      form_name: "我是大标题",
      ViceTitle: "我是副标题",
      msg: [],
      IsTopic: [
        {
          TopicId: 1,
          TopicName: "单选题",
          TopicTemplate: "v-SmallTemplateSex"
        },
        {
          TopicId: 2,
          TopicName: "多选题",
          TopicTemplate: "v-SmallTemplateSex"
        },
        {
          TopicId: 3,
          TopicName: "填空题",
          TopicTemplate: "v-SmallTemplateCompletion"
        },
        {
          TopicId: 4,
          TopicName: "表格",
          TopicTemplate: "v-SmallTemplateGe"
        }
      ],
      TrueTopic: [
        {
          TopicId: 3,
          TopicName: "多行填空题",
          TopicTemplate: "v-SmallTemplateForm"
        }
      ],
      resultList: [],
      fromid: "",
      smillquestions: [],
      ismainlist: []
    };
  },
  computed: {
    ...mapState(["CrfTemplateChildFrom"])
  },
  created(){
    var vm=this;
    window.οnscrοll=function(){
      if (document.documentElement.scrollTop>60) {

      }else {

      }
    }
  },
  mounted() {
    this.ismainlist = this.CrfTemplateChildFrom;
    this.fistchildlist();
  },
  methods: {
    ...mapMutations(["TEMPALTETYPES", "CTFTEMPLATECHILDFROM"]),
    ClickSelect(index){
      this.ClickSelectIndex=index

    },
    fistchildlist() {
      this.form_name = this.ismainlist.formName;
      this.fromid = this.ismainlist.id;
      if (this.ismainlist.questions.length > 0) {
        this.smillquestions = this.ismainlist.questions;
        this.smillquestions.map(item => {
          switch (item.questionFormat) {
            case "1":
              let para = {
                list: item,
                componentName: "v-SmallTemplateSex"
              };
              this.resultList.push(para);
              break;
            case "2":
              let paras = {
                list: item,
                componentName: "v-SmallTemplateForm"
              };
              this.resultList.push(paras);
              break;
            case "3":
              let parass = {
                list: item,
                componentName: "v-SmallTemplateCompletion"
              };
              this.resultList.push(parass);
              break;
            case "4":
              parass = {
                list: item,
                componentName: "v-SmallTemplateGe"
              };
              this.resultList.push(parass);
              break;
            default:
              break;
          }
        });
      }
    },
    dragEnd(e) {
      e.preventDefault();//通知 Web 浏览器不要执行与事件关联的默认动作
      console.log(e.oldIndex)//拖动前index
      console.log(e.newIndex)//拖动后index
      console.log(this.resultList)
      console.log(this.$parent)
      let data={}
      for (let i = 0; i <this.resultList.length ; i++) {
        data[i] = this.resultList[i].list.id
      }
      this.sortlist(data)
    },
    sortlist(para){
      axios({
        method: 'post',
        url:"api/template/questionSequence",
        data:para
      }).then(res=>{

      })
    },
    ClickTopicItem(item) {
      console.log(item);
      switch (item.TopicId) {
        case 1:
          console.log("点击的是组件一");
          let paras = {
            formId: this.fromid,
            form_desc: "12312312313",
            form_name: this.form_name,
            questionList: [
              {
                questionId: 0,
                question_option: "问题1,问题2",
                question_title: "单选题",
                questron_Format: item.TopicId
              }
            ],
            type: 2
          };
          this.EncapsulationAxios(paras);
          break;
        case 2:
          paras = {
            formId: this.fromid,
            form_desc: "12312312313",
            form_name: this.form_name,
            questionList: [
              {
                questionId: 0,
                question_option: "问题1,问题2",
                question_title: "多选题",
                questron_Format: item.TopicId
              }
            ],
            type: 2
          };
          this.EncapsulationAxios(paras);
          break;
        case 3:
          console.log("点击的是组件三");
          paras = {
            formId: this.fromid,
            form_desc: "12312312313",
            form_name: this.form_name,
            questionList: [
              {
                questionId: 0,
                question_option: "问题1",
                question_title: "多行填空题",
                questron_Format: item.TopicId
              }
            ],
            type: 2
          };
          this.EncapsulationAxios(paras);
          break;
        case 4:
          paras = {
            formId: this.fromid,
            form_desc: "12312312313",
            form_name: this.form_name,
            questionList: [
              {
                questionId: 0,
                question_option: "新增行,新增行,新增行-新增列,新增列,新增列",
                question_title: "表格",
                questron_Format: item.TopicId
              }
            ],
            type: 2
          };
          this.EncapsulationAxios(paras);
        default:
          break;
      }
      document.getElementById('scrollel').scrollIntoView()
      var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
      console.log(clientHeight,'查看高度')
      var scrollHeight=document.documentElement.scrollHeight;
      console.log(scrollHeight,'当前距离高度')
      // var height=scrollHeight-clientHeight;
      // document.documentElement.scrollTop+=50;
    },
    EncapsulationAxios(paras) {
      axios({
        url: "api/template/addFormToPaper",
        method: "post",
        data: paras
      })
        .then(res => {
          this.CTFTEMPLATECHILDFROM(res.data);
          this.ismainlist = res.data;
          let bbcn = [];
          this.CrfTemplateChildFrom.questions.map(item => {
            switch (item.questionFormat) {
              case "1":
                let para = {
                  list: item,
                  componentName: "v-SmallTemplateSex"
                };
                bbcn.push(para);
                break;
              case "2":
                let paras = {
                  list: item,
                  componentName: "v-SmallTemplateForm"
                };
                bbcn.push(paras);
                break;
              case "3":
                let parass = {
                  list: item,
                  componentName: "v-SmallTemplateCompletion"
                };
                bbcn.push(parass);
                break;
              case "4":
                parass = {
                  list: item,
                  componentName: "v-SmallTemplateGe"
                };
                bbcn.push(parass);
                break;
              default:
                break;
            }
          });
          this.resultList = bbcn;
          console.log(this.resultList, "我是新增后将要循环到页面上的数据");
          let type = 1;
          this.TEMPALTETYPES(type);
        })
        .catch(err => {});
    },
    ClickresultListItem(item) {
      axios({
        url: "api/template/deleteTemplate",
        method: "get",
        params: { questionId: item.list.id }
      }).then(res => {
        console.log(res);
        for (let i = this.resultList.length - 1; i >= 0; i--) {
          if (this.resultList[i].list.id == item.list.id) {
            this.resultList.splice(i, 1);
          }
        }
      });
    },
    handleClick() {
      const GitMain = this.$refs["coma"];
      if (GitMain) {
        console.log(GitMain, "获取数据之前");
        let questionLists = [];
        GitMain.map((item, index) => {
          let ChildId = item.pushitem;
          let Child = item.mian;
          let questron_Format = [];
          let question_title = "";
          if (ChildId.list.questionFormat == 4) {
            console.log(Child,'444444')
            let ChildLists = {
              questionId: ChildId.list.id,
              questron_Format: ChildId.list.questionFormat,
              question_option: Child[0].mainchild.SexTitle,
              question_title: Child[1].title
            };
            questionLists.push(ChildLists);
          } else {
            console.log(Child[0].mainchild, "查看子集");
            question_title = Child[0].title;
            for (let j = 0; j < Child[0].mainchild.length; j++) {
              questron_Format.push(Child[0].mainchild[j].SexTitle);
            }
            console.log(questron_Format, "在看子数据");
            let ChildLists = {
              questionId: ChildId.list.id,
              questron_Format: ChildId.list.questionFormat,
              question_option: questron_Format.join(),
              question_title: question_title
            };
            questionLists.push(ChildLists);
          }
        });
        let para = {
          formId: this.fromid,
          form_desc: "12312312313",
          form_name: this.form_name,
          questionList: questionLists,
          type: 2
        };
        axios({
          url: "api/template/addFormToPaper",
          method: "post",
          data: para
        })
          .then(res => {
            this.CTFTEMPLATECHILDFROM(res.data);
            let type = 1;
            this.TEMPALTETYPES(type);
            this.$message({
              message: '恭喜您，暂存成功',
              type: 'success'
            });
          })
          .catch(err => {});
      }
    },
    PreviewFormBtn() {
      this.$router.push({ path: "/PreviewForm" });
    }
  }
};
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped>
  .right{
    margin-top: 30px;
  }
  .fixed {
    position: fixed;
    /*bottom: 100px;*/
    /*top: 300px;!*开始处于距离顶部300px的位置，之后随着滚动条滚动top值改变，然后在top==100时停止*!*/
    /*left: 218px;*/
    /*box-sizing: border-box;*/
    /*z-index: 2;*/
  }
.newClassbg {
  margin-top: 0px !important;
  padding-bottom: 20px !important;
}
.btn-box {
  margin-bottom: 30px;
}
.right-img1 {
  position: absolute;
  right: 40px;

  width: 18px;
  height: 18px;
  cursor: pointer;
}
.right-img2 {
  position: absolute;
  right: 1px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.deleteclass {
  position: relative;
}
.ymicon {
  position: relative;
  right: 25px;
  top: 58px;
}
.ymindex{
  /*position: absolute;*/
  /*!*top: 10px;*!*/
  /*left: 100px;*/
  margin-left:50px;
}
.yminput {
  width: 100%;
  border: 0px;
}
</style>