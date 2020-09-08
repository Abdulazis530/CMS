<template>
  <div class="home" v-if="seen">
    <firstView msg="this is message" />
    
  </div>
</template>

<script>
// @ is an alias to /src
import firstView from "@/components/index.vue";

export default {
  name: "Home",
  components: {
    firstView,
  },
  data: function () {
    return {
      seen: true,
      todos: [
        { text: "Learn JavaScript" },
        { text: "Learn Vue" },
        { text: "Build something awesome" },
      ],
    };
  },
};
</script>
