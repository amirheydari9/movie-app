<template>
  <div>
    <loading v-model:active="loading"
             loader="dots"
             color="green"
             :can-cancel="false"
             :is-full-page="true"/>

    <div class="bg-light mt-5 d-flex align-items-center justify-content-around p-3">
      <div class="d-flex justify-content-end align-items-center">
        <span class="mr-2 d-inline-block">search by release date : </span>
        <Datepicker
            :enableTimePicker="false"
            range
            v-model="date"
            utc
        ></Datepicker>
      </div>
      <button class="bg-info rounded-pill text-white border-0 px-2 y-1" @click="fetchMovies">search</button>
    </div>
    <div class="mt-5 d-flex justify-content-start flex-wrap" v-if="movies.results.length">
      <template v-for="movie in movies.results">
        <div class="col-4 mb-5 px-0">
          <movie-item :movie="movie"/>
        </div>
      </template>
    </div>
    <div class="d-flex flex-column justify-content-between mt-5 mb-4">
      <div class="d-flex justify-content-center align-items-center mb-3">
        <span class="pagination-title"
              :class="{'disabled':movies.page===1}"
              @click="fetchMovies('prev')">Previous Page</span>
        <span class="divider"></span>
        <span class="pagination-title"
              :class="{'disabled':movies.page===movies.total_pages}"
              @click="fetchMovies('next')">Next Page</span>
      </div>
      <span class="results">Showing results {{ results }}</span>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, ref} from 'vue'
import {useStore} from "vuex";
import movieItem from '../components/movie-item'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Home',
  components: {
    movieItem,
    Datepicker,
    Loading
  },
  setup() {
    const store = useStore()
    const date = ref();
    const loading = ref(false);
    const movies = computed(() => store.getters["movie/getMovies"])
    const results = computed(() => `${movies.value.page + 19 * (movies.value.page - 1)} - ${20 * (movies.value.page)}`)
    onMounted(async () => await fetchMovies())
    const fetchMovies = async (mode) => {
      try {
        if (mode === 'prev' && movies.value.page === 1) return false
        if (loading.value) return false
        loading.value = true
        let payload = {
          mode,
        }
        if (date.value) {
          payload = {
            ...payload,
            release_start_date: date.value[0],
            release_end_date: date.value[1]
          }
        }
        await store.dispatch('movie/fetchMovies', payload)
      } catch (e) {
        console.log(e)
      } finally {
        setTimeout(() => loading.value = false, 500)
      }
    }
    return {
      date,
      movies,
      results,
      loading,
      fetchMovies
    }
  }
}
</script>
<style>
.pagination-title {
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  color: rgba(0, 0, 0, 48);
}

.pagination-title:hover {
  color: #318FE7;;
}

.divider {
  width: 5px;
  background-color: #6a6a6a;
  height: 50px;
  margin: 0 30px;
  border-radius: 10px;
}

.results {
  font-size: 16px;
  color: #989898
}

.disabled {
  color: #ccc;
  cursor: unset;
}

.pagination-title.disabled:hover {
  color: #ccc
}
</style>
