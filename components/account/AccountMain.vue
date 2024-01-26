<template>
  <div class="bg-white mt-3 min-h-[80vh] flex flex-row">
    <div class="w-1/2 p-4">
      <div class="h-15">
        <h1 class="text-2xl my-1">Minha Conta</h1>
      </div>
      <v-divider></v-divider>

      <div class="flex flex-row my-6">
        <v-btn class="mt-1.5" small dark color="primary">
          <v-icon small left>mdi-key</v-icon> Alterar senha</v-btn
        >
      </div>
      <div class="flex items-center mb-4">
        <div class="mr-4 w-1/2">
          <span>Email:</span>
          <u-input v-model="user.email" inputType="tel" />
        </div>
        <div class="w-1/2">
          <span>Nome:</span>
          <u-input v-model="user.name" inputType="tel" />
        </div>
      </div>
      <div class="flex items-center">
        <div class="mr-4 w-1/2">
          <span>Telefone:</span>
          <u-input
            v-model="user.fone"
            inputType="tel"
            v-mask="['(##) ####-####', '(##) #####-####']"
            masked="false"
          />
        </div>
        <div class="w-1/2">
          <span>Ramal:</span>
          <u-input v-model="user.extension" inputType="tel" />
        </div>
      </div>
      <div class="flex items-center my-4">
        <div class="mr-4 w-1/2">
          <span>Celular:</span>
          <u-input
            v-model="user.mobile"
            inputType="tel"
            v-mask="['(##) ####-####', '(##) #####-####']"
            masked="false"
          />
        </div>

        <div class="flex items-center cursor-pointer w-1/2 mt-5">
          <input type="checkbox" v-model="user.whatsapp" class="w-4 h-4 mr-2" />
          <label class="text-sm text-gray-700">Whatsapp</label>
        </div>
      </div>

      <div>
        <v-btn dark color="primary">Salvar</v-btn>
      </div>
    </div>

    <v-divider vertical class="pl-5"></v-divider>
    <div class="p-4 w-1/2">
      <div class="flex flex-col items-center justify-center">
        <img
          src="../../assets/avatar.png"
          alt="Imagem de perfil"
          class="w-20 h-20 rounded-full"
        />
        <v-btn small color="primary" dark class="mt-4">Alterar imagem</v-btn>
      </div>
    </div>
    <v-dialog v-model="dialogPassword" max-width="400px">
      <div class="w-full bg-white rounded-lg shadow p-6">
        <h1 class="font-medium text-xl mb-6">Altere sua senha</h1>
        <v-form ref="form">
          <v-container>
            <span>Senha atual:</span>
            <v-text-field
              outlined
              dense
              placeholder="Digite sua senha atual"
            ></v-text-field>

            <div>
              <span>Nova senha :</span>
              <v-text-field
                outlined
                dense
                placeholder="Digite sua nova senha"
              ></v-text-field>
            </div>
            <div>
              <span>Confirmação da senha:</span>
              <v-text-field
                outlined
                dense
                placeholder="Confirme sua nova senha"
              ></v-text-field>
            </div>

            <div class="flex justify-end mt-6">
              <v-btn class="mr-4 white--text" color="#042d65">Salvar</v-btn>
              <v-btn color="error">Cancelar</v-btn>
            </div>
          </v-container>
        </v-form>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import usersService from '~/services/usersService'
import UInput from '../UI/UInput.vue'

export default {
  components: { UInput },
  data() {
    return {
      user: {},
      password: '',
      newPassword: '',
      passwordConfirm: '',
      dialogPassword: false,
      showPassword: false,
      showNewPassword: false,
      showPasswordConfirm: false,
      isChecked: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
        passwordMatch: () =>
          this.newPassword === this.passwordConfirm ||
          'As senhas não correspondem.',
      },
    }
  },

  methods: {
    async getUser() {
      this.user = await usersService.findOne(this.$auth.user.id)
    },
    toggleCheckbox() {
      this.isChecked = !this.isChecked
    },
  },

  mounted() {
    this.getUser()
  },
}
</script>

<style>
</style>
