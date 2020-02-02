<template>
  <div>
    <adminNav />
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else class="container mb-5">
      <div class="text-left">
        <h1>分類列表</h1>
        <form class="my-4">
          <div class="form-row">
            <div class="col-auto">
              <h3>新增類別：</h3>
            </div>
            <div class="col-auto">
              <input
                v-model="newCategoryName"
                type="text"
                class="form-control"
                required
                placeholder="請輸入類別"
              />
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click.stop.prevent="createCategory"
                :disabled="isProcessing"
              >確認新增</button>
            </div>
          </div>
        </form>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <!-- <th scope="col">id</th> -->
              <th scope="col">類別名稱</th>
              <th scope="col">編輯</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <!-- <td scope="row">{{category.id}}</td> -->
              <td class="position-relative">
                <div v-show="!category.isEditing" class="category-name">{{ category.category }}</div>
                <input
                  v-show="category.isEditing"
                  v-model="category.category"
                  type="text"
                  class="form-control"
                  required="required"
                />
                <span
                  v-show="category.isEditing"
                  class="cancel"
                  @click="handleCancel(category.id)"
                >✕</span>
              </td>
              <td scope="row">
                <button
                  v-if="!category.isEditing"
                  class="btn btn-outline-dark"
                  @click.stop.prevent="toggleIsEditing(category.id)"
                  :disabled="isProcessing"
                >編輯</button>
                <button
                  v-if="category.isEditing"
                  class="btn btn-dark"
                  @click.stop.prevent="editCategory({categoryId: category.id, category:category.category})"
                  :disabled="isProcessing"
                >儲存</button>
              </td>
              <td scope="row">
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click.stop.prevent="deleteCategory(category.id)"
                  :disabled="isProcessing"
                >刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import spinner from "./../components/spinner";
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    adminNav,
    spinner
  },

  data() {
    return {
      categories: [],
      newCategoryName: ""
    };
  },
  created() {
    this.fetchCategories();
  },
  computed: {
    isProcessing() {
      return this.$store.state.isProcessing;
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    async fetchCategories() {
      try {
        this.$store.dispatch("updateLoading", true);
        const { data, statusText } = await adminAPI.categories.get();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.categories = data.categories.map(category => ({
          ...category,
          isEditing: false
        }));
        this.$store.dispatch("updateLoading", false);
      } catch (error) {
        this.$store.dispatch("updateLoading", false);
        Toast.fire({
          icon: "error",
          title: "無法取得類別"
        });
      }
    },
    async createCategory() {
      try {
        if (!this.newCategoryName) {
          Toast.fire({
            icon: "warning",
            title: "請輸入類別"
          });
          return;
        }

        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await adminAPI.categories.create({
          category: this.newCategoryName
        });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.categories.push({
          ...data.category,
          isEditing: false
        });

        this.newCategoryName = "";
        this.fetchCategories();
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "無法新增類別"
        });
      }
    },
    async editCategory({ categoryId, category }) {
      try {
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await adminAPI.categories.update({
          categoryId,
          category
        });

        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }

        this.toggleIsEditing(categoryId);
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "無法修改類別"
        });
      }
    },
    async deleteCategory(categoryId) {
      try {
        this.$store.dispatch("updateProcessing", true);
        const { data, statusText } = await adminAPI.categories.delete({
          categoryId
        });

        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }
        this.categories = this.categories.filter(
          category => category.id !== categoryId
        );
        this.$store.dispatch("updateProcessing", false);
      } catch (error) {
        this.$store.dispatch("updateProcessing", false);
        Toast.fire({
          icon: "error",
          title: "無法刪除類別"
        });
      }
    },
    toggleIsEditing(categoryId) {
      this.$store.dispatch("updateProcessing", true);
      this.categories = this.categories.map(category => {
        if (category.id !== categoryId) return category;

        return {
          ...category,
          nameCached: category.category,
          isEditing: !category.isEditing
        };
      });
      this.$store.dispatch("updateProcessing", false);
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id !== categoryId) {
          return category;
        }

        return {
          ...category,
          category: category.nameCached
        };
      });
      this.toggleIsEditing(categoryId);
    }
  }
};
</script>