

<template>
    <div>
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const keepAliveList = computed(() => store.state.common.keepAliveList)
</script>

<style lang="less">
@import "assets/styles/_reset";
</style>
