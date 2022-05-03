<template>
  <component :is="rootElementType" class="ui-spinner_container">
    <span
      :class="cssClasses"
      :aria-label="label"
      :style="{ borderWidth: borderWidth + 'px' }"
    ></span>
  </component>
</template>

<script>
const colors = {
  dark: "dark",
  light: "light",
  accent: "accent",
};

const defaultColor = colors.accent;
const baseCssClass = "ui-spinner";

export default {
  props: {
    label: {
      type: String,
      required: false,
      default: "Loading",
    },
    color: {
      type: String,
      required: false,
      default: defaultColor,
      validator(value) {
        return Object.keys(colors).includes(value);
      },
    },
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
    borderWidth: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    rootElementType() {
      return this.inline ? "span" : "div";
    },
    cssClasses() {
      return [baseCssClass, `${baseCssClass}-${colors[this.color]}`];
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes ul-spinner-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.ui-spinner_container {
  text-align: center;
  line-height: 0;
}

.ui-spinner {
  position: relative;
  display: inline-flex;
  border-radius: 9999rem;
  border-style: solid;
  margin: 0 auto;
  animation-name: ul-spinner-rotate;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  // default size
  border-width: 2px;
  width: 1rem;
  height: 1rem;

  // default color
  border-color: gray;
  border-top-color: yellow;

  &.ui-spinner-dark {
    border-color: black;

    border-top-color: gray;
  }

  &.ui-spinner-light {
    border-color: hsla(0, 0%, 100%, 0.25);
    border-top-color: #fff;
  }

  &.ui-spinner-accent {
    border-color: var(--accent);
    border-top-color: #ccc7ee;
  }
}
</style>
