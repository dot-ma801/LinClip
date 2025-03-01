<script setup lang="ts">
import '@mdi/font/css/materialdesignicons.css';
import { ref, onMounted } from 'vue';

const jsonData = ref<any>(null);

// JSONデータをストレージに保存
const saveJson = (data: any) => {
  chrome.storage.sync.set({ savedJson: data }, () => {
    console.log('JSON saved:', data);
  });
};

// ストレージからJSONデータを取得
onMounted(() => {
  chrome.storage.sync.get(['savedJson'], (result) => {
    if (result.savedJson) {
      jsonData.value = result.savedJson;
    }
  });
});

const file_input = ref<HTMLInputElement | null>(null);
const select_file = () => {
  if (file_input.value) {
    file_input.value.click();

    try {
      if (!file_input.value.files || !file_input.value.files.length) {
        return;
      }
      const file = file_input.value.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result;
        if (typeof fileContent === 'string') {
          const parsedData = JSON.parse(fileContent);
          jsonData.value = parsedData;
          saveJson(parsedData);
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Invalid JSON file');
    }
  }
};
</script>

<template>
  <h1>This is an Option page</h1>
  <v-btn class="btn" prepend-icon="mdi-database-import-outline" @click="select_file">JSONデータインポート</v-btn>
  <v-btn class="btn" prepend-icon="mdi-database-export-outline" @click="">JSONデータエクスポート</v-btn>

  <v-file-input ref="file_input" style="display: none"></v-file-input>
</template>

<style scoped>
.btn-container {
  /* display: flex;
  flex-direction: column; */
}

.btn {
  margin: 5px;
}
</style>
