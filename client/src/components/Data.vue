<template>
  <div>
    <Navbar :isLoggedIn="isLoggedIn"></Navbar>
    <div class="container-card container">
      <div class="card-custom card mb-3">
        <div class="card-header">DATA BREAD</div>
        <div class="card-body text-dark">
          <div>
            <div class="card-header mt-2">SEARCH DATA</div>
            <div class="flexCustom d-flex mb-5 flex-row">
              <div class="p-4 w-50">
                <label for="inputLetter" class="text-white font-weight-bold">Letter</label>
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Letter"
                  id="inputLetter"
                  v-model="searchLetter"
                  required
                />
              </div>
              <div class="p-4 w-50">
                <label for="inputFrequency" class="text-white font-weight-bold">Frequency</label>
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Frequency"
                  id="inputFrequency"
                  v-model="searchFrequency"
                  required
                />
              </div>
            </div>
          </div>
          <transition name="slide-fade">
            <div class="card-custom card mb-5" v-if="togle">
              <div class="card-body text-dark">
                <div>
                  <div class="card-header mt-2">ADD DATA</div>
                  <div class="flexCustom d-flex mb-5 flex-row">
                    <div class="p-3 w-50">
                      <label for="inputNewLetter" class="text-white font-weight-bold">Letter</label>
                      <input
                        class="form-control form-control-lg"
                        type="text"
                        placeholder="Add new letter here"
                        id="inputNewLetter"
                        v-model="newLetter"
                        required
                      />
                      <p class="error" v-if="errorLetter.length>0">{{errorLetter}}</p>
                    </div>
                    <div class="p-3 w-50">
                      <label for="inputNewFrequency" class="text-white font-weight-bold">Frequency</label>
                      <input
                        class="form-control form-control-lg"
                        type="text"
                        placeholder="Add new frequency here"
                        id="inputNewFrequency"
                        v-model="newFrequency"
                        required
                      />
                      <p class="error" v-if="errorFrequency.length>0">{{errorFrequency}}</p>
                    </div>
                  </div>
                </div>
                <div
                  class="d-flex mt-2 mb-3 text-black-50 flex-row bd-highlight justify-content-center"
                >
                  <button
                    type="button"
                    class="btn-togle-add p-2 text-white"
                    @click="handleSubmitNewData"
                  >
                    <i class="far fa-plus-square mr-1"></i>Save
                  </button>
                  <button
                    type="button"
                    class="btn-togle-cancel p-2 ml-2 text-white"
                    @click="handleTogle"
                  >
                    <i class="far fa-times-circle mr-1"></i>Cancel
                  </button>
                </div>
              </div>
            </div>
          </transition>
          <table class="table table-striped font-weight-bold text-black-50">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Letter</th>
                <th scope="col">Frequency</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) of items " :key="item._id">
                <template v-if="!item.isEdit">
                  <th scope="row">{{index+1}}</th>
                  <td>{{item.letter}}</td>
                  <td>{{item.frequency}}</td>
                  <td class="d-flex justify-content-center">
                    <button
                      type="button"
                      class="btn-form-delete py-2 mr-2 far fa-trash-alt"
                      :value="item._id"
                      @click="handleDelete"
                    ></button>
                    <button
                      type="button"
                      class="btn-form-edit py-2 fas fa-edit"
                      @click="item.isEdit=!item.isEdit"
                    ></button>
                  </td>
                </template>

                <template v-else>
                  <th scope="row">{{index+1}}</th>
                  <td>
                    <div class="form-row">
                      <input
                        id="updateLetter"
                        type="text"
                        class="form-control"
                        :value="item.letter"
                        required
                      />
                    </div>
                    <p class="error" v-if="errorUpdateLetter.length>0">{{errorUpdateLetter}}</p>
                  </td>
                  <td>
                    <div class="form-row">
                      <input
                        id="updateFrequency"
                        type="text"
                        class="form-control"
                        :value="item.frequency"
                        required
                      />
                    </div>
                    <p class="error" v-if="errorUpdateFrequency.length>0">{{errorUpdateFrequency}}</p>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn-form-save-editmode py-2 mr-2 fas fa-save"
                      :value="item._id"
                      @click="handleEdit"
                    ></button>
                    <button
                      type="button"
                      :value="item._id"
                      class="btn-form-cancel-editmode py-2 fas fa-times-circle"
                      @click="handleTogleEdit"
                    ></button>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
          <div class="d-flex mt-5 mb-5 text-black-50 flex-row bd-highlight justify-content-center">
            <button
              type="button"
              class="btn-togle-add p-2 mb-2 text-white"
              @click="handleTogle"
            >Add Data</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "./Navbar.vue";
