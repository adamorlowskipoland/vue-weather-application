<template functional>
  <div class="station">
    <h4 class="station__location text-md">{{ props.station.name }}</h4>
    <p class="mb-4">Current: {{ props.station.main.temp }}&#176;</p>
    <p class="mb-4">Min: {{ props.station.main.temp_min }}&#176;</p>
    <p class="mb-4">Max: {{ props.station.main.temp_max }}&#8451;</p>
    <p class="mb-4">
      Sunrise: {{ props.station.sys.sunrise | formatTime }}
    </p>
    <p class="mb-4">
      Sunset: {{ props.station.sys.sunset | formatTime }}
    </p>
    <span class="absolute pin-t pin-b pin-r px-4 py-4 flex items-end" @click="listeners.click">
      <svg
        class="fill-current h-6 w-6 text-red"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>Close</title>
        <path
          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
        ></path>
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  name: 'WidgetStation',
  props: {
    station: {
      type: Object,
      required: true,
    },
  },
  filters: {
    formatTime(val) {
      return new Date(val * 1000).toLocaleTimeString('ch-CH', {});
    },
  },
};
</script>

<style lang="scss" scoped>
  .station {
    @apply relative border border-blue-dark shadow-md p-4 pt-12;
    &__location {
      @apply p-1 -ml-1 bg-white absolute pin-t font-bold tracking-wide;
      transform: translateY(-50%);
     }
  }
</style>
