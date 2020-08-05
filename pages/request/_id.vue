<template>
  <div>soy new view</div>
</template>

<script>
import ItemService from '@/services/ItemService.js'

export default {
  data() {
    return {
      item: {},
      imageURL: '',
      description: '',
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    ItemService.getItemById(this.$route.params.id)
      .then((item) => {
        this.item = item
        this.imageURL = item.imageURL
      })
      .catch((error) => console.error(error))
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
