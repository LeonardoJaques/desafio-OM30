<template>
  <div class="bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
    <h2 class="text-lg font-semibold mb-2">{{ userData.name }} </h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <label class="text-gray-500 text-sm mb-1">Nome da mãe:</label>
        <span class="text-gray-800 font-medium">{{ userData.motherName }}</span>
      </div>
      <div class="flex flex-col">
        <label class="text-gray-500 text-sm mb-1">Data de nascimento:</label>
        <span class="text-gray-800 font-medium">{{ userData.birthdate }}</span>
      </div>
      <div class="flex flex-col">
        <label class="text-gray-500 text-sm mb-1">CPF:</label>
        <span class="text-gray-800 font-medium">{{ userData.cpf }}</span>
      </div>
      <div class="flex flex-col">
        <label class="text-gray-500 text-sm mb-1">CNS:</label>
        <span class="text-gray-800 font-medium">{{ userData.cns }}</span>
      </div>
      <div class="col-span-2 flex flex-col">
        <label class="text-gray-500 text-sm mb-1">Endereço:</label>
        <span class="text-gray-800 font-medium">{{ userData.street }}, {{ userData.number }}, {{ userData.neighborhood }}, {{ userData.city }} - {{ userData.state }}, {{ userData.cep }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>

import { computed, onMounted } from 'vue'
import store from '@/stores/store'
import router from '@/router'

const userData = computed(() => store.getUserData())

onMounted(() => {
  if (!userData.value.id) {
    router.push({ name: 'PatientView' })
  }
})

</script>
