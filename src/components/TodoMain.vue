<script setup>
import { computed, inject } from 'vue';
import CalendarClass from '../utils/calendar/Calendar.js';
import TodoAddTask from './TodoAddTask.vue';
import TodoTaskList from './TodoTaskList.vue';

const props = defineProps(['filterType'])

const fakeData = [
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
]
const fakeDataShort = [
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 1,
        taskContent: '学习',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 2,
        taskContent: '跑步',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
    {
        id: 3,
        taskContent: '看剧',
        createdTime: 0,
        important: false,
        isFinished: false,
        deadline: 0
    },
]

const todoMenuItems = inject('todoMenuItems')
const menuItem = computed(() => todoMenuItems[props.filterType])
;
</script>
<template>
    <div class="todomain">
        <div class="todomain-title theme-background-color">
            <span>
                {{ menuItem.emoji }}
                {{ menuItem.title }}
            </span>
            <span>
                ⋯
            </span>
            <div v-show="menuItem.filterType === 'today'"
                class="todomain-title-date"
            >
                {{ CalendarClass.getNowDate().dateDay }}
            </div>
        </div>

        <div class="todomain-list">
            <TodoTaskList :data="fakeData"/>
            <!--<TodoTaskList :data="fakeDataShort"/>-->
        </div>

        <TodoAddTask class="todomain-addtask"/>
    </div>
</template>
<style scoped lang="less">
.todomain {
    height: var(--main-fit-height);
    padding: 0 1rem;
    display: grid;
    grid-template-rows: 80px 1fr 80px;
    &-title {
        font-size: 1.5rem;
        display: grid;
        grid-template-columns: 1fr auto;
        position: sticky;
        top: 0;
        z-index: 1;
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