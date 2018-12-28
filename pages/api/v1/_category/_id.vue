<template>
  <div class="container mt-5">
    <h1 class="mb-5">{{ params.category}} {{ datas.name }}</h1>
    <div v-if="status != 'success'" class="alert alert-danger">{{ datas }}</div>
    <div v-if="status == 'success'">
      <ul class="border my-5 p-5 bg-light">
        <li class="m-0" v-for="(data, index, key) in datas" :key="key">
          <strong>{{ index }}:</strong>
          {{ datas[index] }}
        </li>
      </ul>
      <Experiences v-if="params.category == 'experiences'" :getDatas="datas" :getParams="params"/>
      <form @submit.prevent="put(params)" v-if="params.category != 'experiences'">
        <div v-for="(data, index, key) in datas" :key="key" v-if="index !== 'id'">
          <b-row class="my-1">
            <b-col sm="2">
              <label :for="`edit-${index}`">{{index}}:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input :id="`edit-${index}`" size="sm" type="text" :placeholder="data"></b-form-input>
            </b-col>
          </b-row>
          <!-- <label :for="`edit-${index}`">{{index}}:</label>
          <input
            :id="`edit-${index}`"
            type="text"
            :name="index"
            :placeholder="data"
            v-model="newDatas[index]"
          >-->
        </div>
        <div class="my-5">
          <a :href="`${linkLocal}/${params.category}`" class="btn btn-info m-3">Retour</a>
          <button type="submit" class="btn btn-success m-3">Modifier</button>
          <button type="button" @click="deleteContent(params)" class="btn btn-danger m-3">Supprimer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "~/plugins/services";
import router from "router";
import Experiences from "~/components/category/experiences";

export default {
  data() {
    return {
      newDatas: [],
      linkLocal: process.env.API_LOCAL
    };
  },
  components: {
    Experiences
  },
  async asyncData({ params }) {
    let { data } = await axios.get(
      `${process.env.API_SERVER}/${params.category}/${params.id}`
    );
    const dataResult = data.result;

    return { status: data.status, datas: data.result, params: params };
  },
  methods: {
    put(params) {
      if (params.category == "experiences") {
        axios
          .put(`${process.env.API_SERVER}/${params.category}/${params.id}`, {
            name:
              this.newDatas.name != undefined
                ? this.newDatas.name
                : this.datas.name,
            startDate:
              this.newDatas.startDate != undefined
                ? this.newDatas.startDate
                : this.datas.startDate,
            endDate:
              this.newDatas.endDate != undefined
                ? this.newDatas.endDate
                : this.datas.endDate,
            place:
              this.newDatas.place != undefined
                ? this.newDatas.place
                : this.datas.place,
            profession:
              this.newDatas.profession != undefined
                ? this.newDatas.profession
                : this.datas.profession,
            logo:
              this.newDatas.logo != undefined
                ? this.newDatas.logo
                : this.datas.logo,
            projects:
              this.newDatas.projects != undefined
                ? this.newDatas.projects
                : this.datas.projects,
            compbyexp:
              this.newDatas.compbyexp != undefined
                ? this.newDatas.compbyexp
                : this.datas.compbyexp
          })
          .then(result => {
            if (result.data.status && result.data.status == "success") {
              $nuxt.$router.push({
                path: `/api/v1/${params.category}`
              });
            } else {
              this.$nuxt.$emit("errorMessage", result.data);
            }
          })
          .catch(err => console.log(err));
      } else {
        axios
          .put(`${process.env.API_SERVER}/${params.category}/${params.id}`, {
            name:
              this.newDatas.name != undefined
                ? this.newDatas.name
                : this.datas.name,
            image:
              this.newDatas.image != undefined
                ? this.newDatas.image
                : this.datas.image,
            backgroundColor:
              this.newDatas.backgroundColor != undefined
                ? this.newDatas.backgroundColor
                : this.datas.backgroundColor
          })
          .then(result => {
            if (result.data.status && result.data.status == "success") {
              $nuxt.$router.push({
                path: `/api/v1/${params.category}`
              });
            } else {
              this.$nuxt.$emit("errorMessage", result.data);
            }
          })
          .catch(err => console.log(err));
      }
    },
    deleteContent(params) {
      axios
        .delete(`${process.env.API_SERVER}/${params.category}/${params.id}`)
        .then(result => {
          $nuxt.$router.push({
            path: `/api/v1/${params.category}`
          });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>
