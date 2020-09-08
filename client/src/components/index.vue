<template>
  <div>
    <div class="jumbotron jumbotron-fluid mb-5">
      <div class="container p-2">
        <h1 class="display-3 text-white">Content Management System</h1>
        <p
          class="lead text-white"
        >This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>

<!-- START OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
    <div class="container-card container d-flex flex-column justify-content-center">
      <div class="card mb-3">
        <div class="card-header">Welcome to Dashboard</div>
        <div class="card-body text-dark">
          <div class="d-flex flex-column bd-highlight w-100">

            <a class="childTomato p-2 bd-highlight">
              <i class="fas fa-signal fa-2x"></i>
              <br />
              <span>
                <strong>Line</strong>
              </span>
            </a>

            <a class="childYellow p-2 mt-2 bd-highlight">
              <i class="fas fa-chart-pie fa-2x"></i>
              <br />
              <span>
                <strong>Pie</strong>
              </span>
            </a>

            <a class="childAqua p-2 mt-2 bd-highlight">
              <i class="far fa-chart-bar fa-2x"></i>
              <br />
              <span>
                <strong>Bar</strong>
              </span>
            </a>

            <a class="childGreen p-2 mt-2 bd-highlight">
              <i class="fas fa-map-marked-alt fa-2x"></i>
             <br/>
              <span>
                <strong>Maps</strong>
              </span>
              </a>
          </div>

          <div class="d-flex flex-row bd-highlight justify-content-center">
            <div class="p-3 mt-2 mr-2 bd-highlight btn btn-success">
              <i class="fas fa-signal"></i>
              <span>Flex item 1</span>
            </div>
            <div class="flexChild p-3 mt-2 ml-2 bd-highlight">Flex item 2</div>
          </div>
        </div>
      </div>
    </div>
<!-- END OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->

  </div>
</template>

<script>
export default {
  name: "firstView",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron {
  background-color: #09644c;
  box-shadow: 0px 5px 10px rgba(1, 5, 1, 0.6);
}
.card {
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.6);
}
.flexChild {
  background-color: rgb(83, 192, 140, 1);
  transition: transform 0.2s;
  border-radius: 10px;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
}
.childGreen,
.childYellow,
.childAqua,
.childTomato {
  border-radius: 10px;
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
.flexChild:hover {
  background-color: rgba(83, 192, 140, 0.6);
  transform: scale(1.02);
}
/* 53C08C */
.flexChild1 {
  background-color: red;
}
.container-card {
  margin-top: 10vh;
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
  color: rgb(53,50,50);
}
a:hover{
  color: white;
}
</style>
