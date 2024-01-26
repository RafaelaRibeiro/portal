<template>
  <div>
    <div class="my-6">
      <h1 class="text-lg font-medium text-center">Olá, Bem-vindo(a)</h1>
      <h1 class="text-center text-gray-600">
        Faça seu login para acessar a plataforma
      </h1>
    </div>
    <v-form>
      <v-container>
        <v-text-field
          v-model="dataLogin.email"
          placeholder="E-mail"
          prepend-inner-icon="mdi-account"
          outlined
          color="indigo darken-3"
          dense
          @keydown.enter="onSigninClick"
        ></v-text-field>

        <v-text-field
          v-model="dataLogin.password"
          placeholder="Senha"
          prepend-inner-icon="mdi-lock"
          outlined
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          color="indigo darken-3"
          dense
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          @keydown.enter="onSigninClick"
        ></v-text-field>
        <v-row align="center" justify="space-around">
          <v-col class="d-flex justify-center">
            <v-btn
              dark
              block
              color="#042d65"
              elevation="4"
              @click="onSigninClick"
            >
              Entrar
            </v-btn>
          </v-col>
        </v-row>
        <!-- <div class="text-center mt-5">
          <v-btn text @click="onResetPasswordClick">
            <span class="text-gray-600"> Esqueci minha senha</span></v-btn
          >
        </div> -->
        <!-- <div class="text-center">
          <v-btn text :to="'first-access'">
            <span class="text-gray-600"> Primeiro Acesso</span></v-btn
          >
        </div> -->
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ['dataLogin'],
  data() {
    return {
      show: false,
    }
  },

  methods: {
    onSigninClick() {
      this.$emit('signin')
    },
    // onResetPasswordClick() {
    //   this.$emit('resetPassword', true)
    // },
  },
}
</script>

<style>
</style>
