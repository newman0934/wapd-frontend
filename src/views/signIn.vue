<template>
  <div class="container py-5 d-flex justify-content-center">
    <div class="card border-light w-75">
      <div class="card-img signin-img">
        <img src="https://picsum.photos/id/104/3840/2160" class="img-fluid" alt="sign-in-img" />
      </div>
      <div class="card-img-overlay mt-5 text-dark">
        <h2 class="card-title">WAP-D</h2>
        <h5 class="card-text">We always persist in dream</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 border-right">
            <form class="w-100" @submit.prevent.stop="handleSubmitSignIn">
              <h4>登入</h4>
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <div class="form-label-group mb-2 has-success">
                  <input
                    id="email"
                    v-model="email"
                    name="email"
                    type="email"
                    class="form-control form-control-success"
                    placeholder="請輸入Email"
                    required
                  />
                  <span class="d-flex">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider rules="required|alpha_num|password" v-slot="{ errors }">
                <div class="form-label-group mb-3">
                  <input
                    id="password"
                    v-model="password"
                    name="password"
                    type="password"
                    class="form-control"
                    placeholder="請輸入密碼"
                    required
                  />
                  <span class="d-flex">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <button
                class="btn btn-lg btn-outline-secondary btn-block btn-sm mb-3"
                type="submit"
                :disabled="isProcessing"
              >登入</button>
            </form>
            <div class="text-center mb-3">
              <router-link :to="{name:'userForgetPassword'}">忘記密碼</router-link>
            </div>
          </div>
          <div class="col-md-6">
            <form class="w-100" @submit.prevent.stop="handleSubmitSignUp">
              <h4>註冊</h4>
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <div class="form-label-group mb-2">
                  <input
                    id="register-email"
                    name="register-email"
                    v-model="registerEmail"
                    type="email"
                    class="form-control"
                    placeholder="請輸入Email"
                    required
                  />
                  <span class="d-flex">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                rules="required|alpha_num|password"
                v-slot="{ errors }"
                vid="registerPassword"
              >
                <div class="form-label-group mb-2">
                  <input
                    id="register-password"
                    name="register-password"
                    v-model="registerPassword"
                    type="password"
                    class="form-control"
                    placeholder="請輸入密碼"
                    required
                  />
                  <span class="d-flex">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required|confirmed:registerPassword" v-slot="{ errors }">
                <div class="form-label-group mb-3">
                  <input
                    id="register-password-check"
                    name="register-password-check"
                    v-model="registerPasswordCheck"
                    type="password"
                    class="form-control"
                    placeholder="請再次輸入密碼驗證"
                    required
                  />
                  <span class="d-flex">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <button
                class="btn btn-lg btn-outline-secondary btn-block btn-sm mb-3"
                type="submit"
                :disabled="isProcessing"
              >註冊</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationProvider } from "vee-validate";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  components: {
    ValidationProvider
  },
  data() {
    return {
      email: "",
      password: "",
      registerEmail: "",
      registerPassword: "",
      registerPasswordCheck: ""
    };
  },
  computed: {
    isProcessing() {
      return this.$store.state.isProcessing;
    }
  },
  methods: {
    async handleSubmitSignIn() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            type: "warning",
            title: "請填入 email 和 password"
          });
          return;
        }
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        localStorage.setItem("token", data.token);
        //let data into Vuex
        await this.$store.commit("setCurrentUser", data.user);
        await this.$store.dispatch("fetchUserFavorite", data.user.id);
        Toast.fire({
          type: "success",
          title: "登入成功"
        });
        // 成功登入後轉址到上一頁
        this.$router.go(-1);
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.password = "";
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          type: "warning",
          title: "請確認您輸入的帳號密碼錯誤"
        });
      }
    },
    async handleSubmitSignUp() {
      try {
        //testing form validation
        if (
          !this.registerEmail ||
          !this.registerPassword ||
          !this.registerPasswordCheck
        ) {
          Toast.fire({
            type: "warning",
            title: "請確認，註冊欄位皆需填寫"
          });
          return;
        }
        if (this.registerPassword !== this.registerPasswordCheck) {
          Toast.fire({
            type: "warning",
            title: "兩次密碼不同"
          });
          return;
        }
        //signup and signin process
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await authorizationAPI.signUp({
          email: this.registerEmail,
          password: this.registerPassword,
          passwordCheck: this.registerPasswordCheck
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(data.message);
        }
        localStorage.setItem("token", data.token);
        //let data into Vuex
        this.$store.commit("setCurrentUser", data.user);
        Toast.fire({
          type: "success",
          title: "註冊成功"
        });
        // 成功登入後轉址到上一頁
        this.$router.go(-1);
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        this.registerPassword = "";
        this.registerPasswordCheck = "";
        Toast.fire({
          type: "warning",
          title: "請確認您註冊的帳號密碼是否正確"
        });
      }
    }
  }
};
</script>
<style scoped>
.signin-img {
  height: 200px;
  overflow: hidden;
}

.signin-img img {
  margin-top: -5%;
  opacity: 0.5;
  filter: alpha(opacity=50);
}
</style>