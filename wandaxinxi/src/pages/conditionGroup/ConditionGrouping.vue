<template>
    <section>
        <div class="header-box">
            <div class="header-title"></div>
            <div class="header-name">
                <a>王医生，欢迎您！</a>
                <span></span>
            </div>
    </div>
    <div class="main">
        <div class="main-top">
            <div>
                <span><label>数据集名称：</label><i>{{this.$route.query.data}}</i></span>
                <span><label>病例数：</label><i>1232条</i></span>
            </div>
            <p>
                <button class="btn2" @click="addGroup">添加别组</button>
                <button class="btn1" @click="startGroup">确定分组</button>
            </p>
        </div>
        <div class="main-bottom">
            <div class="group-cloud"
                v-for="(item,index) of defaultGroup"
                :key = "index"
            >
            <!-- <component ref="coma" :is=""></component> -->
                <childCondition ref="childData"/>
            </div>
        </div>
    </div>
    </section>    
</template>

<script>
import transform from '../../filters/transform'
import childCondition from './childComponent/childCondition.vue'
export default {
    name:'conditionGrouping',
    data(){
        return{
            defaultGroup:[{index:1}],
            // conditionsData:[],
            include:[],
            exclude:[],
        }
    },
    components:{
       childCondition
    },
    methods:{
        //添加别组
        addGroup(){
            let groupObj = {index:this.defaultGroup.length+1}
            this.defaultGroup.push(groupObj)
        },
        //确定分组
        startGroup(){
            // console.log(this.$refs.childData)
            // let childData = this.$refs.childData

            let conditionGroupName = this.$refs.childData[0]._data.conditionGroupName//组名称
            // console.log(this.$refs.childData[0]._data.conditionGroupName)
            
            let collectionName = transform(this.$refs.childData[0]._data.collectionName)//入组条件里初始的表名称
            let lable = transform(this.$refs.childData[0].$refs.lable.innerHTML)//入组条件里初始的字段名称
            let queryField = `${collectionName}.${lable}`               //入组条件里转换后拼接的检索字段 hzjbxx.name
            let queryValue = this.$refs.childData[0]._data.includeValue  //入组条件里检索值    
            // console.log(queryField)
            // console.log(queryValue)
            // console.log(this.$refs.childData[0]._data.collectionName)
            // console.log(this.$refs.childData[0].$refs.lable.innerHTML)
            // console.log(this.$refs.childData[0]._data.includeValue)
//----------------------------------------------------------------------------------------------------------------
            // console.log(this.$refs.childData[0].$refs.collection[0])

            let collectionName1 = '';
            let lable1 = '';
            let queryField1 = '';
            let queryValue1 = '';
            if(this.$refs.childData[0].$refs.collection[0] == undefined){
                collectionName1 = null; 
                lable1 = null;
                queryValue1 = null;
            }else{
                collectionName1 = transform(this.$refs.childData[0].$refs.collection[0].value)
                 lable1 = transform(this.$refs.childData[0].$refs.lable2[0].innerHTML)
                 queryField1 = `${collectionName1}.${lable1}` 
                 queryValue1 = this.$refs.childData[0].$refs.includeValue2[0].value;
            }
            
                // console.log(queryField1,queryValue1)

//==================================================================================
            let collectionName2 = '';
            let lable2 = '';
            let queryField2 = '';
            let queryValue2 = '';
            if(this.$refs.childData[0].$refs.collection[1] == undefined){
                collectionName2 = null; 
                lable2 = null;
                queryValue2 = null;
            }else{
                 collectionName2 = transform(this.$refs.childData[0].$refs.collection[1].value)
                 lable2 = transform(this.$refs.childData[0].$refs.lable2[1].innerHTML)
                 queryField2 = `${collectionName2}.${lable2}`
                 queryValue2 = this.$refs.childData[0].$refs.includeValue2[1].value;
            }
            // console.log(queryField2,queryValue2)
        
            // console.log(this.$refs.childData[0].$refs.lable2)
            
            // if(this.$refs.childData[0].$refs.lable2 == undefined){
            //     lable1 = 2;
            // }else{
            //      lable1 = transform(this.$refs.childData[0].$refs.lable2[0].innerHTML)
            // }
            // console.log(lable1)

            // if(!this.$refs.childData[0].$refs.lable2[0]){
            //     let lable1 = transform(this.$refs.childData[0].$refs.lable2[0].innerHTML)
            // }
            // let collectionName1 = this.$refs.childData[0].$refs.collection[0].value ? transform(this.$refs.childData[0].$refs.collection[0].value) : '';
            // let lable1 =  this.$refs.childData[0].$refs.lable2[0].innerHTML ? transform(this.$refs.childData[0].$refs.lable2[0].innerHTML) : '';
            // let collectionName1 = transform(this.$refs.childData[0].$refs.collection[0].value) //入组条件里点击添加的第一个表名称
            // let lable1 = transform(this.$refs.childData[0].$refs.lable2[0].innerHTML)   //入组条件里点击添加的第一个字段名称
            // let queryField1 = `${collectionName1}.${lable1}`                         //点击添加后第一个拼接的检索字段 
            // let queryValue1 = this.$refs.childData[0].$refs.includeValue2[0].value  //点击添加后第一个检索值 
            // console.log(queryField1)
            // console.log(queryValue1)
            // let collectionName2 = transform(this.$refs.childData[0].$refs.collection[1].value) //入组条件里点击添加的第二个表名称
            // let lable2 = transform(this.$refs.childData[0].$refs.lable2[1].innerHTML)   //入组条件里点击添加的第二个字段名称
            // let queryField2 = `${collectionName2}.${lable2}`                         //点击添加后第二个拼接的检索字段 
            // let queryValue2 = this.$refs.childData[0].$refs.includeValue2[1].value //点击添加后第二个检索值 

            // console.log(this.$refs.childData[0].$refs.collection[0].value)
            // console.log(this.$refs.childData[0].$refs.collection[1].value)
            // console.log(this.$refs.childData[0].$refs.lable2[0].innerHTML)
            // console.log(this.$refs.childData[0].$refs.lable2[1].innerHTML)
            // console.log(this.$refs.childData[0].$refs.includeValue2[0].value)
            // console.log(this.$refs.childData[0].$refs.includeValue2[1].value)

//===================================================================================

            let excCollectionName = transform(this.$refs.childData[0]._data.collectionName2)//排除条件里初始的表名称
            let exLable = transform(this.$refs.childData[0].$refs.lable3.innerHTML)//排除条件里初始的字段名称
            let exQueryField = `${excCollectionName}.${exLable}`               //排除条件里转换后拼接的检索字段 hzjbxx.name
            let exQueryValue = this.$refs.childData[0]._data.excludeValue  //排除条件里检索值    
            // console.log(excCollectionName)
            // console.log(exLable)
            // console.log(exQueryField)
            // console.log(exQueryValue)

            // console.log(this.$refs.childData[0]._data.collectionName2)
            // console.log(this.$refs.childData[0].$refs.lable3.innerHTML)
            // console.log(this.$refs.childData[0]._data.excludeValue)

            let excCollectionName1 = '';
            let exLable1 = '';
            let exQueryField1 = '';
            let exQueryValue1 = '';
            if(this.$refs.childData[0].$refs.collection2[0] == undefined){
                excCollectionName1 = null; 
                exLable1 = null;
                exQueryValue1 = null;
            }else{
                excCollectionName1 = transform(this.$refs.childData[0].$refs.collection2[0].value)
                 exLable1 = transform(this.$refs.childData[0].$refs.lable4[0].innerHTML)
                 exQueryField1 = `${excCollectionName1}.${exLable1}` 
                 exQueryValue1 = this.$refs.childData[0].$refs.excludeValue2[0].value;
            }

            let excCollectionName2 = '';
            let exLable2 = '';
            let exQueryField2 = '';
            let exQueryValue2 = '';
            if(this.$refs.childData[0].$refs.collection2[1] == undefined){
                excCollectionName2 = null; 
                exLable2 = null;
                exQueryValue2 = null;
            }else{
                excCollectionName2 = transform(this.$refs.childData[0].$refs.collection2[1].value)
                 exLable2 = transform(this.$refs.childData[0].$refs.lable4[1].innerHTML)
                 exQueryField2 = `${excCollectionName2}.${exLable2}` 
                 exQueryValue2 = this.$refs.childData[0].$refs.excludeValue2[1].value;
            }


            // console.log(this.$refs.childData[0].$refs.collection2[0].value)
            // console.log(this.$refs.childData[0].$refs.collection2[1].value)
            // console.log(this.$refs.childData[0].$refs.lable4[0].innerHTML)
            // console.log(this.$refs.childData[0].$refs.lable4[1].innerHTML)
            // console.log(this.$refs.childData[0].$refs.excludeValue2[0].value)

            // console.log(this.$refs.childData)
            
            // let includeObj = {"检索字段":queryField,"检索值":queryValue}
           let includeObj = this.transfer(queryField,queryValue)
            // let includeObj = {queryField:queryValue}
            
            this.include.push(includeObj)
            console.log(includeObj)
            // console.log(this.include)


            if(queryField1 !== null && queryValue1 !== null){
                let includeObj1 = this.transfer(queryField1,queryValue1)
                console.log(includeObj1)
                // let includeObj1 = {"检索字段":queryField1,"检索值":queryValue1}
                this.include.push(includeObj1)
            }
            if(queryField2 !== null && queryValue2 !== null){
                // let includeObj2 = {"检索字段":queryField2,"检索值":queryValue2}
                let includeObj2 = this.transfer(queryField2,queryValue2)
                this.include.push(includeObj2)
            }
                console.log(this.include)

//=======================================================================
            if(excCollectionName == undefined || exLable == undefined){
                        this.exclude = [];
                        
            }else{
                // let excludeObj = {"检索字段":exQueryField,"检索值":exQueryValue}
                let excludeObj = this.transfer(exQueryField,exQueryValue)
                this.exclude.push(excludeObj)
            }
            
             if(exQueryField1 !== null && exQueryValue1 !== null){
                // let excludeObj1 = {"检索字段":exQueryField1,"检索值":exQueryValue1}
                let excludeObj1 = this.transfer(exQueryField1,exQueryValue1)
                this.exclude.push(excludeObj1)
            }

             if(exQueryField2 !== null && exQueryValue2 !== null){
                // let excludeObj2 = {"检索字段":exQueryField2,"检索值":exQueryValue2}
                let excludeObj2 = this.transfer(exQueryField2,exQueryValue2)
                this.exclude.push(excludeObj2)
            }


            axios({
                url:'api/data/conditiongroup',
                method:'post',
                data:[
                        {
                            "dataId": parseInt(this.$route.params.dataId),
                            "exclude":this.exclude,
                            "groupName":conditionGroupName,
                            "include":this.include
                        }
                    ]
                
            }).then(res => {
                // console.log(res.data['未条件分组数据'])
                // console.log(conditionGroupName,queryValue)
                this.$router.push({name:'groupQuery',params:{conditionGroupName:conditionGroupName,queryValue:queryValue,dataId:this.$route.params.dataId}})
            })

        },
        //定义一个让对象的key值动态的方法
        transfer(key, value) {
            let keyValue = {};
            keyValue[key] = value;
            return keyValue;
        },
    },
    created(){
        console.log(this.$route.params.dataId)
 
    }
}
</script>
<style scoped src="../../assets/css/top.css"></style>
<style scoped src="../../assets/css/default-grouping.css"></style>
