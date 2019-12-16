<template>
  <div class="container py-5">
    <userNavTabs />
    <div class="d-flex justify-content-center">
      <form class="w-75 mt-4">
        <div class="form-label-group mb-2">
          <input
            id="used-password"
            name="used-password"
            type="password"
            class="form-control"
            placeholder="Enter your current password"
            required
          />
        </div>
        <div class="form-label-group mb-2">
          <input
            id="new-password"
            name="new-password"
            type="password"
            class="form-control"
            placeholder="Enter your new password"
            required
          />
        </div>
        <div class="form-label-group mb-2">
          <input
            id="password-check"
            name="password-check"
            type="password"
            class="form-control"
            placeholder="Re-enter the new password"
            required
          />
        </div>

        <button class="btn btn-lg btn-outline-secondary btn-block btn-sm mb-3" type="submit">更新密碼</button>
      </form>
    </div>
  </div>
</template>
<script>
import userNavTabs from "./../components/userNavTabs";
export default {
  components: {
    userNavTabs
  }
};
</script>