<script setup lang="ts">
import { type ConfigData } from '@/types/type';

const props = defineProps<ConfigData>();

const itemTypes = ['markdown', 'hyperlink', 'text'];
</script>

<template>
  <div>
    <v-card v-for="(regexItem, index) in props.data" :key="index" class="card">
      <v-text-field
        label="url_regex"
        v-model="regexItem.url_regex"
        placeholder="Placeholder"
        variant="underlined"
      ></v-text-field>
      <div class="pattern-container">
        <div class="button-group" v-for="(button, btnIndex) in regexItem.btns" :key="btnIndex">
          <v-text-field
            label="button_name"
            v-model="button.btn_name"
            placeholder="Placeholder"
            variant="underlined"
          ></v-text-field>
          <v-select label="type" v-model="button.type" :items="itemTypes"></v-select>
          <v-text-field
            label="pattern"
            v-model="button.pattern"
            placeholder="Placeholder"
            variant="underlined"
          ></v-text-field>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.card {
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.pattern-container {
  display: flex;
  flex-wrap: wrap;
}

.button-group {
  width: calc(50% - 30px);
  padding: 10px;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.url-input,
.button-name-input {
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.v-card {
  transition: box-shadow 0.2s;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
