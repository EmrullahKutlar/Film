<template>
  <div class="container">
    <div class="row d-flex">
      <div class="col-12 border-warning border-bottom d-flex justify-content-between ">
        <h3 class="text-warning">2022 Filmleri</h3>
        <div class="d-none d-md-block">
          <vue-awesome-paginate :total-items="144" :items-per-page="10" :max-pages-shown="1" v-model="page"
            :on-click="onClickHandler" />
        </div>
      </div>
      <div class="col-12 d-flex flex-row flex-wrap justify-content-center align-items-center mt-3">
        <div class="card border-0  film-card rounded-5 mx-3 mb-3" v-for="i in 12" :key="i">
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
        <vue-awesome-paginate :total-items="144" :items-per-page="10" :max-pages-shown="1" v-model="page"
          :on-click="onClickHandler" />
      </div>
    </div>
  </div>

</template>
  
<script setup>
import { ref , onMounted} from 'vue'
import getMovie from '@/composables/deneme'
// import useOmdb from '../../composables/useOmdb'
//  import getMovie from '../../composables/useOmdb'

const page = ref(1)
const onClickHandler = (page) => {
  console.log(page);
};

onMounted(() => {
  console.log('mounted');
  // AuthService.getMovie()
  getMovie()
})
</script>
  
<style >
.card {
  width: 18rem;
  background-color: transparent;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
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