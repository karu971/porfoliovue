<template>
  <section class="container mt-5">
    <h1 class="mb-5">{{params.categorie}}</h1>
    <nuxt-link :to="{name: 'api-v1-category-add' , params: {category: params.categorie}}">Ajouter</nuxt-link>
    <div
      v-for="(data, key) of datas"
      :key="key"
      class="my-3 d-flex justify-content-between border-bottom py-3"
    >
      <div>{{data}}</div>
      <a
        :href="`${linkLocal}/${params.categorie}/${data.id}` "
        class="btn btn-info text-white"
      >Afficher</a>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params }) {
    let { data } = await axios.get(
      `${process.env.API_SERVER}/${params.categorie}`
    );
    return { datas: data.result, params: params };
  },
  data() {
    return {
      linkLocal: process.env.API_LOCAL
    };
  }
};
</script>

<style>
section {
  height: 100vh;
}
</style>
