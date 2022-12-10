<template>
  <div class="container">
    <MoviesListVue componentTitle="2022 Filmleri" year="2022" :showPagination="true"/>
    <MoviesListVue componentTitle="2021 Filmleri" year="2021" :showPagination="true"/>

  </div>

</template>
  
<script async setup>
import MoviesListVue from '../../components/Movie/MoviesList.vue';
 
components: {
  MoviesListVue
}

</script>
  
  
<style scoped>



</style>