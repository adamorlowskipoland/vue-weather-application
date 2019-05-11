import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import nativeToast from 'native-toast';
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
      return state.stations.map(station => station.id).join(',');
    },
  },
  mutations: {
    ADD_STATION(state, newStation) {
      const stationAlreadyAdded = state.stations.find(station => station.id === newStation.id);
      if (stationAlreadyAdded) {
        console.error('%c Line 20 -> ', 'color: skyblue ;', 'This station is already in use');
        nativeToast({
          message: 'Station is already in use 🌝🌦',
          position: 'north-east',
          timeout: 5000,
          type: 'info',
          closeOnClick: true,
        });
        return;
      }
      state.stations.push(newStation);
    },
    DELETE_STATION(state, id) {
      state.stations = state.stations.filter(station => station.id !== id);
    },
    ADD_STATIONS(state, refreshedStations) {
      console.log('%c Line 18 -> ', 'color: skyblue ;', 'ADD_STATIONS', refreshedStations);
      state.stations = refreshedStations;
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
    FETCH_ITEMS(context, query) {
      console.log('%c Line 59 -> ', 'color: #FCC600 ;', 'FETCH_ITEMS fired');
      const endpoint = `${process.env.VUE_APP_API_SEVERAL_ENDPOINT}group?id=${query}&units=metric&appid=${process.env.VUE_APP_API_KEY}`;
      return axios
        .get(endpoint)
        .then(({ data }) => {
          context.commit('ADD_STATIONS', data.list);
          return data;
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
  },
});
