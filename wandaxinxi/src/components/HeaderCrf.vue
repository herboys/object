<template>
  <div>
    <div class="header-box">
      <div @click="GoMain" class="header-title"></div>
      <div class="header-name">
        <a>王医生，欢迎您！</a>
        <span @click="ClearBtn"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderCrf",
  methods: {
      GoMain () {
      this.$router.push({ path: '/main' })
    },
    ClearBtn(){
      sessionStorage.clear()
      localStorage.clear()
      this.$router.push({path:'/'})
    }
  },
}
</script>
<style scoped src="../assets/css/reset.css"></style>
<style scoped src="../assets/css/top.css"></style>
<style scoped lang="scss">
@media screen and (max-width: 1023px) {
  .header-box {
    min-width: 1270px !important;
  }
}
</style>