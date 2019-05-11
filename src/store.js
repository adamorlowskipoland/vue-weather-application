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

  },
  actions: {
    FETCH_ITEM(context, payload) {
      return new Promise((resolve, reject) => {
        console.log('%c Line 22 -> ', 'color: #FFFF00 ;', context);
        console.log('%c Line 22 -> ', 'color: #FFFF00 ;', payload);
        resolve();
        // return axios
        //   .get();
      });
      // .then(({ data }) => {
      //   console.log(data);
      //   //  TODO: add data do store.stations
      // })
      // .catch((e) => {
      //   console.log('%c Line 33 -> ', 'color: #FFFF00 ;', e);
      //   const error = "Coundn't get data... 💀";
      //   console.log('%c Line 33 -> ', 'color: #FFFF00 ;', error);
      // });
    },
  },
});
