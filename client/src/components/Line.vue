<template>
  <div>
    <Navbar :isLoggedIn="isLoggedIn"></Navbar>
    <Jumbotron></Jumbotron>

    <!-- START OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
    <div class="container-card container">
      <div class="card mb-3 justify-content-center">
        <div class="card-header">LINE CHART OF DATA DATE FREQUENCY</div>
        <div class="card-body text-dark">
          <GChart
            class="move-pie"
            :settings="{packages: ['line']}"
            :data="chartData"
            :options="chartOptions"
            :createChart="(el, google) => new google.charts.Line(el)"
            @ready="onChartReady"
          />
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
  name: "Bar",
  components: {
    Jumbotron,
    Navbar,
    GChart,
  },
  data() {
    return {
      chartsLib: null,
      isLoggedIn: false,
      chartData: [],
    };
  },
  asyncComputed: {
    async loadData() {
      const URL = "http://localhost:3000/api/datadate/";
      const {
        data: { data },
      } = await this.axios.get(URL);

      let newData = data.map((item) => [new Date(item.letter), item.frequency]);
 
    
      this.chartData = [["date", "frequency"], ...newData];
      console.log(this.chartData)
    },
    chartOptions() {
      if (!this.chartsLib) return null;
      return this.chartsLib.charts.Line.convertOptions({
        backgroundColor: "transparent",
        width: "100%",
        height: 400,
        hAxis: { title: "Year" },
        vAxis: { title: "Frequency" },
        legend: { position: "none" },
        animation: { duration: 1000, startup: true, easing: "in" },
      });
    },
  },
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google;
    },
  },
};
</script>
<style scoped>
.card {
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.6);
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