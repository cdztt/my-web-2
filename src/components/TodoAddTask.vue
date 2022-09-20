<script setup>
import { inject, ref } from 'vue';
import Calendar from '../components/Calendar.vue';

const PLACEHOLDER = '添加任务'
const taskText = ref(PLACEHOLDER)

const tooltip = inject('tooltip')

const handleInputBlur = () => {
    if (taskText.value === '') {
        taskText.value = PLACEHOLDER
    }
}
const handleInputFocus = () => {
    if (taskText.value === PLACEHOLDER) {
        taskText.value = ''
    }
}
;
</script>
<template>
    <div class="todo-addtask theme-background-color">
        <!--<div class="todo-addtask-blank"></div>-->

        <div class="todo-addtask-input">
            <span class="todo-addtask-input-prefix"
                @mouseover="tooltip.config({ content: '确定' }).popup"
            >
                +
            </span>
            <input type="text"
                class="todo-addtask-input-text"
                v-model="taskText"
                @blur="handleInputBlur"
                @focus="handleInputFocus"
            />
            <span class="todo-addtask-input-options"
                v-show="taskText && taskText !== PLACEHOLDER"
            >
                <Calendar placement="topleft"
                    @onSave="console.log"
                >
                    <div @mouseover="tooltip.config({ content: '添加截止日期' }).popup">
                        📅
                    </div>
                </Calendar>
            </span>
        </div>

        <!--<div class="todo-addtask-blank"></div>-->
    </div>
</template>
<style scoped lang="less">
.todo {
    &-addtask {
        //position: absolute;
        //bottom: calc(1rem + 1px);
        //position: sticky;
        //bottom: 0;
        //left: 0;
        //right: 0;
        //width: 100%;
        //border: 1px solid red;
        //position: sticky;
        &-input {
            border: 2px solid gray;
            border-radius: 5px;
            display: grid;
            grid-template-columns: auto 1fr auto;
            &-prefix {
                font-size: 2rem;
                margin: 0 0.8rem;
                cursor: default;
            }
            &-text {
                border: none;
                font-size: 1.2rem;
            }
            &-options {
                font-size: 2rem;
            }
        }
        &-blank {
            height: 2rem;
        }
    }
}
</style>