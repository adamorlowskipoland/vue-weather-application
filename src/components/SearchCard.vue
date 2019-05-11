<template>
  <div class="inline-block">
    <form
      class="form"
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
      <base-button
        class="ml-4"
        :class="{'opacity-50 cursor-not-allowed': disabled}"
        :disabled="disabled"
        type="submit"
      >Add station
      </base-button>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
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
      errors: [],
    };
  },
  computed: {
    ...mapState(['postalCodes']),
    disabled() {
      return this.pending || this.$store.state.stations.length >= 10;
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
        this.errors.push('Can\'t add station, there are already 10 of them.');
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
    @apply bg-white shadow rounded px-8 pt-6 pb-8 flex items-end;
  }
</style>
