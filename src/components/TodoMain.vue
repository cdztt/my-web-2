<script setup>
import { computed, inject } from "vue";
import TodoAddTask from "./TodoAddTask.vue";
import TodoTaskList from "./TodoTaskList.vue";

const props = defineProps(["filterType"]);

const fakeData = [
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
    list: "任务",
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
];
const fakeDataShort = [
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 1,
    taskContent: "学习",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 2,
    taskContent: "跑步",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
  {
    id: 3,
    taskContent: "看剧",
    createdTime: 0,
    important: false,
    isFinished: false,
    deadline: 0,
  },
];

const todoLists = inject("todoLists");
const menuItem = computed(() =>
  todoLists.lists.find((list) => list.filterType === props.filterType),
);
const today = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const ZH_DAY_MAP = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    0: "日",
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
      <div v-show="menuItem.filterType === 'today'" class="todomain-title-date">
        {{ today }}
      </div>
    </div>

    <div class="todomain-list">
      <TodoTaskList :data="fakeData" />
      <!--<TodoTaskList :data="fakeDataShort"/>-->
    </div>

    <TodoAddTask class="todomain-addtask" />
  </div>
</template>
<style scoped lang="less">
.todomain {
  height: var(--main-fit-height);
  padding: 0 1rem;
  display: grid;
  grid-template-rows: auto 1fr 80px;
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
    margin-top: auto;
  }
}
</style>
