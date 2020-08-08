<template>
  <!--Tus publicaciones-->
  <div v-if="userItems.length === 0">
    Aún no has publicado nada.
  </div>
  <div v-else class="d-flex flex-wrap">
    <Item v-for="(item, idx) in userItems" :key="idx" :item="item" />
  </div>
</template>

<script>
import ItemService from '@/services/ItemService.js'
import Item from '~/components/Item'

export default {
  components: {
    Item,
  },
  data() {
    return {
      userItems: [],
    }
  },
  created() {
    ItemService.getMyItems()
      .then((items) => {
        this.userItems = items
      })
      .catch((error) => console.error(error))
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
