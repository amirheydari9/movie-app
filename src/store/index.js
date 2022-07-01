import {createStore} from 'vuex'
import * as movie from './modules/movie'

export default createStore({
    modules: {
        movie,
    }
})
