<template>
  <v-container class="fill-height" fluid>
    <v-card class="mx-auto" max-width="500">
      <v-img class="mt-5" contain height="300px" :src="imageURL"> </v-img>

      <v-card-title> {{ title }}</v-card-title>

      <v-card-text>
        <div class="grey--text">{{ category }}</div>

        <div class="my-4 subtitle-1">{{ price }} €</div>

        <div>Estado: {{ state }}</div>

        <div>{{ description }}</div>
      </v-card-text>

      <div v-if="!isYourItem">
        <v-divider class="mx-4"></v-divider>
        <div v-if="userIsLoggedIn" class="explanation mt-5">
          <v-card-title>¿Por qué lo necesitas?</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="comment"
              type="text"
              label="Explica por qué lo necesitas"
              :counter="100"
              required
              :error-messages="commentErrors"
              @input="$v.comment.$touch()"
              @blur="$v.comment.$touch()"
            ></v-text-field>
          </v-card-text>
        </div>

        <v-card-actions>
          <v-btn text nuxt to="/"> Volver </v-btn>
          <v-btn text nuxt color="primary" class="mr-4" @click="requestAnItem"
            >Solicitar</v-btn
          >
        </v-card-actions>
      </div>

      <div v-if="isYourItem">
        <v-divider class="mx-4"></v-divider>
        <div>
          <div v-if="assignedTo">
            <v-card-text
              >Ya has elegido a quién darle éste artículo. Espera a que se ponga
              en contacto contigo para que se pongan de acuerdo sobre la
              entrega.
            </v-card-text>
          </div>
          <div v-else>
            <v-card-title
              >Personas interesadas: {{ requests.length }}
            </v-card-title>
            <v-card-text v-if="requests.length > 0">
              Elige a quién quieres entregarle el artículo.
            </v-card-text>
            <v-card-text>
              <div v-for="(request, idx) in requests" :key="idx">
                <span class="font-weight-black">{{ request.userId.name }}</span>
                <p>{{ request.comment }}</p>
                <div align="center" justify="center">
                  <v-icon large @click="updateRequestState(request._id)">
                    mdi-thumb-up-outline
                  </v-icon>
                </div>
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </div>
        </div>
        <v-card-actions v-if="requests.length === 0">
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" icon v-on="on">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
              <v-btn v-if="!assignedTo" color="primary" icon>
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Eliminar publicación</v-card-title>
              <v-card-text>
                ¿Quieres eliminar ésta publicación?
              </v-card-text>

              <v-card-actions>
                <v-btn color="accent" text @click="dialog = false">No</v-btn>
                <v-btn color="primary" text @click="removeItemById">Sí</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </div>
    </v-card>

    <!--
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-img
          contain
          class="white--text align-end mb-5 rounded"
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
              v-model="comment"
              type="text"
              label="Explica por qué lo necesitas"
              :counter="100"
              required
              :error-messages="commentErrors"
              @input="$v.comment.$touch()"
              @blur="$v.comment.$touch()"
            ></v-text-field>
          </div>

          <div class="mt-6" align="right" justify="center">
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
                <p>{{ request.comment }}</p>
                <v-icon large @click="updateRequestState(request._id)">
                  mdi-thumb-up-outline
                </v-icon>
              </div>
            </div>
          </div>
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mt-6"
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
    -->
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ItemService from '@/services/ItemService.js'
import RequestService from '@/services/RequestService.js'

export default {
  mixins: [validationMixin],
  validations: {
    comment: { required },
  },
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
      comment: '',
    }
  },
  computed: {
    isYourItem() {
      return this.owner.email === localStorage.getItem('email')
    },
    userIsLoggedIn() {
      return localStorage.getItem('email') !== null
    },
    commentErrors() {
      const errors = []
      if (!this.$v.comment.$dirty) return errors
      !this.$v.comment.required && errors.push('Éste campo es obligatorio')
      return errors
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
      console.log('requestAnItem')
      if (this.userIsLoggedIn) {
        this.$v.$touch()

        if (this.$v.$invalid) {
          console.log('ERROR requesting item')
        } else {
          const newRequest = {
            comment: this.comment,
            itemId: this.$route.params.id,
          }
          console.log(newRequest)
          RequestService.addRequest(newRequest)
            .then((request) => {
              console.log(request)
            })
            .catch((error) => console.error(error))
          this.$router.push(`/request/mine`)
        }
      } else {
        console.log('User is not logged in')
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
          location.reload()
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
