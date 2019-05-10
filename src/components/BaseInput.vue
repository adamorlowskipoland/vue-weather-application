<template>
  <label for="username" v-bind="restAttrs">
    <span class="inline-block mb-4 text-lg" v-text="label"></span>
    <input
      id="username"
      type="text"
      aria-label="City"
      class="input focus:outline-none focus:shadow-outline"
      :class="disabled && 'opacity-50 cursor-not-allowed'"
      autocomplete="off"
      :placeholder="placeholder"
      :disabled="disabled"
      v-on="listeners"
      :value="value"
      @input="updateValue"
    >
  </label>
</template>
<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    value: String,
    label: String,
    debounceTime: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      debounce: null,
    };
  },
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
    placeholder() {
      const { placeholder, attrs } = this.$attrs;
      return placeholder;
    },
    disabled() {
      const { disabled, attrs } = this.$attrs;
      return disabled;
    },
    restAttrs() {
      const { placeholder, attrs } = this.$attrs;
      return attrs;
    },
  },
  methods: {
    updateValue(event) {
      const updatedValue = event.target.value.trim();
      // const formatedValue = updatedValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
      // console.log(formatedValue);
      clearTimeout(this.debounce);
      if (updatedValue === this.value) return;
      this.debounce = setTimeout(() => {
        console.log(updatedValue);
        this.$emit('input', updatedValue);
      }, this.debounceTime);
    },
  },
  beforeDestroy() {
    clearTimeout(this.debounce);
  },
};
</script>
<style lang="scss">
  .input {
    @apply shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight
  }
</style>
