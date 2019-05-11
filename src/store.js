import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { saveStatePlugin } from './utils';

Vue.use(Vuex);

const stations = JSON.parse(localStorage.getItem('stations')) || [];

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    stations,
  },
  getters: {
    stationsIds(state) {
      console.log('%c Line 17 -> ', 'color: #FFFF00 ;', 'stationsIds');
    },
  },
  mutations: {
    ADD_STATION(state, newStation) {
      const stationAlreadyAdded = state.stations.find(station => station.id === newStation.id);
      if (stationAlreadyAdded) {
        console.error('%c Line 20 -> ', 'color: skyblue ;', 'This station is already in use');
        return;
      }
      state.stations.push(newStation);
    },
    DELETE_STATION(state, id) {
      console.log('%c Line 18 -> ', 'color: skyblue ;', 'DELETE_STATION', id);
      state.stations = state.stations.filter(station => station.id !== id);
    },
  },
  actions: {
    FETCH_ITEM(context, query) {
      const endpoint = `${process.env.VUE_APP_API_SPECIFIC_ENDPOINT}weather?zip=${query},ch&units=metric&appid=${process.env.VUE_APP_API_KEY}`;
      return axios
        .get(endpoint)
        .then(({ data }) => {
          context.commit('ADD_STATION', data);
          return data;
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
  },
});
