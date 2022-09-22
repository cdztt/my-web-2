<script setup>
import { inject, ref, toRaw, watch } from 'vue';
import Calendar from '../components/Calendar.vue';

const emit = defineEmits(['addTask'])

const PLACEHOLDER = '添加任务'
const taskText = ref(PLACEHOLDER)
const taskDeadline = ref()

const tooltip = inject('tooltip')
const popconfirm = inject('popconfirm')

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
const handleAddTask = () => {
    console.log(taskText.value, toRaw(taskDeadline.value))
}
const handleCalendarSave = (e) => {
    taskDeadline.value = e
}
watch(popconfirm.result, (result) => {
    if (result === 'confirm') {
        taskDeadline.value = undefined
    }
})
;
</script>
<template>
    <div class="todo-addtask-input theme-background-color">
        <span class="todo-addtask-input-prefix"
            @mouseenter="tooltip.config({ content: '确定' }).popup"
            @click="handleAddTask"
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
                @onSave="handleCalendarSave"
            >
                <span @mouseenter="tooltip.config({ content: '添加截止日期' }).popup">
                    📅
                </span>
            </Calendar>
            <span v-show="taskDeadline"
                @mouseenter="tooltip.config({ content: '点击删除'}).popup"
                @click="popconfirm.config({ content: '删除截止日期' }).popup"
                class="todo-addtask-input-options-deadline"
            >
                {{ `${taskDeadline?.month}月${taskDeadline?.date}日, 星期${taskDeadline?.day}` }}
                <br />
                {{ `${taskDeadline?.hours}点${taskDeadline?.minutes}分` }}
            </span>
        </span>
    </div>
</template>
<style scoped lang="less">
.todo-addtask {
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
            display: grid;
            grid-template-columns: auto auto;
            margin: 0 0.2rem;
            &-deadline {
                font-size: 0.6rem;
                margin: auto 0;
            }
        }
    }
    &-blank {
        height: 2rem;
    }
}
</style>