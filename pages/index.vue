<template>
  <div>
    <v-tabs
      v-model="tab"
      show-arrows
      centered
      icons-and-text
      center-active
      flat
      grow
    >
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

    <v-text-field
      v-model="searchTerm"
      clearable
      class="mx-1 my-2"
      flat
      hide-details
      label="Search"
      prepend-inner-icon="mdi-magnify"
      solo-inverted
      @keydown.enter="onSearchItem"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchTerm: '',
    tab: null,
  }),
  methods: {
    onSearchItem() {
      console.log(this.searchTerm)
      console.log(this.tab)
      this.searchTerm = ''
    },
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
