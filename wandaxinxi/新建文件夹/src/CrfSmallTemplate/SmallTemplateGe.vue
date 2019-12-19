<template>
  <div>
    <div class="part part3" id="part3">
      <div class="title">
        <span class="num"></span>
        <span>.</span>
        <div class="content_editable">
          <input
            class="q_title"
            style=" width:100%;border:0px"
            contenteditable="true"
            v-model="mian[1].title"
          />
        </div>
<!--         <div>{{mian}}</div>-->
      </div>
      <div class="table-box">
        <table>
          <tbody>
            <tr class="head">
              <td class="left1"></td>
              <td  class="column" v-for="(item,index) in mian[1].line" :key="index">
                <div class="content_editable">
                  <div class="q_title"  :style="LineTypeIndex===index?'display:none':''" @click="ClickItemName(item,index)">{{item.linename}}</div>
                  <img   :style="LineTypeIndex===index?'display:none':''"
                    @click="DeleteLineBtn(item)"
                    src="../assets/images/crf-images/images/tkbj05.png"
                    alt
                    class="right-icon column-del"
                  />
                  <div  class="q_title" v-if="LineTypeIndex===index"><input v-model="LineTypeValue" @blur.prevent="LineInputCount()" /></div>
                </div>
              </td>
            </tr>
            <tr v-for="(item,index) in mian[2].column" :key="item">
              <td>
                <div class="content_editable">
                  <div class="q_title" :style="ColumnTypeIndex===index?'display:none':''" @click="ClickItemColumnName(item,index)">{{item.columnname}}</div>
                  <img
                          :style="ColumnTypeIndex===index?'display:none':''"
                    @click="DeleteColumBtn(item)"
                    src="../assets/images/crf-images/images/tkbj05.png"
                    alt
                    class="right-icon row-del"
                  />
                  <div class="q_title" v-if="ColumnTypeIndex===index"><input v-model="ColumnTypeValue"  @blur.prevent="ColumnInputCount()" /></div>
                </div>
              </td>
              <td v-for="childitem in  mian[1].line.length" :key="item"  @click="ChildItemClick(item,childitem)">
                <input type="text" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="r-add" id="r-add" @click="pushlinebtn"></div>
        <div class="b-add" id="b-add" @click="psuhcolumnbtn"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {DeleteListItem} from '../Api/public'
export default {
  data(){
    return{
      LineTypeIndex:'',
      ColumnTypeIndex:'',
      LineTypeValue:'',
      ColumnTypeValue:'',
      mian: [],
      childname: "",
      childlistno: false,
      childindex: ""

    }
  },
     props: {
    pushitem: Object
  },
  watch: {
    addressa: {
      handler(newValue, oldValue) {},
      deep: true
    }
  },
    computed: {
    addressa() {
      if (this.pushitem) {
        let paras = this.pushitem.list.questionOption.split("-");
        let mainchild={
            SexTitle: this.pushitem.list.questionOption
        }
     let para2 = {
          title: this.pushitem.list.questionTitle,
          mainchild:mainchild
        };
           this.mian.push(para2);
        let ccc = [];
        let bbb = [];
        paras.map((item, index) => {
    
          if (index == 0) {
            let robe = item.split(",");
            robe.map(itemdd => {
              let a = {
                linename: itemdd
              };
              ccc.push(a);
            });
          } else {
            let robe = item.split(",");
            robe.map(itemdd => {
              let a = {
                columnname: itemdd
              };
              bbb.push(a);
            });
          }
        });
        let para = {
          title: this.pushitem.list.questionTitle,
          line: ccc
        };
        let para1 = {
          title: this.pushitem.list.questionTitle,
          column: bbb
        };
        this.mian.push(para);
        this.mian.push(para1);
        return `${this.pushitem}`;
      }
    }
  },
   methods: {
    pushlinebtn() {
      let para = {
        linename: "新增行"
      };
      this.mian[1].line.push(para);
      let b=this.mian[1].line
      this.getTextByJsLine(b)
      let oldcolumn=this.mian[0].mainchild.SexTitle.split('-')
      this.mian[0].mainchild.SexTitle=`${this.getTextByJsLine(b)}`+"-"+`${oldcolumn[1]}`
    },
     psuhcolumnbtn() {
       let para = {
         columnname: "新增列"
       };
       this.mian[2].column.push(para);
       let b=this.mian[2].column
       this.getTextByJsLine(b)
       let oldcolumn=this.mian[0].mainchild.SexTitle.split('-')
       this.mian[0].mainchild.SexTitle=`${oldcolumn[0]}`+"-"+ `${this.getTextByJsLine(b)}`
     },
     getTextByJsLine(arr) {
       var str = "";
       for (var i = 0; i < arr.length; i++) {
         if(arr[i].linename!==undefined){
           str += arr[i].linename+ ",";
         }else {
           str += arr[i].columnname+ ",";
         }
       }
       if (str.length > 0) {
         str = str.substr(0, str.length - 1);
       }
       return str;
     },
    DeleteLineBtn(item) {
      DeleteListItem(this.mian[1].line, item.linename, "linename");
      console.log(this.mian[1].line)
      let b=this.mian[1].line
      this.getTextByJsLine(b)
      let oldcolumn=this.mian[0].mainchild.SexTitle.split('-')
      this.mian[0].mainchild.SexTitle=`${this.getTextByJsLine(b)}`+"-"+`${oldcolumn[1]}`
    },
    DeleteColumBtn(item) {
      DeleteListItem(this.mian[2].column, item.columnname, "columnname");
      let b=this.mian[2].column
      this.getTextByJsLine(b)
      let oldcolumn=this.mian[0].mainchild.SexTitle.split('-')
      this.mian[0].mainchild.SexTitle=`${oldcolumn[0]}`+"-"+ `${this.getTextByJsLine(b)}`
    },
     ClickItemName(item,index){
      console.log(index)
       this.LineTypeIndex=index
     },
     LineInputCount(){
      console.log(this.LineTypeValue)
       console.log(this.mian[1].line)
       this.$set(this.mian[1].line,this.LineTypeIndex,{linename:this.LineTypeValue})
       this.LineTypeIndex=''
       let b=this.mian[1].line
       this.getTextByJsLine(b)
       let oldcolumn=this.mian[0].mainchild.SexTitle.split('-')
       this.mian[0].mainchild.SexTitle=`${this.getTextByJsLine(b)}`+"-"+`${oldcolumn[1]}`
     },
     ClickItemColumnName(item,index){
      this.ColumnTypeIndex=index
     },
     ColumnInputCount(){
       this.$set(this.mian[2].column,this.ColumnTypeIndex,{columnname:this.ColumnTypeValue})
       let b=this.mian[2].column
       this.getTextByJsLine(b)
       let oldcolumn=this.mian[0].mainchild.SexTitle.split('-')
       this.mian[0].mainchild.SexTitle=`${oldcolumn[0]}`+"-"+ `${this.getTextByJsLine(b)}`
     },
     ChildItemClick(item,childitem){
       console.log(item,childitem)
     }
  }
};
</script>

<style scoped src='@/assets/css/crf_css/page.css'></style>
