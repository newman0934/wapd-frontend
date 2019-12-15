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
            <form class="w-100">
              <h4>Sign In</h4>
              <div class="form-label-group mb-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="form-label-group mb-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                class="btn btn-lg btn-outline-secondary btn-block btn-sm mb-3"
                type="submit"
              >Sign In</button>
            </form>
            <div class="text-center mb-3">
              <p>忘記密碼</p>
            </div>
          </div>
          <div class="col-md-6">
            <form class="w-100">
              <h4>Register</h4>
              <div class="form-label-group mb-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="form-label-group mb-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="form-label-group mb-3">
                <input
                  id="password-check"
                  name="passwordCheck"
                  type="password"
                  class="form-control"
                  placeholder="Re enter ths password"
                  required
                />
              </div>
              <button
                class="btn btn-lg btn-outline-secondary btn-block btn-sm mb-3"
                type="submit"
              >Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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