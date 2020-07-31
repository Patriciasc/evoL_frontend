<template>
  <div>
    <v-form ref="form">
      <ImagePicker />
      <v-text-field type="text" label="Ponle un Título"></v-text-field>

      <v-text-field
        type="text"
        label="Escribe una breve descripción"
      ></v-text-field>

      <v-select
        type="text"
        :items="categories"
        label="Elige una categoría"
      ></v-select>

      <v-select type="text" :items="states" label="Estado"></v-select>

      <v-text-field
        type="number"
        label="Ponle un precio si quieres. Si lo dejas en blanco vacío, entendemos que quieres hacer un regalo"
      ></v-text-field>

      <v-btn class="mr-4" @click="publishItem">Publicar</v-btn>
    </v-form>
  </div>
</template>

<script>
import ImagePicker from '~/components/ImagePicker'

export default {
  components: { ImagePicker },
  data: () => ({
    categories: [
      'Todas las categorías',
      'Libros',
      'Material',
      'Uniformes',
      'Juguetes',
    ],
    states: ['A estrenar', 'Muy bien', 'Bien'],
    url: null,
  }),
  methods: {
    publishItem() {
      console.log('publishItem')
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
