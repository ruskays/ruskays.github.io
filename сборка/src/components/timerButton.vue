<template>
    <button class="btn" @click="$emit('action')">
        <slot />
    </button>
</template>

<script>
    export default {
        emits: ['action'],
    }
</script>

<style lang="scss" scoped>

</style>