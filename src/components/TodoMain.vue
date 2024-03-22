<script setup>
import { storeToRefs } from 'pinia';
import { computed, inject, ref } from 'vue';
import useTodoItems from '../store/todoItems.js';
import TodoAddTask from './TodoAddTask.vue';
import TodoTaskList from './TodoTaskList.vue';

const props = defineProps(['filterType']);

const todoItems = useTodoItems();
const { tdItems } = storeToRefs(todoItems);

const todoLists = inject('todoLists');

const itemListRef = ref(null);

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

const handleAddTask = () => {
  itemListRef.value.scrollTop = itemListRef.value.scrollHeight;
};
</script>
<template>
  <div class="todomain">
    <div class="todomain-title theme-background-color">
      <span>
        {{ menuItem.emoji }}
        {{ menuItem.title }}
      </span>
      <div class="todomain-title-date">
        &nbsp;{{ menuItem.filterType === 'today' ? today : '' }}
      </div>
    </div>

    <div
      class="todomain-list"
      ref="itemListRef"
    >
      <TodoTaskList :data="tdItems" />
    </div>

    <div class="todomain-addtask">
      <TodoAddTask @addTask="handleAddTask" />
    </div>
  </div>
</template>
<style scoped lang="less">
.todomain {
  box-sizing: border-box;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0.5rem;

  &-title {
    font-size: 1.5rem;
    display: grid;
    grid-template-rows: 1fr auto;
    &-date {
      font-size: 0.8rem;
    }
  }
  &-list {
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    height: calc(100% - 6.5rem);
  }
  &-addtask {
    position: absolute;
    left: 0;
    right: 1.5rem;
    bottom: 1.5rem;
  }
}
</style>
