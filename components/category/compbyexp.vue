<template>
  <div>
    <br>
    <h2>Compétences</h2>
    <div class="d-flex justify-content-center">
      <div
        v-for="(getCompetenceData, index, key) in getCompetenceDatas"
        :key="key"
        :class="[getClass, getCompetenceData.active ? 'border-success' : 'border-danger']"
        :style="[getStyle, { backgroundImage: 'url(' + require('~/assets/images/competences/' + getCompetenceData.image ) + ')' }]"
        @mouseover="getActive = index"
        @mouseleave="getActive = null"
        @click="getToggle(getCompetenceData)"
      >
        <div class="backgroundShadow" v-show="getActive === index"></div>
        <div
          style="z-index:0"
          class="position-relative d-flex justify-content-center align-items-center h-100 w-100"
        >
          <div
            class="border border-white p-2"
            v-show="getActive === index"
          >{{getCompetenceData.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Services from "~/plugins/services";
export default {
  props: ["compByExp"],
  data() {
    return {
      newDatas: [],
      url: `${process.env.API_SERVER}/competences`,
      getCompByExp: null,
      getActive: null,
      getCompetenceDatas: [],
      getStyle: {
        "background-repeat": "no-repeat",
        width: "180px",
        height: "180px",
        "background-size": "90%",
        "background-position": "center",
        position: "relative",
        cursor: "pointer"
      },
      getClass: ["shadow m-3 p-3 text-white border"]
    };
  },
  created() {
    axios.get(`${this.url}`).then(result => {
      let checkActiveCategory = Services.checkActiveCategory(
        this.$route.params,
        result.data.result,
        "compbyexp"
      );
      return (this.getCompetenceDatas = checkActiveCategory);
    });
  },
  methods: {
    getToggle(params) {
      params.active = !params.active
      this.$nuxt.$emit('getToggle', params)
    }
  }
};
</script>

<style>
</style>
