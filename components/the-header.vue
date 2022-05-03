<template>
  <header class="header">
    <img class="logo" src="~/static/logo.png" alt="quwi logo"/>
    <div class="header__actions">
      <button class="header_action" @click="$nuxt.refresh">{{$i18n.t("projects")}}</button>
      <button class="header_action" @click="logout">{{$i18n.t("logout")}}</button>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      try {
        this.$auth.logout();
      } catch (e) {
        this.$toast.error(this.$i18n.t('error'))
      }
    }
  }
}
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--header-bg);
  box-shadow: 0 0 5px rgba(0,0,0,.25);
  
  &__actions {
    margin-left: auto;
  }

  &_action {
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    color: var(--header-text-color);
    padding-left: 1rem;

    &:hover {
      color: var(--header-text-color-hover);
    }
  }
}
</style>