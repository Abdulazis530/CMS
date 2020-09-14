<template>
  <div>
    <Navbar :isLoggedIn="isLoggedIn"></Navbar>
    <Jumbotron></Jumbotron>

    <!-- START OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
    <div class="container-card container">
      <div class="card mb-3 justify-content-center pb-5">
        <div class="card-header">MAPS</div>
        <div class="card-body text-dark p-5">
          <GChart
            :settings="{packages: ['corechart','map'], mapsApiKey:'AIzaSyDemSB1MKHpdMDcMFXbqr9F1CJDVDo8UTE'}"
            type="Map"
            :data="chartData"
            :options="chartOptions"
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
  name: "Maps",
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
        showTooltip: true,
        showInfoWindow: true,
        zoomLevel: 12,
        fullscreenControl:false
      },
      
    };
  },
  asyncComputed: {
    async loadData() {
      const URL = "http://localhost:3000/api/maps/";
      const {
        data: { data },
      } = await this.axios.get(URL);

      let newData = data.map((item) => [item.lat, item.lng, item.title]);

      this.chartData = [["lat", "Long", "Name"], ...newData];
      console.log(this.chartData);
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
/* .move-pie {
  margin-left: 8%;
} */
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