<template>
  <v-dialog v-model="dialog" width="500" height="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red" dark v-bind="attrs" v-on="on" @click="dialog = true">
        <v-icon left>mdi-trash-can-outline</v-icon> Deletar
      </v-btn>
    </template>
    <div class="bg-white p-3 grid justify-items-center">
      <div class="m-2">
        <v-icon color="red" class="my-icon">mdi-alert-circle-outline</v-icon>
      </div>
      <div class="m-2">Confirma excluir o registro?</div>
      <div class="m-2">
        <v-btn ma-2 color="red" dark @click="dialog = false"> Não </v-btn>
        <v-btn ma-2 color="primary" dark @click="executeDelete"> Sim </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    deleteTimesheet: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
    }
  },

  methods: {
    executeDelete() {
      this.deleteTimesheet()
    },
  },
}
</script>

<style>
.my-icon {
  font-size: 8rem !important;
}
</style>
