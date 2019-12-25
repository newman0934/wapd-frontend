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
              <div class="form-label-group mb-2">
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  type="email"
                  class="form-control"
                  placeholder="請輸入Email"
                  required
                />
              </div>
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
              </div>
              <button
                class="btn btn-lg btn-outline-secondary btn-block btn-sm mb-3"
                type="submit"
                :disabled="isProcessing"
              >登入</button>
            </form>
            <div class="text-center mb-3">
              <a href="#">忘記密碼</a>
            </div>
          </div>
          <div class="col-md-6">
            <form class="w-100" @submit.prevent.stop="handleSubmitSignUp">
              <h4>註冊</h4>
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
              </div>
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
              </div>
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
              </div>
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
/* eslint-disable */
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      email: "",
      password: "",
      registerEmail: "",
      registerPassword: "",
      registerPasswordCheck: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmitSignIn(e) {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            type: "warning",
            title: "請填入 email 和 password"
          });
          return;
        }
        this.isProcessing = true;
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

        // 成功登入後轉址到上一頁
        this.$router.go(-1);
      } catch (error) {
        this.password = "";
        this.isProcessing = false;
        Toast.fire({
          type: "warning",
          title: "請確認您輸入的帳號密碼錯誤"
        });
      }
    },
    async handleSubmitSignUp(e) {
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
        this.isProcessing = true;
        const { data, statusText } = await authorizationAPI.signUp({
          email: this.registerEmail,
          password: this.registerPassword,
          passwordCheck: this.registerPasswordCheck
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(data.message);
        }
        // Toast.fire({
        //   type: "success",
        //   title: data.message
        // });
        localStorage.setItem("token", data.token);
        //let data into Vuex
        this.$store.commit("setCurrentUser", data.user);
        this.$router.go(-1);
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
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