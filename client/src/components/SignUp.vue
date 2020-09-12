<template>
  <div>
    <Navbar :isLoggedIn="isLoggedIn"></Navbar>
    <Jumbotron></Jumbotron>
    <div class="container-card container">
      <div class="card mb-3">
        <div class="card-header">Create Account</div>
        <div class="card-body text-dark">
          <form>
            <div class="flexCustom flexlogin d-flex mt-5 mb-5 flex-column align-items-center">
              <div class="p-4 w-50">
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
              <div class="p-4 w-50">
                <label for="inputPassword" class="text-white font-weight-bold">Password</label>
                <input
                  class="form-control form-control-lg"
                  type="Password"
                  placeholder="Password"
                  id="inputPassword"
                  v-model="password"
                  required
                />
              </div>
              <div class="p-4 mb-4 w-50">
                <label
                  for="inputConfirmPassword"
                  class="text-white font-weight-bold"
                >Confirm Password</label>
                <input
                  class="form-control form-control-lg"
                  type="Password"
                  placeholder="Confirm Password"
                  id="inputConfirmPassword"
                  v-model="retypepassword"
                  required
                />
              </div>
            </div>
            <template v-if="this.errors.length">
              <ul v-for="(error,index) of errors" :key="index">
                <li class="error">{{error}}</li>
              </ul>
            </template>
            <div class="d-flex flex-column mt-5 mb-5 align-items-center text-black-50">
              <button type="submit" class="btn-login p-2 mb-2" @click="handleSignup">Sign Up</button>
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
import Jumbotron from "./Jumbotron"
export default {
  name: "signup",
  components: {
    Navbar,Jumbotron
  },
  data() {
    return {
      email: "",
      password: "",
      retypepassword: "",
      isLoggedIn: false,
      url: "http://localhost:3000/api/users/register",
      errors: [],
    };
  },
  methods: {
    async handleSignup(e) {
      e.preventDefault();
      this.errors = [];
      console.log(this.password.length);
      if (!this.password || !this.email || !this.password) {
        this.errors.push("Input cannot be empty!");
      } else {
        if (!this.emailValidation(this.email))
          this.errors.push(
            'Email should contain valid domain and "@" symbol !'
          );
        if (!this.passwordValidation(this.password))
          this.errors.push(
            "password must be between 6 and 20 characters and contains at least one numeric digit, one uppercase and one lowercase letter"
          );
        if (!this.passwordValidation(this.retypepassword))
          this.errors.push(
            "password must be between 6 and 20 characters and contains at least one numeric digit, one uppercase and one lowercase letter"
          );
        if (this.password !== this.retypepassword)
          this.errors.push("Password did not match!");
      }

      try {
        if (this.errors.length === 0) {
          const {
            data: {
              token,
              data: { email },
              message,
            },
          } = await this.axios.post(this.url, {
            email: this.email,
            password: this.password,
            retypepassword: this.retypepassword,
          });
          if (message == "email already exists") {
            this.errors.push(message);
          }
          if (token) {
            localStorage.setItem("Authorization", token);
            localStorage.setItem("email", email);
            this.$router.push("/home");

            this.$swal({
              icon: "success",
              title: "signup success",
              showConfirmButton: false,
              timer: 1200,
            });
          }
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          title: "Something when wrong!",
          text: "status 500, call your administrator to fix the issue!",
          icon: "error",
          timer: 1200,
        });
      }
    },
    emailValidation(email) {
      const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(mailformat)) {
        return true;
      } else {
        return false;
      }
    },
    passwordValidation(password) {
      const passwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (password.match(passwFormat)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


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
  color: white;
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
  color: black;
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
.error {
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
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
