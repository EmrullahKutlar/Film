<template>
    <form class="search-form d-flex me-auto">
        <select name="" id="" v-model="selectValue" class="rounded-start  select-input"
            @change="searchHandler(searchValue, selectValue)">
            <option value="title" selected>Title</option>
            <option value="movie">Movie</option>
            <option value="series">Tv Series</option>
        </select>
        <input class="form-control rounded-end border-0 search-input " type="text" placeholder="Search" 
            v-model="searchValue" @keyup="searchHandler(searchValue, selectValue)">
        <i class="bi bi-search position-absolute top-0  text-dark  search-icon" type="button"> </i>
        <div class="container position-absolute result-container" :class="{ 'd-block': searchValue.length >= 1 }">
            <div class="row">
                <div class="col-12 mt-1" v-if="isLoading">
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border text-warning" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                <ul class="col-12" v-else>
                    <li class="col-12 d-flex justify-content-center mt-3" v-if="error">
                        <div class="text-center">
                            <h6 class="text-dark mb-0">{{ error }}</h6>
                        </div>
                    </li>
                    <li v-else class=" py-3 border-warning border-bottom overflow-hidden "
                        v-for="movie in searchResults" :key="movie" type="button">
                        <div class="d-flex col-12" @click="searchRouterHandler(movie.imdbID)">
                            <div>
                                <img v-if="movie.Poster != 'N/A'" class="search-img rounded" :src="movie.Poster" alt="">
                                <img v-else src="../../../public/omdb.png" class="search-img rounded" alt="">
                            </div>
                            <div class="ms-3 col-12 d-flex flex-column justify-content-center">
                                <h6 class="text-dark mb-0">{{ movie.Title }}
                                    <span class="text-warning">({{ movie.Year }})</span>
                                </h6>
                                <span class="text-secondary mb-0"> {{ movie.Type }}</span>
                            </div>
                        </div>
                    </li>
                    <li class=" col-12 " v-if="totalResults!=null && !error" type="button" @click="getAllResult(searchValue,selectValue)"> 
                        <p class="text-dark text-center mb-0 mt-3 fw-bolder"> See all of {{totalResults}} results</p> 
                    </li>
                </ul>
            </div>
        </div>
    </form>
</template>

<script setup>
import { searchMovie } from '../../modules/services'
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const searchValue = ref('')
const selectValue = ref('title')
const isLoading = ref(false)
const searchResults = ref({})
const error = ref(null)
const totalResults = ref(null)
const router = useRouter()

const searchHandler = async (search, type) => {
    isLoading.value = true
    await searchMovie(search, type).then(res => {
        if (res.Response === 'False') {
            error.value = res.Error
        } else {
            error.value = null
            searchResults.value = res.Search
            res.totalResults > 10 ? totalResults.value = res.totalResults : totalResults.value = null
        }
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        isLoading.value = false
    })
}
const searchRouterHandler = async (id) => {
    await router.push({
        path: '/movie',
        query: {
            q: id
        }
    })
    searchValue.value = ''
}
const getAllResult = async (search, type) => {
    await router.push({
        path: '/search',
        query: {
            q: search,
            type: type
        }
    })
    searchValue.value = ''
}


</script>

<style scoped>
.search-img {
    width: 4rem;
    height: 4rem;
}

.search-form {
    width: 85%;
}

.select-input {
    width: auto;
    height: 2.5rem;
    border: none;
    background-color: #fff;
    color: #6c757d;
    font-size: 1rem;
    padding: .375rem .75rem;
    border-radius: .25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 10;
    margin-right: -.5rem;
    border-right: 1px solid rgb(63, 63, 63);
}

.search-icon {
    right: .80rem;
    font-size: 1.5rem;
}

.result-container {
    right: 0;
    z-index: 100;
    background-color: #ffff;
    border-radius: .25rem;
    border-top: none;
    top: 110%;
    height: auto;
    min-height: 2.5rem;
    width: 100%;
    display: none;
}
</style>