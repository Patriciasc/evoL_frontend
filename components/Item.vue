<template>
  <div>
    <v-card class="mx-1 my-2" width="185" height="240" @click="onItemClicked">
      <v-img class="white--text align-end" height="150px" :src="imageURL">
      </v-img>
      <v-card-title> {{ item.price }} €</v-card-title>
      <v-card-text>
        <p>{{ item.title }}</p>
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
p {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}
</style>
