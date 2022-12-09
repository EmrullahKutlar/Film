<template>

    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand text-warning me-5" href="#">OMDB</a>

            <i class="bi bi-list text-light navbar-toggler" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
            </i>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link text-light" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light text-danger-hover" href="#">Link</a>
                    </li>
                </ul>
                <form class="search-form d-flex">
                    <select name="" id="" class="rounded-start  select-input">
                        <option value="">Name</option>
                        <option value="">Year</option>
                    </select>
                    <input class="form-control rounded-end border-0 search-input " type="text" placeholder="Search"
                         v-model="searchValue">
                    <i class="bi bi-search position-absolute top-0  text-dark  search-icon" type="button"> </i>

                </form>
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
            </div>
        </div>
    </nav>

</template>

<script setup>
import { ref } from 'vue'
const searchValue = ref('')

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
    top: 105%;
    height: 300px;
    width: 85%;
    display: none;
}

.form-control:focus {
    box-shadow: none;
}

@media(max-width: 991px) {
    .search-form {
        width: 100%;
    }
    .result-container {
        top: 75%;
        width: 100%;
    }
}
@media (max-width: 768px) {
    .result-container {
        top: 85%;
    }
}
@media (max-width: 425px) {
    .result-container {
        top: 90%;
    }
}
</style>