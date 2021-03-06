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
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <input
              id="email"
              name="email"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="email"
            />
            <span class="d-flex">
              <small class="text-danger">{{ errors[0] }}</small>
            </span>
          </ValidationProvider>
          <small class="text-muted">＊提醒：Email為會員登入帳號及聯絡信箱。</small>
        </div>
        <div class="form-label-group mb-2">
          <label for="birthday" class="d-flex">生日:</label>
          <ValidationProvider
            :rules="{ regex: '^\\d{4}[\\-/\\.](0?[1-9]|1[012])[\\-/\\.](0?[1-9]|[12][0-9]|3[01])$' }"
            v-slot="{ errors }"
          >
            <input
              id="birth"
              name="birth"
              v-model="birthday"
              type="date"
              class="form-control"
              value="2019-12-25"
            />
            <span class="d-flex">
              <small class="text-danger">{{ errors[0] }}</small>
            </span>
          </ValidationProvider>
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
          <ValidationProvider
            :rules="{ regex: /^\(?(\d{2})\)?[\s\-]?(\d{4})\-?(\d{4})$/ }"
            v-slot="{ errors }"
          >
            <input
              id="phone"
              name="phone"
              v-model="phone"
              type="text"
              class="form-control"
              placeholder="Enter phone number"
            />
            <span class="d-flex">
              <small class="text-danger">{{ errors[0] }}</small>
            </span>
          </ValidationProvider>
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
import { ValidationProvider } from "vee-validate";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
export default {
  components: {
    ValidationProvider
  },
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
      let { id, name, email, birthday, phone, address } = this;
      return { id, name, email, birthday, phone, address };
    }
  },
  watch: {
    currentUser() {
      this.setUser();
    }
  },
  created() {
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
          icon: "warning",
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
          icon: "success",
          title: "使用者資料更新成功"
        });
        await this.$store.dispatch("updateCurrentUser", formData);
        this.$router.push({ name: "userEdit" });
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "無法更新使用者資料，請稍後再試"
        });
      }
    }
  }
};
</script>