<template>
  <div>
    <adminNav />
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else class="container mb-5">
      <div class="text-left">
        <h1>會員列表</h1>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">名稱</th>
              <th scope="col">電話</th>
              <th scope="col">Email</th>
              <th scope="col">住址</th>
              <th scope="col">身分</th>
              <th scope="col">訂單</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td scope="row">{{user.id}}</td>
              <td scope="row">{{user.name}}</td>
              <td scope="row">{{user.phone}}</td>
              <td scope="row">{{user.email}}</td>
              <td scope="row">{{user.address}}</td>
              <td scope="row">{{user.role}}</td>
              <td scope="row">
                <router-link
                  class="btn btn-outline-info"
                  :to="{name:'adminUserOrders', params:{ id:user.id }}"
                >歷史訂單</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav v-if="totalPage > 1" aria-label="Page navigation">
        <ul class="pagination">
          <li v-show="previousPage" class="page-item">
            <router-link
              class="page-link"
              aria-label="Previous"
              :to="{name: 'adminUsers', query: { page: previousPage }}"
            >
              <span aria-hidden="true">&laquo;</span>
            </router-link>
          </li>
          <li
            v-for="page in totalPage"
            :key="page"
            :class="['page-item', { active: currentPage === page }]"
          >
            <router-link class="page-link" :to="{name: 'adminUsers', query: { page }}">{{ page }}</router-link>
          </li>
          <li v-show="nextPage" class="page-item">
            <router-link
              class="page-link"
              :to="{name: 'adminUsers', query: { page: nextPage }}"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import spinner from "./../components/spinner";

export default {
  components: {
    adminNav,
    spinner
  },
  data() {
    return {
      users: [],
      currentPage: 0,
      totalPage: 0
    };
  },
  created() {
    const { page } = this.$route.query;
    this.fetchUsers({ page });
  },
  beforeRouteUpdate(to, from, next) {
    const { page } = to.query;
    this.fetchUsers({ page });
    next();
  },
  computed: {
    previousPage() {
      return this.currentPage === 1 ? null : this.currentPage - 1;
    },
    nextPage() {
      return this.currentPage + 1 > this.totalPage
        ? null
        : this.currentPage + 1;
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    async fetchUsers({ page = 1 }) {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await adminAPI.users.get({
          page
        });
        console.log(data);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.users = data.users.rows;
        this.currentPage = data.page;
        this.totalPage = data.totalPage.length;
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          icon: "error",
          title: "無法取得會員資料"
        });
      }
    }
  }
};
</script>