<template>
    <v-list-tile >
        {{ task.name }} {{ time }}
        <v-spacer />
        <v-btn @click="toggleStart()"> {{ started ? 'Оставить' : 'Запустить' }}</v-btn>
    </v-list-tile>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    props: {
        task: Object,
    },

    data () {
        return {
            timeIntrvl: null,
            time: 0,
            started: false
        }
    },

    methods: {
        ...mapActions(['taskPlay', 'taskStop']),

        toggleStart () {
            if (this.started) {
                this.stopTask()
            } else {
                this.startTask()
            }
        },

        startTask () {
            this.time = 0
            this.timeIntrvl = setInterval(() => { this.time++ }, 1000)
            this.started = true
            this.taskPlay(this.task._id)
        },

        stopTask () {
            clearInterval(this.timeIntrvl)
            this.timeIntrvl = null
            this.started = false
            this.taskStop(this.task._id)
        }
    }
}
</script>

<style>

</style>
