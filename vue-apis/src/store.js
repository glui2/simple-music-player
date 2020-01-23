// all methods states and properties of the data
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  // config object where you do everything you need to for your app
  // create your own version of state, own actions that allow you to get to that state, ties into your views
  state: {
    songs: [],
    currentSong: null
  },
  mutations: {
    // for when we want to modify set data in our app
    SET_SONGS(state, payload) {
      state.songs = payload;
    }
  },
  actions: {
    // similar to methods, allows us to run functions that can use the mutations
    // never directly modify state, create actions to use muattions to do so
    fetchSongs({ commit }) {
      axios({
        method: "get",
        url: "https://orangevalleycaa.org/api/music",
        params: {
          order: "name"
        }
      }).then(response => commit("SET_SONGS", response.data));
    }
  }
});
