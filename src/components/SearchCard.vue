<template>
  <div class="block max-w-md">
    <form
      class="form sm:flex items-end justify-around p-4 md:px-8 sm:pt-6 sm:pb-12"
      :title="disabled && 'Only 10 widgets can be added.'"
      @submit.prevent="submit"
    >
      <fieldset :disabled="disabled">
        <base-input
          ref="input"
          v-model="query"
          :errorText="errors[0]"
          label="Search for a city"
          type="number"
          placeholder="Enter zipcode for Switzerland"
          :disabled="pending"
          class="block text-grey-darker font-bold"
        />
      </fieldset>
      <div class="text-right">
        <base-button
          class="mt-4"
          :class="{'opacity-50 cursor-not-allowed': disabled}"
          :disabled="disabled"
          type="submit"
        >Add station
        </base-button></div>
    </form>
  </div>
</template>
<script>
import nativeToast from 'native-toast';
import { mapActions } from 'vuex';
import BaseInput from './BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'SearchCard',
  widgetsLimit: 10,
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      query: '',
      pending: false,
      errors: [],
    };
  },
  computed: {
    disabled() {
      return this.pending || this.$store.state.stations.length >= this.$options.widgetsLimit;
    },
  },
  methods: {
    ...mapActions(['FETCH_ITEM']),
    validate(val) {
      this.errors = [];
      if (!(val.length === 4)) {
        this.errors.push('Input must be 4 digits');
      }
      if (+val < 1000) {
        this.errors.push('Swiss codes starts from 1000');
      }
      if (this.disabled) {
        this.errors.push(
          `Can't add station, there are already ${this.$options.widgetsLimit} of them.`,
        );
      }
      return !this.errors.length;
    },
    submit() {
      const searchQueryValid = this.validate(this.query);
      if (!searchQueryValid) return;
      this.pending = true;
      this.FETCH_ITEM(this.query)
        .then(() => {
          this.query = '';
          this.errors = [];
        })
        .catch((error) => {
          console.error('%c Line 83 -> ', 'color: #FCAA00 ;', error);
          nativeToast({
            message: error,
            position: 'north-east',
            timeout: 5000,
            type: 'info',
            closeOnClick: true,
          });
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
    @apply bg-white shadow rounded;
  }
</style>
