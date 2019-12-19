<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <form class="w-75 mt-4">
        <div class="form-label-group mb-2">
          <input id="name" name="Name" type="text" class="form-control" placeholder="name" />
        </div>
        <div class="form-label-group mb-2">
          <input
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="user@example.com"
            disabled
          />
        </div>
        <div class="form-label-group mb-2">
          <input id="birth" name="birth" type="date" class="form-control" value="2019-12-25" />
        </div>
        <div class="form-label-group mb-2">
          <input id="address" name="address" type="text" class="form-control" placeholder="Address" />
        </div>
        <div class="form-label-group mb-3">
          <input id="phone" name="phone" type="text" class="form-control" placeholder="Phone" />
        </div>

        <button class="btn btn-lg btn-outline-secondary btn-block btn-sm mb-3" type="submit">更新會員資料</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {};
</script>