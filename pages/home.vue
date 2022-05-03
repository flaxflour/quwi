<template>
  <div class="container">
    <Projects :projects="projects" @fetch-projects="fetchProjects" />
  </div>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      projects: [],
    };
  },

  async fetch() {
    await this.fetchProjects();
  },

  head: {
    title: "Home page",
    meta: [
      {
        hid: "Quwi",
        name: "Quwi",
        content:
          "Quwi - project management and time tracking.Best and easy to use project management platform with time tracking, realtime chat and file sharing features you will love.",
      },
    ],
  },

  methods: {
    async fetchProjects() {
      await this.$axios
        .get("projects-manage/index?filters[is_active]=1&sort=dta_create")
        .then((resp) => {
          this.projects = resp.data.projects;
        })
        .catch(() => {
          this.$toasted(this.$i18n.t("error"));
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  flex-grow: 1;
  padding: 4rem 0;
  background-color: #f4f4f4;
}
</style>
