<template>
  <el-container class="main">
      <el-header style="height: 60px; line-height: 60px; text-align: left; background-color: #323a45; color: #fff; position: relative;">
          <strong class="web_title">{{sysName}}</strong>
          <div class="parent_menus">
              <div 
                class="menu"
                :class="{'active':index==currentParentIndex}"
                v-for="(menu,index) in menuList"
                :key="index"
                ><span>{{menu.name}}</span></div>
          </div>
      </el-header>
  </el-container>
</template>

<script lang="ts">
export { Main as default } from './index'
</script>