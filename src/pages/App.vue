<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
export { App as default } from './App'
</script>


<style lang="scss">
@import './App.scss';
</style>
