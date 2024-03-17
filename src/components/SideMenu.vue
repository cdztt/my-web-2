<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { menuItems } from '../router';

const router = useRouter();
const route = useRoute();

const activeItem = ref();
watchEffect(() => {
  activeItem.value = route.matched[0]?.path;
});

const handleClick = (path) => {
  router.push(path);
  activeItem.value = path;
};
</script>

<template>
  <div class="menu">
    <div
      v-for="{ path, showedName } of menuItems"
      :key="path"
      @click="() => handleClick(path)"
      :class="['item', { isActive: activeItem === path }]"
    >
      {{ showedName }}
    </div>
    <a
      href="http://hueyond.run/chat"
      target="_blank"
      rel="noreferrer"
    >
      聊天室
    </a>
  </div>
</template>

<style scoped lang="less">
.menu {
  padding: 1rem 0;
  font-size: calc(0.5rem + 1vw);
  text-align: center;
}

#prefix {
  content: '';
  box-sizing: border-box;
  width: 6px;
  height: 1.5em;
  position: absolute;
  transform: translateX(-12px);
}

.item {
  cursor: pointer;
  font-size: 1.5em;
  margin: 1rem 0;

  &:hover {
    &:before {
      #prefix();
      border: 1px solid orange;
    }
  }
}
.isActive {
  &:before {
    #prefix();
    background-color: orange;
  }
}
</style>
