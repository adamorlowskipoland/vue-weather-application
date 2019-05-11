<template>
  <section class="panel">
    <div class="flex -mx-2 mb-4 flex-wrap">
      <div
        v-for="station in stations"
        :key="station.id"
        class="column"
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

<style scoped>
  .column {
    @apply w-1/5 px-2 mb-12 ;
  }
</style>
