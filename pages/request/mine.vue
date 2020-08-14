<template>
  <h2
    v-if="userRequests.length === 0"
    align="center"
    justify="center"
    class="mt-16"
  >
    Aún no has solicitado nada. Usa nuestro botón BUSCAR para encontrar lo que
    necesitas.
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
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-2" size="150" tile>
              <v-img :src="request.itemId.imageURL"></v-img>
            </v-avatar>

            <div>
              <v-card-title
                class="headline"
                v-text="request.itemId.title"
              ></v-card-title>

              <v-card-subtitle v-text="request.description"></v-card-subtitle>

              <v-card-text class="text--primary">
                <div v-if="request.state === 'Aceptado'">
                  <v-icon color="green">mdi-progress-check</v-icon>
                  <span>¡{{ request.state }}!</span>
                  <span
                    >{{ request.itemId.owner.name }} ha aceptado tu
                    solicitud.</span
                  >
                  <v-divider></v-divider>
                  <p>Datos de contacto:</p>
                  {{ request.itemId.owner.email }}
                  {{ request.itemId.owner.telephone }}
                </div>

                <div v-else-if="request.state === 'En espera'">
                  <v-icon color="orange">mdi-progress-clock</v-icon>
                  <span
                    >{{ request.state }}. Te avisaremos, desde que el dueño
                    conteste a tu solicitud.
                  </span>
                </div>

                <div v-else-if="request.state === 'Denegado'">
                  <v-icon color="red">mdi-progress-close</v-icon>
                  <span>{{ request.state }}</span>
                  <span>El artículo ha sido asignado a otra persona</span>
                </div>
              </v-card-text>

              <v-card-actions
                v-if="
                  request.state === 'Aceptado' || request.state === 'Denegado'
                "
              >
                <v-row justify="center">
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="accent"
                        outlined
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Eliminar
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline"
                        >Eliminar solicitud</v-card-title
                      >
                      <v-card-text v-if="request.state !== 'Aceptado'"
                        >¿Quieres eliminar ésta solicitud?
                      </v-card-text>
                      <v-card-text v-else>
                        Ésta solicitud está aceptada. Asegúrate de contactar con
                        su dueño, antes de eliminarla. ¿Estás seguro de
                        eliminar?
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="accent" text @click="dialog = false"
                          >No</v-btn
                        >
                        <v-btn
                          color="primary"
                          text
                          @click="removeRequest(request._id)"
                          >Sí</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-card-actions>
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
      dialog: false,
    }
  },
  created() {
    RequestService.getMyRequests()
      .then((requests) => {
        this.userRequests = requests
      })
      .catch((error) => console.error(error))
  },
  methods: {
    removeRequest(requestId) {
      this.dialog = false
      RequestService.deleteRequestbyId(requestId)
        .then((response) => {
          location.reload()
        })
        .catch((error) => console.error(error))
    },
  },
}
</script>

<style lang="scss" scoped>
//TODO
</style>
