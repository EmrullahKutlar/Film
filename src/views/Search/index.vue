<template>
  <div class="container">
    <MoviesListVue v-if="renderComponent" :componentTitle="'Search-'+' '+searchQuery" :search="searchQuery" :type="typeQuery" :showPagination="true" />

  </div>

</template>
  
<script async setup>
import MoviesListVue from '../../components/Movie/MoviesList.vue';
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue'

import { nextTick, ref } from 'vue';
const renderComponent = ref(true);

const forceRerender = async () => {
  window.scrollTo(0, 0);
  renderComponent.value = false;
	await nextTick();
  renderComponent.value = true;
};
const route = useRoute()

const searchQuery = computed(() => route.query.q)
const typeQuery = computed(() => route.query.type)
watch(() => route.fullPath, () =>  forceRerender())

components: {
  MoviesListVue
}
</script>

<style>

</style>