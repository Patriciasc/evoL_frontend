<template>
  <v-app>
    <v-app-bar color="F76469" elevate-on-scroll fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-icon large>mdi-account-circle-outline</v-icon>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }} psc</span>
    </v-footer>
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
