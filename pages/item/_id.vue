<template>
  <div>
    <v-img contain class="white--text align-end" height="300px" :src="imageURL">
    </v-img>
    <div>{{ price }} €</div>
    <div>{{ category }}</div>
    <div>{{ state }}</div>

    <div>{{ title }}</div>
    <div>{{ description }}</div>

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

      <v-btn nuxt to="/"> Volver </v-btn>
      <v-btn nuxt color="accent" class="mr-4" @click="requestAnItem"
        >Solicitar</v-btn
      >
    </div>

    <div v-if="isYourItem">
      <v-divider></v-divider>
      <div>
        <div v-if="assignedTo">
          Ya has elegido a quién darle éste artículo.
          <v-icon large>
            mdi-trash-can-outline
          </v-icon>
        </div>
        <div v-else>
          <div>Usuarios interesados: {{ requests.length }}</div>
          <div v-for="(request, idx) in requests" :key="idx">
            {{ request.userId.name }}
            {{ request.description }}
            <v-icon large @click="updateRequestState(request._id)">
              mdi-thumb-up-outline
            </v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
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
          console.log(item.assignedTo)
          RequestService.getRequestsByItemId(this.$route.params.id)
            .then((requests) => {
              this.requests = requests
              console.log(this.requests)
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
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
