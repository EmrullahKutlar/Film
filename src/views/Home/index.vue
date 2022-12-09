<template>
  <div class="container">
    <div class="row d-flex">
      <div class="col-12 d-flex flex-row flex-wrap justify-content-start align-items-center ">
        <div class="card border-0 mx-3 mb-3 film-card rounded-5" v-for="i in 12" :key="i">
          <img
            src="https://m.media-amazon.com/images/M/MV5BOWRhMWQ2MzctOWRlMy00MDhjLTlkNmQtNzQyMzBjM2M1YzY0XkEyXkFqcGdeQXVyMjM4MTU4NjQ@._V1_SX300.jpg"
            class="card-img-top" alt="...">
          <div class="card-body ">
            <h5 class="card-title text-light text-center">Sidemen Charity Match 2022 (Sidemen FC VS Youtube Allstars)
              <span class="text-warning">(2022)</span>
            </h5>
          </div>
        </div>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <vue-awesome-paginate
      :total-items="10*250"
      :items-per-page="10"
      :max-pages-shown="7"
      v-model="page"
      :on-click="onClickHandler"
    />
      </div>
    </div>
  </div>

</template>
  
<script setup>
import { ref } from 'vue'
const page = ref(1)
const onClickHandler = (page) => {
    console.log(page);
  };


</script>
  
<style >
.card {
  width: 18rem;
  background-color: transparent;
  cursor: pointer;
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(61, 61, 61);
  /* border: 1px solid rgb(217, 217, 217); */
  color: #ffc107;
}

.paginate-buttons:hover {
  background-color: #ffc107;
  color: white;
}

.active-page {
  background-color: #ffc107;
  /* border: 1px solid #3498db; */
  color: white;
}

.active-page:hover {
  background-color: #ffc107;
}
</style>