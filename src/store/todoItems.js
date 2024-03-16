import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('todoItems', () => {
  const initData = [
    {
      id: 1,
      taskContent: '模仿Windows自带的To Do，还未完成',
      createdTime: null,
      important: false,
      isFinished: false,
      deadline: null,
      list: '任务',
    },
    {
      id: 2,
      taskContent: 'To Do 之于前端',
      createdTime: null,
      important: false,
      isFinished: false,
      deadline: null,
      list: '任务',
    },
    {
      id: 3,
      taskContent: '就像鸡蛋之于达芬奇',
      createdTime: null,
      important: false,
      isFinished: false,
      deadline: null,
      list: '任务',
    },
  ];

  const tdItems = ref(initData);
  const count = ref(3);

  const addItem = (taskContent, deadline) => {
    const item = {
      id: count.value + 1,
      taskContent,
      createdTime: null,
      important: false,
      isFinished: false,
      deadline,
      list: '任务',
    };
    tdItems.value.push(item);
    count.value += 1;
  };

  return {
    tdItems,
    addItem,
  };
});
