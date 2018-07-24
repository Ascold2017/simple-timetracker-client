<template>
    <v-layout row wrap >
        <v-flex xs12>
            <v-layout column align-center>
                <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
            </v-layout>
        </v-flex>

        <v-flex xs12>
            <v-card>
                <v-list>
                    <template v-for="task in tasks">
                        <user-task-item :task="task" :key="task._id + '_tile'"/>
                        <v-divider :key="task._id + '_div'"/>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserTaskItem from './UserTaskItem'
export default {

    components: { UserTaskItem },

    data () {
        return {
            socket: null
        }
    },

    computed: { ...mapState(['tasks']) },

    created () {
        this.getCompanyTasks()
    },

    methods: {
        ...mapActions(['getCompanyTasks'])
    }
}
</script>

<style>

</style>
