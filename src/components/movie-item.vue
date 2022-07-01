<template>
  <div class="wrapper d-flex">
    <div class="col-5 px-0 d-flex align-items-center justify-content-center">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" class="poster">
    </div>
    <div class="col-7 d-flex flex-column justify-content-between align-items-start py-2">
      <router-link :to="{name:'Movie',params:{id:movie.id}}" class="title">{{ movie.title }}</router-link>
      <div class="d-flex flex-column align-items-start">
        <div>
          <img src="/images/calendar.png" width="16" height="16">
          <span class="release-date">{{ movie.release_date }}</span>
        </div>
        <div class="mt-2 d-flex flex-wrap align-items-center">
          <template v-for="(genre,index) in movie.genre_names">
            <span class="genre">{{ genre }}</span><span class="dot" v-if="movie.genre_names.length-1 !== index"></span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "movie-item",
  props: {
    movie: {required: true, type: Object}
  },
  setup(props) {
    return {}
  }
}
</script>

<style scoped>

.wrapper {
  width: 295px;
  height: 195px;
  background-color: #f1f1f1;
  border: 1px solid #c4c4c4;
  border-radius: 6px;
}

.poster {
  height: 189px;
  width: 100%;
  overflow: hidden;
  border-radius: 6px 0 0 6px
}

.title {
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  color: #000;
}

.release-date {
  color: #4e4e4e;
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  margin-left: 5px
}

.genre {
  font-size: 12px;
  font-weight: 400;
  color: #505050
}

.dot {
  width: 5px;
  height: 5px;
  background-color: #505050;
  border-radius: 100%;
  margin: auto 5px;
}
</style>
