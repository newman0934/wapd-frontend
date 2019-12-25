<template>
  <div class="container py-5">
    <h3 class="mt-5">要重設密碼嗎?</h3>
    <h5 class="mt-3">沒問題，我們將會寄一封重設密碼通知信給您</h5>
    <font-awesome-icon icon="user-lock" size="7x" class="mt-4" />
    <div class="d-flex justify-content-center">
      <form class="mt-4 w-50" @submit.prevent.stop="handleSubmit">
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="請輸入註冊的Email"
          required
          autofocus
        />
        <button class="btn btn-lg btn-outline-secondary btn-sm mt-3" type="submit">送出</button>
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
      email: ""
    };
  },
  computed: {
    formData() {
      const { email } = this;
      return { email };
    }
  },
  methods: {
    async handleSubmit() {
      const formData = this.formData;
      try {
        const { data, statusText } = await usersAPI.postPasswordForget({
          formData
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          type: "success",
          title: "變更密碼信件已寄送，請確認電子信箱或垃圾信箱"
        });
        this.$router.push({ name: "userForgetPassword" });
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "變更密碼信件寄送失敗，請稍後再試"
        });
      }
    }
  }
};
</script>