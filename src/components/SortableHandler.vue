<script>
export default {
  name: 'SortableHandler',
  inject: ['sortableHandleClass'],
  mounted() {
    this.$el.classList.add(this.sortableHandleClass);
  },
  render() {
    return this.$slots.default[0];
  },
};
</script>
