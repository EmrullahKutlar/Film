<template>
  <div class="container">
    <MovieCarouselVue  :is-popular="true" title="Popüler Diziler" />
    <MoviesListVue componentTitle="2022 Filmleri" year="2022" :showPagination="true"/>
    <MoviesListVue componentTitle="2021 Filmleri" year="2021" :showPagination="true"/>

  </div>

</template>
  
<script async setup>
import MoviesListVue from '../../components/Movie/MoviesList.vue';
import MovieCarouselVue from '../../components/Movie/MovieCarousel.vue';
 
components: {
  MoviesListVue,
  MovieCarouselVue
}

</script>
  
  
<style scoped>



</style>