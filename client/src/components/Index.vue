<template>
  <div >
    <Navbar></Navbar>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3 text-success">Content Management System</h1>
        <p
          class="lead text-dark"
        >This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>

    <!-- START OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
    <div class="container-card container">
      <div class="card mb-3 justify-content-center w-75">
        <div class="card-header">Welcome to Dashboard</div>
        <div class="card-body text-dark">
          <div class="d-flex flex-column bd-highlight">
            <a class="childTomato p-1 bd-highlight">
              <i class="fas fa-signal fa-sm"></i>
              <br />
              <span>
                <strong>Line</strong>
              </span>
            </a>

            <a class="childYellow p-1 mt-2 bd-highlight">
              <i class="fas fa-chart-pie fa-sm"></i>
              <br />
              <span>
                <strong>Pie</strong>
              </span>
            </a>

            <a class="childAqua p-1 mt-2 bd-highlight">
              <i class="far fa-chart-bar fa-sm"></i>
              <br />
              <span>
                <strong>Bar</strong>
              </span>
            </a>

            <a class="childGreen p-1 mt-2 bd-highlight">
              <i class="fas fa-map-marked-alt fa-sm"></i>
              <br />
              <span>
                <strong>Maps</strong>
              </span>
            </a>
          </div>

          <div class="d-flex flex-row mt-5 bd-highlight justify-content-center text-black-50">
            <router-link to="/Login" class="flexChild p-2 ml-2 btn btn-success w-25">Login</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  name:'Index',
  components: { Navbar }
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
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.6);
  margin-left: 12%;
}
.flexChild {
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
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}
.flexChild:hover {
  background-color: rgba(83, 192, 140, 0.6);
  transform: scale(1.02);
}
/* 53C08C */
.flexChild1 {
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
