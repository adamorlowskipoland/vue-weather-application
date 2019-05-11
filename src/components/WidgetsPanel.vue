<template>
  <section class="panel"><pre class="mb-5">{{stations}}</pre>
    <div class="flex -mx-2 mb-4 flex-wrap">
      <div
        v-for="station in stations"
        :key="station.id"
        class="column"
      >
        <widget-station
          :data="station"
          @click="deleteStation"
        ></widget-station>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
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
    deleteStation(val) {
      console.log('%c Line 31 -> ', 'color: #FFFF00 ;', val);
    },
  },
};
</script>

<style scoped>
  .column {
    @apply w-1/5 px-2 mb-12 ;
  }
</style>
