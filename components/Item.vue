<template>
  <v-card>
    <v-img
      :src="imageURL"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      @click="onItemClicked"
    >
      <v-card-title v-text="item.price + '€'"></v-card-title>
    </v-img>

    <v-card-text class="title" v-text="item.title"></v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageURL: this.item.imageURL,
    }
  },
  methods: {
    onItemClicked() {
      this.$router.push(`/item/${this.item._id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px !important;
}
</style>
