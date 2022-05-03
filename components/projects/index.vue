<template>
  <div class="projects">
    <Project
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @open-project="openProject"
    />
    <modal ref="modalRef">
      <ui-form-input
        v-model="$v.projectName.$model"
        ref="inputNameRef"
        label="Name"
        type="text"
        :placeholder="$t('enter_password')"
      />
    </modal>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

import Project from "~/components/projects/project";
import UiFormInput from "~/components/ui/base/form/form-input/form-input";

export default {
  components: {
    Project,
    UiFormInput,
    Modal: () => import("~/components/ui/base/modal/modal"),
  },

  props: {
    projects: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      projectName: "",
      projectId: "",
    };
  },

  validations: {
    projectName: {
      required,
      minLength: minLength(8),
    },
  },

  methods: {
    async openProject(project) {
      this.projectName = project.name;
      this.projectId = project.id;

      const modalResult = await this.$refs.modalRef.open();
      if (!modalResult) return;

      const isNameChanged = this.projectName.trim() !== project.name.trim();

      if (isNameChanged) this.changeName();
    },

    async changeName() {
      await this.$axios
        .post(`projects-manage/update?id=${this.projectId}`, {
          name: this.projectName,
        })
        .then(() => {
          this.$emit("fetch-projects");
          this.$toast.success(this.$i18n.t("name_changed"));
        })
        .catch(() => {
          this.$toast.error(this.$i18n.t("error"));
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
</style>
