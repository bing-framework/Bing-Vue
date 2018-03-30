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
                @click="parentMenusClick(index,menu.children)">
                <span>{{menu.name}}</span>
                </div>
          </div>
          <div class="logout">
              <el-dropdown trigger="hover">
                  <el-button type="text">{{this.account}}</el-button>
                  <el-dropdown-menu slot="dropdown" style="border-radis:5px">
                      <el-dropdown-item>修改密码</el-dropdown-item>
                      <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </div>
      </el-header>
      <el-container style="height:100%">
          <el-aside width="200px" style="background-color:#fff; border:1px solid #e6e6e6; box-sizing:border-box;">
              <el-menu
                :default-active="$route.path"
                router
                style="height:100%;border:none;">
                <el-submenu :index="'index' + (menuIndex + 1)" v-for="(menu,menuIndex) in currentMenus" :key="menuIndex">
                    <template slot="title">
                        {{menu.name}}
                    </template>
                    <el-menu-item :index="child.path" v-for="child in menu.children" :key="child.name">
                        {{child.name}}
                    </el-menu-item>
                </el-submenu>
              </el-menu>
          </el-aside>
      </el-container>
  </el-container>
</template>

<script lang="ts">
export { Main as default } from "./index";
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "~assets/styles/_variables";
.main {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .web_title {
    font-size: 24px;
    float: left;
  }
  .logout {
    float: right;
    span {
      color: #fff;
    }
  }
}

.parent_menus {
  position: absolute;
  left: 200px;
  top: 0px;
  right: 50px;
  height: 60px;
  line-height: 60px;
  .menu {
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    display: inline-block;
    color: #fff;
    padding: 0px 20px;
    position: relative;
    i {
      color: #d7b791;
      opacity: 1;
    }
    &.active,
    &:hover {
      background: #474e58;
      i {
        opacity: 0.8;
      }
    }
  }

  .title {
    display: block;
    margin-bottom: 10px;
  }
}
</style>
