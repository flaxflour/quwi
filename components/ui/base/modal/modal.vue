<template>
<div v-if="isOpen" class="modal">
  <ui-overlay  @close="close"/>
  <div class="modal__inner" :class="cssClasses">
    <slot></slot>
    <div class="modal__footer">
      <slot name="actions" :confirm="confirm" :close="close">
        <button class="action__close" @click.prevent.stop="close">{{$i18n.t('close')}}</button>
        <button class="action__confirm" @click.prevent.stop="confirm">{{$i18n.t('confirm')}}</button>
      </slot>
    </div>
  </div>
</div>
</template>

<script>
import UiOverlay from '~/components/ui/base/overlay/overlay'

export default {
  components: {
    UiOverlay,
  },

  modalPromise: null,

  props: {
    size: {
      type:    String,
      default: 'sm',
    },
  },

  data() {
    return { isOpen: false }
  },

  computed: {
    cssClasses() {
      return [`max-w-${this.size}`]
    },
  },

  watch: {
    isOpen(value) {
      const body = document.body.classList
      return value ? body.add('overflow-hidden') : body.remove('overflow-hidden')
    },
  },

  mounted() {
    document.addEventListener('keydown', this.handleKeydown)
  },
  
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  },

  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === 'Escape') {
        this.close();
      }
    },

    open() {
      let resolve;
      let reject;
      const popupPromise = new Promise((ok, fail) => {
        resolve = ok
        reject = fail
      });

      this.$options.modalPromise = { resolve, reject }
      this.isOpen = true

      return popupPromise
    },

    confirm() {
      this.$options.modalPromise.resolve(true)
      this.isOpen = false
    },

    close() {
      this.$options.modalPromise.resolve(false)
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
html, body { 
  overflow: hidden !important;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 50;

  &__inner {
    max-width: 30rem;
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: hsla(210, 8%, 62%, 0.2) 0px 8px 24px;
    width: 100%;
    z-index: 30;
    padding: 1rem;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    
    .action__close,
    .action__confirm {
      cursor: pointer;
      margin-left: 1rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
    }

    .action__close {
      &:hover {
        background-color: var(--gray);
      }
    }

    .action__confirm {
      transition: background-color 75ms ease-in;
      background-color: var(--accent);
      color: var(--white);

      &:hover {
        background-color: var(--accent-light)
      }
    }
  }
}
</style>
