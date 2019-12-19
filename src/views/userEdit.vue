<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <form class="w-75 mt-4" @submit.stop.prevent="handleSubmit">
        <div class="form-label-group mb-2">
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
        <!-- <div class="form-label-group mb-2">
          <input id="birth" name="birth" type="date" class="form-control" value="2019-12-25" />
        </div>-->
        <div class="form-label-group mb-2">
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
        >{{isProcessing ? "資料更新中..." : "Submit"}}</button>
      </form>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import usersAPI from "./../apis/users";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      id: 0,
      name: "",
      email: "",
      phone: "",
      address: "",
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  watch: {
    currentUser(user) {
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
      this.phone = this.currentUser.phone;
      this.address = this.currentUser.address;
    }
    // async handleSubmit(e) {
    //   if (this.email !== this.currentUser.email.toString()) {
    //     Toast.fire({
    //       type: "warning",
    //       title: "更新錯誤"
    //     });
    //     return;
    //   }
    //   const form = e.target;
    //   const formData = newFormData(form);

    // }
  }
};
</script>