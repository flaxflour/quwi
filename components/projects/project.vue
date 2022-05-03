<template>
  <div
    class="project"
    v-wave
    @click.prevent.stop="$emit('open-project', project)"
  >
    <img class="project_img" :src="project.logo_url" :alt="project.name" />
    <p class="project_name">{{ project.name }}</p>
    <p :class="['project_status', { 'project--active': project.is_active }]">
      {{ project.is_active ? $i18n.t("active") : $i18n.t("not_active") }}
    </p>
    <div class="project__info--right">
      <div class="project__info">
        <p class="project__info-key">{{ $i18n.t("info_week") }}</p>
        <p class="project__info-value">00:00:00</p>
      </div>
      <div class="project__info">
        <p class="project__info-key">{{ $i18n.t("info_month") }}</p>
        <p class="project__info-value">00:00:00</p>
      </div>
      <div class="project__info">
        <p class="project__info-key">{{ $i18n.t("info_total") }}</p>
        <p class="project__info-value">00:00:00</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.project {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 40rem;
  margin: 0 auto;
  width: 100%;
  background-color: var(--white);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid var(--gray-lighten);
  cursor: pointer;

  &:hover {
    background-color: var(--light-blue);
  }

  &_img {
    max-width: 5rem;
    object-fit: contain;
    margin-right: 1rem;
  }

  &_name {
    font-weight: bold;
    flex: 2 0 0;
  }

  &_status {
    flex-grow: 1;
  }

  &--active {
    color: var(--green);
    font-weight: bold;
  }

  &__info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    line-height: 1.5rem;

    .project__info-key,
    .project__info-value {
      white-space: nowrap;
      flex-grow: 1;
    }

    .project__info-value {
      font-weight: bold;
    }
  }
}
</style>
