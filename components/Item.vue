<template>
  <div>
    <v-card class="mx-1 my-2" width="185" height="240" @click="onItemClicked">
      <v-img class="white--text align-end" height="150px" :src="imageURL">
      </v-img>
      <v-card-title> {{ item.price }} €</v-card-title>
      <v-card-text class="text--primary">
        <div>{{ item.title }}</div>
      </v-card-text>
    </v-card>
  </div>
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
//TODO
</style>
