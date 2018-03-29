<template>
  <div id="app" v-loading="isShowFullLoading" element-loading-text="加载中">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export { App as default } from './App'
</script>


<style lang="scss">
@import './App.scss';
</style>
