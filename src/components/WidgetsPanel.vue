<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section class="panel">
    <div class="flex -mx-2 mb-4 flex-wrap">
      <div
        v-for="station in stations"
        :key="station.id"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2 mb-12"
      >
        <transition name="fade">
          <widget-station
            v-bind="{station}"
            :class="{
              'border-blue': minCurrentTemp === station.main.temp,
              'border-red': maxCurrentTemp === station.main.temp,
              'highlight': station.id === repeatedId
            }"
            @click="DELETE_STATION(station.id)"
          >
            <template
              v-if="refreshPending"
              v-slot:loader
            >
              <loading-spinner />
            </template>
          </widget-station>
        </transition>
      </div>
    </div>
    <loop-fire
      :loopDelay="refreshDelay"
      @time-is-up="refresh"
    />
  </section>
</template>

<script>
import {
  mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';

export default {
  name: 'WidgetsPanel',
  components: {
    WidgetStation: () => import('@/components/WidgetStation.vue'),
    LoadingSpinner: () => import('@/components/LoadingSpinner.vue'),
    LoopFire: () => import('@/components/LoopFire.vue'),
  },
  data() {
    return {
      refreshPending: false,
    };
  },
  computed: {
    ...mapState(['stations', 'repeatedId']),
    ...mapGetters(['stationsIds', 'currentTemps']),
    refreshDelay() {
      return 1000 * 60 * 10; // 10 min.
    },
    minCurrentTemp() {
      if (this.stations.length < 2) return;
      console.log('%c Line 67 -> ', 'color: #FFFF00 ;', 'minct');
      return Math.min.apply(0, this.currentTemps);
    },
    maxCurrentTemp() {
      if (this.stations.length < 2) return;
      console.log('%c Line 71 -> ', 'color: #FFFF00 ;', 'maxct');
      return Math.max.apply(0, this.currentTemps);
    },
  },
  methods: {
    ...mapMutations(['DELETE_STATION']),
    ...mapActions(['FETCH_ITEMS']),
    refresh() {
      if (!this.stationsIds.length) return;
      this.refreshPending = true;
      this.FETCH_ITEMS(this.stationsIds)
        .finally(() => {
          this.refreshPending = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
  .highlight {
    -webkit-animation: HIGHLIGHTING-ANIMATION 1s infinite; /* Safari 4+ */
    -moz-animation:    HIGHLIGHTING-ANIMATION 1s infinite; /* Fx 5+ */
    -o-animation:      HIGHLIGHTING-ANIMATION 1s infinite; /* Opera 12+ */
    animation:         HIGHLIGHTING-ANIMATION 1s infinite; /* IE 10+, Fx 29+ */
  }
  @-webkit-keyframes HIGHLIGHTING-ANIMATION {
    50% {
      @apply shadow-lg;
      transform: scale(1.05);
      border: 1px solid #fcc600;
    }
  }
  @-moz-keyframes HIGHLIGHTING-ANIMATION {
    50% {
      @apply shadow-lg;
      transform: scale(1.05);
      border: 1px solid #fcc600;
    }
  }
  @-o-keyframes HIGHLIGHTING-ANIMATION {
    50% {
      @apply shadow-lg;
      transform: scale(1.05);
      border: 1px solid #fcc600;
    }
  }
  @keyframes HIGHLIGHTING-ANIMATION {
    50% {
      @apply shadow-lg;
      transform: scale(1.05);
      border: 1px solid #fcc600;
    }
  }
</style>
