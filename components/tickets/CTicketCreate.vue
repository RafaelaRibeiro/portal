<template>
  <div class="m-0 p-0">
    <loading :isLoading="isLoading" />
    <div class="m-4 flex items-center">
      <span class="text-2xl">Novo chamado</span>
      <v-spacer></v-spacer>
      <v-btn color="#2271a1" icon @click="$emit('dialogCreate', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-form ref="form" class="m-6">
      <div class="flex -mb-4">
        <div class="w-1/2 mr-4">
          <span> Categoria: </span>
          <v-autocomplete
            v-model="ticket.category_id"
            :items="categories"
            item-text="name"
            item-value="id"
            outlined
            dense
          >
          </v-autocomplete>
        </div>
        <div class="w-1/2">
          <span> Prioridade: </span>
          <v-autocomplete
            v-model="ticket.priority_id"
            :items="priorities"
            item-text="name"
            item-value="id"
            outlined
            dense
          >
          </v-autocomplete>
        </div>
      </div>

      <div>
        <span>Assunto:</span>
        <v-text-field v-model="ticket.subject" outlined dense></v-text-field>
      </div>
      <div>
        <no-ssr>
          <vue-editor
            placeholder="Escreva aqui..."
            v-model="ticket.content"
          ></vue-editor>
        </no-ssr>
      </div>
      <div class="mt-3">
        <upload @fileInputRef="onFileInputRef" />
      </div>

      <div class="flex mb-4">
        <div class="w-1/2 mr-4" v-if="clients.length > 1">
          <span> Organização: </span>
          <v-autocomplete
            v-model="ticket.client_id"
            :items="clients"
            item-text="client.trade_name"
            item-value="client.id"
            outlined
            dense
            @change="getApprovers"
          >
          </v-autocomplete>
        </div>

        <div class="w-1/2">
          <span> Aprovador: </span>
          <v-autocomplete
            v-model="ticket.approver_id"
            :items="approvers"
            item-text="name"
            item-value="id"
            outlined
            dense
          >
          </v-autocomplete>
        </div>
      </div>

      <div class="mb-10">
        <v-btn
          class="white--text"
          color="#1e638d"
          @click="saveTicket"
          :disabled="!isFormValid"
          ><span>Abrir Chamado</span></v-btn
        >
        <v-btn @click="onCancel" color="error"><span>Cancelar</span></v-btn>
      </div>

      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.text }}
      </v-snackbar>
    </v-form>
  </div>
</template>

<script>
import Upload from '../UI/Upload.vue'
import ticketsService from '~/services/ticketsService'
import Loading from '~/components/loading/Loading.vue'

export default {
  components: { Upload, Loading },

  props: ['users', 'priorities', 'categories', 'clients'],

  data() {
    return {
      icon: 'mdi-ticket-confirmation',
      text: 'Tickets',
      ticket: {
        priority_id: 2,
      },
      approvers: [],
      fileInputRef: null,
      ticket_content_id: null,
      snackbar: {
        show: false,
        text: '',
        color: '',
      },
      isLoading: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
    }
  },

  // mounted() {
  //   this.ticket.client_id = this.clientDefault
  // },

  methods: {
    onFileInputRef(ref) {
      this.fileInputRef = ref
    },

    onCancel() {
      this.$emit('dialogCreate', false)
      this.ticket.category_id = ''
      this.ticket.priority_id = ''
      this.ticket.subject = ''
      this.ticket.content = ''
      this.ticket.client_id = ''
      this.ticket.approver_id = ''
      this.$refs.form.reset()
    },

    async getApprovers() {
      this.approvers = await ticketsService.getApprovers(this.ticket.client_id)
    },
    async saveTicket() {
      try {
        const response = await this.$axios.post('/tickets', {
          user_id: this.$auth.user.id,
          category_id: this.ticket.category_id,
          priority_id: this.ticket.priority_id,
          subject: this.ticket.subject,
          approver_id: this.ticket.approver_id,
          client_id: this.ticket.client_id,
          department_id: this.$auth.user.department_id,
          content: this.ticket.content,
        })

        this.ticket_content_id = response.data.TicketContent[0].id
        await this.sendFile()
        this.$emit('dialogCreate', false)
        this.$router.push({
          path: `/tickets/${response.data.id}`,
        })
      } catch (error) {
        console.log(error)
      } finally {
      }
    },

    async sendFile() {
      const { ticket_content_id } = this
      const { fileInputRef } = this

      if (!fileInputRef || !fileInputRef.files.length) {
        return
      }

      const formData = new FormData()
      for (const file of fileInputRef.files) {
        formData.append('files', file)
      }

      this.snackbar = {
        show: true,
        text: 'Enviando arquivo...',
        color: 'info',
      }

      this.isUploading = true

      try {
        await ticketsService.uploadFile(ticket_content_id, formData)
        this.selectedFiles = []
        fileInputRef.value = null
        this.$emit('upload')
      } catch (error) {
        console.error('Falha ao enviar arquivo:', error)
        this.snackbar = {
          show: true,
          text: 'Erro ao enviar arquivo.',
          color: 'error',
        }
      } finally {
        this.isUploading = false
      }
    },
  },

  computed: {
    clientDefault() {
      return this.clients.length === 1 ? this.clients[0].client_id : []
    },
    isFormValid() {
      const isCategoryValid =
        this.rules.required(this.ticket.category_id) === true
      const isPriorityValid =
        this.rules.required(this.ticket.priority_id) === true
      const isSubjectValid = this.rules.required(this.ticket.subject) === true
      const isContentValid = this.rules.required(this.ticket.content) === true
      const isClientValid = this.rules.required(this.ticket.client_id) === true

      const isValid =
        isCategoryValid &&
        isPriorityValid &&
        isSubjectValid &&
        isContentValid &&
        isContentValid &&
        isClientValid

      return isValid
    },
  },
}
</script>

<style></style>
