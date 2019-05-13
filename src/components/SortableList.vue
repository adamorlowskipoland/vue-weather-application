<script>
import { Sortable } from '@shopify/draggable';

export default {
  name: 'SortableList',
  props: {
    itemClass: {
      type: String,
      default: 'sortable-item',
    },
    handleClass: {
      type: String,
      default: 'sortable-handler',
    },
  },
  provide() {
    return {
      sortableItemClass: this.itemClass,
      sortableHandleClass: this.handleClass,
    };
  },
  mounted() {
    new Sortable(this.$el, {
      draggable: `.${this.itemClass}`,
      handle: `.${this.handleClass}`,
      mirror: {
        constrainDimensions: true,
      },
    });
  },
  render() {
    return this.$slots.default[0];
  },
};
</script>
