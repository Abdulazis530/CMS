<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <a class="navbar-brand text-black-50" href="#">CMS</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto p-3 lead">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/home" class="nav-link">Data</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Data Date</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Maps</router-link>
        </li>
      </ul>
      <button type="submit" class="btn-login p-2 mb-2" v-if="isLogedIn">Logout</button>
     
    </div>
  </nav>
</template>
<script>
export default {
  props:{
    isLogedIn:Boolean
  },
  data() {
    return {};
  },
 
};
</script>

<style scoped>
.btn-login {
  color: white;
  border-radius: 5px;
  background-color: black;
  width: 10%;
  transition: transform 0.2s;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border: none;
}
.btn-login:hover {
  color: black;
  background-color: white;
  transform: scale(1.02);
}
</style>