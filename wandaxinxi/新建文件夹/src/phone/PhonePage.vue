<template>
    <div>
<main>
    <v-child  :poker='childlist' v-on:child="showchild"></v-child>
</main>
        <div class="fater">
            <input v-model="name" /> <span @click="btn">发送</span>
        </div>
    </div>
</template>
<script>
    import child from "./child";
    export default {
        name: "PhonePage",
        data(){
          return {
              name:'',
              childlist:[
                  {name:111},
                  {name:111},
                  {name:111}
              ]
          }
          },

        components:{
            'v-child':child
        },
        methods:{

            btn(){
                let a = '12312312311231231223123123123123123123123131'
                console.log(a.length)
                let para={
                    name:this.name
                }
                this.childlist.push(para)
            },
            showchild(res){
                console.log(res,'子返父')
                this.childlist=res
            }
        }
    }
</script>
<style scoped lang="scss">
.child{
    li{
        margin:10px ;
       text-align: end;
        p{
            span{
                background-color: indianred;
                word-wrap : break-word;
            }
        }

    }
}
    .fater{
        position: fixed;
        bottom: 0;
        height: 50px;
        background-color: #0cb7f5;
        width: 100%;

    }

</style>