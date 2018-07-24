<template>
  <v-app>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
      >
      <v-list>
        <v-list-tile 
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="item.href">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title> {{ profile.username }} - {{ userRole }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-md>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <v-snackbar
      v-model="snackbar.show"
      multi-line
      right
      top
    >
      {{ snackbar.text }}
      <v-btn color="pink" flat @click="hideSnackbar()">Close</v-btn>
    </v-snackbar>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Auth', href: '/'},
          { icon: 'bubble_chart', title: 'Superadmin', href: '/superadmin' },
          { icon: 'bubble_chart', title: 'Admin', href: '/admin' },
          { icon: 'bubble_chart', title: 'User', href: '/user' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },

    computed: {
      ...mapState(['snackbar', 'profile']),
      userRole () {
        switch(this.profile.role) {
          case 0: return 'SupeAdmin'
          case 1: return 'Admin'
          case 2: return 'Moderator'
          case 3: return 'User'
        }
      }
    },

    methods: { ...mapMutations(['hideSnackbar']) }
  }
</script>
