<script setup lang="ts">
import SerieList from '@/components/serie/SerieList.vue'
import Button from 'primevue/button'
import { ref } from 'vue'
import SerieSave from '@/components/serie/SerieSave.vue'

const mostrarDialog = ref(false)
const serieListRef = ref<typeof SerieList | null>(null)
const serieEdit = ref<any>(null)

function handleCreate() {
  serieEdit.value = {
    fecha_estreno: new Date().toISOString().split('T')[0],
  }
  mostrarDialog.value = true
}

function handleEdit(serie: any) {
  serieEdit.value = serie
  serieEdit.value.fecha_estreno = new Date(serieEdit.value.fecha_estreno)
    .toISOString()
    .split('T')[0]
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  serieListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Series</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <SerieList ref="serieListRef" @edit="handleEdit" />
    <SerieSave
      :mostrar="mostrarDialog"
      :serie="serieEdit"
      :modoEdicion="!!serieEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
