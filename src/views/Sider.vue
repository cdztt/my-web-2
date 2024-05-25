<script setup>
import { inject, ref } from 'vue';
import FoldButton from '../components/FoldButton.vue';
import Resume from '../components/Resume.vue';
import SideMenu from '../components/SideMenu.vue';

const tooltip = inject('tooltip');

const folded = ref(false);
</script>
<template>
  <div class="sider-container">
    <div
      class="sider-full"
      v-show="!folded"
    >
      <div
        class="sider-full-version"
        @mouseenter="
          tooltip.config({
            content: '网址改成 https:// 访问 React 版',
            placement: 'bottomright',
          }).popup
        "
      >
        ( Vue 版 )
      </div>
      <div class="sider-full-menu">
        <SideMenu />
      </div>
      <Resume />
    </div>

    <div class="sider-min">
      <FoldButton v-model:folded="folded" />
    </div>
  </div>
</template>
<style scoped lang="less">
.sider-container {
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  font-size: calc(0.5rem + 1vw);
  display: flex;
}

.sider-full {
  box-sizing: border-box;
  width: 6em;
  border: 1px solid orange;
  border-radius: 10px;
  border-top-right-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 800px) {
    // display: none;
  }

  &-version {
    font-size: 0.8rem;
    margin-top: 0.4rem;
    text-decoration: underline;
  }

  &-menu {
    margin-bottom: 4rem;
  }
}

.sider-min {
  font-size: 2em;
  height: 1.5em;
  line-height: 1.5;
  border: 1px solid orange;
  border-left: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
}
</style>
