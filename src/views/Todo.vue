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
  height: var(--main-fit-height);
  display: grid;
  grid-template-columns: minmax(150px, 1fr) 4fr;
  &-left {
    padding-right: 1rem;
  }
  &-main {
  }
}
</style>
