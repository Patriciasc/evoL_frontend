<template>
  <v-container class="fill-height" fluid>
    <v-snackbar v-model="snackbar" top>
      Usuario o contraseña incorrecto.

      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-toolbar color="secondary" flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field
                v-model="email"
                prepend-icon="mdi-account"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>

              <v-text-field
                v-model.trim="password"
                prepend-icon="mdi-lock"
                :error-messages="passwordErrors"
                type="password"
                label="Contraseña"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn nuxt to="/auth/signup"> Registrarse</v-btn>
            <v-btn color="primary" class="mr-4" @click="submit">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import UserService from '@/services/UserService.js'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required },
  },

  data: () => ({
    snackbar: false,
    email: '',
    password: '',
  }),

  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('E-mail no es correcto')
      !this.$v.email.required && errors.push('Éste campo es obligatorio')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Éste campo es obligatorio')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        console.log('ERROR in login')
      } else {
        const loginInfo = {
          email: this.email,
          password: this.password,
        }

        UserService.login(loginInfo)
          .then((response) => {
            localStorage.setItem('name', response.data.name)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('token', response.data.token)
            this.$router.push(`/`)
          })
          .catch((error) => {
            this.snackbar = true
            console.error(error)
          })
      }
    },
  },
}
</script>
