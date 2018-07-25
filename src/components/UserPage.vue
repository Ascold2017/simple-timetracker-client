<template>
    <v-layout row wrap >
        <v-flex xs12>
            <v-layout column align-center>
                <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
            </v-layout>
        </v-flex>

        <v-flex xs12>
            <v-btn @click.native="getStat()">Получить статистику</v-btn>
            <v-card>
                <v-list>
                    <template v-for="task in tasks">
                        <user-task-item
                        :task="task"
                        :key="task._id + '_tile'"
                        :activeTask="activeTask"
                        @activeTask="activeTask = $event"/>
                        <v-divider :key="task._id + '_div'"/>
                    </template>
                </v-list>
            </v-card>
        </v-flex>

        <v-dialog v-model="showModal" fullscreen hide-overlay transition="dialog-bottom-transition">
            
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="showModal = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Статистика {{ profile.name }}</v-toolbar-title>
                </v-toolbar>
                <v-layout row>
                    <v-flex xs12>
                        <v-alert :value="userStat.length < 1">Данный сотрудник не работал в выделенном промежутке времени</v-alert>
                        <ul >
                            <li v-for="task in userStat" :key="task.name">
                                {{ task.name }}
                                {{ task.total | toTime }}
                                <v-list>
                                    <v-list-tile v-for="track in task.tracks" :key="track.start">{{ track.start | moment('lll') }} - {{ track.end | moment('lll') }}</v-list-tile>
                                </v-list>
                            </li>
                        </ul>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserTaskItem from './UserTaskItem'
export default {

    components: { UserTaskItem },

    data () {
        return {
            showModal: false,

            activeTask: null
        }
    },

    computed: { ...mapState(['tasks', 'userStat', 'profile']) },

    created () {
        this.getCompanyTasks()
    },

    methods: {
        ...mapActions(['getCompanyTasks', 'getUserStat']),

        getStat () {
            this.getUserStat()
                .then(() => { this.showModal = true })
        }
    }
}
</script>

<style>

</style>
