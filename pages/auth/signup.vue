<template>
  <v-container class="fill-height" fluid>
    <v-snackbar v-model="snackbar" top>
      Revisa el formulario y rellena los datos obligatorios.

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
            <v-toolbar-title>Registro</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field
                v-model="name"
                prepend-icon="mdi-account"
                :error-messages="nameErrors"
                :counter="35"
                label="* Nombre completo"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="email"
                prepend-icon="mdi-email-outline"
                :error-messages="emailErrors"
                label="* E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>

              <v-text-field
                v-model.trim="password"
                prepend-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="passwordErrors"
                :type="show ? 'text' : 'password'"
                label="* Contraseña"
                required
                @click:append="show = !show"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>

              <v-text-field
                v-model.trim="repeatPassword"
                prepend-icon="mdi-lock"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="repeatPasswordErrors"
                :type="show2 ? 'text' : 'password'"
                label="* Repite la contraseña"
                required
                @click:append="show2 = !show2"
                @input="$v.repeatPassword.$touch()"
                @blur="$v.repeatPassword.$touch()"
              ></v-text-field>

              <v-text-field
                v-model.trim="telephone"
                prepend-icon="mdi-phone-outline"
                label="Número de teléfono"
              ></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" class="mr-4" @click="submit"
              >Registrarse</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" align="center" justify="center">
        <span>¿Ya tienes una cuenta?</span>
        <v-btn nuxt to="/auth/login" small> Entrar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs } from 'vuelidate/lib/validators'
import UserService from '@/services/UserService.js'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(35) },
    email: { required, email },
    password: { required },
    repeatPassword: { required, sameAsPassword: sameAs('password') },
  },

  data: () => ({
    snackbar: false,
    name: '',
    email: '',
    show: false,
    show2: false,
    password: '',
    repeatPassword: '',
    telephone: '',
  }),

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('El nombre puede tener como máximo 35 caracteres')
      !this.$v.name.required && errors.push('Éste campo es obligatorio')
      return errors
    },
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
    repeatPasswordErrors() {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.required &&
        errors.push('Éste campo es obligatorio')
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push('Las contraseñas no coinciden')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        console.log('ERROR in register')
      } else {
        const signupInfo = {
          name: this.name,
          email: this.email,
          password: this.password,
          telephone: this.telephone,
        }

        UserService.signup(signupInfo)
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

<style lang="scss" scoped>
//TODO
</style>
