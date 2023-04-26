<template>
  <nav class='flex justify-start px-4 py-4 '>
    <router-link to="/" class="title">Paciente Lista</router-link> 
    <span class='px-2'>|</span>
    <router-link to="/patientadd" class='title'>Paciente Add</router-link>
  </nav>
  <router-view/>
</template>

<style lang="postcss" scoped >
    .title {
        @apply no-underline hover:underline text-blue-500 font-bold;
    }
</style>