<template>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 flex items-end relative">
    <base-input
      :value="query"
      @input="emitValue"
      label="Search for a city"
      placeholder="Enter zipcode for Switzerland"
      :disabled="loading"
      class="block text-grey-darker font-bold"
    />
    <base-button :disabled="loading" class="ml-4" :class="{'opacity-50 cursor-not-allowed': loading}">Add station</base-button>
  </form>
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
  model: {
    prop: 'query',
  },
  props: {
    query: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitValue(val) {
      this.$emit('input', val);
    },
  },
};
</script>
