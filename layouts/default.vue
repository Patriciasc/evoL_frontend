<template>
  <v-app>
    <v-app-bar color="F76469" elevate-on-scroll fixed app>
      <v-toolbar-title v-text="title" />
      <!--
      <v-spacer />
      <v-icon large>mdi-account-circle-outline</v-icon>
      -->
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation fixed>
      <v-btn nuxt to="/">
        <span>BUSCAR</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn nuxt to="/userItems">
        <span>PUBLICACIONES</span>
        <v-icon>mdi-thumbs-up-down</v-icon>
      </v-btn>

      <v-btn nuxt to="/newItemForm">
        <v-icon x-large>mdi-plus-circle</v-icon>
      </v-btn>

      <v-btn>
        <span>SOLICITUDES</span>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-btn nuxt to="/login">
        <span>PERFIL</span>
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!--
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }} psc</span>
    </v-footer>
      -->
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
    }
  },
}
</script>
