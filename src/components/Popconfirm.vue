<script setup>
import { computed, inject, nextTick, ref, watch } from 'vue';

const { x } = inject('popconfirm-x')// viewport偏移
const { y } = inject('popconfirm-y')
const { targetWidth } = inject('popconfirm-targetwidth')// 触发mouseover的元素
const { targetHeight } = inject('popconfirm-targetheight')
const { placement } = inject('popconfirm-placement')
const { content } = inject('popconfirm-content')
const { showed } = inject('popconfirm-showed')
const popconfirm = inject('popconfirm')
const selfRef = inject('popconfirm-self')

const selfHeight = ref(0)// 自己
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
const handleConfirm = () => {
    popconfirm.result.value = 'confirm'
    popconfirm.close()
}
const handleCancel = () => {
    popconfirm.result.value = 'cancel'
    popconfirm.close()
}
;
</script>
<template>
    <div class="popconfirm theme-background-color"
        :style="style"
        ref="selfRef"
        v-show="showed"
    >
        <div class="popconfirm-text">
            <span>
                &nbsp;!&nbsp;!&nbsp;
            </span>
            {{ content }}
        </div>
        <div class="popconfirm-button">
            <button @click="handleConfirm">
                确定
            </button>
            <button @click="handleCancel">
                取消
            </button>
        </div>
    </div>
</template>
<style scoped lang="less">
.popconfirm {
    position: fixed;
    top: 0;
    left: 0;
    border: 1px solid orange;
    border-radius: 3px;
    padding: 0.2rem 0.4rem;
    &-text {
        font-size: 1.1rem;
        margin: 0.4rem 0;
    }
    &-button {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        margin: 0.4rem 0;
        button {
            width: fit-content;
            padding: 0.1rem 0.2rem;
            font-size: 0.9rem;
            border-radius: 3px;
            &:hover {
                color: orange;
            }
        }
    }
}
</style>