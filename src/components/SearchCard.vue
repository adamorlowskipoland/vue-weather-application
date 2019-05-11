<template>
  <div class="inline-block">
    <form
      class="form"
      @submit.prevent="submit"
    >
      <base-input
        v-model="query"
        label="Search for a city"
        placeholder="Enter zipcode for Switzerland"
        :disabled="disabled"
        class="block text-grey-darker font-bold"
      />
      <base-button
        class="ml-4"
        :class="{'opacity-50 cursor-not-allowed': disabled}"
        :disabled="disabled"
        type="submit"
      >Add station</base-button>
    </form>
  </div>
</template>
<script>
import BaseInput from './BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'SearchCard',
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      query: '',
      disabled: false,
    };
  },
  methods: {
    submit(val) {
      console.log('%c Line 44 -> ', 'color: #FFFF00 ;', this.query);
      // this.$emit('input', this.query);
    },
  },
};
</script>
<style>
  .form {
    @apply bg-white shadow-md rounded px-8 pt-6 pb-8 flex items-end relative;
  }
</style>
