<template>
  <div>
    <v-file-input
      label="Selecciona una imagen"
      filled
      prepend-icon="mdi-camera"
    ></v-file-input>

    <v-text-field label="Ponle un Título"></v-text-field>

    <v-text-field label="Escribe una breve descripción"></v-text-field>

    <v-select :items="categories" label="Elige una categoría"></v-select>

    <v-select :items="states" label="Estado"></v-select>

    <v-text-field
      label="Ponle un precio si quieres. Si lo dejas en blanco vacío, entendemos que quieres hacer un regalo"
    ></v-text-field>

    <v-btn class="mr-4" @click="submit">Publicar</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      'Todas las categorías',
      'Libros',
      'Material',
      'Uniformes',
      'Juguetes',
    ],
    states: ['Bueno', 'Muy bueno', 'A estrenar'],
  }),
}
</script>

<style lang="scss" scoped>
//TODO
</style>
