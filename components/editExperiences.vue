<template>
  <div>
    {{getDatas}}
    <form>
      <div v-for="(data, index, key) in datas" :key="key" v-if="index !== 'id'">
          {{data}}
          {{index}}
          {{key}}
        <label :for="`edit-${index}`">{{index}}:</label>
        <!-- <input
          :id="`edit-${index}`"
          type="text"
          name="index"
          :placeholder="data"
          v-model="newDatas[index]"
        >-->
      </div> 
      <!-- <div class="my-5">
        <a :href="`${linkLocal}/${params.category}`" class="btn btn-info m-3">Retour</a>
        <button type="submit" class="btn btn-success m-3">Modifier</button>
        <button type="button" class="btn btn-danger m-3">Supprimer</button>
      </div> -->
    </form>
  </div>
</template>

<script>
export default {
  props: ["getDatas"],
  datas() {
    return {
      datas: {
        name: null,
        startDate: null,
        endDate: null,
        place: null,
        profession: null,
        logo: null
      },
      newDatas: null
    };
  },
  mehtods: {
    put(params) {
      console.log("OK");
    }
  }
};
</script>

<style>
</style>
