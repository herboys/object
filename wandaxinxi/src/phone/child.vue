<template>
    <div>
    子组件
<div>{{poker1}}</div>
        <button @click="pokerbtn">dianw1</button>
</div>
</template>

<script>
    export default {
        name: "child",
        data(){
            return{
                poker1:this.props.poker
            }
        },
        props:{
            poker:Array
        },
        computed: {
            pokerHistory() {
                return`${this.poker}`
            }
        },
        watch: {
            pokerHistory(newValue, oldValue) {
                console.log(newValue)
            }
        },
        methods:{
            pokerbtn(){
                let childlist=[
                        {name:111},
                        {name:111},
                        {name:2222}
                    ]
                this.$emit("child",childlist)
            }
        }
    }
</script>

<style scoped>

</style>