<template>
  <div class="inline-block">
    <form
      class="form"
      @submit.prevent="submit"
    >
      <fieldset :disabled="pending">
        <base-input
          ref="input"
          v-model="query"
          :errorText="error"
          label="Search for a city"
          type="number"
          placeholder="Enter zipcode for Switzerland"
          :disabled="pending"
          class="block text-grey-darker font-bold"
        />
      </fieldset>
      <base-button
        class="ml-4"
        :class="{'opacity-50 cursor-not-allowed': pending}"
        :disabled="pending"
        type="submit"
      >Add station
      </base-button>
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
    validate(val) {
      //  TODO: add validation on swiss postal Code
      const valid = val.length === 4;
      this.error = valid ? '' : 'Input must be 4 digits';
      return valid;
    },
    submit() {
      console.log('%c Line 44 -> ', 'color: lightseagreen ;', this.query);
      const searchQueryValid = this.validate(this.query);
      if (!searchQueryValid) return;
      this.pending = true;
      this.FETCH_ITEM(this.query)
        .then(() => {
          this.query = '';
        })
        .catch((e) => {
          //  TODO: toastr error msg
          console.log('%c Line 53 -> ', 'color: #FFFF00 ;', e);
          console.log('%c Line 53 -> ', 'color: #FFFF00 ;', 'Could\'t get data... 💀');
        })
        .finally(() => {
          this.pending = false;
          this.$nextTick(() => {
            this.$refs.input.$el.querySelector('input').focus();
          });
        });
    },
  },
};
</script>
<style>
  .form {
    @apply bg-white
    shadow-md rounded px-8 pt-6 pb-8 flex items-end;
  }
</style>
