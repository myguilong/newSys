<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>
<script>
export default {
  mounted(){
  console.log(this.$route);
    const user = localStorage.getItem("userinfo");
    if (user) {
      this.adminName = JSON.parse(user).user;
    } else {
      this.$message({
        type: "fail",
        message: "您未登录,跳到登录页"
      });
      this.$router.push("/login");
    }

  }
}
</script>
<style>
</style>
