<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section class="panel">
    <sortable-list
      :value="stations"
      @input="UPDATE_STATIONS"
    >
      <template v-slot="{ items:stations }">
        <div class="flex -mx-2 mb-4 flex-wrap outline-none">
          <sortable-item
            v-for="station in stations"
            :key="station.id"
          >
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2 mb-12 outline-none">
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
                  <template v-slot:action>
                    <sortable-handler>
                      <svg class="station__sort-icon" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M14 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm6 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm-6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm6 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm-6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/></svg>
                    </sortable-handler>
                  </template>
                </widget-station>
              </transition>
            </div>
          </sortable-item>
        </div>
      </template>
    </sortable-list>
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
    SortableList: () => import('@/components/SortableList.vue'),
    SortableItem: () => import('@/components/SortableItem.vue'),
    SortableHandler: () => import('@/components/SortableHandler.vue'),
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
      return Math.min.apply(0, this.currentTemps);
    },
    maxCurrentTemp() {
      if (this.stations.length < 2) return;
      return Math.max.apply(0, this.currentTemps);
    },
  },
  methods: {
    ...mapMutations(['DELETE_STATION', 'UPDATE_STATIONS']),
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

  .draggable-source--is-dragging {
    background-color: #f1f5f8;
  }
  .draggable-source--is-dragging > * {
    opacity: 0;
  }


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
