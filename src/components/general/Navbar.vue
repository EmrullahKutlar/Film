<template>

    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <router-link class="navbar-brand text-warning me-5" to="/">OMDB</router-link>

            <i class="bi bi-list text-light navbar-toggler" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
            </i>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link " aria-current="page" to="/">Anasayfa</router-link>
                    </li>
                </ul>
                <searchResultVue/>
                <ul class="navbar-nav  mb-2 mb-lg-0">
                    <li class="nav-item me-3">
                        <button class="nav-link btn btn-outline-warning " aria-current="page" href="#"><i class="bi bi-person-fill"></i> Üye Ol</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link btn btn-outline-warning " aria-current="page" href="#"> <i class="bi bi-box-arrow-right"></i> Giriş Yap</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script setup>
import searchResultVue from './searchResult.vue';
import { ref } from 'vue'
components:{
    searchResultVue
}

</script>

<style scoped>
.search-form {
    width: 55%;
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

.form-control:focus {
    box-shadow: none;
}

@media(max-width: 991px) {
    .search-form ,  .result-container{
        width: 100%;
    }
}
</style>