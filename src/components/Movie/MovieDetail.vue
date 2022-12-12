<template>
    <div class="row">
        <div v-if="isLoading" class="col-12 d-flex justify-content-center ">
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else class="col-12 d-flex flex-wrap">
            <div class="col-12 col-lg-4 mt-3 ">
                <img v-if="movie.Poster != 'N/A'" class="rounded d-flex justify-content-center w-100 h-100"
                    :src="movie.Poster" alt="">
                <img v-else src="../../assets/omdb.PNG" class="rounded d-flex justify-content-center w-100 h-100"
                    alt="">
            </div>
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
                <MovieCarouselVue :type="type" :is-popular="false" title="Benzer Filmler" />
            </div>
        </div>

    </div>
</template>

<script async setup>
import MovieCarouselVue from './MovieCarousel.vue';
import { onMounted, ref, computed, watch } from 'vue'
import { getMovieById, getMovies } from '@/modules/services'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

components: {
    MovieCarouselVue
}
const searchQuery = computed(() => route.query.q)
watch(() => route.fullPath, () => getMovieDetail())

const movie = ref({})
const type = ref("")
const suggestionMovies = ref({})
const isLoading = ref(false)

const getMovieDetail = async () => {
    console.log(type.value);
    isLoading.value = true
    await getMovieById(searchQuery.value).then(res => {
        if(res.Response == "False") {
           router.push({name: '404'})
        }else{
        movie.value = res
        type.value = movie.value.Genre.split(",")[0];
        window.scrollTo(0, 0);
    }
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        isLoading.value = false
        // console.log('finally');
    })

    await getMovies({ search: type.value }).then(res => {
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