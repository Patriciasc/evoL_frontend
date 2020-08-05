<template>
  <div>
    <v-img class="white--text align-end" height="150px" :src="imageURL">
    </v-img>
    <div>{{ price }} €</div>
    <div>{{ category }}</div>
    <div>{{ state }}</div>

    <div>{{ title }}</div>
    <div>{{ description }}</div>

    <div v-if="!isYourItem">
      <div class="explanation mt-5">
        <span>Explica por qué lo necesitas:</span>
        <v-text-field
          v-model="description"
          type="text"
          label="Explica por qué lo necesitas"
          required
        ></v-text-field>
      </div>

      <v-btn nuxt to="/"> Atrás </v-btn>
      <v-btn nuxt color="primary" class="mr-4" @click="requestAnItem"
        >Solicitar</v-btn
      >
    </div>

    <div v-if="isYourItem">
      <v-divider></v-divider>
      <div>Usuarios interesados: {{ requests.length }}</div>
      <div v-for="(request, idx) in requests" :key="idx">
        <v-divider></v-divider>
        {{ request.userId.name }}
        {{ request.description }}
        <div>
          <v-icon large @click="notAcceptedRequest">
            mdi-thumb-down-outline
          </v-icon>

          <v-icon large @click="acceptedRequest">
            mdi-thumb-up-outline
          </v-icon>
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
    }
  },
  computed: {
    isYourItem() {
      return this.owner.email === localStorage.getItem('email')
    },
  },
  created() {
    RequestService.getRequestsByItemId(this.$route.params.id)
      .then((requests) => {
        this.requests = requests
        console.log(this.requests)
      })
      .catch((error) => console.error(error))
  },
  methods: {
    requestAnItem() {
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
    },
    notAcceptedRequest() {
      alert('Not accepted')
    },
    acceptedRequest() {
      alert('Accepted')
    },
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
