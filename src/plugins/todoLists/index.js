import { reactive } from "vue";

export default function (app, options) {
  const todoMenuItems = {
    today: {
      title: "我的一天",
      emoji: "☼",
      filterType: "today",
      type: "static",
    },
    importance: {
      title: "重要",
      emoji: "✩",
      filterType: "importance",
      type: "static",
    },
    plans: {
      title: "计划内",
      emoji: "◫",
      filterType: "plans",
      type: "static",
    },
    all: {
      title: "全部",
      emoji: "∞",
      filterType: "all",
      type: "static",
    },
    finished: {
      title: "已完成",
      emoji: "✓",
      filterType: "finished",
      type: "static",
    },
    tasks: {
      title: "任务",
      emoji: "⌂",
      filterType: "tasks",
      type: "static",
    },
  };
  const todoLists = reactive(Object.values(todoMenuItems));
  const actions = {
    add(list) {
      todoLists.push(list);
    },
    remove(title) {
      const index = todoLists.findIndex((list) => list.title === title);
      todoLists.splice(index, 1);
    },
    updateLastListTitle(title) {
      todoLists[todoLists.length - 1].title = title;
    },
  };
  app.provide("todoLists", {
    lists: todoLists,
    actions,
  });
}
