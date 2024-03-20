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
  <div class="layout">
    <Sider />
    <div class="layout-main">
      <RouterView />
    </div>
  </div>
  <BeiAn></BeiAn>
</template>

<style scoped lang="less">
.layout {
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 1rem;
  gap: 0.5rem;

  .layout-main {
    border: 1px solid orange;
    border-radius: 10px;
    padding: 1rem;
  }
}
</style>
