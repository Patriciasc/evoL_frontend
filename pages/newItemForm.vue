<template>
  <div>
    <v-form ref="form">
      <ImagePicker v-model="imageURL" />

      <v-text-field
        v-model="title"
        type="text"
        label="Ponle un Título"
      ></v-text-field>

      <v-text-field
        v-model="description"
        type="text"
        label="Escribe una breve descripción"
      ></v-text-field>

      <v-select
        v-model="category"
        type="text"
        :items="categories"
        label="Elige una categoría"
      ></v-select>

      <v-select
        v-model="state"
        type="text"
        :items="states"
        label="Estado"
      ></v-select>

      <v-text-field
        v-model="price"
        type="number"
        label="Ponle un precio si quieres. Si lo dejas en blanco vacío, entendemos que quieres hacer un regalo"
      ></v-text-field>

      <v-btn class="mr-4" @click="createItem">Publicar</v-btn>
    </v-form>
  </div>
</template>

<script>
import ItemService from '@/services/ItemService.js'
import ImagePicker from '~/components/ImagePicker'

export default {
  components: { ImagePicker },
  data: () => ({
    imageURL: 'https://picsum.photos/200/500',
    title: '',
    description: '',
    category: '',
    state: '',
    price: 0,
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
    createItem() {
      const newItem = {
        imageURL: this.imageURL.name,
        title: this.title,
        description: this.description,
        category: this.category,
        state: this.state,
        price: this.price,
      }
      ItemService.createItem(newItem)
        .then(() => {
          console.log('newItemForm: Item was created')
          this.$router.push('/')
        })
        .catch((error) => console.error(error))
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
