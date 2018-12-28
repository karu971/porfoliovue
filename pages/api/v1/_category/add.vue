<template>
  <div class="container mt-5">
    <CompetencesInterface
      v-if="params.category == 'competences' || params.category == 'languages'"
    />
    <ExperiencesInterface v-if="params.category == 'experiences'" :getDatas="getDatas"/>
  </div>
</template>

<script>
import axios from "axios";
import CompetencesInterface from "~/components/interfaces/competences";
import ExperiencesInterface from "~/components/category/experiences";
import Interfaces from "~/plugins/interfaces";

export default {
  data() {
    return {
      getParams: null,
      getDatas: []
    };
  },
  async asyncData({ params }) {
    return {
      params: params
    };
  },
  components: {
    CompetencesInterface,
    ExperiencesInterface
  },
  created() {
    if (this.params.category == "experiences") {
      this.getDatas = Interfaces.experiences();
      console.log(this.getDatas);
    }
  }
};
</script>

<style>
</style>
