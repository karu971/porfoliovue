<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-container fluid class="mt-5">
        <b-row class="my-1" v-for="(data, key) in datas" :key="key">
          <b-col sm="3">
            <label :for="`data-${key}`">{{ key }}:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input :id="`data-${key}`" :data="data" v-model="getNewData[key]"></b-form-input>
          </b-col>
        </b-row>
        <b-button type="submit" class="mt-5" variant="success">Submit</b-button>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      datas: {
        name: "",
        image: "",
        backgroundColor: ""
      },
      localEnv: process.env.API_LOCAL,
      getNewData: [],
      postUrl: null
    };
  },
  created() {
    //   this.postUrl = this.$route.params
    this.postUrl = `${process.env.API_SERVER}/${this.$route.params.category}`;
  },
  methods: {
    onSubmit() {
      axios
        .post(`${process.env.API_SERVER}/${this.$route.params.category}`, {
          name:
            this.getNewData.name != undefined
              ? this.getNewData.name
              : this.datas.name,
          image:
            this.getNewData.image != undefined
              ? this.getNewData.image
              : this.datas.image,
          backgroundColor:
            this.getNewData.backgroundColor != undefined
              ? this.getNewData.backgroundColor
              : this.datas.backgroundColor
        })
        .then(result => {
          console.log(this.API_LOCAL);
          if (result.data.status && result.data.status == "success") {
            $nuxt.$router.push({
              path: `/api/v1/competences/`
            });
          } else {
            this.$nuxt.$emit("errorMessage", result.data);
          }
        });
    }
  }
};
</script>

<style>
</style>
