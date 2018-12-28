<template>
  <div>
    <h2>Langages</h2>
    <b-form-checkbox
      v-for="(data, index, key) in langbyExpData"
      :key="key"
      :name="`edit-langbyexp-${langbyExpData[index].id}`"
      :id="`langbyexp-${langbyExpData[index].id}`"
      v-model="langbyExpData[index].checked"
      @change="sendToExperiences"
    >{{langbyExpData[index]}}</b-form-checkbox>
    <div class="d-flex justify-content-center">
      <div
        v-for="(data, index, key) in langbyExpData"
        :key="key"
        :id="`langbyexp-${langbyExpData[index].id}`"
        @click="editLanguagesCheckbox(langbyExpData[index])"
        :class="[getClass, langbyExpData[index].checked ? 'border-success' : 'border-danger']"
        :style="[getStyle, { backgroundImage: 'url(' + require('~/assets/images/languages/' + langbyExpData[index].image ) + ')' }]"
        @mouseover="getActive = index"
        @mouseleave="getActive = null"
      >
        <div class="backgroundShadow" v-show="getActive === index"></div>
        <div
          style="z-index:0"
          class="position-relative d-flex justify-content-center align-items-center h-100 w-100"
        >
          <div
            class="border border-white p-2"
            v-show="getActive === index"
          >{{langbyExpData[index].name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Services from "~/plugins/services";

export default {
  props: ["langbyexp"],
  data() {
    return {
      langbyExpData: [],
      getStyle: {
        "background-repeat": "no-repeat",
        width: "180px",
        height: "180px",
        "background-size": "90%",
        "background-position": "center",
        position: "relative",
        cursor: "pointer"
      },
      getActive: null,
      getClass: ["shadow m-3 p-3 text-white border"]
    };
  },
  created() {
    let getData = Services.getCategoryAll(
      process.env.API_SERVER,
      this.$route.params,
      "languages"
    );
    getData.then(result => {
      Services.checkCategoryByExp(
        process.env.API_SERVER,
        this.$route.params,
        result,
        "langbyexp",
        "languages"
      ).then(result2 => {
        if (result2 != undefined) {
          this.langbyExpData = result2;
        } else {
          this.langbyExpData = Services.addCkeckedFalse(result);
        }
      })
      .catch((err) => console.log(err))
    });
  },
  methods: {
    sendToExperiences() {
      this.$nuxt.$emit("getLanguageData", this.langbyExpData);
    },
    editLanguagesCheckbox(params) {
      params.checked = !params.checked
      this.$nuxt.$emit("getLanguageData", this.langbyExpData);
    }
  }
};
</script>

<style>
</style>
