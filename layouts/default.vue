<template>
  <v-app>
    <v-app-bar elevate-on-scroll fixed app color="primary" dense dark>
      <v-toolbar-title v-text="title" />

      <v-spacer></v-spacer>

      <div class="hidden-md-and-down">
        <v-btn nuxt to="/" dark text>
          <v-icon>mdi-magnify</v-icon>
          <span>BUSCAR</span>
        </v-btn>

        <v-btn v-if="userIsLoggedIn" nuxt to="/item/mine" text>
          <v-icon>mdi-thumbs-up-down</v-icon>
          <span> MIS COSAS</span>
        </v-btn>

        <v-btn v-if="!userIsLoggedIn" nuxt to="/auth/login">
          <v-icon>mdi-plus-circle</v-icon>
          <span>PUBLICAR</span>
        </v-btn>
        <v-btn v-else nuxt to="/item/new">
          <v-icon>mdi-plus-circle</v-icon>
          <span>PUBLICAR</span>
        </v-btn>

        <v-btn v-if="userIsLoggedIn" nuxt to="/request/mine" text>
          <v-icon>mdi-heart</v-icon>
          <span>DESEOS</span>
        </v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-icon>mdi-account-circle-outline</v-icon>
              <span>PERFIL</span>
            </v-btn>
          </template>

          <v-list>
            <div v-if="!userIsLoggedIn">
              <v-list-item nuxt to="/auth/login">
                <v-list-item-title
                  ><v-icon>mdi-login</v-icon>Login</v-list-item-title
                >
              </v-list-item>
            </div>
            <div v-else>
              <v-list-item @click="userLogOut">
                <v-list-item-title
                  ><v-icon>mdi-logout</v-icon>Logout</v-list-item-title
                >
              </v-list-item>
            </div>
          </v-list>
        </v-menu>
      </div>

      <!--
      <template v-slot:extension>
        <v-tabs show-arrows centered icons-and-text center-active flat>
          <v-tabs-slider color="red"></v-tabs-slider>

          <v-tab href="#tab-1">
            Todo
            <v-icon>mdi-circle-slice-8</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Libros
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-tab>

          <v-tab href="#tab-3">
            Material
            <v-icon>mdi-content-cut</v-icon>
          </v-tab>
          <v-tab href="#tab-4">
            Ropa
            <v-icon>mdi-hanger</v-icon>
          </v-tab>

          <v-tab href="#tab-5">
            Juguetes
            <v-icon>mdi-racquetball</v-icon>
          </v-tab>
        </v-tabs>
      </template>
      -->
    </v-app-bar>

    <v-main>
      <v-container class="hasToolbar">
        <nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation fixed class="hidden-lg-and-up">
      <v-btn nuxt to="/">
        <span>BUSCAR</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn v-if="userIsLoggedIn" nuxt to="/item/mine">
        <span>MIS COSAS</span>
        <v-icon>mdi-thumbs-up-down</v-icon>
      </v-btn>

      <v-btn v-if="!userIsLoggedIn" nuxt to="/auth/login">
        <v-icon color="primary" x-large>mdi-plus-circle</v-icon>
      </v-btn>
      <v-btn v-else nuxt to="/item/new">
        <v-icon color="primary" x-large>mdi-plus-circle</v-icon>
      </v-btn>

      <v-btn v-if="userIsLoggedIn" nuxt to="/request/mine">
        <span>DESEOS</span>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-menu top offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">
            <span>PERFIL</span>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <div v-if="!userIsLoggedIn">
            <v-list-item dense nuxt to="/auth/login">
              <v-list-item-title
                ><v-icon>mdi-login</v-icon>Login</v-list-item-title
              >
            </v-list-item>
          </div>
          <div v-else>
            <v-list-item dense @click="userLogOut">
              <v-list-item-title
                ><v-icon>mdi-logout</v-icon>Logout</v-list-item-title
              >
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </v-bottom-navigation>

    <template>
      <v-footer padless>
        <v-col class="text-center hidden-md-and-down" cols="12">
          &copy; {{ new Date().getFullYear() }} — <strong>psc</strong>
        </v-col>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'evoL',
      isLogged: false,
    }
  },
  computed: {
    userIsLoggedIn() {
      return this.isLogged || localStorage.getItem('email') !== null
    },
  },
  mounted() {
    this.$nuxt.$on('userIsLoggedIn', (isLogged) => {
      this.isLogged = isLogged
    })
  },
  methods: {
    userLogOut() {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      localStorage.removeItem('token')
      location.reload()
      this.$router.push(`/`)
    },
  },
}
</script>

<style lang="scss" scoped>
.hasToolbar {
  margin-bottom: 46px;
}
</style>
