<template>
  <div class="container py-5">
    <template v-if="tokenValidation">
      <div>
        <h3 class="mt-3">重設密碼</h3>
        <h5 class="mt-3">再一步就完成更新了，請輸入您的新密碼</h5>
        <font-awesome-icon icon="key" size="7x" class="mt-4" />
        <div class="d-flex justify-content-center">
          <form class="mt-4 w-50" @submit.stop.prevent="handleSubmit">
            <input
              id="userId"
              name="userId"
              v-model="userId"
              type="hidden"
              class="form-control"
              required
            />
            <input
              id="token"
              name="token"
              v-model="token"
              type="hidden"
              class="form-control"
              required
            />
            <div class="form-label-group mb-2">
              <label for="name" class="d-flex">新密碼:</label>
              <input
                id="password"
                name="password"
                v-model="password"
                type="password"
                class="form-control"
                placeholder="請設定您的新密碼"
                required
              />
            </div>
            <div class="form-label-group mb-2">
              <label for="name" class="d-flex">新密碼確認:</label>
              <input
                id="password-check"
                name="passwordCheck"
                v-model="passwordCheck"
                type="password"
                class="form-control"
                placeholder="請再輸入新密碼做確認"
                required
              />
            </div>

            <button class="btn btn-lg btn-outline-secondary btn-sm mt-3" type="submit">送出</button>
          </form>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <h3 class="mt-3">Oops!!!</h3>
        <h5 class="mt-3">
          請確認網址是否正確，或使用
          <router-link :to="{name:'userForgetPassword'}">忘記密碼</router-link>再次申請
        </h5>
        <font-awesome-icon icon="sad-tear" size="7x" class="mt-4" />
      </div>
    </template>
  </div>
</template>
<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      userId: 0,
      token: "",
      tokenValidation: false,
      password: "",
      passwordCheck: ""
    };
  },
  computed: {
    formData() {
      const { userId, token, password, passwordCheck } = this;
      return { userId, token, password, passwordCheck };
    }
  },
  created() {
    const { token_id, token } = this.$route.params;
    this.fetchResetPassword(token_id, token);
  },
  methods: {
    async fetchResetPassword(tokenId, token) {
      try {
        const { data, statusText } = await usersAPI.getResetPassword({
          tokenId,
          token
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.userId = data.userId;
        this.token = data.token;
        this.tokenValidation = data.status == "success" ? true : false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          type: "error",
          title: "網址有誤，請確認後再試"
        });
      }
    },
    async handleSubmit() {
      if (this.password !== this.passwordCheck) {
        Toast.fire({
          type: "warning",
          title: "新密碼兩次輸入不一樣"
        });
        return;
      }
      const formData = this.formData;
      try {
        const { data, statusText } = await usersAPI.postResetPassword({
          formData
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          type: "success",
          title: "密碼更新成功，請用新密碼登入"
        });
        this.$router.push({ name: "signIn" });
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "密碼更新失敗，請確認資料是否正確"
        });
      }
    }
  }
};
</script>