<script setup>
import { computed, ref } from 'vue';
import list from '../assets/projects.json';
import NavTab from '../components/NavTab.vue';
import PersonalStatement from '../components/PersonalStatement.vue';
import ProjectList from '../components/ProjectList.vue';

const tabs = [
    {
        tabName: '个人项目',
        component: ProjectList,
        props: { list }
    },
    {
        tabName: '个人说明',
        component: PersonalStatement,
        props: {}
    },
];
const activeTab = ref(tabs[0].tabName)

const activeComponent = computed(() => {
    return tabs.find(tab => tab.tabName === activeTab.value)
});
</script>

<template>
    <div class="about">
        <NavTab :tabs="tabs.map(tab => tab.tabName)"
            v-model:activeTab="activeTab"
        />
        <KeepAlive>
            <component :is="activeComponent.component"
                v-bind="activeComponent.props"
            />
        </KeepAlive>
    </div>
</template>

<style scoped lang="less">
.about {
    font-size: calc(0.5rem + 1vw);
}
</style>