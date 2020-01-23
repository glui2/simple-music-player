// all methods states and properties of the data
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import _ from "lodash";

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
    },
    CHANGE_CURRENT_SONG(state, payload) {
      state.currentSong = payload;
    }
  },
  actions: {
    // similar to methods, allows us to run functions that can use the mutations
    // never directly modify state, create actions to use muattions to do so

    changeSong({ commit }, payload) {
      commit("CHANGE_CURRENT_SONG", payload);
    },
    deleteSong({ commit }, payload) {
      let updatedSongs = _.without(this.state.songs, payload);
      commit("SET_SONGS", updatedSongs);
    },
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
