<template>
    <div class="row">
        <div class="col-12 col-lg-4 mt-3 "> <img class="rounded d-flex justify-content-center w-100 h-100"
                :src="movie.Poster" alt=""> </div>
        <div class="col-12 col-lg-8 mt-3 flex-column ">
            <div class="d-flex justify-content-center align-items-center">
                <h2 class="text-warning"> {{ movie.Title }} </h2>
            </div>
            <div class="d-flex justify-content-start flex-column px-5 mt-3">
                <p> <span class="me1"> İmdb Rating:</span> <i class="bi bi-star-fill text-warning"></i> <span> {{
                        movie.imdbRating == 'N/A' ? 'Bilinmiyor' : movie.imdbRating
                }}</span> </p>
                <p> Yapım Yılı: <span class="ms-1">{{ movie.Year }} </span></p>
                <p> Tür: <span class="ms-1">{{ movie.Genre }} </span></p>
                <p> Süre: <span class="ms-1">{{ movie.Runtime }} </span></p>
                <p> Yapım Şirketi: <span class="ms-1">{{ movie.Production }} </span></p>
                <p> Yönetmen: <span class="ms-1">{{ movie.Director }} </span></p>
                <p> Yazar: <span class="ms-1">{{ movie.Writer }} </span></p>
                <p> Oyuncular: <span class="ms-1">{{ movie.Actors }} </span></p>
                <p> Yapım Ülkesi: <span class="ms-1">{{ movie.Country }} </span></p>
                <p> Dil: <span class="ms-1">{{ movie.Language }} </span></p>
                <p> Özet: <span class="ms-1">{{ movie.Plot }} </span></p>
                <div class="col-12">

                    <button class="btn btn-warning fw-bold d-flex justify-content-center align-items-center"> <i
                            class="bi bi-caret-right-square-fill me-2 fs-4 rounded"></i> Hemen İzle</button>
                </div>

            </div>
        </div>
        <div class="col-12 mt-5">
            <MoviesListVue :show-pagination="false" componentTitle="Benzer Filmler" year="2022" />
        </div>

    </div>
</template>

<script async setup>
import MoviesListVue from './MoviesList.vue';
import { onMounted, ref,computed,watch} from 'vue'
import { getMovieById, getMovies } from '@/modules/services'
import { useRoute } from 'vue-router';
const route = useRoute()

components: {
    MoviesListVue
}
const searchQuery= computed(()=>route.query.q) 
watch(()=> route.fullPath,()=> getMovieDetail())

const movie = ref({})
const type = ref("")
const suggestionMovies = ref({})

const getMovieDetail = async ()=>{
    window.scrollTo(0, 0);
    console.log(searchQuery.value);
    await getMovieById(searchQuery.value).then(res => {
        movie.value = res
        type.value = movie.value.Genre.split(",")[0];
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        // console.log('finally');
    })

    await getMovies({search:type.value}).then(res => {
        suggestionMovies.value = res
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        // console.log('finally');
    })
}

onMounted(async () => {
   await getMovieDetail()
})


</script>

<style>

</style>