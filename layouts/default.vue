<template>
  <v-app dark>
    <t-header />
    <t-content />
  </v-app>
</template>

<script>
import TContent from '../components/templates/TContent.vue'
import THeader from '../components/templates/THeader.vue'

export default {
  name: 'DefaultLayout',
  components: { TContent, THeader },
  data() {
    return {
      isLoading: false,
    }
  },

  mounted() {
    this.$axios.interceptors.request.use(
      (config) => {
        this.isLoading = true
        return config
      },
      (error) => {
        this.isLoading = false
        return Promise.reject(error)
      }
    )

    this.$axios.interceptors.response.use(
      (response) => {
        // Aguardar 500ms antes de definir isLoading como false
        setTimeout(() => {
          this.isLoading = false
        }, 500)
        return response
      },
      (error) => {
        // Aguardar 500ms antes de definir isLoading como false
        setTimeout(() => {
          this.isLoading = false
        }, 500)
        return Promise.reject(error)
      }
    )
  },
}
</script>

<style>
main {
  background: #f3faff;
}
#app {
  font-family: 'Poppins', sans-serif;
}

.v-text-field input {
  font-size: 87%;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 90%;
}

span {
  font-size: 87%;
}
.v-application a {
  color: #575361;
}

a {
  text-decoration: none !important;
}

sub {
  vertical-align: super;
  font-size: medium;
  color: red;
}

#quill-container {
  height: 80% !important;
}
</style>
