<template>
    <div class="grouping">
        <p class="group-in">
            <!-- 入组条件的下拉列表 -->
            <el-select v-model="value" ref="collectionName" id="collectionName" placeholder="请选择表名" border style="float:left;width:150px;" @input="getValue(value)">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            <!-- 入组条件的对应下拉字段 -->
                <select @change="getItem($event)"  ref="fieldName" style="width:70px;height:40px;border-radius: 4px;border: 1px solid #D8D8D8;text-indent: 5px;margin-left:376px;margin-right:10px;">
                    <option 
                        v-for="(item,index) of list1"   
                        :key = index  
                    >{{item}}</option>
                </select>
            <!-- 组名称 -->
            <input type="text" v-model="conditionGroupName" ref="conditionGroupName" placeholder="请输入组名称" style="margin-left:150px;"/>
        </p>
        <!-- 入组条件里初始的默认标签 -->
        <div class="group-box group-box1" style="position:relative;">
            <div class="box-p1 box-p">
                <p class="box-p1-1">
                    <span>
                        <img src="../../../assets/images/grouping-img1.png"/>
                        <i>入组条件</i>
                    </span>
                   <input type="text" v-model="collectionName" ref="collection" placeholder="请选择表名"  style="text-indent:5px;width:250px;height:40px;margin-left:30px;">
                </p>
                <p class="box-p1-2">
                    <span class="p1-2-1">
                        <img src="../../../assets/images/grouping-img4.png"/>
                        <i>纳入标准</i>
                    </span>
                    <span class="p1-2-2">
                        <label ref="lable">编　　号</label>
                        <select>
                            <option>包　　含</option>
                            <option>包　　含</option>
                            <option>包　　含</option>
                        </select>
                        <input ref="includeValue" v-model="includeValue" type="text"/>
                    </span>
                </p>
            </div>
            <!-- 入组条件里的加号和减号标签 -->
            <div class="box" style="height:40px;display:inline-block;">
                <span style="position:absolute;left:0;top:60px;display:inline-block;width:100px;z-index:100">
                    <img @click="addInput" src="../../../assets/images/grouping-img2.png" style="width:26px;height:26px;vertical-align:-6px;"/>
                    <img @click="cutInput" class="p1-1-img" src="../../../assets/images/grouping-img3.png" style="width:26px;height:26px;vertical-align:-6px;margin-left:25px;"/>
                </span>
            </div>
            <!-- 入组条件里 点击加号循环生成的标签 -->
            <div class="box-p2 box-p"
                v-for="(item,index) of enterArr"
                :key="index"
                style="display:flex;justify-content:space-between;"
            >
                <p class="box-p1-1">
                    <input type="text" id="" ref="collection" placeholder="请选择表名"  style="text-indent:5px;width:250px;height:40px;margin-left:130px;">
                </p>
                <p class="box-p1-2" style="margin-left:20px;">
                    <span class="p1-2-1"></span>
                    <span class="p1-2-2" style="display:inline-block;">
                        <label style="margin-left:20px;" ref="lable2">编　　号</label>
                        <select>
                            <option>包　　含</option>
                            <option>包　　含</option>
                            <option>包　　含</option>
                        </select>
                        <input ref="includeValue2" type="text"/>
                    </span>
                </p>
            </div>
        </div>
        <!-- 排除条件的表和对应下拉字段标签 -->
        <div class="exclude" style="display:flex;justify-content:space-between;margin-top:20px;">
            <el-select v-model="value2" ref="collectionName2" id="collectionName" placeholder="请选择表名" border style="width:150px;" @input="getValue2(value2)">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

            <select @change="getItem2($event)"  ref="fieldName2" style="width:70px;height:40px;border-radius: 4px;border: 1px solid #D8D8D8;text-indent: 5px;margin-right:390px;">
                    <option 
                        v-for="(item,index) of list2"   
                        :key = index  
                    >{{item}}</option>
                </select>
        </div>
        <!-- 排除条件里初始的默认标签 -->
        <div class="group-box group-box2" style="position:relative;">
            <div class="box-p1 box-p">

                <p class="box-p1-1">
                    <span>
                        <img src="../../../assets/images/grouping-img5.png"/>
                        <i>排除条件</i>
                    </span>
                     <input type="text" v-model="collectionName2" ref="collection2" placeholder="请选择表名"  style="text-indent:5px;width:250px;height:40px;margin-left:30px;">
                </p>

                <p class="box-p1-2">
                    <span class="p1-2-1">
                        <img src="../../../assets/images/grouping-img6.png"/>
                        <i>排除标准</i>
                    </span>
                    <span class="p1-2-2">
                        <label ref="lable3">暂　　无</label>
                        <select>
                            <option>包　　含</option>
                            <option>包　　含</option>
                            <option>包　　含</option>
                        </select>
                        <input ref="excludeValue" v-model="excludeValue" type="text"/>
                    </span>
                </p>
            </div>
            <!-- 排除条件里的加号和减号标签 -->
            <div class="box" style="height:40px;display:inline-block;">
                <span style="position:absolute;left:0;top:60px;display:inline-block;width:100px;z-index:100">
                    <img @click="addInput2" src="../../../assets/images/grouping-img2.png" style="width:26px;height:26px;vertical-align:-6px;"/>
                    <img @click="cutInput2" class="p1-1-img" src="../../../assets/images/grouping-img3.png" style="width:26px;height:26px;vertical-align:-6px;margin-left:25px;"/>
                </span>
            </div>
            <!-- 排除条件里 点击加号循环生成的标签 -->
            <div class="box-p2 box-p"
                v-for="(item,index) of removeArr"
                :key="index"
                 style="display:flex;justify-content:space-between;"
            >
                <p class="box-p1-1">
                   <input type="text" id="" ref="collection2" placeholder="请选择表名"  style="text-indent:5px;width:250px;height:40px;margin-left:130px;">
                </p>
                <p class="box-p1-2" style="margin-left:20px;">
                    <span class="p1-2-1"></span>
                    <span class="p1-2-2">
                        <label style="margin-right:2px;" ref="lable4">编　　号</label>
                        <select>
                            <option>包　　含</option>
                            <option>包　　含</option>
                            <option>包　　含</option>
                        </select>
                        <input ref="excludeValue2" type="text"/>
                    </span>
                </p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'childCondition',
    data(){
        return{
            index:0,
            text:0,
            enterArr:[],
            removeArr:[],
            list:[],
            list1:["编号","病人主索引","就诊住索引","健康档案编号","省份证号","居民健康卡号","姓名","出生日期","年龄","性别","名族","职业","地址"],
            list2:[],
            options: [{
            value: '患者基本信息',
            label: '患者基本信息'
            }, {
            value: '出院小结',
            label: '出院小结'
            }, {
            value: '疾病健康信息',
            label: '疾病健康信息'
            }, {
            value: '一般手术记录',
            label: '一般手术记录'
            }, {
            value: '入院记录',
            label: '入院记录'
            },{
            value: '检验记录',
            label: '检验记录'
            },{
            value: '检查记录',
            label: '检查记录'
            },{
            value: '住院病案首页',
            label: '住院病案首页'
            }],
            // options:['患者基本信息','出院小结','疾病健康信息','一般手术记录','入院记录','检验记录','检查记录','住院病案首页'],
            value: '',//入组条件里的
            value2: '',//排除条件里的
            collectionName:'',//入组条件的表
            collectionName2:'',//排除条件的表
            includeValue:'',
            excludeValue:'',
            conditionGroupName:''//条件组名称
        }
    },
    methods:{
        //入组条件的加号
        addInput(){
            this.index++
            let inputObj = {value:""}
            this.enterArr.push(inputObj)
            // this.allList.push(this.list1)
            // console.log(this.allList)
        },
        //入组条件的减号
        cutInput(){
            if(this.index >= 1){
                this.index--
                this.enterArr.pop()
          }
        },
        //排除条件的加号
        addInput2(){
            this.text++;
            let inputObj2 = {value:""}
            this.removeArr.push(inputObj2)
        },
        //排除条件的减号
        cutInput2(){ 
            if(this.text >= 1){
                this.text--
                this.removeArr.pop()
            }       
        },
        //入组条件里根据表获得对应的list字段
        getValue(value){
                axios({
                    url:`api/senior/getfields/{${this.value}}`,
                    method:'get',   
                }).then(res => {
                    // console.log(res)
                    this.list1 = res.data
                })
                
                switch(this.index){
                    case 0:
                        this.collectionName = value ; break;
                    case 1:
                        this.$refs.collection[0].value = value ; break;
                    case 2:
                        this.$refs.collection[1].value = value ; break;
                    case 3:
                        this.$refs.collection[2].value = value ; break;
                    case 4:
                        this.$refs.collection[3].value = value ; break;
                    case 5:
                        this.$refs.collection[4].value = value ; break;
                }
            },
        //入组条件里点击下拉字段，获取当前的值
        getItem(e){
            // console.log(e.target.value)
            // console.log(this.$refs.lable2)
            switch(this.index){
                case 0:
                       this.$refs.lable.innerHTML = e.target.value ; break;
                case 1:
                       this.$refs.lable2[0].innerHTML = e.target.value ; break;
                case 2:
                       this.$refs.lable2[1].innerHTML = e.target.value ; break;
                case 3:
                       this.$refs.lable2[2].innerHTML = e.target.value ; break;
                case 4:
                       this.$refs.lable2[3].innerHTML = e.target.value ; break;
                case 5:
                       this.$refs.lable2[4].innerHTML = e.target.value ; break;
            }

        },
        //排除条件里根据表获得对应的list字段
        getValue2(value2){
            // console.log(2)
            axios({
                    url:`api/senior/getfields/{${this.value2}}`,
                    method:'get',   
                }).then(res => {
                    // console.log(res)
                    this.list2 = res.data
                })
                 switch(this.text){
                    case 0:
                        this.collectionName2 = value2 ; break;
                    case 1:
                        this.$refs.collection2[0].value = value2 ; break;
                    case 2:
                        this.$refs.collection2[1].value = value2 ; break;
                    case 3:
                        this.$refs.collection2[2].value = value2 ; break;
                    case 4:
                        this.$refs.collection2[3].value = value2 ; break;
                    case 5:
                        this.$refs.collection2[4].value = value2; break;
                }
        },
        //排除条件里点击下拉字段，获取当前的值
        getItem2(e){
             switch(this.text){
                case 0:
                       this.$refs.lable3.innerHTML = e.target.value ; break;
                case 1:
                       this.$refs.lable4[0].innerHTML = e.target.value ; break;
                case 2:
                       this.$refs.lable4[1].innerHTML = e.target.value ; break;
                case 3:
                       this.$refs.lable4[2].innerHTML = e.target.value ; break;
                case 4:
                       this.$refs.lable4[3].innerHTML = e.target.value ; break;
                case 5:
                       this.$refs.lable4[4].innerHTML = e.target.value ; break;
            }
        },
    },

}
</script>
<style scoped src="../../../assets/css/top.css"></style>
<style scoped src="../../../assets/css/default-grouping.css"></style>
