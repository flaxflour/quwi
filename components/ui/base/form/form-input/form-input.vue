<template>
<div class="ui-form-input" :class="cssClasses">
  <label v-if="label || id" :for="id">{{ label }}</label>
  <div class="ui-form-input__inner">
    <input
      v-bind="$attrs"
      ref="inputRef"
      :id="id"
      @input.prevent="$emit('input', $event.target.value)"
      @keydown.enter.prevent="$emit('enter')"
    />
    <div v-if="$scopedSlots.append" class="ui-form-input__append">
      <slot name="append"/>
    </div>
  </div>
  <div v-if="$scopedSlots.validation && state" class="ui-form-input__validation">
    <slot name="validation"/>
  </div>
</div>
</template>

<script>
const variants = ['clean']

const baseCssClass = 'ui-form-input'

export default {
  name:         'UiFormInput',
  inheritAttrs: false,
  model:        {
    prop:  'value',
    event: 'input',
  },
  props: {
    variant: {
      type:    String,
      default: null,
      validator(value) {
        return variants.includes(value)
      },
    },
    label: {
      type:    String,
      default: null,
    },
    id: {
      type:    String,
      default: null,
    },
    state:    Boolean,
    required: Boolean,
  },
  computed: {
    cssClasses() {
      return {
        [`${baseCssClass}--${this.variant}`]: this.variant,
        [`${baseCssClass}--required`]:        this.required,
        [`${baseCssClass}--error`]:           this.state,
      }
    },
  },
  methods: {
    focus() {
      this.$refs.inputRef.focus()
    },
    blur() {
      this.$refs.inputRef.blur()
    },
  },
}
</script>

<style lang="scss" scoped>
.ui-form-input {
  margin-bottom: 1rem;

  label {
    line-height: 1.5rem;
    color: var(--gray-darken);
  }

  &.ui-form-input--required {
    label::after {
      content: '*';
      color: hsl(0, 100%, 50%);
      padding-left: 0.25rem;
    }
  }

  input {
    width: 100%;
    outline: none;
    margin: 0;
    padding: 0.5rem;
    padding-right: 2.5rem;
    border: 2px solid #f5f8ff;
    border-radius: 0.25rem;
  }

  &__inner {
    position: relative;

    .ui-form-input__append {
      position: absolute;
      top: 0;
      right: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  &.ui-form-input--error {
    input {
      border: 1px solid hsl(355, 51%, 69%);
    }
  }
}
</style>
