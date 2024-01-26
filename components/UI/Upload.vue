<template>
  <div class="flex flex-col">
    <section
      class="drag-files bg-bg border-dashed border-2 border-[#2271a1] rounded-lg text-center py-4 relative"
      ref="dropArea"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @change="handleFileSelected"
    >
      <v-icon x-large color="#2271a1">mdi-cloud-arrow-up-outline</v-icon>
      <h3 class="mt-3 text-[#2271a1]">Anexar arquivos</h3>
      <p class="text-sm text-[#746e82]">Arraste ou clique para fazer upload</p>
      <input type="file" ref="fileInput" @change="handleFileUpload" multiple />
    </section>

    <section class="selected-files my-5 grid gap-3">
      <div
        class="box uploading"
        v-for="(file, index) in selectedFiles"
        :key="index"
      >
        <div class="icon">
          <v-icon color="#2271a1">mdi-file</v-icon>
        </div>
        <div>
          <div class="text-sm text-[#575361] font-bold">
            {{ file.file_name }}
          </div>
          <div class="text-[#857e95] font-medium text-xs">
            {{ formatFileSize(file.file_size) }}
          </div>
        </div>

        <div
          class="remove absolute top-2 right-2 cursor-pointer"
          @click="removeFile(index)"
        >
          <v-icon small color="#2271a1">mdi-close</v-icon>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    fileInputRef: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selectedFiles: [],
      isUploading: false,
    }
  },
  methods: {
    emitFileInputRef() {
      this.$emit('fileInputRef', this.$refs.fileInput)
    },
    handleDragOver() {
      this.$refs.dropArea.classList.add('dragover')
    },
    handleDragLeave() {
      this.$refs.dropArea.classList.remove('dragover')
    },
    handleFileSelected() {
      this.$emit('fileSelected', this.$refs.fileInput.files[0])
      this.emitFileInputRef()
    },

    handleFileUpload() {
      const files = this.$refs.fileInput.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileSizeInBytes = file.size
        const fileSizeInKb = Math.round(fileSizeInBytes / 1024)
        this.selectedFiles.push({
          file_name: file.name,
          file_size: fileSizeInBytes,
          size: fileSizeInKb + ' KB',
        })
      }
    },
    formatFileSize(size) {
      if (size > 1024 * 1024) {
        return `${Math.round(size / (1024 * 1024))} MB`
      } else if (size > 1024) {
        return `${Math.round(size / 1024)} KB`
      } else {
        return `${size} bytes`
      }
    },

    removeFile(index) {
      this.selectedFiles.splice(index, 1)
    },
  },
}
</script>

<style>
.drag-files input {
  all: unset;
  opacity: 0;
  inset: 0;
  position: absolute;
}

.box {
  padding: 8px;

  background: #ffffff;
  box-shadow: 0px 4px 16px #fcf0f0;
  border-radius: 8px;

  display: flex;
  gap: 12px;

  --icon-bg: #eee;
  --icon-color: #aaa;
  --progress-color: black;
  --progress-text: #999;

  position: relative;
}

.uploading {
  --icon-bg: #fcf0f0;
  --icon-color: rgba(180, 84, 92, 1);
  --progress-color: linear-gradient(
    90deg,
    rgba(140, 26, 27, 1) 0%,
    rgba(180, 84, 92, 1) 100%
  );
  --progress-text: #9892a6;
}

.box .icon {
  background: var(--icon-bg);
  border-radius: 4px;

  padding: 12px 12px;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
