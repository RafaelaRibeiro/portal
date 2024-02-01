<template>
  <div class="h-screen flex">
    <v-overlay :value="isLoading">
      <v-progress-circular
        indeterminate
        size="70"
        :width="7"
        color="#f3faff"
      ></v-progress-circular>
    </v-overlay>
    <img
      class="w-3/5 object-fill hidden md:block"
      src="../../assets/bg.jpg"
      alt="background"
    />
    <div class="w-full justify-center mx-24 my-16">
      <div class="my-10"></div>
      <div class="my-2">
        <img class="w-[350px] mx-auto" src="~/assets/logo.jpg" alt="" />
      </div>
      <div>
        <login-form
          :dataLogin="dataLogin"
          :isLoading="isLoading"
          @signin="signin"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../../components/login/LoginForm.vue'
import Loading from '~/components/loading/Loading.vue'
export default {
  components: { LoginForm, Loading },
  layout: 'auth',
  data() {
    return {
      dataLogin: {},
      isLoading: false,
    }
  },

  methods: {
    async signin() {
      try {
        this.isLoading = true
        await this.$auth.loginWith('local', {
          data: {
            email: this.dataLogin.email,
            password: this.dataLogin.password,
          },
        })

        this.$router.push('/mytickets')
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log(error.response.data.message)
          this.$toast.error(error.response.data.message, {
            position: 'top-center',
          })
        } else {
          this.$toast.error('Não foi possível conectar ao servidor.', {
            position: 'top-center',
          })
          return
        }
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style>
</style>
