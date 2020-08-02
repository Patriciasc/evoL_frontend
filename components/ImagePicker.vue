<template>
  <div
    class="base-image-input"
    :style="{ 'background-image': `url(${imageData})` }"
    @click="chooseImage"
  >
    <span v-if="!imageData" class="placeholder">
      <v-icon x-large>mdi-camera-plus-outline</v-icon>
    </span>

    <input
      ref="fileInput"
      class="file-input"
      type="file"
      accept="image/*"
      @change="onSelectFile"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageData: null,
    }
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click()
    },
    onSelectFile(e) {
      const files = this.$refs.fileInput.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
          this.uploadFile(files[0])
        }
        reader.readAsDataURL(files[0])
      }
    },
    async uploadFile(file) {
      const storageRef = this.$fireStorage.ref().child(file.name)
      try {
        await storageRef.put(file, {
          contentType: 'image/*',
        })
        this.getFileUrl(file.name)
      } catch (e) {
        alert(e.message)
      }
    },
    async getFileUrl(fileName) {
      const storageRef = this.$fireStorage.ref().child(fileName)
      try {
        const url = await storageRef.getDownloadURL()
        this.$emit('imageURL', url)
      } catch (e) {
        alert(e.message)
      }
    },
  },
}
</script>

<style scoped>
.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
</style>
