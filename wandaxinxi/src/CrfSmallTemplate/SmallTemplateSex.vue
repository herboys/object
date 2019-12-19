<template>
  <div>
    <div class="part part1" id="top1">
      <div class="title">
        <span class="num"></span>
        <span>.</span>
        <div class="content_editable">
          <input
            class="q_title"
            style=" width:100%;border:0px"
            contenteditable="true"
            v-model="mian[0].title"
          />
        </div>
      </div>
      <div class="option-list">
        <div class="option content_editable" v-for="(item,index) in mian[0].mainchild" :key="index">
          <span class="icon open"></span>
          <div style="z-index: 999" contenteditable="true" @focus="test(index,item)">
            <div class="q_title" :style="childindex===index?'display: none':''">{{item.SexTitle}}</div>
            <input
              style="outline: none;"
              class="q_title"
              :style="childindex===index?' border:0px':'display: none; border:0px'"
              v-model="childname"
              @blur.prevent="changeCount(index,item)"
            />
          </div>
          <img src="../assets/images/crf-images/images/tkbj05.png" alt class="right-icon" />
        </div>
        <div class="bot" id="add-option">
          <img src="../assets/images/crf-images/images/tkbj-add.png" alt />
          <span @click="AddSex">添加单个选项</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmallTemplateSex",
  data() {
    return {
      mian: [],
      childname: "",
      childlistno: false,
      childindex: ""
    };
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
        let paras = this.pushitem.list.questionOption.split(",");
        let ccc = [];
        paras.map((item, index) => {
          let a = {
            SexTitle: item
          };
          ccc.push(a);
        });
        let para = {
          title: this.pushitem.list.questionTitle,
          mainchild: ccc
        };
        this.mian.push(para);
        return `${this.pushitem}`;
      }
    }
  },
  methods: {
    AddSex() {
      let para = {
        SexTitle: "新增选项"
      };
      this.mian[0].mainchild.push(para);
    },
    test(index, item) {
      this.childindex = index;
    },
    changeCount(index, item) {
      this.childindex = index;
      if (this.childname) {
        this.$set(this.mian[0].mainchild, index, { SexTitle: this.childname });
      }
    },
    hello() {}
  }
};
</script>
<style scoped src="../assets/css/crf_css/grids.css"></style>
<style scoped src="../assets/css/crf_css/font-awesome.min.css"></style>
<style scoped src="../assets/css/crf_css/page.css"></style>
<style scoped src="../assets/css/crf_css/wdui.css"></style>
<style scoped lang="scss">
.bot {
  margin-top: 26px;
  color: #4a95e6;
  font-size: 14px;

  img {
    vertical-align: middle;
    width: 18px;
    height: 18px;
    margin-left: 7px;
    margin-right: 7px;
  }

  span {
    vertical-align: middle;
  }

  .yes {
    display: none;
  }
}
</style>