<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-form ref="form">
          <div align="center" justify="center">
            <ImagePicker v-model="imageName" required @imageURL="setImageURL" />
          </div>

          <v-text-field
            v-model="title"
            type="text"
            label="Ponle un Título"
            clearable
            required
            color="accent"
            :error-messages="titleErrors"
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="description"
            type="text"
            label="Escribe una breve descripción"
            clearable
            required
            color="accent"
            :error-messages="descriptionErrors"
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
          ></v-text-field>

          <v-select
            v-model="category"
            type="text"
            :items="categories"
            label="Elige una categoría"
            required
            color="accent"
            :error-messages="categoryErrors"
            @input="$v.category.$touch()"
            @blur="$v.category.$touch()"
          ></v-select>

          <v-select
            v-model="state"
            type="text"
            :items="states"
            label="Estado"
            required
            color="accent"
            :error-messages="stateErrors"
            @input="$v.state.$touch()"
            @blur="$v.state.$touch()"
          ></v-select>

          <v-text-field
            v-model="price"
            type="number"
            label="Pon precio si quieres. Si lo dejas vacío, entendemos que quieres hacer un regalo"
            required
            color="accent"
            :error-messages="priceErrors"
            @input="$v.price.$touch()"
            @blur="$v.price.$touch()"
          ></v-text-field>

          <div align="right" justify="center">
            <v-btn nuxt to="/"> Volver </v-btn>
            <v-btn color="accent" class="mr-4" @click="createItem"
              >Publicar</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ItemService from '@/services/ItemService.js'
import ImagePicker from '~/components/ImagePicker'

export default {
  components: { ImagePicker },
  mixins: [validationMixin],
  validations: {
    title: { required },
    description: { required },
    category: { required },
    state: { required },
    price: { required },
  },
  data: () => ({
    imageName: '',
    imageURL: '',
    title: '',
    description: '',
    category: '',
    state: '',
    price: 0,
    categories: ['Libros', 'Material', 'Uniformes', 'Juguetes'],
    states: ['A estrenar', 'Muy bien', 'Bien'],
    url: null,
  }),
  computed: {
    imageNameErrors() {
      const errors = []
      if (!this.$v.imageName.$dirty) return errors
      !this.$v.imageName.required && errors.push('Éste campo es obligatorio')
      return errors
    },
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.required && errors.push('Éste campo es obligatorio')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required && errors.push('Éste campo es obligatorio')
      return errors
    },
    categoryErrors() {
      const errors = []
      if (!this.$v.category.$dirty) return errors
      !this.$v.category.required && errors.push('Éste campo es obligatorio')
      return errors
    },
    stateErrors() {
      const errors = []
      if (!this.$v.state.$dirty) return errors
      !this.$v.state.required && errors.push('Éste campo es obligatorio')
      return errors
    },
    priceErrors() {
      const errors = []
      if (!this.$v.price.$dirty) return errors
      !this.$v.price.required && errors.push('Éste campo es obligatorio')
      return errors
    },
  },
  methods: {
    createItem() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        console.log('ERROR publishing item')
      } else {
        const newItem = {
          imageURL: this.imageURL,
          title: this.title,
          description: this.description,
          category: this.category,
          state: this.state,
          price: this.price,
        }
        ItemService.createItem(newItem)
          .then(() => {
            this.$router.push('/item/mine')
          })
          .catch((error) => console.error(error))
      }
    },
    setImageURL(imageURL) {
      this.imageURL = imageURL
    },
  },
}
</script>

<style lang="scss" scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  padding: 20px;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
