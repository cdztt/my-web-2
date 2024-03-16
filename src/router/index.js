import { createRouter, createWebHashHistory } from 'vue-router';
import FileList from '../components/FileList.vue';
import FileViewer from '../components/FileViewer.vue';
import Null from '../components/Null.vue';
import About from '../views/About.vue';
import Blog from '../views/Blog.vue';
import Game from '../views/Game.vue';
import Todo from '../views/Todo.vue';

const routes = [
  {
    path: '/',
    component: About,
    meta: {
      showedName: '首页',
    },
  },
  {
    path: '/blog',
    component: Blog,
    meta: {
      showedName: '博客',
    },
    children: [
      {
        path: '',
        component: Null,
      },
      {
        path: ':subjectName',
        component: FileList,
        props: true,
      },
      {
        path: ':subjectName/:fileName',
        component: FileViewer,
      },
    ],
  },
  {
    path: '/todo',
    component: Todo,
    meta: {
      showedName: '待办',
    },
  },
  {
    path: '/game',
    component: Game,
    meta: {
      showedName: '井字棋',
    },
  },
];

export const menuItems = routes.map((route) => ({
  path: route.path,
  showedName: route.meta.showedName,
}));

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
