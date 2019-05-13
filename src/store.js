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
    repeatedId: null,
  },
  getters: {
    stationsIds(state) {
      return state.stations.map(station => station.id).join(',');
    },
    currentTemps(state) {
      return state.stations.map(station => station.main.temp);
    },
  },
  mutations: {
    ADD_STATION(state, newStation) {
      state.stations.push(newStation);
    },
    DELETE_STATION(state, id) {
      this.state.stations = state.stations.filter(station => station.id !== id);
    },
    UPDATE_STATIONS(state, updatedStations) {
      this.state.stations = updatedStations;
    },
    SET_REPEATED_ID(state, id) {
      this.state.repeatedId = id;
      setTimeout(() => {
        this.state.repeatedId = null;
      }, 2000);
    },
  },
  actions: {
    FETCH_ITEM(context, query) {
      const endpoint = `${process.env.VUE_APP_API_ENDPOINT}weather?zip=${query},ch&units=metric&appid=${process.env.VUE_APP_API_KEY}`;
      return axios
        .get(endpoint)
        .then(({ data }) => {
          const stationAlreadyAdded = context.state.stations.find(stn => stn.id === data.id);
          if (stationAlreadyAdded) {
            context.commit('SET_REPEATED_ID', data.id);
            return Promise.reject('Station is already in use 🌝🌦');
          }
          context.commit('ADD_STATION', data);
          return data;
        })
        .catch((error) => {
          const errorMessage = (typeof error === 'string' && error.indexOf('Station') !== -1)
            ? error
            : 'City not found... 💀!';
          return Promise.reject(errorMessage);
        });
    },
    FETCH_ITEMS(context, query) {
      const endpoint = `${process.env.VUE_APP_API_ENDPOINT}group?id=${query}&units=metric&appid=${process.env.VUE_APP_API_KEY}`;
      return axios
        .get(endpoint)
        .then(({ data }) => {
          context.commit('UPDATE_STATIONS', data.list);
          return data;
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
  },
});
