<template>
  <div>
    <div class="toolbar"></div>
    <div class="container-md">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-layout"
}
</script>

<style scoped>
.toolbar {
  height: 50px;
  background-color: #11b980;
}
</style>
