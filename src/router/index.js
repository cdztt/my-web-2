import { createRouter, createWebHashHistory } from 'vue-router';
import FileList from '../components/FileList.vue';
import FileViewer from '../components/FileViewer.vue';
import Loading from '../components/Loading.vue';
import PersonalStatement from '../components/PersonalStatement.vue';
import ProjectList from '../components/ProjectList.vue';
import About from '../views/About.vue';
import Blog from '../views/Blog.vue';
import Game from '../views/Game.vue';
import Home from '../views/Home.vue';
import Todo from '../views/Todo.vue';

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      showedName: '首页',
    },
  },
  {
    path: '/about',
    component: About,
    meta: {
      showedName: '简历',
    },
    children: [
      {
        path: '',
        component: PersonalStatement,
      },
      {
        path: 'projects',
        component: ProjectList,
      },
    ],
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
        component: Loading,
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
