<template>
  <form class="search-form d-flex">
                    <select name="" id="" v-model="selectValue" class="rounded-start  select-input">
                        <option value="name" selected>Name</option>
                        <option value="movie">Movie</option>
                        <option value="tv-series">Tv Series</option>
                    </select>
                    <input class="form-control rounded-end border-0 search-input " type="text" placeholder="Search"
                         v-model="searchValue" @keyup="searchHandler">
                    <i class="bi bi-search position-absolute top-0  text-dark  search-icon" type="button"> </i>
                    <div class="container position-absolute result-container" :class="{'d-block':searchValue.length>=1}">
                    <div class="row">
                        <div class="col-12">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border text-warning" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
</template>

<script setup>
import { ref } from 'vue';
const searchValue = ref('')
const selectValue=ref('name')
const searchHandler=()=>{
    console.log(selectValue.value);
    console.log(searchValue.value);
}

</script>

<style scoped>
.search-form {
    width: 85%;
}

.select-input {
    width: auto;
    height: 2.5rem;
    border: none ;
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
    height: 300px;
    width: 100%;
    display: none;
}

</style>