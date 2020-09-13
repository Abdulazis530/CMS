<template>
  <div>
    <Navbar :isLoggedIn="isLoggedIn"></Navbar>
    <Jumbotron></Jumbotron>

    <!-- START OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
    <div class="container-card container">
      <div class="card mb-3 justify-content-center">
        <div class="card-header">PIE CHART OF LETTER FREQUENCY</div>
        <div class="card-body text-dark">
          <GChart  class="move-pie" type="PieChart" :data="chartData" :options="chartOptions"  :resizeDebounce="200" />
        </div>
      </div>
    </div>
  </div>
</template>


<script >
import Jumbotron from "./Jumbotron";
import Navbar from "./Navbar";
import { GChart } from "vue-google-charts";

export default {
  name: "Pie",
  components: {
    Jumbotron,
    Navbar,
    GChart,
  },
  data() {
    return {
      isLoggedIn: false,
      chartData: [],
      chartOptions: {
        titlePosition: "none",
        is3D: true,
        backgroundColor: "transparent",
        width: 900,
        height: 600,
        legend: "bottom",
      },
    };
  },
  asyncComputed: {
    async loadData() {
      const URL = "http://localhost:3000/api/data/";
      const {
        data: { data },
      } = await this.axios.get(URL);
      let newData = data.map((item) => [`letter ${item.letter}`, item.frequency]);

      this.chartData = [["letter", "frequency"], ...newData];
    },
  },
};
</script>
<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.6);
}
.flexChild {
  transition: transform 0.2s;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
}
.childGreen,
.childYellow,
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
  margin-top: 1%;
}
.childYellow {
  background-color: rgba(251, 212, 109, 1);
}
.childYellow:hover {
  background-color: rgba(251, 212, 109, 0.6);
  transform: scale(1.02);
  margin-bottom: 1%;
}

.childTomato {
  background-color: rgba(160, 27, 27, 1);
}
.childTomato:hover {
  background-color: rgba(207, 27, 27, 0.6);
  transform: scale(1.02);
  margin-bottom: 1%;
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
.move-pie {
  margin-left: 8%;
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