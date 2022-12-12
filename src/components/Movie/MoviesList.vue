<template>
    <div class="row ">
        <div class="col-12 border-warning border-bottom d-flex justify-content-between " :id="props.componentTitle">
            <h3 class="text-warning">{{ props.componentTitle }}</h3>
            <!-- <div class="d-none d-md-block">
          <vue-awesome-paginate :total-items="parseInt(totalResults)" :items-per-page="10" :max-pages-shown="1" v-model="page"
            :on-click="onClickHandler" />
        </div> -->
        </div>
        <div v-if="isLoading">
            <div class="col-12 d-flex justify-content-center align-items-center min-vh-100 ">
                <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="col-12 d-flex flex-row flex-wrap justify-content-center align-items-center mt-3">
                <div v-if="errorMessage != null"> {{ errorMessage }}</div>
                <div v-else class="card boder-0 mx-3 mb-3 " v-for="movie in movies" :key="movie">
                    <div @click="routerHandler(movie.imdbID)">
                        <img v-if="movie.Poster == 'N/A'" src="../../../public/omdb.png" class="card-img-top rounded-2">
                        <img v-else :src="movie.Poster" class="card-img-top rounded-2 flex-fill">
                        <div class="card-body  flex-fill">
                            <h5 class="card-title text-light text-center flex-fill">{{ movie.Title }}
                                <span class="text-warning">({{ movie.Year }})</span>
                            </h5>
                        </div>

                    </div>
                </div>

            </div>
            <div class="col-12 d-flex justify-content-end" v-if="showPagination">
                <vue-awesome-paginate :total-items="parseInt(totalResults)" :items-per-page="10" :max-pages-shown="3"
                    v-model="page" :on-click="onClickHandler" />
            </div>
        </div>

    </div>
</template>

<script async setup>
import { ref, onMounted, reactive } from 'vue'
import { getMovies } from '@/modules/services'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
    componentTitle: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: false,
        default: null
    },
    showPagination: {
        type: Boolean,
        required: true
    },
    search: {
        type: String,
        required: false,
        default: null
    },
    type: {
        type: String,
        required: false,
        default: null
    }
})
const isLoading = ref(false)
const movies = ref({})
const page = ref(1)
const totalResults = ref(0)
const errorMessage = ref(null)

const onClickHandler = (page) => {
    fetchMovies(page)
    document.getElementById(props.componentTitle).scrollIntoView();
};

const routerHandler = (id) => {
    console.log(id);
    router.push({
        path: '/movie',
        query: {
            q: id
        }
    })
}

const fetchMovies = async (page, years,) => {
    isLoading.value = true
    years = props.year
    var search = props.search
    var type = props.type
    await getMovies(page, years,search,type).then(res => {
        if(res.Response == "False") {
           router.push({name: '404'})
        }else{
        movies.value = res.Search
        totalResults.value = res.totalResults}
    }).catch(err => {
        console.log(err.message);
        errorMessage.value = err.message

    }).finally(() => {
        isLoading.value = false

    })
}

onMounted(async () => {
    await fetchMovies(1, props.year)
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
