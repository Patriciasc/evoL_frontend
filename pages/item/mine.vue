<template>
  <!--Tus publicaciones-->
  <h2
    v-if="userItems.length === 0"
    align="center"
    justify="center"
    class="mt-16"
  >
    Aún no has publicado nada.
  </h2>

  <v-container v-else fluid>
    <v-row dense>
      <v-col v-for="(item, idx) in userItems" :key="idx" cols="6" sm="3" md="3">
        <v-card>
          <v-img
            :src="item.imageURL"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            @click="onItemClicked(item._id)"
          >
          </v-img>

          <v-card-text
            align="center"
            justify="center"
            v-text="item.title"
          ></v-card-text>

          <p
            align="center"
            justify="center"
            class="font-weight-bold"
            v-text="requesters + ' interesados'"
          ></p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemService from '@/services/ItemService.js'

export default {
  components: {},
  data() {
    return {
      userItems: [],
      requesters: 0,
    }
  },
  created() {
    ItemService.getMyItems()
      .then((items) => {
        this.userItems = items
      })
      .catch((error) => console.error(error))
  },
  methods: {
    onItemClicked(id) {
      this.$router.push(`/item/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
