import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import defaultStations from './devStations';
import { saveStatePlugin } from './utils';

Vue.use(Vuex);

const stations = JSON.parse(localStorage.getItem('stations')) || defaultStations;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    stations,
  },
  mutations: {
    ADD_STATION(state, newStation) {
      console.log('%c Line 18 -> ', 'color: skyblue ;', 'ADD_STATION');
      if (state.stations.length >= 10) {
        console.error('%c Line 20 -> ', 'color: skyblue ;', 'Can\'t add station, there are already 10 of them');
        return;
      }
      const stationAlreadyAdded = state.stations.find(station => station.id === newStation.id);
      if (stationAlreadyAdded) {
        console.error('%c Line 20 -> ', 'color: skyblue ;', 'This station is already in use');
        return;
      }
      state.stations.push(newStation);
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
