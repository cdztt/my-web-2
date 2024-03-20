<script setup>
import { ref } from 'vue';
import FoldButton from '../components/FoldButton.vue';
import Resume from '../components/Resume.vue';
import SideMenu from '../components/SideMenu.vue';

const folded = ref(false);
</script>
<template>
  <div class="sider-container">
    <div
      class="sider-full"
      v-show="!folded"
    >
      <SideMenu />
      <Resume />
    </div>
    <div class="sider-min">
      <FoldButton v-model:folded="folded" />
    </div>
  </div>
</template>
<style scoped lang="less">
.sider-container {
  font-size: calc(0.5rem + 1vw);
  display: flex;
}

.sider-full {
  box-sizing: border-box;
  min-width: 60px;
  width: 6em;
  min-height: calc(100vh - 1rem - 1rem);
  position: sticky;
  top: 1rem;
  border: 1px solid orange;
  border-radius: 10px;
  border-top-right-radius: 0;
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
