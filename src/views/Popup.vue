<script setup lang="ts">
import { getTabInfo } from '@/Utils/tabs';
import { copyToClipboard } from '@/Utils/copy';
import { ref } from 'vue';
import markdownIcon from '@/assets/icons/components/markdownIcon.vue';

const VERSION = import.meta.env.VITE_APP_VERSION;
const GITHUB_LINK = import.meta.env.VITE_GITHUB_LINK;
const FEEDBACK_LINK = import.meta.env.VITE_FEEDBACK_LINK + VERSION;

type CopyStatus = 'waiting' | 'loading' | 'success' | 'fail';

const copyStatus = ref<{ markdown: CopyStatus; hyperlink: CopyStatus; text: CopyStatus }>({
  markdown: 'waiting',
  hyperlink: 'waiting',
  text: 'waiting',
});

const onclickMarkdown = async () => {
  const { title, url } = await getTabInfo();
  const markdownText = `[${title}](${url})`;
  const blob = {
    'text/plain': new Blob([markdownText], { type: 'text/plain' }),
  };
  const clipboardItem = new ClipboardItem(blob);

  copyToClipboardWithStatus(clipboardItem, 'markdown');
};

const onclickHyperlink = async () => {
  const { title, url } = await getTabInfo();

  const blob = {
    'text/html': new Blob([`<a href="${url}">${title}</a>`], {
      type: 'text/html',
    }),
  };
  const clipboardItem = new ClipboardItem(blob);

  copyToClipboardWithStatus(clipboardItem, 'hyperlink');
};

const onclickText = async () => {
  const { title } = await getTabInfo();
  const text = `${title}`;
  const blob = {
    'text/plain': new Blob([text], { type: 'text/plain' }),
  };
  const clipboardItem = new ClipboardItem(blob);

  copyToClipboardWithStatus(clipboardItem, 'text');
};

const copyToClipboardWithStatus = (clipboardItem: ClipboardItem, statusKey: keyof typeof copyStatus.value) => {
  copyStatus.value[statusKey] = 'loading';
  copyToClipboard(
    clipboardItem,
    () => {
      copyStatus.value[statusKey] = 'success';
      setTimeout(() => {
        copyStatus.value[statusKey] = 'waiting';
      }, 3000);
    },
    () => {
      copyStatus.value[statusKey] = 'fail';
      setTimeout(() => {
        copyStatus.value[statusKey] = 'waiting';
      }, 3000);
    }
  );
};

const buttons = {
  markdown: {
    btnText: 'Copy Link as Markdown',
    prependIcon: markdownIcon,
    description: 'markdown形式でコピーします。<br>[タブタイトル](URL)',
    clickHandler: onclickMarkdown,
  },
  hyperlink: {
    btnText: 'Copy Link as Hyperlink',
    prependIcon: 'mdi-link-variant',
    description: `
			ハイパーリンク形式でコピーします。<br>
			microsoft teams や PowerPoint 等リッチテキストボックス<br>に貼り付ける際に便利です。`,
    clickHandler: onclickHyperlink,
  },
  text: {
    btnText: 'Copy Title as Text',
    prependIcon: 'mdi-format-text',
    description: 'プレーンテキストでタブタイトルのみをコピーします。',
    clickHandler: onclickText,
  },
};
</script>

<template>
  <div class="title-container">
    <v-icon size="64" color="success">mdi-content-copy</v-icon>
    <span class="title-character">LinClip</span>
  </div>

  <div class="button-container">
    <template v-for="(item, key) in buttons">
      <div class="button-row">
        <v-btn class="feature-btn" :disabled="copyStatus[key] == 'loading'" @click="item.clickHandler">
          <v-icon class="prepend-icon" :icon="item.prependIcon"></v-icon>
          {{ item.btnText }}
        </v-btn>
        <v-icon v-if="copyStatus[key] == 'success'" class="append-icon" color="success" size="x-large">
          mdi-check-circle
        </v-icon>
        <v-icon v-else-if="copyStatus[key] == 'fail'" class="append-icon" color="error" size="x-large">
          mdi-close-circle
        </v-icon>
        <div v-else class="tooltip">
          <v-icon class="append-icon" size="x-large">mdi-information-slab-circle</v-icon>
          <span class="tooltip-text" v-html="item.description"></span>
        </div>
      </div>
    </template>
  </div>
  <div class="footer-container">
    <span>Version: {{ VERSION }}</span>
    <div class="footer-links">
      <a :href="GITHUB_LINK" target="_blank" rel="noopener noreferrer">
        <v-icon class="footer-icon">mdi-github</v-icon>
      </a>
      <a :href="FEEDBACK_LINK" target="_blank" rel="noopener noreferrer">
        <v-icon class="footer-icon">mdi-comment-question-outline</v-icon>
      </a>
    </div>
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  padding-bottom: 0;
}

.title-character {
  font-size: 24px;
  font-weight: bold;
  margin-left: 8px;
  color: var(--vt-c-black);
}

.button-container {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-row {
  display: flex;
  align-items: center;
}

.feature-btn {
  width: 90%;
  margin-right: 5px;
}

.prepend-icon {
  margin-right: 5px;
}

.bounce-enter-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.bounce-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.bounce-enter-from,
.bounce-leave-to {
  transform: scale(0);
  opacity: 0;
}

.bounce-enter-to,
.bounce-leave-from {
  transform: scale(1.2);
  opacity: 1;
}

.bounce-leave-to {
  opacity: 0;
  transition-delay: 0.1s;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltip-text {
  visibility: hidden;
  width: 300px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 0;
  transform: translateX(-100%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 0.9em;
}

.tooltip .tooltip-text::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.tooltip:hover .append-icon {
  color: #2196f3;
}

.footer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-size: 14px;
  color: gray;
}

.footer-links {
  display: flex;
  gap: 15px;
  margin-left: 15px;
}

.footer-icon {
  cursor: pointer;
  color: gray;
  transition: color 0.3s;
}

.footer-icon:hover {
  color: #2196f3;
}

/* v-btnがTextをすべて大文字に変える仕様なので、その対応 */
* {
  text-transform: none !important;
}
</style>
