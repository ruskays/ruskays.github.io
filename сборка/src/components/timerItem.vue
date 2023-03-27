<template>
    <div class="timer" :class="{ active: timer.timerState === 'running' }">
        <div class="timer-clock">
            <span class="hours" v-if="timer.hours !== 0">{{ timer.hours }}:</span>
            <span class="minutes" v-if="timer.minutes !== 0"> {{ timer.minutes }}:</span>
            <span class="seconds"> {{ timer.seconds }}</span>
        </div>
        <hr />
        <div class="timer-nav">
            <timer-button @action="startTimer" v-if="timer.timerState !== 'running'">
                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 20V0L17 10L0 20Z" fill="#9E9E9E"/>
                </svg>
            </timer-button>
            <timer-button @action="pauseTimer" v-if="timer.timerState === 'running'">
                <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="7" width="3" height="20" fill="white"/>
                    <rect width="3" height="20" fill="white"/>
                </svg>
            </timer-button>
            <timer-button @action="stopTimer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" fill="#9E9E9E"/>
                </svg>      
            </timer-button>
        </div>
    </div>
</template>

<script>
import timerButton from './timerButton.vue'


    export default {
        name: "Timer-item",
        props: {

        },
        data() {
            return {
                timer: {
                    timerState: 'stopped',
                    ticker: undefined,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0,
                },
            }
        },
        methods: {
            tickTimer() {
                this.timer.ticker = setInterval(() => {
                    this.timer.miliseconds++
                    if(this.timer.miliseconds > 99) {
                        this.timer.seconds++
                        this.timer.miliseconds = 0
                    }
                    if(this.timer.seconds > 59) {
                        this.timer.minutes++
                        this.timer.seconds = 0
                    }
                    if(this.timer.minutes > 59) {
                        this.timer.hours++
                        this.timer.minutes = 0
                    }
                }, 1)
            },
            startTimer() {
                if  (this.timer.timerState !== 'running') {
                    this.tickTimer();
                    this.timer.timerState = 'running'
                }
            },
            pauseTimer() {
                window.clearInterval(this.timer.ticker)
                this.timer.timerState = 'paused'
            },
            stopTimer() {
                window.clearInterval(this.timer.ticker)
                this.timer.timerState = 'stopped'
                this.timer.miliseconds = 0
                this.timer.minutes = 0
                this.timer.seconds = 0
                this.timer.hours = 0
            },
        },
        components: {
            timerButton
        }
    }
</script>

<style lang="scss" scoped>
    .timer {
        background: var(--timerBg);
        height: 120px;
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        align-items: center;
        &.active {
            color: var(--activeColor);
            svg {
                rect {
                    fill: var(--activeColor);
                }
                path {
                    fill: var(--activeColor);
                }
            }
        }
        &-clock {
            padding-bottom: 17px;
            font-size: 22px;
        }
        &-nav {
            padding-top: 17px;
            display: flex;
            & > * {
                &:not(:last-child) {
                    margin-right: 50px;
                }
            }
        }
    }
    hr {
        width: 100%;
        border: none;
        border-top: 1px solid var(--primaryColor);
        outline: none;
        box-shadow: none;
        margin-block-start: 0;
        margin-block-end: 0;
      }
</style>