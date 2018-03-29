<template>
  <div class="demo">
      <h1>{{title}}</h1>
      <div v-for="item in list" :key="item.id">
          <p class="name">{{item}}</p>
      </div>
  </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
.demo {
  .name {
    font-size: 30px;
  }
}
</style>

<script lang="ts">
export { BiDemo as default } from "./demo";
</script>