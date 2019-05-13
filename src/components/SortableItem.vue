<script>
export default {
  name: 'SortableItem',
  inject: ['sortableItemClass'],
  mounted() {
    this.$el.classList.add(this.sortableItemClass);
  },
  render() {
    return this.$slots.default[0];
  },
};
</script>
