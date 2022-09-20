<script setup>
import { inject } from 'vue';

const props = defineProps(['filterType'])
const emit = defineEmits(['update:filterType'])

const todoMenuItems = inject('todoMenuItems')
const menuItems = Object.values(todoMenuItems)

const handleClick = (filterType) => {
    emit('update:filterType', filterType)
}
;
</script>
<template>
    <div v-for="({ title, emoji, filterType }) of menuItems"
        :key="title"
        :class="['todomenu-item', { 'todomenu-item-selected': props.filterType === filterType }]"
        @click="handleClick(filterType)"
    >
        <span :class="['todomenu-item-prefix', { 'todomenu-item-prefix-selected': props.filterType === filterType }]"></span>
        <span class="todomenu-item-emoji">
            {{ emoji }}
        </span>
        <span>
            {{ title }}
        </span>
    </div>
</template>
<style scoped lang="less">
.todomenu-item {
    --selected-background-color: rgba(128, 128, 128, 0.2);
    font-size: 0.8rem;
    display: grid;
    grid-template-columns: auto auto 1fr;
    align-items: center;
    margin-bottom: 0.8rem;
    border-radius: 4px;
    cursor: default;
    &-selected {
        background-color: var(--selected-background-color);
    }
    &-prefix {
        width: 0.2rem;
        height: 0.8rem;
        &-selected {
            background-color: gray;
        }
    }
    &-emoji {
        font-size: 1rem;
        width: 2rem;
        text-align: center;
    }
    &:hover {
        background-color: var(--selected-background-color);
    }
}
</style>