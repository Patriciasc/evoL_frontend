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
      class="mx-1 mt-3"
      flat
      label="Search"
      prepend-inner-icon="mdi-magnify"
      solo-inverted
      @keydown.enter="onSearchItem"
    ></v-text-field>

    <v-container fluid>
      <v-row dense>
        <v-col v-for="(item, idx) in items" :key="idx" cols="6" sm="3" md="3">
          <Item :item="item" />
        </v-col>
      </v-row>
    </v-container>
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
    this.getItems('All')
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
        })
        .catch((error) => console.error(error))
    },
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
