<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-layout column align-center>
                <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
            </v-layout>
        </v-flex>
        <v-flex xs6>
            <v-card>
                <form @submit.prevent="submitForm()">
                    <v-card-text>
                        <v-subheader>Create a company</v-subheader>
                        
                        <v-text-field placeholder="Company name" v-model="name"></v-text-field>
                        <v-text-field placeholder="Admin email" v-model="email"></v-text-field>
                        <v-text-field placeholder="Admin name" v-model="username"></v-text-field>
                        <v-btn type="submit"> Create</v-btn>
                    </v-card-text>
                 </form>
            </v-card>
        </v-flex>
        <v-flex xs6>
            <v-card>
                <v-card-text>
                    <v-subheader>Список компаний</v-subheader>
                    <v-list v-if="companies.length">
                        <template v-for="company in companies">
                            <v-list-tile :key="company._id + '_tile'">
                                {{company.name }}
                                <v-spacer />
                                <v-btn @click.native="showMore(company)">Подробнее</v-btn>
                            </v-list-tile>
                            <v-divider :key="company._id + '_div'"/>
                        </template>
                    </v-list>
                    <v-alert :value="companies.length < 1">Компаний нет</v-alert>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-dialog v-model="showModal" fullscreen hide-overlay transition="dialog-bottom-transition">
            
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="showModal = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ selectedCompany.name }}</v-toolbar-title>
                </v-toolbar>
                <v-layout row>
                    <v-flex xs6>
                        <v-subheader>Пользователи {{ selectedCompany.name }}</v-subheader>
                        <v-list v-if="users.length > 0">
                            <template v-for="user in users">
                                <v-list-tile :key="user._id + '_tile'" three-line>
                                    <v-list-tile-title>Имя: {{ user.username }}</v-list-tile-title>
                                    <v-list-tile-sub-title>Email: {{ user.email }}</v-list-tile-sub-title>
                                </v-list-tile>
                                <v-divider :key="user._id + '_div'"/>
                            </template>
                        </v-list>
                        <v-alert :value="users.length < 1">Пользователей нет</v-alert>
                    </v-flex>
                    <v-flex xs6>
                        <v-subheader>Таски {{ selectedCompany.name }}</v-subheader>
                        <v-list v-if="tasks.length > 0">
                            <template v-for="task in tasks">
                                <v-list-tile :key="task._id + '_tile'" three-line>
                                    <v-list-tile-title>Название: {{ task.name }}</v-list-tile-title>
                                </v-list-tile>
                                <v-divider :key="task._id + '_div'"/>
                            </template>
                        </v-list>
                        <v-alert :value="tasks.length < 1">Тасков нет</v-alert>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data () {
        return {
            name: '',
            email: '',
            username: '',

            showModal: false,

            selectedCompany: {
                name: ''
            }
        }
    },

    computed: { ...mapState(['companies', 'users', 'tasks']) },

    created () {
        this.getCompanies()
    },

    methods: {
        ...mapActions(['createCompany', 'getCompanies', 'getCompanyUsers', 'getCompanyTasks']),
        submitForm () {
            this.createCompany({
                name: this.name,
                email: this.email,
                username: this.username
            })
        },

        showMore (company) {
            this.selectedCompany.name = company.name
            this.getCompanyUsers(company._id)
                .then(() => this.getCompanyTasks(company._id))
                .then(() => {
                    this.showModal = true
                })
        }
    }
}
</script>

<style>

</style>
