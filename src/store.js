import Vue from 'vue';
import Vuex from 'vuex';
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

  },
  actions: {

  },
});
