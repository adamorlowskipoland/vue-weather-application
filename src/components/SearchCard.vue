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
import { mapState, mapActions } from 'vuex';
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
    ...mapState(['postalCodes']),
    disabled() {
      return this.pending || this.$store.state.stations.length >= this.$options.widgetsLimit;
    },
  },
  methods: {
    ...mapActions(['FETCH_ITEM']),
    validate(val) {
      //  TODO: add validation on swiss postal Code
      this.errors = [];
      if (!(val.length === 4)) {
        this.errors.push('Input must be 4 digits');
        return false;
      }
      if (this.disabled) {
        this.errors.push(
          `Can't add station, there are already ${this.$options.widgetsLimit} of them.`,
        );
        return false;
      }
      return true;
    },
    submit() {
      console.log('%c Line 44 -> ', 'color: lightseagreen ;', this.query);
      const searchQueryValid = this.validate(this.query);
      if (!searchQueryValid) return;
      this.pending = true;
      this.FETCH_ITEM(this.query)
        .then(() => {
          this.query = '';
          this.errors = [];
        })
        .catch((e) => {
          //  TODO: toastr error msg
          console.log('%c Line 53 -> ', 'color: #FFFF00 ;', e);
          console.log('%c Line 53 -> ', 'color: #FFFF00 ;', 'Could\'t get data, city not found... 💀');
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
