<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <form class="w-75 mt-4" @submit.stop.prevent="handleSubmit">
        <div class="form-label-group mb-2">
          <label for="name" class="d-flex">使用者名稱:</label>
          <input
            id="name"
            name="name"
            v-model="name"
            type="text"
            class="form-control"
            placeholder="Enter name"
          />
        </div>
        <div class="form-label-group mb-2">
          <label for="email" class="d-flex">Email:</label>
          <input
            id="email"
            name="email"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="email"
            disabled
          />
        </div>
        <div class="form-label-group mb-2">
          <label for="birthday" class="d-flex">生日:</label>
          <input
            id="birth"
            name="birth"
            v-model="birthday"
            type="date"
            class="form-control"
            value="2019-12-25"
          />
        </div>
        <div class="form-label-group mb-2">
          <label for="address" class="d-flex">地址:</label>
          <input
            id="address"
            name="address"
            v-model="address"
            type="text"
            class="form-control"
            placeholder="Enter address"
          />
        </div>
        <div class="form-label-group mb-3">
          <label for="phone" class="d-flex">聯絡電話:</label>
          <input
            id="phone"
            name="phone"
            v-model="phone"
            type="text"
            class="form-control"
            placeholder="Enter phone number"
          />
        </div>

        <button
          class="btn btn-lg btn-outline-secondary btn-block btn-sm mb-3"
          type="submit"
          :disabled="isProcessing"
        >{{isProcessing ? "資料更新中..." : "更新使用者資料"}}</button>
      </form>
    </div>
  </div>
</template>
<script>
import usersAPI from "./../apis/users";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      id: 0,
      name: "",
      email: "",
      birthday: "",
      phone: "",
      address: ""
    };
  },
  computed: {
    ...mapState(["currentUser", "isProcessing"]),
    formData() {
      let { name, email, birthday, phone, address } = this;
      return { name, email, birthday, phone, address };
    }
  },
  watch: {
    currentUser() {
      this.setUser();
    }
  },
  created() {
    const { id } = this.$route.params;
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: "notFound" });
      return;
    }
    this.setUser();
  },
  methods: {
    setUser() {
      this.id = this.currentUser.id;
      this.name = this.currentUser.name;
      this.email = this.currentUser.email;
      this.birthday = this.currentUser.birthday;
      this.phone = this.currentUser.phone;
      this.address = this.currentUser.address;
    },
    async handleSubmit() {
      if (this.email !== this.currentUser.email.toString()) {
        Toast.fire({
          type: "warning",
          title: "更新錯誤"
        });
        return;
      }
      const formData = this.formData;
      try {
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await usersAPI.putUser({ formData });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        Toast.fire({
          type: "success",
          title: "使用者資料更新成功"
        });
        this.$router.push({ name: "userEdit" });
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          type: "error",
          title: "無法更新使用者資料，請稍後再試"
        });
      }
    }
  }
};
</script>