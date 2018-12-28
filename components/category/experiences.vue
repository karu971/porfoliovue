<template>
  <div>
    <form @submit.prevent="sendData(getParams)">
      <div
        v-for="(data, index, key) in getDatas"
        :key="key"
        v-if="index !== 'id' && index !== 'compbyexp'"
        class="form-group row"
      >
        <label :for="`edit-${index}`" class="col-sm-2 col-form-label">{{index}}:</label>
        <div class="col-sm-10">
          {{newDatas[index]}}
          <input
            :id="`edit-${index}`"
            type="text"
            :name="index"
            class="form-control"
            v-model="newDatas[index]"
          >
        </div>
      </div>
      <div
        class="form-group row"
        v-for="(getCompetenceData, index, key) in getCompetences"
        :key="key"
        hidden
      >
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`edit-compbyexp-${getCompetenceData.id}`"
            :name="`edit-compbyexp-${getCompetenceData.id}`" 
            value="option1"
            v-model="getCompetenceData.checked"
          >
          <label
            class="form-check-label"
            :for="`edit-compbyexp-${getCompetenceData.id}`"
          >{{getCompetenceData}}</label>
        </div>
      </div>
      <Compbyexp :compByExp="getDatas.compbyexp"/>
      <Langbyexp :langbyexp="getDatas.langbyexp"/>
      <div class="my-5">
        <a :href="`${linkLocal}/${this.$route.params.category}`" class="btn btn-info m-3">Retour</a>
        <button v-if="this.$route.params.id" type="submit" class="btn btn-success m-3">Modifier</button>
        <button v-if="!this.$route.params.id" type="submit" class="btn btn-success m-3">Ajouter</button>
        <button
          @click="deleteTable"
          v-if="this.$route.params.id"
          type="button"
          class="btn btn-danger m-3"
        >Supprimer</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Compbyexp from "./compbyexp";
import Langbyexp from "./langbyexp";
import Services from "~/plugins/services";
import Langages from "./langbyexp";

