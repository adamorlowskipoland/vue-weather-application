<template>
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
        ></widget-station>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import WidgetStation from '@/components/WidgetStation.vue';

export default {
  name: 'WidgetsPanel',
  components: {
    WidgetStation,
  },
  computed: {
    ...mapState(['stations']),
  },
  methods: {
    ...mapMutations(['DELETE_STATION']),
  },
};
</script>
