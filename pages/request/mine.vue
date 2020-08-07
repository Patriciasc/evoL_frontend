<template>
  <div class="d-flex flex-wrap">
    <div v-for="(request, idx) in userRequests" :key="idx">
      <v-card class="mx-1 my-2" width="330" height="280">
        <v-img
          class="white--text align-end"
          height="150px"
          :src="request.itemId.imageURL"
        >
        </v-img>
        <v-card-title> {{ request.itemId.price }} €</v-card-title>
        <v-card-text class="text--primary">
          <div>{{ request.itemId.title }}</div>
          <div>{{ request.state }}</div>
          <div v-if="request.state === 'Aceptado'">
            Contacta con:
            {{ request.userId.name }}
            {{ request.userId.email }}
            {{ request.userId.telephone }}
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import RequestService from '@/services/RequestService.js'

export default {
  data() {
    return {
      userRequests: [],
    }
  },
  created() {
    RequestService.getMyRequests()
      .then((requests) => {
        this.userRequests = requests
        console.log(this.userRequests)
      })
      .catch((error) => console.error(error))
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
