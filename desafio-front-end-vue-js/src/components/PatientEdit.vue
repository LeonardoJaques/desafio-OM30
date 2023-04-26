<template>
    <div class="bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
      <h2 class="text-lg font-semibold mb-2">
        <input v-model="newData.name" class="text-gray-800 font-medium w-full" />
      </h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label class="text-gray-500 text-sm mb-1">Nome da mãe:</label>
          <input v-model="newData.motherName" class="text-gray-800 font-medium" />
        </div>
        <div class="flex flex-col">
          <label class="text-gray-500 text-sm mb-1">Data de nascimento:</label>
          <input v-model="newData.birthdate" class="text-gray-800 font-medium" />
        </div>
        <div class="flex flex-col">
          <label class="text-gray-500 text-sm mb-1">CPF:</label>
          <input v-model="newData.cpf" class="text-gray-800 font-medium" />
        </div>
        <div class="flex flex-col">
          <label class="text-gray-500 text-sm mb-1">CNS:</label>
          <input v-model="newData.cns" class="text-gray-800 font-medium" />
        </div>
        <div class="col-span-2 flex flex-col">
          <label class="text-gray-500 text-sm mb-1">Endereço:</label>
          <div>
            <input v-model="newData.street" class="text-gray-800 font-medium mr-2" />
            <input v-model="newData.number" class="text-gray-800 font-medium mr-2" />
            <input v-model="newData.neighborhood" class="text-gray-800 font-medium mr-2" />
            <input v-model="newData.city" class="text-gray-800 font-medium mr-2" />
            <input v-model="newData.state" class="text-gray-800 font-medium mr-2" />
            <input v-model="newData.cep" class="text-gray-800 font-medium" />
          </div>
        </div>
      </div>
      <button @click="updateUserData" class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
        Update
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed, reactive,onMounted } from 'vue';
  import store from '@/stores/store';
  import router from '@/router';
  
  const userData = computed(() => store.getUserData());
  const id = userData.value.id
  const newData = reactive({
    name: userData.value.name,
    motherName: userData.value.motherName,
    birthdate: userData.value.birthdate,
    cpf: userData.value.cpf,
    cns: userData.value.cns,
    street: userData.value.street,
    number: userData.value.number,
    neighborhood: userData.value.neighborhood,
    city: userData.value.city,
    state: userData.value.state,
    cep: userData.value.cep,
    gender: userData.value.gender,
  });


  onMounted(() => {
  if (!userData.value.id) {
    router.push({ name: 'PatientView' })
  }
})
  
  async function updateUserData() {
    store.setUserData(newData);
    try {
    const response = await fetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    store.setUserData(newData)
    router.push({ name: 'PatientView' })
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
  }
  </script>
  