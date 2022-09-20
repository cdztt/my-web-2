<script setup>
import { ref } from 'vue';

const { list } = defineProps(['list'])
const folded = ref(list.map(() => true))

const handleFold = index => folded.value[index] = !folded.value[index];
</script>

<template>
    <div class="project"
        v-for="(project, index) of list"
        :key="project.name"
    >
        <div class="title">
            {{ project.name }}
        </div>

        <div class="subtitle">
            <span class="description">
                {{ project.description }}
            </span>
            <a class="code"
                :href="project.code"
                target="_blank"
                rel="noreferrer"
            >
                仓库
            </a>
        </div>

        <div class="libraries">
            <span class="librarytag"
                v-for="lib of project.libraries"
                :key="lib"
            >
                {{ lib }}
            </span>
        </div>

        <div class="more">
            <template v-if="folded[index]">
                <a @click="() => handleFold(index)">
                    更多……
                </a>
            </template>
            <template v-else>
                &nbsp;&nbsp;&nbsp;&nbsp;{{ project.details }}
                <div>
                    <a @click="() => handleFold(index)">
                        收起。
                    </a>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="less">
.project {
    margin: 1.5rem 0;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid gray;

    .title {
        font-size: 1em;
        font-weight: 600;
    }

    .subtitle {
        font-size: 0.7em;

        .description {
            font-style: italic;
        }

        .code {
            margin: 0 2rem;
        }
    }

    .libraries {
        font-size: 0.9em;
        margin: 0.3rem 0;
        display: flex;
        flex-wrap: wrap;

        .librarytag {
            border: 1px dashed gray;
            border-radius: 5px;
            padding: 0 0.3rem;
            margin: 0.2rem 0.5rem 0.2rem 0;
        }
    }

    .more {
        font-size: 1.1em;
        margin-top: 0.5rem;
    }
}
</style>