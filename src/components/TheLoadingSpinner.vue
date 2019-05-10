<template functional>
  <img
    src="http://www.sageflyfish.com/resources/admin/widgets/loading.gif"
    alt="loading"
    :class="props.classes"
  >
</template>
<script>
export default {
  name: 'TheLoadingSpinner',
  props: {
    classes: {
      type: Array,
      required: false,
    },
  },
};
</script>
<style>
  .loader {
    position: absolute;
    top: 50%;
    right: 2.5rem;
    transform: translateY(-10%);
    max-width: 25px;
  }
</style>
