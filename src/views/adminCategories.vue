<template>
  <div>
    <adminNav />
    <div class="container mb-5">
      <div class="text-left">
        <h1>分類列表</h1>
        <form class="my-4">
          <div class="form-row">
            <div class="col-auto">
              <input
                v-model="newCategoryName"
                type="text"
                class="form-control"
                placeholder="新增類別..."
              />
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-primary" @click.stop.prevent="createCategory">新增</button>
            </div>
          </div>
        </form>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">類別名稱</th>
              <th scope="col">編輯</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td scope="row">{{category.id}}</td>
              <td class="position-relative">
                <div v-show="!category.isEditing" class="category-name">{{ category.category }}</div>
                <input
                  v-show="category.isEditing"
                  v-model="category.category"
                  type="text"
                  class="form-control"
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
                  class="btn btn-dark"
                  @click.stop.prevent="toggleIsEditing(category.id)"
                >Edit</button>
                <button
                  v-if="category.isEditing"
                  class="btn btn-dark"
                  @click.stop.prevent="editCategory({categoryId: category.id, category:category.category})"
                >儲存</button>
              </td>
              <td scope="row">
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click.stop.prevent="deleteCategory(category.id)"
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
/* eslint-disable */
import adminNav from "./../components/adminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";


export default {
  components: {
    adminNav
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
  methods: {
    async fetchCategories() {
      try {
        const { data, statusText } = await adminAPI.categories.get();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.categories = data.categories.map(category => ({
          ...category,
          isEditing: false
        }));
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取得類別"
        });
      }
    },
    async createCategory() {
      try {
        const { data, statusText } = await adminAPI.categories.create({
          category: this.newCategoryName
        });
        console.log(data);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.categories.push({

          ...data.category,
          isEditing: false
        });

        this.newCategoryName = "";
        this.fetchCategories();
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法新增類別"
        });
      }
    },
    async editCategory({ categoryId, category }) {
      try {
        const { data, statusText } = await adminAPI.categories.update({
          categoryId,
          category
        });

        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }

        this.toggleIsEditing(categoryId);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法修改類別"
        });
      }
    },
    async deleteCategory(categoryId) {
      try {
        const { data, statusText } = await adminAPI.categories.delete({
          categoryId
        });

        if (statusText !== "OK" && data.status !== "success") {
          throw new Error(statusText);
        }
        this.categories = this.categories.filter(
          category => category.id !== categoryId
        );
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法刪除類別"
        });
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id !== categoryId) return category;

        return {
          ...category,
          nameCached: category.category,
          isEditing: !category.isEditing
        };
      });
    },
    handleCancel(categoryId){
      this.categories = this.categories.map(category => {
        if(category.id !== categoryId){
          return category
        }

        return {
          ...category,
          category: category.nameCached
        }
      })
      this.toggleIsEditing(categoryId)
    }
  }
};
</script>