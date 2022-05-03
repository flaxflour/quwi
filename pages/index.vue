<template>
  <div class="login">
    <div class="login__inner">
      <div class="logo__wrap">
        <img class="logo" src="~/static/logo.png" alt="quwi logo" />
        <p class="logo_text">Quwi</p>
      </div>
      <form class="login__form">
        <ui-form-input
          v-model="$v.email.$model"
          ref="inputEmailRef"
          type="email"
          :class="{ 'form-group--error': $v.password.$error }"
          :placeholder="$t('enter_email')"
          @enter="$refs.inputPasswordRef.focus()"
        />
        <ui-form-input
          v-model="$v.password.$model"
          ref="inputPasswordRef"
          :type="isShowPasswordText ? 'text' : 'password'"
          :class="{ 'form-group--error': $v.password.$error }"
          :placeholder="$t('enter_password')"
          @enter="tryLogin"
        >
          <template #append>
            <button
              class="password__actions"
              :title="
                isShowPasswordText ? $t('action.show') : $t('action.hide')
              "
              @click.prevent.stop="isShowPasswordText = !isShowPasswordText"
            >
              <svg-icon v-if="isShowPasswordText" name="eye-off" />
              <svg-icon v-else name="eye" />
            </button>
          </template>
        </ui-form-input>
        <ui-button
          :loading="loading"
          :disabled="$v.$invalid"
          @click.prevent="tryLogin"
          >{{ $i18n.t("login") }}</ui-button
        >
        <nuxt-link to="/forgot" class="forgot__password">{{
          $i18n.t("forgot_password")
        }}</nuxt-link>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";

import UiFormInput from "~/components/ui/base/form/form-input/form-input";
import UiButton from "~/components/ui/base/button/button";

export default {
  components: {
    UiFormInput,
    UiButton,
  },

  layout: "login",

  data() {
    return {
      loading: false,
      email: "",
      password: "",
      isShowPasswordText: false,
    };
  },

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },

  head: {
    title: "Login page",
    meta: [
      {
        hid: "",
        name: "",
        content: "",
      },
    ],
  },

  methods: {
    async tryLogin() {
      if (this.$v.$invalid) {
        return;
      }

      this.loading = true;
      this.$v.$touch();

      await this.$axios
        .post("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(async (resp) => {
          const { token } = resp.data;
          await this.login(token);
        })
        .catch((err) => {
          this.$toast.error(err.response.data.first_errors.email);
        });

      this.loading = false;
    },

    async login(token) {
      await this.$auth.setUserToken(token);
      await this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f5ff;

  .logo__wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.5rem;

    .logo {
      margin-right: 0.5rem;

      &_text {
        text-transform: uppercase;
        font-weight: bold;
      }
    }
  }

  &__inner {
    max-width: 25rem;
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: hsla(210, 8%, 62%, 0.2) 0px 8px 24px;
  }

  &__form {
    display: flex;
    flex-direction: column;

    .password__actions {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: var(--icon-color);

      &:hover {
        color: var(--black);
      }
      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    .forgot__password {
      color: var(--accent);
      margin-top: 1rem;
      font-size: 0.95rem;
      text-align: center;
    }
  }
}
</style>
