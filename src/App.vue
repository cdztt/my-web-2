<script setup>
import { RouterView } from 'vue-router';
import BeiAn from './components/BeiAn.vue';
import useBlogStore from './store/blog.js';
import useResumeStore from './store/resume.js';
import Sider from './views/Sider.vue';

const blogStore = useBlogStore();
const resumeStroe = useResumeStore();

blogStore.getCategory();
resumeStroe.getProjects();
resumeStroe.getResume();
</script>

<template>
  <div class="app">
    <div class="app-layout">
      <div class="app-layout-sider">
        <Sider />
      </div>
      <div class="app-layout-main">
        <RouterView />
      </div>
    </div>

    <div class="app-beian">
      <BeiAn></BeiAn>
    </div>
  </div>
</template>

<style scoped lang="less">
.app {
  height: 100vh;
  width: 100vw;

  &-layout {
    box-sizing: border-box;
    height: 97%;
    overflow: hidden;
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 0.5rem 0.5rem 0 0.5rem;
    gap: 0.5rem;

    &-sider {
      box-sizing: border-box;
      height: 100%;
      overflow: hidden;
    }

    &-main {
      box-sizing: border-box;
      height: 100%;
      overflow-y: hidden;
      border: 1px solid orange;
      border-radius: 10px;
      padding: 0.5rem;
    }
  }

  &-beian {
    box-sizing: border-box;
    height: 3%;
  }
}
</style>
