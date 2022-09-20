<script setup>
import { computed, inject } from 'vue';

const { type } = inject('message-type')
const { title } = inject('message-title')
const { content } = inject('message-content')
const { offset } = inject('message-offset')
const { showed } = inject('message-show')

const style = computed(() => {
    let borderColor, color

    switch (type.value) {
        case 'info':
            borderColor = 'rgba(0, 0, 128, 0.5)'
            color = 'rgba(0, 0, 128, 0.8)'
            break
        case 'done':
            borderColor = 'rgba(0, 128, 0, 0.5)'
            color = 'rgba(0, 128, 0, 0.8)'
            break
        case 'warn':
            borderColor = 'rgba(128, 0, 0, 0.5)'
            color = 'rgba(128, 0, 0, 0.8)'
            break
    }

    return {
        top: offset.value + 'vh',
        borderColor,
        color
    }
});
</script>
<template>
    <!--<div-->
    <div v-show="showed"
        class="message"
        :style="style"
    >
        <div class="message-title"
            :style="{ borderBottomColor: style.borderColor }"
        >
            {{ title }}
        </div>
        <div class="message-content">
            {{ content }}
        </div>
    </div>
</template>
<style scoped lang="less">
.message {
    position: absolute;
    width: 200px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    border-width: 3px;
    border-style: solid;
    border-radius: 10px;
    padding: 0.4rem 0.8rem;
    background-color: rgba(255, 255, 255, 0.9);
    &-title {
        font-size: 0.8rem;
        margin-bottom: 0.4rem;
        border-bottom-width: 1px;
        border-bottom-style: dotted;
    }
    &-content {
        word-break: break-all;
    }
}
</style>