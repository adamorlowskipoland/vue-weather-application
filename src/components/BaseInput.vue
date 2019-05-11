<template>
  <label
    for="username"
    class="label"
    v-bind="restAttrs"
  >
    <span class="inline-block mb-4 text-lg" v-text="label"></span>
    <input
      id="username"
      :type="type"
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
    <transition name="fade">
      <span
        v-if="errorText"
        class="error"
      >{{errorText}}</span>
    </transition>
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
    errorText: {
      type: String,
      default: '',
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
    type() {
      const { type, attrs } = this.$attrs;
      return type;
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
      clearTimeout(this.debounce);
      if (updatedValue === this.value) return;
      this.debounce = setTimeout(() => {
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
  .label {
    @apply relative;
    min-width: 340px;
  }
  .input {
    @apply shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight
  }
  .error {
    @apply text-red-dark font-light flex block absolute pin-l pin-b;
    transform: translateY(120%);
    max-width: 65%;
  }
</style>
