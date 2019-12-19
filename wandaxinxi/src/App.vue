<template>
  <div id="app" style="background-color:#fff;">
    <router-view></router-view>

  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  },
  created () {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  }
}
</script>

<style >
#app {
  background-color: #e0e2e4;
}
</style>
