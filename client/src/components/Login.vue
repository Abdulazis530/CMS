<template>
  <div>
    <Navbar></Navbar>
    <!-- START OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
    <div class="container-card container">
      <div class="card mb-3">
        <div class="card-header">Login to CMS</div>
        <div class="card-body text-dark">
          <form class="flexCustom flexlogin d-flex mt-5 mb-5 flex-column align-items-center">
           
              <div class="p-4 mb-4 w-50">
                <label class="text-white font-weight-bold">Email</label>
                <input
                  class="form-control form-control-lg "
                  type="Email"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="p-4 mb-4 w-50">
                <label class="text-white font-weight-bold">Password</label>
                <input
                  class="form-control form-control-lg"
                  type="Password"
                  placeholder="Password"
                  required
                />
              </div>

          </form>

          <div class="d-flex flex-column mt-5 mb-5 align-items-center text-black-50">
            <button type="submit" class="btn-login p-2 mb-2 ">Login</button>
            <span class="p-2 text-white font-weight-bold lead">
              Don't have an account?
              <router-link to="/signup">Sign Up</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
  </div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  name: "login",
  components: {
    Navbar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron {
  background-image: url("../assets/background2.jpg");
  background-position: center bottom fixed;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;

  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 5px 10px rgba(1, 5, 1, 0.6);
}

.card {
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.6);
}


.flexCustom {
  transition: transform 0.2s;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
}
.childGreen,
.childYellow,
.childAqua,
.childTomato {
  border-radius: 8px;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  transition: transform 0.2s;
}
.childGreen {
  background-color: rgb(83, 192, 140, 1);
}
.childGreen:hover {
  background-color: rgba(83, 192, 140, 0.6);
  transform: scale(1.02);
}
.childYellow {
  background-color: rgba(251, 212, 109, 1);
}
.childYellow:hover {
  background-color: rgba(251, 212, 109, 0.6);
  transform: scale(1.02);
}
.childAqua {
  background-color: rgba(29, 211, 189, 1);
}
.childAqua:hover {
  background-color: rgba(29, 211, 189, 0.6);
  transform: scale(1.02);
}
.childTomato {
  background-color: rgba(160, 27, 27, 1);
}
.childTomato:hover {
  background-color: rgba(207, 27, 27, 0.6);
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
