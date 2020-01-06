<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <form class="w-75 mt-4" @submit.stop.prevent="handleSubmit">
        <div class="form-label-group mb-2">
          <label for="name" class="d-flex">舊密碼:</label>
          <input
            id="used-password"
            name="usedPassword"
            v-model="usedPassword"
            type="password"
            class="form-control"
            placeholder="請輸入目前使用的舊密碼"
            required
          />
        </div>
        <div class="form-label-group mb-2">
          <label for="name" class="d-flex">新密碼:</label>
          <input
            id="new-password"
            name="newPassword"
            v-model="newPassword"
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

        <button
          class="btn btn-lg btn-outline-secondary btn-block btn-sm mb-3"
          type="submit"
        >{{isProcessing ? "資料更新中..." : "更新密碼"}}</button>
      </form>
    </div>
  </div>
</template>
<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      usedPassword: "",
      newPassword: "",
      passwordCheck: ""
    };
  },
  computed: {
    isProcessing() {
      return this.$store.state.isProcessing;
    },
    formData() {
      const { usedPassword, newPassword, passwordCheck } = this;
      return {
        usedPassword,
        newPassword,
        passwordCheck
      };
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.usedPassword || !this.newPassword || !this.passwordCheck) {
        Toast.fire({
          type: "warning",
          title: "所有欄位皆需填寫"
        });
        return;
      }
      if (this.usedPassword == this.newPassword) {
        Toast.fire({
          type: "warning",
          title: "新密碼與舊密碼不可相同"
        });
        return;
      }
      if (this.newPassword !== this.passwordCheck) {
        Toast.fire({
          type: "warning",
          title: "新密碼兩次輸入不一樣"
        });
        return;
      }
      const formData = this.formData;
      try {
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await usersAPI.postPasswordChange({
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
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          type: "error",
          title: "密碼更新失敗，請確認密碼是否輸入正確"
        });
      }
    }
  }
};
</script>