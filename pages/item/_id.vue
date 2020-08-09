<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-img
          contain
          class="white--text align-end mb-5"
          height="300px"
          :src="imageURL"
        >
        </v-img>
        <div>
          <span class="font-weight-black">{{ price }} €</span>
          <span class="text-uppercase align-right">{{ category }}</span>
        </div>
        <span>Estado: {{ state }}</span>

        <v-divider></v-divider>
        <span class="font-weight-black">{{ title }}</span>
        <p>{{ description }}</p>

        <div v-if="!isYourItem">
          <div v-if="userIsLoggedIn" class="explanation mt-5">
            <span>Explica por qué lo necesitas:</span>
            <v-text-field
              v-model="description"
              type="text"
              label="Explica por qué lo necesitas"
              required
            ></v-text-field>
          </div>

          <div align="right" justify="center">
            <v-btn nuxt to="/"> Volver </v-btn>
            <v-btn nuxt color="accent" class="mr-4" @click="requestAnItem"
              >Solicitar</v-btn
            >
          </div>
        </div>

        <div v-if="isYourItem">
          <v-divider></v-divider>
          <div>
            <div v-if="assignedTo">
              <p>Ya has elegido a quién darle éste artículo.</p>
            </div>
            <div v-else>
              <div>Personas interesadas: {{ requests.length }}</div>
              <div v-for="(request, idx) in requests" :key="idx">
                <v-divider></v-divider>
                <span class="font-weight-black">{{ request.userId.name }}</span>
                <p>{{ request.description }}</p>
                <v-icon large @click="updateRequestState(request._id)">
                  mdi-thumb-up-outline
                </v-icon>
              </div>
            </div>
          </div>
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="accent" outlined dark v-bind="attrs" v-on="on">
                  Eliminar
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline"
                  >Eliminar publicación</v-card-title
                >
                <v-card-text>
                  ¿Quieres eliminar ésta publicación?
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent" text @click="dialog = false">No</v-btn>
                  <v-btn color="primary" text @click="removeItemById">Sí</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemService from '@/services/ItemService.js'
import RequestService from '@/services/RequestService.js'

export default {
  async asyncData({ $axios, params }) {
    const response = await ItemService.getItemById(params.id)
    return { ...response }
  },
  data() {
    return {
      description: '',
      requests: [],
      assignedTo: false,
      dialog: false,
    }
  },
  computed: {
    isYourItem() {
      return this.owner.email === localStorage.getItem('email')
    },
    userIsLoggedIn() {
      return localStorage.getItem('email') !== null
    },
  },
  created() {
    ItemService.getItemById(this.$route.params.id)
      .then((item) => {
        if (item.assignedTo === null) {
          RequestService.getRequestsByItemId(this.$route.params.id)
            .then((requests) => {
              this.requests = requests
            })
            .catch((error) => console.error(error))
        } else {
          this.assignedTo = true
        }
      })
      .catch((error) => console.error(error))
  },
  methods: {
    requestAnItem() {
      if (this.userIsLoggedIn) {
        const newRequest = {
          description: this.description,
          itemId: this.$route.params.id,
        }
        RequestService.addRequest(newRequest)
          .then((request) => {
            console.log(request)
          })
          .catch((error) => console.error(error))
        this.$router.push(`/request/mine`)
      } else {
        this.$router.push(`/auth/login`)
      }
    },
    updateRequestState(requestId) {
      console.log(requestId)
      const request = {
        id: requestId,
        itemId: this.$route.params.id,
      }
      RequestService.updateRequest(request)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => console.error(error))
    },
    removeItemById() {
      this.dialog = false
      ItemService.deleteItembyId(this.$route.params.id)
        .then((response) => {
          this.$router.push(`/item/mine`)
        })
        .catch((error) => console.error(error))
    },
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
