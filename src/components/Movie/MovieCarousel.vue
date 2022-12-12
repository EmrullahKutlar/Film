<template>
    <div class="row">
        <div v-if="isLoading" class="col-12 d-flex justify-content-center align-items-center  ">
            <div class="d-flex justify-content-center ">
                <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else class="col-12 ">
            <div class="col-12 border-warning border-bottom d-flex justify-content-between mb-3">
                <h3 class="text-warning">{{ props.title }}</h3>
            </div>

            <Carousel :settings="settings" :breakpoints="breakpoints">
                <Slide v-for="movie in movies" :key="movie">
                    <div class=" carousel__item card boder-0 mx-3 mb-3 ">
                        <div @click="routerHandler(movie.imdbID)">
                            <img v-if="movie.Poster == 'N/A'" src="../../assets/omdb.PNG"
                                class="card-img-top rounded-2">
                            <img v-else :src="movie.Poster" class="card-img-top rounded-2 flex-fill">
                            <div class="card-body  flex-fill">
                                <h5 class="card-title text-light text-center flex-fill">{{ movie.Title }}
                                    <span class="text-warning">({{ movie.Year }})</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>

    </div>
</template>

<script setup>
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import { reactive, onMounted, ref } from 'vue';
import { getSuggestion, getMovieById } from '@/modules/services'
import { useRouter } from 'vue-router';
import 'vue3-carousel/dist/carousel.css'
const router = useRouter()
components: {
    Carousel,
        Navigation,
        Slide
}

const props = defineProps({
    type: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    isPopular: {
        type: Boolean,
        required: true,
        default: false
    }
})
const isLoading = ref(false)
const settings = reactive({
    itemsToShow: 1,
    snapAlign: 'center',

})
const breakpoints = reactive({
    0: {
        itemsToShow: 1.5,
        snapAlign: 'center',
    },
    700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
    },
    // 1024 and up
    1024: {
        itemsToShow: 5,
        snapAlign: 'start',
    },
})
const movies = ref({})
const routerHandler = (id) => {
    console.log(id);
    router.push({
        path: '/movie',
        query: {
            q: id
        }
    })
}
const popularMoviesID = reactive(['tt13443470', 'tt9319668', 'tt16358384', 'tt10405370', 'tt8291284', 'tt0429087', 'tt1520211', 'tt0773262', 'tt2442560', 'tt0455275'])

onMounted(async () => {
    console.log(props.type);
    isLoading.value = true

    if (!props.isPopular) {
        await getSuggestion(props.type).then(res => {
            movies.value = res.Search
            console.log(movies.value);
        }).catch(err => {
            console.log(err.message);

        }).finally(() => {
            isLoading.value = false

        })
    }
    else {
        var populer = []
        var i = 0
        while (i < popularMoviesID.length) {
            isLoading.value = true
            await getMovieById(popularMoviesID[i]).then(res => {
                populer.push(res)
            }).catch(err => {
                console.log(err.message);

            }).finally(() => {
                isLoading.value = false

            })
            i++;
        }
        movies.value = populer
    }
})

</script>

<style scoped>
.card-img-top {
    width: 100%;
    height: 20rem;
    object-fit: fill;
}

.card {
    width: 18rem;
    height: 28rem;
    background-color: transparent;
    cursor: pointer;
}

.card:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
}
</style>