export default {
  components: {
    Compbyexp,
    Langbyexp
  },
  created() {
    let data = axios
      .get(`${process.env.API_SERVER}/competences`)
      .then(result => {
        return result.data.result;
      })
      .then(result => {
        axios
          .get(`${process.env.API_SERVER}/compbyexp/${this.$route.params.id}`)
          .then(result2 => {
            if (result2.data.status == "success") {
              return {
                resultCompetences: result,
                resultCompbyexp: result2.data.result
              };
            } else {
              return {
                resultCompetences: result
              };
            }
          })
          .then(result => {
            if (result.resultCompbyexp != undefined) {
              for (let valueCompbyexp in result.resultCompbyexp) {
                for (let valueCompetences in result.resultCompetences) {
                  if (
                    result.resultCompetences[valueCompetences].checked ==
                    undefined
                  ) {
                    result.resultCompetences[valueCompetences].checked = false;
                  }
                  if (
                    result.resultCompetences[valueCompetences].id ==
                    result.resultCompbyexp[valueCompbyexp].competence
                  ) {
                    result.resultCompetences[valueCompetences].checked = true;
                  }
                }
              }
            } else {
              for (let valueCompetences in result.resultCompetences) {
                result.resultCompetences[valueCompetences].checked = false;
              }
            }
            return (this.getCompetences = result.resultCompetences);
          })
          .catch(err => console.log(err));
      });
    this.$nuxt.$on("getToggle", data => {
      for (let getCompetence in this.getCompetences) {
        if (this.getCompetences[getCompetence].id == data.id) {
          if (this.getCompetences[getCompetence].checked == undefined) {
            this.getCompetences[getCompetence]["checked"] = false;
          }
          this.getCompetences[getCompetence].checked = !this.getCompetences[
            getCompetence
          ].checked;
        }
      }
    });
    this.$nuxt.$on("getLanguageData", data => {
      this.langbyExpData = data;
    });
  },
  beforeDestroy() {
    // $off method will turned off the event listner
    this.$nuxt.$off("getToggle");
  },
  props: ["getDatas", "getParams"],
  data() {
    return {
      getCompetences: this.$route.params.id != undefined ? [] : this.datas,
      getRoute: this.$route.params,
      linkLocal: process.env.API_LOCAL,
      newDatas: [],
      langbyExpData: []
    };
  },
  methods: {
    sendData(params) {
      if (this.$route.params.id == undefined) {
        axios
          .post(`${process.env.API_SERVER}/${this.$route.params.category}`, {
            name: this.newDatas.name != undefined ? this.newDatas.name : "",
            startDate:
              this.newDatas.startDate != undefined
                ? this.newDatas.startDate
                : "",
            endDate:
              this.newDatas.endDate != undefined ? this.newDatas.endDate : "",
            place: this.newDatas.place != undefined ? this.newDatas.place : "",
            profession:
              this.newDatas.profession != undefined
                ? this.newDatas.profession
                : "",
            logo: this.newDatas.logo != undefined ? this.newDatas.logo : ""
          })
          .then(result => {
            if (result.data.status == "success") {
              Services.editCategory(
                process.env.API_SERVER,
                this.getRoute,
                this.getCompetences,
                "compbyexp"
              );
              Services.editCategory(
                process.env.API_SERVER,
                this.getRoute,
                this.langbyExpData,
                "langbyexp"
              );
            } else {
              this.$nuxt.$emit("errorMessage", result.data);
            }
          })
          .then(() => {
            $nuxt.$router.push({
              path: `/api/v1/experiences/`
            });
          });
      } else {
        axios
          .put(
            `${process.env.API_SERVER}/${this.$route.params.category}/${
              this.$route.params.id
            }`,
            {
              name:
                this.newDatas.name != undefined
                  ? this.newDatas.name
                  : this.getDatas.name,
              startDate:
                this.newDatas.startDate != undefined
                  ? this.newDatas.startDate
                  : this.getDatas.startDate,
              endDate:
                this.newDatas.endDate != undefined
                  ? this.newDatas.endDate
                  : this.getDatas.endDate,
              place:
                this.newDatas.place != undefined
                  ? this.newDatas.place
                  : this.getDatas.place,
              profession:
                this.newDatas.profession != undefined
                  ? this.newDatas.profession
                  : this.getDatas.profession,
              logo:
                this.newDatas.logo != undefined
                  ? this.newDatas.logo
                  : this.getDatas.logo
            }
          )
          .then(result => {
            if (result.data.status == "success") {
              Services.editCategory(
                process.env.API_SERVER,
                this.getRoute,
                this.getCompetences,
                "compbyexp"
              );
              Services.editCategory(
                process.env.API_SERVER,
                this.getRoute,
                this.langbyExpData,
                "langbyexp"
              );
            } else {
              console.log(
                `${process.env.API_SERVER}/${this.$route.params.category}/${
                  this.$route.params.id
                }`
              );
              this.$nuxt.$emit("errorMessage", result.data);
            }
          });
      }
    },
    beforeDestroy() {
      // $off method will turned off the event listner
      this.$nuxt.$off("getlangbyexp");
    },
    deleteTable() {
      console.log(
        `${process.env.API_SERVER}/${this.$route.params.category}/${
          this.$route.params.id
        }`
      );
      axios
        .delete(
          `${process.env.API_SERVER}/${this.$route.params.category}/${
            this.$route.params.id
          }`
        )
        .then(result => {
          if (result.data.status == "success") {
            Services.dropTable(
              process.env.API_SERVER,
              "compbyexp",
              this.$route.params.id
            );
            Services.dropTable(
              process.env.API_SERVER,
              "langbyexp",
              this.$route.params.id
            );
          } else {
            console.log(result.data.result);
          }
        })
        .then(() => {
          $nuxt.$router.push({
            path: `/api/v1/experiences/`
          });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>
