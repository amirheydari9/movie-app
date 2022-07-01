import request from "@/plugins/interceptor";

export const namespaced = true;

export const state = {
    movies: {
        page: 1,
        results: [],
        total_pages: 0
    },
    movie: null,
    genres: [],
    credits: []
};

export const getters = {
    getMovies(state) {
        if (state.movies.results.length && state.genres.length) {
            state.movies.results.forEach(movie => {
                let genres = []
                movie.genre_ids.forEach(id => {
                    state.genres.forEach(genre => {
                        if (id === genre.id) {
                            genres.push(genre.name)
                        }
                    })
                })
                movie.genre_names = genres
            })
        }
        return state.movies
    },
    getMovie(state) {
        return state.movie
    },
    getGenres(state) {
        return state.genres
    },
    getCredits(state) {
        return state.credits
    }
};

export const mutations = {
    SET_MOVIES(state, payload) {
        state.movies = payload
    },
    SET_MOVIE(state, payload) {
        state.movie = payload
    },
    SET_GENRES(state, payload) {
        state.genres = payload
    },
    SET_CREDITS(state, payload) {
        state.credits = payload
    }
};


export const actions = {
    async fetchMovies({commit, state}, {mode, release_start_date = '', release_end_date = ''}) {
        try {
            if (!state.genres.length) {
                let {genres} = await request(`genre/movie/list?api_key=f62f750b70a8ef11dad44670cfb6aa57`)
                commit('SET_GENRES', genres)
            }
            let fetchPage = state.movies.page
            if (mode === 'prev') {
                fetchPage--
            } else if (mode === 'next') {
                fetchPage++
            }
            let query = `page=${fetchPage}&api_key=f62f750b70a8ef11dad44670cfb6aa57`
            if (release_start_date) query += `&release_date.gte=${release_start_date}`
            if (release_end_date) query += `&release_date.lte=${release_end_date}`
            const {page, results, total_pages} = await request(`discover/movie?${query}`)
            commit('SET_MOVIES', {page, results, total_pages})
        } catch (error) {
            console.log(error)
        }
    },
    async fetchMovie({commit}, {id}) {
        try {
            const movie = await request(`/movie/${id}?api_key=f62f750b70a8ef11dad44670cfb6aa57`)
            commit('SET_MOVIE', movie)
        } catch (error) {
            console.log(error)
        }
    },
    async fetchGenres({commit}) {
        try {
            const genres = await request(`genre/movie/list?api_key=f62f750b70a8ef11dad44670cfb6aa57`)
            commit('SET_GENRES', genres)
        } catch (error) {
            console.log(error)
        }
    },
    async fetchCreditsOfMovie({commit}, {id}) {
        try {
            let {cast} = await request(`movie/${id}/credits?api_key=f62f750b70a8ef11dad44670cfb6aa57`)
            const finalCast = cast.sort((a, b) => (b.popularity) - (a.popularity)).slice(0, 10)
            commit('SET_CREDITS', finalCast)
        } catch (error) {
            console.log(error)
        }
    }
};