export default {
  name: "Data",
  components: { Navbar },

  data() {
    return {
      user: localStorage.getItem("email"),
      isLoggedIn: true,
      searchLetter: "",
      searchFrequency: "",
      errorLetter: "",
      errorFrequency: "",
      errorUpdateLetter: "",
      errorUpdateFrequency: "",
      newLetter: "",
      newFrequency: "",
      updateLetter: "",
      updateFrequency: "",
      url: "http://localhost:3000/api/data/",
      togle: false,
      items: null,
    };
  },
  watch: {
  searchLetter:function(){
    this.handleSearch()
  },
  searchFrequency:function(){
    this.handleSearch()

  }
  },
  asyncComputed: {
    async loadData() {
      try {
        if (!this.searchLetter && !this.searchFrequency) {
          const { data } = await this.axios.get(this.url);
          return (this.items = data.map((item) => {
            item.isEdit = false;
            return item;
          }));
        } else {
          return this.items;
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          title: "Something when wrong!",
          text: "Please ask administrator to fix the issue",
          icon: "error",
          timer: 3000,
        });
      }
    },
  },
  methods: {
    async handleSubmitNewData(e) {
      e.preventDefault();
      console.log(isNaN(this.newLetter));
      console.log(isNaN(this.newFrequency));
      try {
        if (this.newFrequency.length === 0 && this.newLetter.length === 0) {
          this.errorLetter = "Input letter cannot empty!";
          this.errorFrequency = "Input Frequency cannot empty!";
        } else if (this.newLetter.length === 0) {
          this.errorLetter = "Input letter cannot empty!";
        } else if (this.newFrequency.length === 0) {
          this.errorFrequency = "Input Frequency cannot empty!";
        } else if (!isNaN(this.newLetter) && isNaN(this.newFrequency)) {
          this.errorLetter = "Input should be string!";
          this.errorFrequency = "input should be number!";
        } else if (!isNaN(this.newLetter)) {
          this.errorLetter = "Input should be string!";
        } else if (isNaN(this.newFrequency)) {
          this.errorFrequency = "input should be number!";
        } else {
          const {
            data: { message, data },
          } = await this.axios.post(this.url, {
            letter: this.newLetter,
            frequency: this.newFrequency,
          });
          this.$swal({
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1200,
          });

          this.items.push(data);
          this.newLetter = "";
          this.newFrequency = "";
          this.errorLetter = "";
          this.errorFrequency = "";
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          title: "Something when wrong!",
          text: "Please ask administrator to fix the issue",
          icon: "error",
          timer: 3000,
        });
      }
    },
    async handleDelete(e) {
      e.preventDefault();
      const _id = e.target.value;

      try {
        const confirmationDelete = await this.$swal({
          title: "Are you sure?",
          text: "You can't revert this action",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes Delete it!",
          cancelButtonText: "No, Keep it!",
          showCloseButton: true,
          showLoaderOnConfirm: true,
        });
        if (confirmationDelete.value) {
          await this.axios.delete(`${this.url}${_id}`);
          this.items = this.items.filter((item) => item._id !== _id);
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          title: "Something when wrong!",
          text: "Please ask administrator to fix the issue",
          icon: "error",
          timer: 3000,
        });
      }
    },
    async handleEdit(e) {
      e.preventDefault();
      const _id = e.target.value;
      this.updateLetter = document.querySelector("#updateLetter").value;
      this.updateFrequency = document.querySelector("#updateFrequency").value;

      try {
        if (
          this.updateFrequency.length === 0 &&
          this.updateLetter.length === 0
        ) {
          this.errorUpdateLetter = "Input letter cannot empty!";
          this.errorUpdateFrequency = "Input Frequency cannot empty!";
        } else if (this.updateLetter.length === 0) {
          this.errorUpdateLetter = "Input letter cannot empty!";
        } else if (this.updateFrequency.length === 0) {
          this.errorUpdateFrequency = "Input Frequency cannot empty!";
        } else if (!isNaN(this.updateLetter) && isNaN(this.updateFrequency)) {
          this.errorUpdateLetter = "Input should be string!";
          this.errorUpdateFrequency = "input should be number!";
        } else if (!isNaN(this.updateLetter)) {
          this.errorUpdateLetter = "Input should be string!";
        } else if (isNaN(this.updateFrequency)) {
          this.errorUpdateFrequency = "input should be number!";
        } else {
          const {
            data: { message, data },
          } = await this.axios.put(`${this.url}${_id}`, {
            letter: this.updateLetter,
            frequency: this.updateFrequency,
          });

          this.items = this.items.map((item) => {
            if (item._id === _id) {
              item.letter = data.letter;
              item.frequency = data.frequency;
              item.isEdit = !item.isEdit;
            }
            return item;
          });
          this.$swal({
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1200,
          });
          this.errorUpdateLetter = "";
          this.errorUpdateFrequency = "";
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          title: "Something when wrong!",
          text: "Please ask administrator to fix the issue",
          icon: "error",
          timer: 3000,
        });
      }
    },
    handleTogle() {
      this.newLetter = "";
      this.newFrequency = "";
      this.errorLetter = " ";
      this.errorFrequency = " ";
      this.togle = !this.togle;
    },
    handleTogleEdit(e) {
      e.preventDefault();
      const _id = e.target.value;
      this.updateLetter = "";
      this.updateFrequency = "";

      this.errorUpdateLetter = " ";
      this.errorUpdateFrequency = " ";
      this.items = this.items.map((item) => {
        if (item._id === _id) {
          item.isEdit = !item.isEdit;
        }
        return item;
      });
    },
    async handleSearch() {
      let filter = {};
      const { searchLetter, searchFrequency } = this;
      if (searchFrequency && searchLetter) {
        filter = { letter: searchLetter, frequency: searchFrequency };
      } else if (searchLetter) {
        filter = { letter: searchLetter };
      } else if (searchFrequency) {
        filter = { frequency: searchFrequency };
      }
      console.log(filter)
      try {
        const {data} = await this.axios.post(`${this.url}search`, filter);
        console.log(data)
        this.items=[...data]
      } catch (error) {
        console.log(error)
        this.$swal({
          title: "Something when wrong!",
          text: "Please ask administrator to fix the issue",
          icon: "error",
          timer: 3000,
        });
      }
    },
  },
};
</script>
<style scoped>
.error {
  color: red;
}
.card-custom {
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.6);
}
.table {
  transition: transform 0.2s;
  background-color: white;
  font-weight: bold;
  font-size: 1.2em;
}
.table:hover {
  background-color: white;
  transform: scale(1.02);
  background-color: rgba(255, 255, 255, 0.8);
}
.flexCustom {
  transition: transform 0.2s;
  background-color: rgba(0, 0, 0, 0.6);
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
}
.flexCustom:hover {
  background-color: rgba(0, 0, 0, 0.6);
  transform: scale(1.02);
}

