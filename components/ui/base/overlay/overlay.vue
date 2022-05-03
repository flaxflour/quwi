<template>
  <div
    class="ui-overlay"
    :class="cssClasses"
    @click.prevent.stop="closeOnClick && $emit('close')"
  ></div>
</template>

<script>
export default {
  props: {
    cursor: {
      type: String,
      default: "default",
      required: false,
    },
    background: {
      type: String,
      default: "default",
      required: false,
    },
    closeOnClick: Boolean,
  },

  computed: {
    cssClasses() {
      return [
        {
          [`cursor-${this.cursor}`]: this.cursor,
          [`bg-${this.background}`]: this.background,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.ui-overlay {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 100ms ease-in-out;
  opacity: 1;
  z-index: 20;

  &.bg-default {
    background: rgba(28, 24, 25, 0.7);
  }

  .cursor-pointer {
    cursor: pointer;
  }
  .cursor-default {
    cursor: default;
  }
}
</style>
