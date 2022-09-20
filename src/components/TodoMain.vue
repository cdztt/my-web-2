<script setup>
import { computed, inject } from 'vue';
import CalendarClass from '../utils/calendar/Calendar.js';
import TodoAddTask from './TodoAddTask.vue';

const props = defineProps(['filterType'])

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
                class="todomain-date"
            >
                {{ CalendarClass.getNowDate().dateDay }}
            </div>
        </div>

        <div class="todomain-list">
            <!--<Calendar />-->
            <pre>
                1
                1
                11
                1
                1
                1
                1
                1
                1
                11
                1
                1
                1
                2
                3
                31
                231
                3
                13
                1
                31
                3
                1
                3
                1
                31
                3
            </pre>
        </div>

        <!--<div class="todomain-addtask theme-background-color">
            <div class="todomain-addtask-blank"></div>
            <div class="todomain-addtask-input">
                <span class="todomain-addtask-input-prefix">+</span>
                <input type="text"
                    class="todomain-addtask-input-text"
                />
            </div>
            <div class="todomain-addtask-blank"></div>
        </div>-->
        <TodoAddTask />
    </div>
</template>
<style scoped lang="less">
.todomain {
    padding: 0 1rem;
    &-title {
        font-size: 1.5rem;
        display: grid;
        grid-template-columns: 1fr auto;
        position: sticky;
        top: 0;
        z-index: 1;
    }
    &-date {
        font-size: 0.8rem;
    }
    //&-addtask {
    //    position: sticky;
    //    bottom: 0;
    //    &-input {
    //        border: 2px solid gray;
    //        border-radius: 5px;
    //        display: grid;
    //        grid-template-columns: auto 1fr;
    //        &-prefix {
    //            font-size: 2rem;
    //            margin: 0 0.5rem;
    //        }
    //        &-text {
    //            border: none;
    //            font-size: 1.5rem;
    //        }
    //    }
    //    &-blank {
    //        height: 2rem;
    //    }
    //}
}
</style>