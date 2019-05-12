<script>
export default {
  name: 'LoopFire',
  props: {
    loopDelay: {
      type: Number,
      default: 10000,
    },
  },
  created() {
    this.ringTheBell();
  },
  destroyed() {
    clearTimeout(this.loopTimeout);
  },
  data() {
    return {
      loopTimeout: null,
    };
  },
  methods: {
    ringTheBell() {
      this.$emit('time-is-up');
      this.fireLoop();
    },
    fireLoop() {
      this.loopTimeout = setTimeout(() => {
        this.ringTheBell();
      }, this.loopDelay);
    },
  },
  render() {
    return null;
  },
};
</script>
