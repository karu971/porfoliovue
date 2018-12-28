<template>
  <div id="primary-menu">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand :href="path + 'home'">My Porfolio</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <ul class="navbar-nav">
            <li class="nav-item active" v-for="(link, index, key) in links" :key="key">
              <a class="nav-link" :href="path + link.path">{{link.name}}</a>
            </li>
          </ul>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- navbar-1.vue -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: process.env.API_LOCAL,
      links: [
        {
          name: "home",
          path: "/"
        },
        {
          name: "experiences",
          path: "/experiences/"
        },
        {
          name: "competences",
          path: "/competences/"
        },
        {
          name: "languages",
          path: "/languages/"
        }
      ]
    };
  }
};
</script>

<style>
</style>

