<template functional>
  <img
    src="http://www.sageflyfish.com/resources/admin/widgets/loading.gif"
    alt="loading"
    class="loading"
    :class="props.classes"
  >
</template>
<script>
export default {
  name: 'LoadingSpinner',
  props: {
    classes: {
      type: Array,
      required: false,
    },
  },
};
</script>
<style>
  .loading {
    position: absolute;
    bottom: .3rem;
    left: .3rem;
    transform: translateY(-10%);
    max-width: 25px;
  }
</style>
