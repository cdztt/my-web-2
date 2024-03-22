<script setup>
import { ref } from 'vue';
import TodoMain from '../components/TodoMain.vue';
import TodoMenu from '../components/TodoMenu.vue';

const filterType = ref('today');
</script>
<template>
  <div class="todo">
    <div class="todo-left">
      <TodoMenu v-model:filterType="filterType" />
    </div>
    <div class="todo-main">
      <TodoMain :filterType="filterType" />
    </div>
  </div>
</template>
<style scoped lang="less">
.todo {
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(150px, 1fr) 4fr;
  gap: 1rem;

  &-left {
    overflow: hidden;
  }

  &-main {
    overflow: scroll;
  }
}
</style>
