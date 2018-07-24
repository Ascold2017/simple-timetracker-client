<template>
    <v-layout row wrap >
        <v-flex xs12>
            <v-layout column align-center>
                <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
            </v-layout>
        </v-flex>
        <v-flex v-if="profile.role === 1">
            <v-card>
                <form @submit.prevent="submitUser()">
                    <v-card-text>
                        <v-subheader>Создать пользователя</v-subheader>
                        
                        <v-text-field placeholder="Имя пользователя" v-model="username"></v-text-field>
                        <v-text-field placeholder="Email пользователя" v-model="email"></v-text-field>
                        <v-text-field placeholder="Пароль пользователя" v-model="password"></v-text-field>
                        <v-select
                            :items="userRoles"
                            item-text="name"
                            item-value="id"
                            v-model="type"
                            label="Роль пользователя"></v-select>
                        <v-btn type="submit">Создать</v-btn>
                    </v-card-text>
                </form>
            </v-card>
        </v-flex>
        <v-flex :xs6="profile.role === 1" :xs12="profile.role === 2">
            <v-card>
                <form @submit.prevent="submitTask()">
                    <v-card-text>
                        <v-subheader>Создать таск</v-subheader>
                        <v-text-field placeholder="Название таска" v-model="taskName"></v-text-field>
                        <v-btn type="submit">Создать таск</v-btn>
                    </v-card-text>
                </form>
            </v-card>
        </v-flex>

        <v-flex xs6>
            <v-card>
                <v-subheader>Пользователи:</v-subheader>

                <v-list v-if="users.length > 0">
                    <template v-for="user in users">
                        <v-list-tile :key="user._id + '_tile'" three-line>
                            <v-list-tile-title>Имя: {{ user.username }}</v-list-tile-title>
                            <v-list-tile-sub-title>Email: {{ user.email }}</v-list-tile-sub-title>
                            <v-btn @click.native="showMore(user)">Подробнее</v-btn>
                        </v-list-tile>
                        <v-divider :key="user._id + '_div'"/>
                    </template>
                </v-list>
                <v-alert :value="users.length < 1">Пользователей нет</v-alert>
            </v-card>
        </v-flex>

        <v-flex xs6>
            <v-card>
                <v-subheader>Таски:</v-subheader>

                <v-list v-if="tasks.length > 0">
                    <template v-for="task in tasks">
                        <v-list-tile :key="task._id + '_tile'" three-line>
                            <v-list-tile-title>Название: {{ task.name }}</v-list-tile-title>
                        </v-list-tile>
                        <v-divider :key="task._id + '_div'"/>
                    </template>
                </v-list>
                <v-alert :value="tasks.length < 1">Тасков нет</v-alert>
            </v-card>
        </v-flex>

         <v-dialog v-model="showModal" fullscreen hide-overlay transition="dialog-bottom-transition">
            
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="showModal = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ selectedUser.name }}</v-toolbar-title>
                </v-toolbar>
                <v-layout row>
                    <v-flex xs12>
                        <v-alert :value="userStat.length < 1">Данный сотрудник не работал в выделенном промежутке времени</v-alert>
                        <pre>{{ userStat }}</pre>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {

    data () {
        return {
            username: '',
            password: '',
            email: '',
            type: null,

            taskName: '',

            showModal: false,

            selectedUser: {
                name: '',
                email: ''
            }
        }
    },

    computed: {
        ...mapState(['users', 'tasks', 'userStat', 'profile']),
        userRoles () {
          return [
            { name: 'Админ группы', id: 1 },
            { name: 'Модератор', id: 2 },
            { name: 'Пользователь', id: 3 },
          ]
        }
    },

    created () {
        this.getCompanyUsers()
        this.getCompanyTasks()
    },

    methods: {
        ...mapActions([
            'getCompanyUsers',
            'getCompanyTasks',
            'createUser',
            'createTask',
            'getUserStat'
        ]),

        submitUser () {
            this.createUser({
                username: this.username,
                email: this.email,
                password: this.password,
                type: this.type
            })
            .then(() => this.getCompanyUsers())
        },

        submitTask () {
            this.createTask({
                name: this.taskName,
            })
            .then(() => this.getCompanyTasks())
        },

        showMore (user) {
            this.getUserStat(user._id)
            .then(() => { this.showModal = true })
        }

    }
}
</script>

<style>

</style>
