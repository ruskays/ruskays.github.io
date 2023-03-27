<template>
    <div class="grid">

        <timer-item 
            v-for="(item, i) in timers"
            :key="i"
            :timer="item"
        ></timer-item>
        <timer-add @pushTimer="addTimer"></timer-add>

    </div>
</template>

<script>
    import timerItem from './timerItem.vue';
    import timerAdd from './timerAdd.vue';
    export default {
        data() {
            return {
                timers: [
                    {
                        timer: {}
                    },
                    {
                        timer: {}
                    }
                ],
            }
        },
        methods: {
            addTimer() {
                this.timers.push(this.timer)
            }
        },
        components: {
            timerItem,
            timerAdd
        }
    }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
        grid-gap: 45px 50px;
    }
</style>