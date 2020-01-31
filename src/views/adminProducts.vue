<template>
  <div>
    <adminNav />
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else class="container mb-5">
      <div class="text-left">
        <h1>商品列表</h1>
        <h1>
          <router-link class="btn btn-outline-primary" :to="{name:'adminProductCreate'}">新增商品</router-link>
        </h1>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">商品名稱</th>
              <th scope="col">商品分類</th>
              <th scope="col">價格</th>
              <th scope="col">狀態</th>
              <th scope="cole">庫存查詢</th>
              <th scope="col">商品編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td scope="col">{{product.id}}</td>
              <td scope="col">
                <router-link :to="{name:'adminProduct',params:{id:product.id}}">{{product.name}}</router-link>
              </td>
              <td scope="col">{{product.category}}</td>
              <td scope="col">{{product.sell_price}}</td>
              <td scope="col">{{product.status}}</td>
              <td scope="col">
                <router-link
                  class="btn btn-outline-info"
                  :to="{name:'adminProductStatus', params:{ id: product.id}}"
                >查詢</router-link>
              </td>
              <td scope="col">
                <router-link
                  :to="{name:'adminProductEdit', params:{id:product.id}}"
                  class="btn btn-outline-dark"
                >編輯</router-link>
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
              :to="{name: 'adminProducts', query: { page: previousPage }}"
            >
              <span aria-hidden="true">&laquo;</span>
            </router-link>
          </li>
          <li
            v-for="page in totalPage"
            :key="page"
            :class="['page-item', { active: currentPage === page }]"
          >
            <router-link class="page-link" :to="{name: 'adminProducts', query: { page }}">{{ page }}</router-link>
          </li>
          <li v-show="nextPage" class="page-item">
            <router-link
              class="page-link"
              :to="{name: 'adminProducts', query: { page: nextPage }}"
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
import spinner from "./../components/spinner";
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
export default {
  components: {
    adminNav,
    spinner
  },
  data() {
    return {
      products: [],
      currentPage: 0,
      totalPage: 0
    };
  },
  computed: {
    ...mapState(["currentUser"]),

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
  created() {
    const { page } = this.$route.query;
    this.fetchAdminProducts({ page });
  },
  beforeRouteUpdate(to, from, next) {
    const { page } = to.query;
    this.fetchAdminProducts({ page });
    next();
  },
  methods: {
    async fetchAdminProducts({ page = 1 }) {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await adminAPI.products.get({
          page
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.products = data.products;
        this.currentPage = data.page;
        this.totalPage = data.totalPage.length;
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          icon: "error",
          title: "無法取得商品資料"
        });
      }
    }
  }
};
</script>