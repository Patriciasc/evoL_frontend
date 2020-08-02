<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="35"
      label="* Nombre completo"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="* E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model.trim="password"
      :error-messages="passwordErrors"
      type="password"
      label="* Contraseña"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

    <v-text-field
      v-model.trim="repeatPassword"
      :error-messages="repeatPasswordErrors"
      type="password"
      label="* Repite la contraseña"
      required
      @input="$v.repeatPassword.$touch()"
      @blur="$v.repeatPassword.$touch()"
    ></v-text-field>

    <v-text-field
      v-model.trim="telephone"
      label="Número de teléfono"
    ></v-text-field>

    <v-btn class="mr-4" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
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
    name: '',
    email: '',
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

      console.log('submitMethod')
      const signupInfo = {
        name: this.name,
        email: this.email,
        password: this.password,
        telephone: this.telephone,
      }

      UserService.signup(signupInfo)
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.password = ''
      this.repeatPassword = ''
      this.telephone = ''
    },
  },
}
</script>
