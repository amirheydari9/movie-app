<template>
  <div>
    <div class="bg-light mt-5 d-flex align-items-center p-3">
      <div class="col-2 d-flex justify-content-start">
        <div class="bg-info rounded-pill text-white border-0 px-3 y-1">
          <router-link :to="{name:'Home'}">
            <img src="/images/vector.png" alt="back">
            <span class="text-white ml-2 d-inline-block">Back</span>
          </router-link>
        </div>
      </div>
      <div class="col-10 d-flex flex-column flex-grow-1 text-left">
        <span class="label">{{ movie.title }}</span>
        <span>{{ movie.tagline }}</span>
      </div>
    </div>
    <div class="d-flex mt-5">
      <div class="col-3 pl-0">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" class="img-fluid poster">
      </div>
      <div class="col-9 pl-4">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="label">Budget</span>
          <span class="value">{{ $filters.currencyUSD(movie.budget) }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="label">Revenue</span>
          <span class="value">{{ $filters.currencyUSD(movie.revenue) }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="label">Release Date</span>
          <span class="value">{{ movie.release_date }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="label">Runtime</span>
          <span class="value">{{ $filters.toHoursAndMinutes(movie.runtime) }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="label">Scores</span>
          <div class="d-flex align-items-center">
            <vue3-star-ratings
                starSize="16"
                inactiveColor="#ccc"
                :numberOfStars="10"
                :showControl="false"
                :disableClick="true"
                v-model="movie.vote_average"></vue3-star-ratings>
            <span class="value">({{ $filters.thousandSeparator(movie.vote_count) }} votes)</span>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="label">Genres</span>
          <span class="value">
            <template v-for="(genre,index) in movie.genres" :key="index">
              <span> {{ genre.name }}</span><span v-if="movie.genres.length-1 !==index">,</span>
            </template>
          </span>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="label">IMDB Link</span>
          <a class="value link" :href="`https://www.imdb.com/title/${movie.imdb_id}`" target="_blank">link</a>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="label">Homepage Link</span>
          <a :href="movie.homepage" target="_blank" class="value link">link</a>
        </div>
      </div>
    </div>
    <p class="text-justify mt-5">{{ movie.overview }}</p>
    <div class="d-flex flex-column align-items-start mt-5 mb-5" v-if="casts.length">
      <div class="label">Credits:</div>
      <div class="text-left">
        <template v-for="(cast,index) in casts">
          <span class="value">{{ cast.original_name }}</span><span v-if="casts.length-1 !==index">,</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, onMounted} from 'vue'
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import vue3StarRatings from "vue3-star-ratings";

export default {
  name: "Movie",
  components: {
    vue3StarRatings
  },
  setup() {
    const store = useStore()
    const router = useRoute()
    const movie = computed(() => store.getters["movie/getMovie"])
    const casts = computed(() => store.getters["movie/getCredits"])
    onMounted(async () => {
      window.scrollTo(0, 0)
      await store.dispatch('movie/fetchCreditsOfMovie', {id: router.params.id})
    })
    return {
      movie,
      casts
    }
  }
}
</script>

<style scoped>
.poster {
  border-radius: 12px;
}

.label {
  font-weight: 700;
  font-size: 16px;
  color: #151515;
  line-height: 22px;
}

.value {
  font-weight: 400;
  font-size: 16px;
  color: #151515;
  line-height: 22px;
}

.link {
  color: #318FE7;
  text-decoration: underline;
}

::v-deep .vue3-star-ratings__wrapper {
  padding: 0 !important;
  margin: 0 10px;
}
</style>
