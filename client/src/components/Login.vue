<template>
  <div>
    <Navbar :isLoggedIn="isLoggedIn"></Navbar>
    <Jumbotron></Jumbotron>

    <!-- START OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
    <div class="container-card container">
      <div class="card mb-3">
        <div class="card-header">Login to CMS</div>
        <div class="card-body text-dark">
          <form>
            <div class="flexCustom flexlogin d-flex mt-5 mb-5 flex-column align-items-center">
              <div class="p-4 mb-4 w-50">
                <label for="inputEmail" class="text-white font-weight-bold">Email</label>
                <input
                  class="form-control form-control-lg"
                  type="Email"
                  placeholder="Email Address"
                  id="inputEmail"
                  v-model="email"
                  required
                />
              </div>
              <div class="p-4 mb-4 w-50">
                <label for="inputPassword" class="text-white font-weight-bold">Password</label>
                <input
                  class="form-control form-control-lg"
                  type="Password"
                  placeholder="Password"
                  v-model="password"
                  id="inputPassword"
                  required
                />
              </div>
            </div>

            <p class="error" v-if="error">{{error}}</p>

            <div class="d-flex flex-column mt-5 mb-5 align-items-center text-black-50">
              <button type="submit" class="btn-login p-2 mb-2" @click="handleLogin">Login</button>
              <span class="p-2 text-success font-weight-bold lead">
                Don't have an account?
                <router-link to="/signup">Sign Up</router-link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- END OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Jumbotron from "./Jumbotron";

export default {
  name: "login",
  components: {
    Navbar,
    Jumbotron,
  },
  data() {
    return {
      email: "",
      password: "",
      isLoggedIn: false,
      url: "http://localhost:3000/api/users/",
      error: "",
    };
  },
  methods: {
    async handleLogin(e) {
      e.preventDefault();
      try {
        this.error = "";
        //check if email or password or email is empty
        if (!this.email || !this.password) {
          this.error = "Password and Email cannot be empty!";
        }

        if (!this.error) {
          //sanitize password and email to eliminate white spaces(use javascript string method String.trim())
          const {
            data: {
              token,
              data: { email },
              message,
            },
          } = await this.axios.post(`${this.url}login`, {
            email: this.email.trim(),
            password: this.password.trim(),
          });

          if (token) {
            localStorage.setItem("Authorization", token);
            localStorage.setItem("email", email);
            this.$router.push("/home");
            this.$swal({
              icon: "success",
              title: "Login success",
              showConfirmButton: false,
              timer: 1200,
            });
          } else {
            this.error = message;
          }
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.error {
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
}
.card {
  background-color: rgba(225, 225, 255, 0.8);
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.6);
  color: black;
}

.flexCustom {
  transition: transform 0.2s;
  font-size: 1.5em;
  background-color: rgba(0, 0, 20, 0.7);

  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
}

.card-header {
  background-color: rgba(0, 0, 0, 0.6);

  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}
.flexCustom:hover {
  background-color: rgba(0, 0, 0, 0.6);
  transform: scale(1.02);
}
.btn-login {
  border-radius: 5px;
  background-color: rgb(0, 100, 75);
  width: 15%;
  transition: transform 0.2s;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border: none;
}
.btn-login:hover {
  background-color: coral;
  transform: scale(1.02);
}

/* 53C08C */
.flexCustom1 {
  background-color: red;
}
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
