<template>
  <v-app>
    <v-app-bar elevate-on-scroll fixed app color="primary">
      <v-toolbar-title v-text="title" />
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
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation fixed>
      <v-btn nuxt to="/">
        <span>BUSCAR</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn nuxt to="/item/mine">
        <span>MIS COSAS</span>
        <v-icon>mdi-thumbs-up-down</v-icon>
      </v-btn>

      <v-btn nuxt to="/item/new">
        <v-icon x-large>mdi-plus-circle</v-icon>
      </v-btn>

      <v-btn nuxt to="/request/mine">
        <span>MIS SOLICITUDES</span>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-btn nuxt to="/auth/login">
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
