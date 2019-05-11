<template>
  <button :type="type" class="button md:font-bold" :class="typeClasses">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    typeClasses() {
      switch (this.type) {
        case 'danger':
          return 'bg-red';
        default:
          return 'bg-blue-dark';
      }
    },
  },
};
</script>

<style lang="css" scoped>
  .button {
    @apply px-4 py-2 text-white rounded items-center leading-tight;
  }
</style>
