<template>
  <!--
  <div v-if="userRequests.length === 0">
    <p>Aún no has solicitado nada.</p>
  </div>
  <div v-else class="d-flex flex-wrap">
    <div v-for="(request, idx) in userRequests" :key="idx">
      <v-card class="mx-1 my-2" width="330" height="280">
        <v-img
          contain
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
-->
  <v-container class="mx-auto">
    <v-row dense>
      <v-col
        v-for="(request, i) in userRequests"
        :key="i"
        cols="12"
        sm="8"
        md="6"
      >
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="request.itemId.imageURL"></v-img>
            </v-avatar>

            <div>
              <v-card-title
                class="headline"
                v-text="request.itemId.title"
              ></v-card-title>

              <v-card-subtitle v-text="request.userId.name"></v-card-subtitle>

              <v-card-text class="text--primary">
                <div>ESTADO: {{ request.state }}</div>
                <div v-if="request.state === 'Aceptado'">
                  Contacta con:
                  {{ request.userId.name }}
                  {{ request.userId.email }}
                  {{ request.userId.telephone }}
                </div>
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
