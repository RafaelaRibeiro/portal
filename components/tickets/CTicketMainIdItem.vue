<template>
  <div class="flex items-center">
    <loading :isLoading="isLoading" />
    <div v-if="!edit" class="flex items-center">
      <img
        class="w-12 h-12 rounded-full mr-4"
        src="../../assets/avatar.png"
        alt="Avatar "
      />
      <div class="text-sm w-full">
        <div class="grid grid-cols-2">
          <div class="col-span-1">
            <p class="text-gray-900 font-medium leading-none">
              {{ content.user.name }}
              <span class="text-gray-400">{{
                profile(content.user.profile)
              }}</span>
            </p>
          </div>
          <div class="col-span-1">
            <div class="flex justify-end items-center h-full">
              <span class="text-gray-400 mr-1">
                {{ formattedDate(content.created_at) }}
              </span>
              <v-menu v-if="content.user_id === $auth.user.id" bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list dense>
                  <v-list-item @click="edit = true">
                    <v-list-item-title>Editar</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
        </div>
        <div class="max-w-4xl mx-auto">
          <p v-html="content.content" class="text-gray-600 break-words"></p>
        </div>
        <div v-show="files.length">
          <div class="mb-2">
            <span class="font-semibold">Anexos:</span>
          </div>
          <div v-for="(file, index) in files" :key="index">
            <div class="text-sm text-[#575361] font-medium my-3">
              <a
                class="bg-default p-1 rounded"
                :href="file.path"
                target="_blank"
                ><span class="text-white text-[11px]"
                  >{{ file.filename }} ( {{ formatFileSize(file.size) }} )</span
                ></a
              >
            </div>
          </div>
        </div>
        <!-- <div class="mt-4 flex">
          <div @click="edit = true">
            <v-btn @click="$emit('edit', true)" small text>Editar</v-btn>
          </div>
          <div>
            <v-btn small text>Excluir</v-btn>
          </div>
        </div> -->
      </div>
    </div>
    <div v-else class="max-w-5xl px-4">
      <no-ssr>
        <vue-editor
          placeholder="Escreva aqui..."
          v-model="content.content"
        ></vue-editor>
      </no-ssr>

      <div>
        <div class="my-2"><span class="font-semibold">Anexos:</span></div>
        <div v-for="(file, index) in files" :key="index">
          <div class="flex justify-between items-center">
            <div class="text-sm font-medium my-1.5">
              <a
                class="bg-default p-1 rounded"
                :href="file.path"
                target="_blank"
                ><span class="text-white text-[11px]"
                  >{{ file.filename }} ( {{ formatFileSize(file.size) }} )</span
                ></a
              >
            </div>
            <!-- @click="removeFile(index)" -->

            <div
              class="top-2 right-2 cursor-pointer"
              @click="showConfirmation(index)"
            >
              <v-icon small color="#2271a1">mdi-close</v-icon>
            </div>
            <u-confirm-modal
              :dialog="isDialogVisible"
              :confirmText="confirmText"
              :cancelText="cancelText"
              :iconName="iconName"
              @confirm="removeFile"
              @cancel="handleCancel"
              :index="selectedIndex"
            >
              <span class="text-lg text-gray-800">
                Confirma remover o anexo?</span
              >
            </u-confirm-modal>
          </div>
        </div>
      </div>
      <div class="flex">
        <div>
          <v-btn
            @click="updateTicketContent"
            class="my-3 mr-2 white--text"
            color="primary"
          >
            <span>Salvar</span></v-btn
          >
        </div>

        <div @click="edit = false">
          <v-btn class="my-3" @click="$emit('edit', false)" color="error"
            ><span>Cancelar</span></v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import UConfirmModal from '../UI/UConfirmModal.vue'
import Loading from '~/components/loading/Loading.vue'
export default {
  props: ['content'],
  components: { UConfirmModal, Loading },
  data() {
    return {
      files: [],
      edit: false,
      isDialogVisible: false,
      confirmText: 'Sim',
      cancelText: 'Não',
      iconName: 'mdi-alert-outline',
      isLoading: false,
    }
  },
  created() {
    this.getFiles()
  },
  methods: {
    showConfirmation(index) {
      this.selectedIndex = index
      this.isDialogVisible = true
    },

    handleCancel() {
      this.isDialogVisible = false
    },
    formattedDate(d) {
      return dayjs(d).format('DD/MM/YYYY HH:mm')
    },

    async getFiles() {
      try {
        const result = await this.$axios.get(
          `/tickets/${this.content.id}/files`
        )
        this.files = result.data
      } catch (error) {
      } finally {
      }
    },

    profile(profile) {
      const profiles = {
        A: 'Atendente',
        U: 'Cliente',
      }
      return profiles[profile] || 'Cliente'
    },

    formatFileSize(size) {
      if (size > 1024 * 1024) {
        return `${(size / (1024 * 1024)).toFixed(2)} MB`
      } else if (size > 1024) {
        return `${(size / 1024).toFixed(2)} KB`
      } else {
        return `${size} bytes`
      }
    },
    async removeFile(index) {
      if (this.files.length > 0 && this.files[index]) {
        const fileId = this.files[index].id // Sem parseInt, já que o Insomnia aceita como número
        const fileKey = this.files[index].key

        try {
          this.isLoading = true
          await this.$axios.delete(`/files`, {
            data: {
              file_id: fileId,
              file_key: fileKey,
            },
          })
          this.files.splice(index, 1)
          this.isDialogVisible = false
        } catch (error) {
          console.error('Error removing file:', error)
        } finally {
          this.isLoading = false
        }
      }
    },

    async updateTicketContent() {
      try {
        this.isLoading = true
        await this.$axios.patch(`/tickets/${this.content.id}/content`, {
          set: this.content.content,
        })
        this.$toast.success('Dados Atualizados', {
          position: 'top-center',
        })
        this.edit = false
        this.$emit('edit', false)
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style></style>
