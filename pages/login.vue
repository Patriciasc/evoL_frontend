<template>
  <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model.trim="password"
      :error-messages="passwordErrors"
      type="password"
      label="Contraseña"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

    <v-btn color="primary" nuxt to="/signup"> Sign up </v-btn>
    <v-btn class="mr-4" @click="submit">submit</v-btn>
  </form>
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

      console.log('submitMethod')
      const loginInfo = {
        email: this.email,
        password: this.password,
      }

      UserService.login(loginInfo)
    },
  },
}
</script>
