<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section class="panel">
    <div class="flex -mx-2 mb-4 flex-wrap">
      <div
        v-for="station in stations"
        :key="station.id"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2 mb-12"
      >
        <widget-station
          v-bind="{station}"
          @click="DELETE_STATION(station.id)"
        >
          <template v-slot:loader>
            <loading-spinner />
          </template>
        </widget-station>
      </div>
    </div>
    <pre>{{stationsIds}}</pre>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'WidgetsPanel',
  components: {
    WidgetStation: () => import('@/components/WidgetStation.vue'),
    LoadingSpinner: () => import('@/components/LoadingSpinner.vue'),
  },
  computed: {
    ...mapState(['stations']),
    ...mapGetters(['stationsIds']),
  },
  methods: {
    ...mapMutations(['DELETE_STATION']),
  },
};
</script>
