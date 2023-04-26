<template>
  <div class="p-4">
    <div class="mb-4 flex justify-between">
      <h1 class="text-xl font-bold">Lista de Pacientes</h1>
      <router-link to="/patientadd" class="bg-blue-500 hover: bg-blue-600 text-white px-2 py-1 rounded mr-2 p-0">Novo Paciente</router-link>
    </div>
    <div class="mb-4">
      <input type="text" class="w-full px-4 py-2 border rounded" placeholder="Buscar pacientes..." v-model='searchQuery'>
    </div>

    <div class="table-header-group bg-gray-200">
      <div class="table-cell text-left font-bold">Nome</div>
      <div class="table-cell text-left font-bold">Idade</div>
      <div class="table-cell text-left font-bold">Sexo</div>
      <div class="table-cell text-left font-bold">Ações</div>
    </div>
    <div class="table-row-group">
      <div v-for="(patient, index) in filterPatients" :key="patient.id" class="table-row">
        <div class="table-cell name-cell">{{ capitalizeFirstLetter(patient.name) }}</div>
        <div class="table-cell">{{ calcularIdade(patient.birthdate) }}</div>
        <div class="table-cell">{{ patient.gender }}</div>
        <div class="table-cell">
          <button @click="selectPatient(patient, true)" class="bg-blue-500 hover: bg-blue-600 text-white px-2 py-1 rounded mr-2 p-0">Ver</button>
          <button class="bg-red-500 hover: bg-red-600 text-white px-2 py-1 rounded mr-2 p-0" @click="deletePatient(index)">Excluir</button>
          <button @click="selectPatient(patient)" class="bg-blue-500 hover: bg-blue-600 text-white px-2 py-1 rounded mr-2 p-0">Editar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePatients } from '@/composables/usePatients';
import { ref, computed, onMounted } from 'vue';
import store from '@/stores/store'
import router from '@/router';

const { patients, deletePatient } = usePatients();

const selectPatient = (patient, isView) => {
  store.setUserData(patient)

  if (isView) {
    router.push({ name: 'PatientProfileView' })
  } else {
    router.push({ name: 'PatienteEdit' })
  }
}

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNascimento = nascimento.getMonth();
  if (mesAtual < mesNascimento || (mesAtual == mesNascimento && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

const searchQuery = ref('');

onMounted(() => usePatients());

function capitalizeFirstLetter(str) {
  return str.toLocaleLowerCase().charAt(0).toUpperCase() + str.toLocaleLowerCase().slice(1);
}

const filterPatients = computed(() => {
  const query = searchQuery.value.toLowerCase();
 
  if (query === '') {
    return patients;
  } else {
    return patients.filter(patient => patient.name.toLowerCase().includes(query));
  }
});



</script>

<style>
.table {
  display: table;
  border-collapse: collapse;
  width: 100%;
}

.table-header-group {
  display: table-header-group;
}

.table-row-group {
  display: table-row-group;
}

.table-row {
  display: table-row;
}

.table-cell {
  display: table-cell;
  vertical-align: middle;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

.table-cell:first-child {
  width: 10%;
}

.name-cell {
  display: table-cell;
  vertical-align: middle;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>