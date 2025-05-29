<script setup lang="ts">
import type { Serie } from '@/models/serie'
import type { Pais } from '@/models/pais'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { computed, onMounted, ref, watch } from 'vue'

const ENDPOINT = 'series'
const props = defineProps({
  mostrar: Boolean,
  serie: {
    type: Object as () => Serie,
    default: () => ({}) as Serie,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const paises = ref<Pais[]>([])

async function cargarPaises() {
  paises.value = await http.get('paises').then((res) => res.data)
}

onMounted(() => {
  cargarPaises()
})

const serie = ref<Serie>({ ...props.serie })
watch(
  () => props.serie,
  (newVal) => {
    serie.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      id_pais: serie.value.id_pais,
      titulo: serie.value.titulo,
      sinopsis: serie.value.sinopsis,
      director: serie.value.director,
      temporadas: serie.value.temporadas,
      fecha_estreno: serie.value.fecha_estreno,
    }
    if (props.modoEdicion && serie.value.id) {
      await http.patch(`${ENDPOINT}/${serie.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    serie.value = {} as Serie
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="id_pais" class="font-semibold w-3">País</label>
        <Dropdown
          id="id_pais"
          v-model="serie.id_pais"
          :options="paises"
          optionLabel="descripcion"
          optionValue="id"
          placeholder="Seleccione un país"
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="titulo" class="font-semibold w-3">Título</label>
        <InputText
          id="titulo"
          v-model="serie.titulo"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="sinopsis" class="font-semibold w-3">Sinopsis</label>
        <InputText id="sinopsis" v-model="serie.sinopsis" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="director" class="font-semibold w-3">Director</label>
        <InputText id="director" v-model="serie.director" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="temporadas" class="font-semibold w-3">Temporadas</label>
        <InputText
          id="temporadas"
          v-model.number="serie.temporadas"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fecha_estreno" class="font-semibold w-3">Fecha de estreno</label>
        <InputText
          id="fecha_estreno"
          type="date"
          v-model="serie.fecha_estreno"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
