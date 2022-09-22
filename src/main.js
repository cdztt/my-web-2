import { createPinia } from 'pinia'
import { createApp, reactive } from 'vue'
import App from './App.vue'
import calendarPlugin from './plugins/calendar'
import messagePlugin from './plugins/message'
import popconfirmPlugin from './plugins/popconfirm'
import tooltipPlugin from './plugins/tooltip'
import router from './router'
import './style.less'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(messagePlugin)
app.use(calendarPlugin)
app.use(tooltipPlugin)
app.use(popconfirmPlugin)

app.config.globalProperties.marked = marked
app.config.globalProperties.console = console

const todoMenuItems = {
    today: {
        title: '我的一天',
        emoji: '☼',
        filterType: 'today',
        type: 'static'
    },
    importance: {
        title: '重要',
        emoji: '✩',
        filterType: 'importance',
        type: 'static'
    },
    plans: {
        title: '计划内',
        emoji: '◫',
        filterType: 'plans',
        type: 'static'
    },
    all: {
        title: '全部',
        emoji: '∞',
        filterType: 'all',
        type: 'static'
    },
    finished: {
        title: '已完成',
        emoji: '✓',
        filterType: 'finished',
        type: 'static'
    },
    tasks: {
        title: '任务',
        emoji: '⌂',
        filterType: 'tasks',
        type: 'static'
    },
}
const todoLists = reactive(Object.values(todoMenuItems))
const actions = {
    add(list) {
        todoLists.push(list)
    },
    remove(title) {
        const index = todoLists.findIndex(list => list.title === title)
        todoLists.splice(index, 1)
    },
}
app.provide('todoLists', {
    lists: todoLists,
    actions
})

app.mount('#app')
