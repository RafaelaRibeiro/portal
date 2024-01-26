<template>
  <div class="h-screen flex">
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
        <login-form :dataLogin="dataLogin" @signin="signin" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../../components/login/LoginForm.vue'
export default {
  components: { LoginForm },
  layout: 'auth',
  data() {
    return {
      dataLogin: {},
    }
  },

  methods: {
    async signin() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.dataLogin.email,
            password: this.dataLogin.password,
          },
        })
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
      }
      this.$watch(
        () => this.$auth.loggedIn,
        (loggedIn) => {
          if (loggedIn) {
            const redirect =
              this.$auth.$storage.getLocalStorage('auth.redirect')
            if (redirect) {
              // Remove a rota de redirecionamento para não ser usada novamente
              this.$auth.$storage.setLocalStorage('auth.redirect', null)
              // Redireciona para a rota de redirecionamento
              this.$router.push(redirect)
            } else {
              // Se não houver uma rota de redirecionamento, vá para o dashboard
              this.$router.push('/')
            }
          }
        }
      )
    },
  },
}
</script>

<style>
</style>
