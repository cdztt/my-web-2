<script setup>
import Calendar from '@cdztt/calendar-vue';
import '@cdztt/calendar-vue/dist/style.css';
import { inject, ref, shallowRef, watch } from 'vue';
import useTodoItems from '../store/todoItems.js';

const emit = defineEmits(['addTask']);

const todoItems = useTodoItems();

const taskText = ref('');
const taskDeadline = shallowRef(null);

const tooltip = inject('tooltip');
const popconfirm = inject('popconfirm');

const MAX_LENGTH = 30;

const handleAddTask = () => {
  const taskContent = taskText.value.trim().slice(0, MAX_LENGTH);

  if (taskContent !== '') {
    todoItems.addItem(taskContent, taskDeadline.value);
    taskDeadline.value = null;
  }

  taskText.value = '';

  emit('addTask');
};

const handleCalendarSave = (e) => {
  taskDeadline.value = e;
};

watch(popconfirm.result, (result) => {
  if (result === 'confirm') {
    taskDeadline.value = null;
  }
});
</script>
<template>
  <div class="todo-addtask-input theme-background-color">
    <span
      class="todo-addtask-input-prefix"
      @mouseenter="tooltip.config({ content: '确定' }).popup"
      @click="handleAddTask"
    >
      +
    </span>

    <input
      type="text"
      class="todo-addtask-input-text"
      v-model="taskText"
      placeholder="添加任务"
      :maxlength="MAX_LENGTH"
      @keydown.enter="handleAddTask"
    />

    <span class="todo-addtask-input-options">
      <Calendar
        placement="topleft"
        color="orange"
        @onSave="handleCalendarSave"
      >
        <span @mouseenter="tooltip.config({ content: '添加截止日期' }).popup">
          📅
        </span>
      </Calendar>

      <span
        v-show="taskDeadline"
        @mouseenter="tooltip.config({ content: '点击删除' }).popup"
        @click="popconfirm.config({ content: '删除截止日期' }).popup"
        class="todo-addtask-input-options-deadline"
      >
        <span>
          {{
            `${taskDeadline?.month}月${taskDeadline?.date}日, 星期${taskDeadline?.dayZh}`
          }}
        </span>
        <span>
          {{ `${taskDeadline?.hours}点${taskDeadline?.minutes}分` }}
        </span>
      </span>
    </span>
  </div>
</template>
<style scoped lang="less">
.todo-addtask {
  &-input {
    border: 2px solid gray;
    border-radius: 5px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    height: 3rem;
    line-height: 3rem;

    &-prefix {
      font-size: 2.2rem;
      margin: 0 0.8rem;
      cursor: default;
    }
    &-text {
      border: none;
      font-size: 1.2rem;
      box-sizing: border-box;
      height: 100%;
    }
    &-options {
      font-size: 2rem;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      margin: 0 0.2rem;
      &-deadline {
        display: flex;
        flex-direction: column;
        font-size: 0.7rem;
        line-height: 1.5;
        cursor: default;
      }
    }
  }
}
</style>
