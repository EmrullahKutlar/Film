<template>
  <div>
    <Navbar />
    <RouterView />

  </div>

</template>


<script setup>
import Navbar from '@/components/general/Navbar.vue'
components: {
  Navbar
}

</script>


<style scoped>

</style>
