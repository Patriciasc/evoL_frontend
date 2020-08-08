<template>
  <h2
    v-if="userRequests.length === 0"
    align="center"
    justify="center"
    class="mt-16"
  >
    Aún no has solicitado nada.
  </h2>

  <v-container v-else class="mx-auto">
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
                <div v-if="request.state === 'Aceptado'">
                  <span><v-icon color="green">mdi-progress-check</v-icon></span>
                  <span>ESTADO: ¡{{ request.state }}!</span>
                  Contacta con:
                  {{ request.userId.name }}
                  {{ request.userId.email }}
                  {{ request.userId.telephone }}
                </div>
                <div v-else-if="request.state === 'En espera'">
                  <span
                    ><v-icon color="orange">mdi-progress-clock</v-icon></span
                  >
                  <span>ESTADO: {{ request.state }}</span>
                </div>
                <div v-else-if="request.state === 'Denegado'">
                  <span><v-icon color="red">mdi-progress-close</v-icon></span>
                  <span>ESTADO: {{ request.state }}</span>
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
      })
      .catch((error) => console.error(error))
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