.card-header {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}

.btn-togle-add,
.btn-togle-cancel {
  border-radius: 5px;
  background-color: rgb(50, 137, 219);
  width: 15%;
  transition: transform 0.2s;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border: none;
}
.btn-togle-cancel {
  background-color: rgb(192, 145, 17);
}
.btn-togle-add:hover,
.btn-togle-cancel:hover {
  background-color: coral;
  transform: scale(1.02);
  border: none;
}

.btn-form-delete,
.btn-form-edit {
  border-radius: 5px;
  background-color: rgb(50, 137, 219);
  width: 2em;
  transition: transform 0.2s;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border: none;
}
.btn-form-delete {
  background-color: rgb(139, 14, 14);
  color: white;
}
.btn-form-edit {
  background-color: rgb(14, 139, 56);
  color: white;
}
.btn-form-edit:hover {
  background-color: rgba(14, 139, 56, 0.6);
  transform: scale(1.02);
}
.btn-form-delete:hover {
  background-color: rgba(139, 14, 14, 0.6);
  transform: scale(1.02);
}

.btn-form-save-editmode,
.btn-form-cancel-editmode {
  border-radius: 5px;
  width: 2.5em;
  transition: transform 0.2s;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border: none;
}
.btn-form-save-editmode {
  background-color: rgb(64, 168, 196);
  color: white;
}
.btn-form-cancel-editmode {
  background-color: rgb(139, 14, 14);
  color: white;
}
.btn-form-cancel-editmode:hover {
  background-color: rgba(139, 14, 14, 0.6);
  transform: scale(1.02);
}
.btn-form-save-editmode:hover {
  background-color: rgba(64, 168, 196, 0.6);
  transform: scale(1.02);
}

/* 53C08C */
.container-card {
  margin-top: 5vh;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: rgb(53, 50, 50);
}
a:hover {
  color: white;
}
.form-row {
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>