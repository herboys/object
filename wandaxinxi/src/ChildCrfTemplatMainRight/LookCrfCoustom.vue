<template>
    <div>
<v-header></v-header>
        <v-CrfTemplateEditItem :passageway="FatherPassageway"></v-CrfTemplateEditItem>
    </div>
</template>

<script>
    import CrfTemplateEditItem from "../ChildCrfTemplatMainRight/CrfTemplateEditItem";
    import {mapState} from 'vuex'
    import HeaderCrf from "../components/HeaderCrf";
    export default {
        name: "LookCrfCoustom",
        components:{
            'v-CrfTemplateEditItem': CrfTemplateEditItem,
            'v-header':HeaderCrf
        },
        data(){

            return{
                FatherPassageway:''
            }
        },
        computed:{
            ...mapState(['lookfrom'])
        },
        mounted() {
            console.log(this.lookfrom)
            this.FatherPassageway=this.lookfrom
        }
    }
</script>

<style scoped>

</style>