<template>
  <div>
    <Navbar />
    <div class=" mt-5">
        <RouterView />
    </div>
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
