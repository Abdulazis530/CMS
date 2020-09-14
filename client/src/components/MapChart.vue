<template>
  <div>
    <Navbar :isLoggedIn="isLoggedIn"></Navbar>
    <Jumbotron></Jumbotron>

    <!-- START OF SELECTION FEATURE(LINE,PIE,BAR,MAPS) -->
    <div class="container-card container">
      <div class="card mb-3 justify-content-center pb-5">
        <div class="card-header">LINE CHART OF DATA DATE FREQUENCY</div>
        <div class="card-body text-dark p-5">
          <div id="map-chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script >
import Jumbotron from "./Jumbotron";
import Navbar from "./Navbar";

export default {
  name: "Maps",
  components: {
    Jumbotron,
    Navbar,
  },
  data() {
    return {
      isLoggedIn: false,
      chartData: [],
    };
  },
  asyncComputed: {
    async loadData() {
      google.charts.load("current", {
        packagaes: ["map"],
        mapsApiKey: "AIzaSyDemSB1MKHpdMDcMFXbqr9F1CJDVDo8UTE'",
      });

      google.charts.setOnLoadCallback(drawChart);
      const URL = "http://localhost:3000/api/maps/";
      const {
        data: { data },
      } = await this.axios.get(URL);

      let newData = data.map((item) => [item.lat, item.lng, item.title]);

      let modifiedNewData = [["lat", "Long", "Name"], ...newData];
      const mapedData = google.visualization.arrayToDataTable(modifiedNewData);
      const map = google.visualization.Map(
        document.querySelector("#map-chart")
      );
      const options = {
        mapType: "styledMap",
        showTooltip: true,
        showInfoWindow: true,
        zoomLevel: 12,
        useMapTypeControl: true,
        mapTypeIds: ["styledMap", "redEverything", "imBlue"],
        maps: {
          styledMap: {
            name: "Styled Map",
          },
        },
      };
      map.draw(mapedData, options);
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