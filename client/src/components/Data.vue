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
                  v-model="letter"
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
                  v-model="frequency"
                  required
                />
              </div>
            </div>
          </div>
          <div class="card-custom card mb-3">
            <div class="card-body text-dark">
              <div>
                <div class="card-header mt-2">ADD DATA</div>
                <div class="flexCustom d-flex mb-5 flex-row">
                  <div class="p-3 w-50">
                    <label for="inputLetter" class="text-white font-weight-bold">Letter</label>
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Letter"
                      id="inputLetter"
                      v-model="letter"
                      required
                    />
                  </div>
                  <div class="p-3 w-50">
                    <label for="inputFrequency" class="text-white font-weight-bold">Frequency</label>
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Frequency"
                      id="inputFrequency"
                      v-model="frequency"
                      required
                    />
                  </div>
                </div>
              </div>
              <div
                class="d-flex mt-2 mb-3 text-black-50 flex-row bd-highlight justify-content-center"
              >
                <button type="button" class="btn-login p-2" @click="handleTogle">Add Data</button>
              </div>
            </div>
          </div>
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
              <tr v-for="(item,index) of loadData " :key="item._id">
                <th scope="row">{{index+1}}</th>
                <td>{{item.letter}}</td>
                <td>{{item.frequency}}</td>
                <td class="d-flex justify-content-center">
                  <button type="button" class="btn-form-delete p-1 mr-2">
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button type="button" class="btn-form-edit p-1">
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex mt-5 mb-5 text-black-50 flex-row bd-highlight justify-content-center">
            <button type="button" class="btn-login p-2 mb-2" @click="handleTogle">Add Data</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


          <div>
            <div class="card-header mt-2">ADD DATA</div>
            <div class="flexCustom d-flex mb-5 flex-row">
              <div class="p-4 w-50">
                <label for="inputLetter" class="text-white font-weight-bold">Letter</label>
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Letter"
                  id="inputLetter"
                  v-model="letter"
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
                  v-model="frequency"
                  required
                />
              </div>

            </div>
          </div>
<script>
import Navbar from "./Navbar.vue";
export default {
  name: "Data",
  components: { Navbar },

  data() {
    return {
      user: localStorage.getItem("email"),
      isLoggedIn: true,
      letter: "",
      frequency: "",
      url: "http://localhost:3000/api/data/",
      items: [],
      isAdded: false,
    };
  },
  asyncComputed: {
    async loadData() {
      const { data } = await this.axios.get(this.url);
      return data;
    },
  },
  methods: {
    handleTogle(e) {
      e.preventDefault();
      console.log(this.items);
      alert("gotcha");
    },
  },
};
</script>
<style scoped>
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

.btn-login {
  border-radius: 5px;
  background-color: rgb(50, 137, 219);
  width: 15%;
  transition: transform 0.2s;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border: none;
}
.btn-form-delete,
.btn-form-edit {
  border-radius: 5px;
  background-color: rgb(50, 137, 219);
  width: 15%;
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
.btn-form-delete:hover,
.btn-form-edit:hover {
  background-color: coral;
  transform: scale(1.02);
}
.btn-form-edit:hover {
  background-color: rgba(14, 139, 56, 0.6);
  transform: scale(1.02);
}
.btn-form-delete:hover {
  background-color: rgba(139, 14, 14, 0.6);
  transform: scale(1.02);
}
.btn-login:hover {
  background-color: coral;
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
</style>