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
            <p><label>数据集：</label><span>分组查询</span></p>
            <div>
                <label>分组名称：</label>
                <input type="text" />
                <button class="btn1">查询</button>
            </div>
        </div>
        <aside id="scrollbar">
            <div class="main-center" id="viewTable" style="">
                <!-- <div class="fixed-header-table"></div> -->
                <el-table
                    :data="tableData"
                    :span-method="objectSpanMethod"
                    style="width: 100%"
                    stripe
                    border
                    >
                    <el-table-column
                        prop="fzlb"
                        label="分组类别"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="fzmc"
                        label="分组名称"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="fzgz"
                        label="分组规则"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="fzsj"
                        label="分组时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="fzts"
                        label="分组条数"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <el-button @click="checkOut(scope.row)" type="text" size="small" style="border:0px;">查看</el-button>
                            <el-button  @click="deleteRow(scope.$index, scope.row)" type="text" size="small" style="border:0px;color:red;">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
 
            </div>
        </aside>
        <!-- <div class="main-bottom"><a>点击查看更多<img src="../assets/images/pull-down.png"/></a></div> -->
    </div>
    </section>
</template>

<script>
export default {
    name:'groupQuery',                                                  
    data(){
        return{
            tableData: [],

        }
    },
    methods:{
        checkOut(row) {
            console.log(row)
      },
      deleteRow(index,row) {
          console.log(index,row)
            // row.splice(index, 1);
     },
     objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        //  console.log(rowIndex,columnIndex)                                   
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
    },
    created(){
        let dataId = this.$route.params.dataId;
     
        axios({
            url:'api/data/getgroup',
            method:'get',
            params:{dataId:dataId}
        }).then(res => {
            console.log(res)
            res.data.map(item => {
                if(item.groupType == "条件分组"){
                    this.tableData.push({
                        fzlb:item.groupType,
                        fzmc:item.groupName,
                        fzgz: item.relation[0].value,
                        fzsj: '2019/09/24',
                        fzts: '12',
                    })
                }else{
                    this.tableData.push({
                        fzlb:item.groupType,
                        fzmc:item.groupName,
                        fzgz: item.groupParameters,
                        fzsj: '2019/09/24',
                        fzts: item.data_esList.length,
                    })
                }
            })
        })

    }
}
</script>

<style scoped src="../assets/css/top.css"></style>
<style scoped src="../assets/css/group-query.css"></style>
<style scoped src="../assets/css/perfect-scrollbar.css"></style>
<style scoped src="../assets/css/layer.css"></style>