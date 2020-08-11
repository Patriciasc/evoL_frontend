<template>
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
      <v-col
        v-for="(element, idx) in userItems"
        :key="idx"
        cols="6"
        sm="3"
        md="3"
      >
        <v-card>
          <v-img
            :src="element.item.imageURL"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            @click="onItemClicked(element.item._id)"
          >
          </v-img>

          <v-card-text
            align="center"
            justify="center"
            class="title"
            v-text="element.item.title"
          ></v-card-text>

          <div v-if="element.item.assignedTo === null">
            <p
              align="center"
              justify="center"
              class="font-weight-bold"
              v-text="element.request.length + ' interesados'"
            ></p>
          </div>
          <div v-else>
            <p
              align="center"
              justify="center"
              class="font-weight-bold"
              v-text="'Asignado'"
            ></p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemService from '@/services/ItemService.js'
import RequestService from '@/services/RequestService.js'

export default {
  data() {
    return {
      userItems: [],
    }
  },
  computed: {},
  created() {
    ItemService.getMyItems()
      .then((items) => {
        const result = items.map((item) => {
          return RequestService.getRequestsByItemId(item._id).then(
            (request) => {
              return {
                item,
                request,
              }
            }
          )
        })

        Promise.all(result).then((value) => (this.userItems = value))
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
.title {
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px !important;
}
</style>
