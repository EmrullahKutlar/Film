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
                            <img v-if="movie.Poster == 'N/A'" src="https://ibb.co/gr6xF6h"
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
// bu statik tanımlama aşşağıda dinamik olarak tanımlanmıştır. Fakat carousel slide işlemi bozulduğundan dolayı statik olarak tanımlama gereği duydum.
const populer=ref([
    {
        "Title": "Wednesday",
        "Year": "2022–",
        "Rated": "TV-14",
        "Released": "23 Nov 2022",
        "Runtime": "N/A",
        "Genre": "Comedy, Crime, Family",
        "Director": "N/A",
        "Writer": "Alfred Gough, Miles Millar",
        "Actors": "Jenna Ortega, Gwendoline Christie, Riki Lindhome",
        "Plot": "Follows Wednesday Addams' years as a student, when she attempts to master her emerging psychic ability, thwart and solve the mystery that embroiled her parents.",
        "Language": "English",
        "Country": "N/A",
        "Awards": "1 nomination",
        "Poster": "https://m.media-amazon.com/images/M/MV5BM2ZmMjEyZmYtOGM4YS00YTNhLWE3ZDMtNzQxM2RhNjBlODIyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
        "Ratings": [],
        "Metascore": "N/A",
        "imdbRating": "N/A",
        "imdbVotes": "156",
        "imdbID": "tt13443470",
        "Type": "series",
        "totalSeasons": "N/A",
        "Response": "True"
    },
    {
        "Title": "1899",
        "Year": "2022–",
        "Rated": "TV-MA",
        "Released": "17 Nov 2022",
        "Runtime": "56S min",
        "Genre": "Drama, Mystery",
        "Director": "N/A",
        "Writer": "Baran bo Odar, Jantje Friese",
        "Actors": "Emily Beecham, Aneurin Barnard, Andreas Pietschmann",
        "Plot": "The whole European angle was very important for us, not only story wise but also the way we were going to produce it. It really had to be a European collaboration, not just cast but also crew. We felt that with the past years of Europe being on the decline, we wanted to give a counterpoint to Brexit, and to nationalism rising in different countries, to go back to that idea of Europe and Europeans working and creating together.",
        "Language": "English, German, Danish, Spanish, French, Mandarin",
        "Country": "Germany, United States",
        "Awards": "2 nominations",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTU1N2I5OTgtNDE2MS00ZTdmLWJlODktNDMwMGVmNzY5NmUxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "7.6/10"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "7.6",
        "imdbVotes": "57,854",
        "imdbID": "tt9319668",
        "Type": "series",
        "totalSeasons": "N/A",
        "Response": "True"
    },
    {
        "Title": "Tulsa King",
        "Year": "2022–",
        "Rated": "TV-MA",
        "Released": "13 Nov 2022",
        "Runtime": "N/A",
        "Genre": "Crime, Drama",
        "Director": "N/A",
        "Writer": "Taylor Sheridan",
        "Actors": "Sylvester Stallone, Andrea Savage, Martin Starr",
        "Plot": "Following his release from prison, mafia capo Dwight \"The General\" Manfredi is exiled to Tulsa, Oklahoma, where he builds a new criminal empire with a group of unlikely characters.",
        "Language": "English",
        "Country": "United States",
        "Awards": "N/A",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYmI3N2EzOWQtZjFiMi00MjgwLTgzN2UtZGI0ZGY1ZDQyOTRiXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.4/10"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "8.4",
        "imdbVotes": "4,904",
        "imdbID": "tt16358384",
        "Type": "series",
        "totalSeasons": "N/A",
        "Response": "True"
    },
    {
        "Title": "SAS Rogue Heroes",
        "Year": "2022",
        "Rated": "TV-MA",
        "Released": "30 Oct 2022",
        "Runtime": "N/A",
        "Genre": "Drama, Thriller, War",
        "Director": "N/A",
        "Writer": "N/A",
        "Actors": "Connor Swindells, Jack O'Connell, Alfie Allen",
        "Plot": "SAS: Rogue Heroes charts the creation of the famed Special Forces unit. Based on the book by Ben Macintyre.",
        "Language": "English",
        "Country": "United Kingdom",
        "Awards": "N/A",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNDA5YzYyYWEtMjk4OS00ZjA2LWI0NWEtYzhkNTQ0ZDFmZWIxXkEyXkFqcGdeQXVyNjU0NTI0Nw@@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.2/10"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "8.2",
        "imdbVotes": "4,849",
        "imdbID": "tt10405370",
        "Type": "series",
        "totalSeasons": "N/A",
        "Response": "True"
    },
    {
        "Title": "The Peripheral",
        "Year": "2022–",
        "Rated": "TV-MA",
        "Released": "21 Oct 2022",
        "Runtime": "1 min",
        "Genre": "Drama, Mystery, Sci-Fi",
        "Director": "N/A",
        "Writer": "N/A",
        "Actors": "Chloë Grace Moretz, Gary Carr, Jack Reynor",
        "Plot": "Set in the future when technology has subtly altered society, a woman discovers a secret connection to an alternate reality as well as a dark future of her own.",
        "Language": "English",
        "Country": "United States",
        "Awards": "N/A",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNTlhMWQyYTAtZjFjMS00M2UzLThiNzMtNTVhN2FkZjAwZWY2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "7.9/10"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "7.9",
        "imdbVotes": "39,047",
        "imdbID": "tt8291284",
        "Type": "series",
        "totalSeasons": "N/A",
        "Response": "True"
    },
    {
        "Title": "Shantaram",
        "Year": "2022–",
        "Rated": "TV-MA",
        "Released": "14 Oct 2022",
        "Runtime": "N/A",
        "Genre": "Action, Adventure, Crime",
        "Director": "N/A",
        "Writer": "N/A",
        "Actors": "Charlie Hunnam, Fayssal Bazzi, Sujaya Dasgupta",
        "Plot": "Lindsay, Australian character, sentenced to a long, harsh prison term after life spirals out of control, he escapes and makes his way to Bombay. Befriended by a Prabaker, by a twist of fate Lin ends up living in Prabaker's slum.",
        "Language": "English, Marathi",
        "Country": "United States",
        "Awards": "N/A",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjU0ZmU1NTItNmRjNS00MjRkLWE0MDctYWMyNDY0YTA3ZDc4XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "7.7/10"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "7.7",
        "imdbVotes": "4,664",
        "imdbID": "tt0429087",
        "Type": "series",
        "totalSeasons": "N/A",
        "Response": "True"
    },
    {
        "Title": "The Walking Dead",
        "Year": "2010–2022",
        "Rated": "TV-MA",
        "Released": "31 Oct 2010",
        "Runtime": "44 min",
        "Genre": "Drama, Horror, Thriller",
        "Director": "N/A",
        "Writer": "Frank Darabont",
        "Actors": "Andrew Lincoln, Norman Reedus, Melissa McBride",
        "Plot": "Sheriff Deputy Rick Grimes gets shot and falls into a coma. When awoken he finds himself in a Zombie Apocalypse. Not knowing what to do he sets out to find his family, after he's done that, he gets connected to a group to become the leader. He takes charge and tries to help this group of people survive, find a place to live and get them food. This show is all about survival, the risks and the things you'll have to do to survive.",
        "Language": "English",
        "Country": "United States",
        "Awards": "Won 2 Primetime Emmys. 82 wins & 234 nominations total",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZmU5NTcwNjktODIwMi00ZmZkLTk4ZWUtYzVjZWQ5ZTZjN2RlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.1/10"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "8.1",
        "imdbVotes": "982,251",
        "imdbID": "tt1520211",
        "Type": "series",
        "totalSeasons": "N/A",
        "Response": "True"
    },
    {
        "Title": "Dexter",
        "Year": "2006–2013",
        "Rated": "TV-MA",
        "Released": "01 Oct 2006",
        "Runtime": "53 min",
        "Genre": "Crime, Drama, Mystery",
        "Director": "N/A",
        "Writer": "James Manos Jr.",
        "Actors": "Michael C. Hall, Jennifer Carpenter, David Zayas",
        "Plot": "He's smart, he's good looking, and he's got a great sense of humor. He's Dexter Morgan, everyone's favorite serial killer. As a Miami forensics expert, he spends his days solving crimes, and nights committing them. But Dexter lives by a strict code of honor that is both his saving grace and lifelong burden. Torn between his deadly compulsion and his desire for true happiness, Dexter is a man in profound conflict with the world and himself. Golden Globe winner Michael C. Hall stars in the hit SHOWTIME Original Series.",
        "Language": "English, Spanish",
        "Country": "United States",
        "Awards": "Won 4 Primetime Emmys. 53 wins & 196 nominations total",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZjkzMmU5MjMtODllZS00OTA5LTk2ZTEtNjdhYjZhMDA5ZTRhXkEyXkFqcGdeQXVyOTA3MTMyOTk@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.7/10"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "8.7",
        "imdbVotes": "724,243",
        "imdbID": "tt0773262",
        "Type": "series",
        "totalSeasons": "8",
        "Response": "True"
    },
    {
        "Title": "Peaky Blinders",
        "Year": "2013–2022",
        "Rated": "TV-MA",
        "Released": "30 Sep 2014",
        "Runtime": "60 min",
        "Genre": "Crime, Drama",
        "Director": "N/A",
        "Writer": "Steven Knight",
        "Actors": "Cillian Murphy, Paul Anderson, Sophie Rundle",
        "Plot": "Thomas Shelby and his brothers return to Birmingham after serving in the British Army during WWI. Shelby and the Peaky Blinders, the gang he is leader of, control the city of Birmingham But as Shelby's ambitions extend beyond Birmingham, he plans to build on the business empire he's created, and stop anyone who gets in his way.",
        "Language": "English, Romanian, Irish Gaelic, Italian, Yiddish, French",
        "Country": "United Kingdom",
        "Awards": "Won 1 BAFTA Award21 wins & 50 nominations total",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZjYzZDgzMmYtYjY5Zi00YTk1LThhMDYtNjFlNzM4MTZhYzgyXkEyXkFqcGdeQXVyMTE5NDQ1MzQ3._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.8/10"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "8.8",
        "imdbVotes": "543,053",
        "imdbID": "tt2442560",
        "Type": "series",
        "totalSeasons": "N/A",
        "Response": "True"
    },
    {
        "Title": "Prison Break",
        "Year": "2005–2017",
        "Rated": "TV-14",
        "Released": "29 Aug 2005",
        "Runtime": "44 min",
        "Genre": "Action, Crime, Drama",
        "Director": "N/A",
        "Writer": "Paul T. Scheuring",
        "Actors": "Dominic Purcell, Wentworth Miller, Amaury Nolasco",
        "Plot": "An innocent man is framed for the homicide of the Vice President's brother and scheduled to be executed at a super-max penitentiary, thus it's up to his younger brother to save him with his genius scheme: install himself in the same prison by holding up a bank and, as the final month ticks away, launch the escape plan step-by-step to break the both of them out, with his full-body tattoo acting as his guide; a tattoo which hides the layout of the prison facility and necessary clues vital to the escape.",
        "Language": "English, Arabic, Spanish",
        "Country": "United Kingdom, United States",
        "Awards": "Nominated for 1 Primetime Emmy. 8 wins & 32 nominations total",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTg3NTkwNzAxOF5BMl5BanBnXkFtZTcwMjM1NjI5MQ@@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.3/10"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "8.3",
        "imdbVotes": "534,698",
        "imdbID": "tt0455275",
        "Type": "series",
        "totalSeasons": "4",
        "Response": "True"
    }
])
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

        /* Dinamik olarak */
        // var populer = []
        // var i = 0
        // while (i < popularMoviesID.length) {
        //     isLoading.value = true
        //    await  getMovieById(popularMoviesID[i]).then(res => {
        //         populer.push(res)
        //     }).catch(err => {
        //         console.log(err.message);

        //     }).finally(() => {
        //         isLoading.value = false

        //     })
        //     i++;
        // }
        //  movies.value = populer

        /* Statik olarak */
        movies.value = populer.value
        isLoading.value = false
        console.log(movies.value);

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
