<template>
  <div class="station">
    <h4 class="station__location text-md">{{ station.name }}</h4>
    <slot name="loader"></slot>
    <slot name="action"></slot>
    <p class="mb-4">Current: {{ station.main.temp }} &#8451;</p>
    <p class="mb-4">Min: {{ station.main.temp_min }} &#8451;</p>
    <p class="mb-4">Max: {{ station.main.temp_max }} &#8451;</p>
    <p class="mb-4">
      Sunrise: {{ station.sys.sunrise | formatTime }}
    </p>
    <p class="mb-4">
      Sunset: {{ station.sys.sunset | formatTime }}
    </p>
    <span class="absolute pin-b pin-r p-2" @click="$emit('click')">
      <svg
        class="station__close"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>Remove</title>
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
    @apply relative border-4 shadow p-2 pt-12 pb-6 bg-white;
    transition: background-color .3s ease, color .3s ease;
    &__location {
      @apply p-1 -ml-1 bg-white text-black absolute pin-t font-bold tracking-wide;
      transform: translateY(-50%);
     }
    &__close {
      @apply fill-current h-6 w-6 text-red rounded-full;
      transition: background-color .3s ease;
      &:hover {
        @apply bg-pink-lightest;
      }
    }
    &__sort-icon {
      @apply absolute pin-t pin-r text-grey;
      transition: color .3s ease;
      height: 2rem;
      width: 2rem;
      cursor: move;
      color: #b8c2cc;
      &:hover {
        @apply text-grey-dark;
        color: #3d4852;
      }
    }
  }
  /*.station.draggable-source--is-dragging {*/
  /*  background-color: #f1f5f8;*/
  /*}*/
  /*.station.draggable-source--is-dragging > * {*/
  /*  opacity: 0;*/
  /*}*/
</style>
