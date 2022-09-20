import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import calendarPlugin from './plugins/calendar'
import messagePlugin from './plugins/message'
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

app.config.globalProperties.marked = marked
app.config.globalProperties.console = console

const todoMenuItems = {
    today: {
        title: '我的一天',
        emoji: '☼',
        filterType: 'today'
    },
    importance: {
        title: '重要',
        emoji: '✩',
        filterType: 'importance'
    },
    plans: {
        title: '计划内',
        emoji: '◫',
        filterType: 'plans'
    },
    all: {
        title: '全部',
        emoji: '∞',
        filterType: 'all'
    },
    finished: {
        title: '已完成',
        emoji: '✓',
        filterType: 'finished'
    },
    tasks: {
        title: '任务',
        emoji: '⌂',
        filterType: 'tasks'
    },
}
app.provide('todoMenuItems', todoMenuItems)

app.mount('#app')
