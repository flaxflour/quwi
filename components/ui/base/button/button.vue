<template>
  <component
    :is="!href ? 'button' : externalLink ? 'a' : 'nuxt-link'"
    class="ui-button"
    v-wave="!isWaveDisabled"
    :to="href"
    :class="cssClasses"
    :disabled="loading || disabled"
    v-on="$listeners"
  >
    <ui-loading-icon v-if="loading" class="ui-button--loading" />
    <p v-else class="ui-button_text">
      <slot></slot>
    </p>
  </component>
</template>

<script>
import UiLoadingIcon from "~/components/ui/base/loading-icon/loading-icon";

const baseCssClass = "ui-button";

export default {
  name: "UiButton",
  components: {
    UiLoadingIcon,
  },
  props: {
    loading: Boolean,
    disabled: Boolean,
    href: String,
    externalLink: Boolean,
  },
  computed: {
    cssClasses() {
      return [
        {
          [`${baseCssClass}--disabled`]: this.disabled || this.loading,
        },
      ];
    },
    isWaveDisabled() {
      return this.loading || this.disabled;
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-button {
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
  background-color: var(--accent);
  color: var(--white);
  border-radius: 0.25rem;
  font-weight: bold;
  height: 3rem;

  &--loading {
    margin-right: 0.25rem;
  }

  &--loading,
  &--disabled {
    cursor: default;
    pointer-events: none;
    background-color: var(--disabled-btn);
  }
}
</style>
