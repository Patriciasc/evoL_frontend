<template>
  <div>
    <!-- Category tabs -->
    <v-tabs
      v-model="tab"
      show-arrows
      centered
      icons-and-text
      center-active
      flat
      grow
      @change="onTabChanged"
    >
      <v-tabs-slider color="red"></v-tabs-slider>

      <v-tab href="#All">
        Todo
        <v-icon>mdi-circle-slice-8</v-icon>
      </v-tab>

      <v-tab href="#Libros">
        Libros
        <v-icon>mdi-book-open-page-variant</v-icon>
      </v-tab>

      <v-tab href="#Material">
        Material
        <v-icon>mdi-content-cut</v-icon>
      </v-tab>
      <v-tab href="#Uniformes">
        Ropa
        <v-icon>mdi-hanger</v-icon>
      </v-tab>

      <v-tab href="#Juguetes">
        Juguetes
        <v-icon>mdi-racquetball</v-icon>
      </v-tab>
    </v-tabs>

    <!-- Search input -->
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

    <div class="d-flex flex-wrap">
      <Item v-for="(item, idx) in items" :key="idx" :item="item" />
    </div>
  </div>
</template>

<script>
import ItemService from '@/services/ItemService.js'

export default {
  data: () => ({
    searchTerm: '',
    tab: null,
    items: [],
  }),
  created() {
    this.getItems({ category: 'Todas las categorías' })
  },
  methods: {
    onSearchItem() {
      const tabNum = parseInt(this.tab.substr(this.tab.length - 1))
      console.log(this.searchTerm + 'for' + tabNum)
      this.searchTerm = ''
    },
    onTabChanged(tab) {
      this.items = null
      this.$router.push({ path: '/', query: { category: tab } })
      this.getItems(tab)
    },
    getItems(tab) {
      ItemService.getItems(tab)
        .then((items) => {
          this.items = items
          console.log(items)
        })
        .catch((error) => console.error(error))
    },
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
