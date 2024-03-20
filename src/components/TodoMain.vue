<script setup>
import { storeToRefs } from 'pinia';
import { computed, inject } from 'vue';
import useTodoItems from '../store/todoItems.js';
import TodoAddTask from './TodoAddTask.vue';
import TodoTaskList from './TodoTaskList.vue';

const props = defineProps(['filterType']);

const todoItems = useTodoItems();
const { tdItems } = storeToRefs(todoItems);

const todoLists = inject('todoLists');

const menuItem = computed(() =>
  todoLists.lists.find((list) => list.filterType === props.filterType)
);

const today = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const ZH_DAY_MAP = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    0: '日',
  };
  return `${year}年 ${month}月${date}日 星期${ZH_DAY_MAP[day]}`;
});
</script>
<template>
  <div class="todomain">
    <div class="todomain-title theme-background-color">
      <span>
        {{ menuItem.emoji }}
        {{ menuItem.title }}
      </span>
      <span> ⋯ </span>
      <div
        v-show="menuItem.filterType === 'today'"
        class="todomain-title-date"
      >
        {{ today }}
      </div>
    </div>

    <div class="todomain-list">
      <TodoTaskList :data="tdItems" />
    </div>

    <TodoAddTask class="todomain-addtask" />
  </div>
</template>
<style scoped lang="less">
.todomain {
  height: var(--main-fit-height);
  padding: 0 1rem;
  display: grid;
  grid-template-rows: auto 1fr 120px;
  &-title {
    font-size: 1.5rem;
    display: grid;
    grid-template-columns: 1fr auto;
    position: sticky;
    top: 0;
    z-index: 1;
    margin-bottom: 1rem;
    &-date {
      font-size: 0.8rem;
    }
  }
  &-list {
    overflow-y: scroll;
  }
  &-addtask {
    margin: auto 0;
  }
}
</style>
