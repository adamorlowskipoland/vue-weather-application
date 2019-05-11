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
        :disabled="pending"
        class="block text-grey-darker font-bold"
      />
      <base-button
        class="ml-4"
        :class="{'opacity-50 cursor-not-allowed': pending}"
        :disabled="pending"
        type="submit"
      >Add station</base-button>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
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
      pending: false,
      error: '',
    };
  },
  methods: {
    ...mapActions(['FETCH_ITEM']),
    submit() {
      //  TODO: add validation on swiss postal Code

      console.log('%c Line 44 -> ', 'color: lightseagreen ;', this.query);
      this.pending = true;
      this.FETCH_ITEM('dupa')
        .then((res) => {
          console.log('%c Line 50 -> ', 'color: #FFFF00 ;', res);
        })
        .catch((e) => {
          console.log('%c Line 53 -> ', 'color: #FFFF00 ;', e);
        })
        .finally(() => {
          this.pending = false;
        });
    },
  },
};
</script>
<style>
  .form {
    @apply bg-white shadow-md rounded px-8 pt-6 pb-8 flex items-end relative;
  }
</style>
