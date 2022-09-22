<script setup>
import { computed, inject, nextTick, ref, watch } from 'vue';

const selfRef = ref()
const { x } = inject('tooltip-x')// viewport偏移
const { y } = inject('tooltip-y')
const { targetWidth } = inject('tooltip-targetwidth')// 触发mouseenter的元素
const { targetHeight } = inject('tooltip-targetheight')
const { placement } = inject('tooltip-placement')
const { content } = inject('tooltip-content')
const { showed } = inject('tooltip-showed')

const selfHeight = ref(0)// tooltip自己
const selfWidth = ref(0)

const style = computed(() => {
    let top, left
    switch (placement.value) {
        case 'topleft':
            top = y.value - selfHeight.value
            left = x.value - selfWidth.value
            break
        case 'top':
            top = y.value - selfHeight.value
            left = x.value - (selfWidth.value - targetWidth.value) / 2
            break
        case 'topright':
            top = y.value - selfHeight.value
            left = x.value + targetWidth.value
            break
        case 'right':
            top = y.value - (selfHeight.value - targetHeight.value) / 2
            left = x.value + targetWidth.value
            break
        case 'bottomright':
            top = y.value + targetHeight.value
            left = x.value + targetWidth.value
            break
        case 'bottom':
            top = y.value + targetHeight.value
            left = x.value - (selfWidth.value - targetWidth.value) / 2
            break
        case 'bottomleft':
            top = y.value + targetHeight.value
            left = x.value - selfWidth.value
            break
        case 'left':
            top = y.value - (selfHeight.value - targetHeight.value) / 2
            left = x.value - selfWidth.value
            break
    }

    return {
        top: top + 'px',
        left: left + 'px'
    }
})

watch(showed, async (currentValue) => {
    await nextTick()

    if (currentValue) {
        selfHeight.value = selfRef.value.offsetHeight
        selfWidth.value = selfRef.value.offsetWidth
    }
})
;
</script>
<template>
    <div class="tooltip"
        :style="style"
        ref="selfRef"
        v-show="showed"
    >
        {{ content }}
    </div>
</template>
<style scoped lang="less">
.tooltip {
    position: fixed;
    top: 0;
    left: 0;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 3px;
    padding: 0.1rem 0.2rem;
    font-size: 0.9rem;
}
</style>