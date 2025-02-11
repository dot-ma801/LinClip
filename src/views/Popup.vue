<script setup lang="ts">
import { getTabInfo } from '@/Utils/tabs';
import { copyToClipboard } from '@/Utils/copy';

const onclickMarkdown = async () => {
	const { title, url } = await getTabInfo();
	const markdownText = `[${title}](${url})`;
	const blob = {
		'text/plain': new Blob([markdownText], { type: 'text/plain' }),
	};
	const clipboardItem = new ClipboardItem(blob);

	copyToClipboard(clipboardItem);
};

const onclickBlob = async () => {
	const { title, url } = await getTabInfo();

	const blob = {
		'text/html': new Blob([`<a href="${url}">${title}</a>`], {
			type: 'text/html',
		}),
	};
	const clipboardItem = new ClipboardItem(blob);

	copyToClipboard(clipboardItem);
};

const onclickText = async () => {
	const { title } = await getTabInfo();
	const text = `${title}`;
	const blob = {
		'text/plain': new Blob([text], { type: 'text/plain' }),
	};
	const clipboardItem = new ClipboardItem(blob);

	copyToClipboard(clipboardItem);
};
</script>

<template>
	<div class="button-container">
		<v-btn prepend-icon="mdi-alpha-m-box" @click="onclickMarkdown"> Copy Link as Markdown</v-btn>
		<v-btn prepend-icon="mdi-code-braces" @click="onclickBlob"> Copy Link as Blob</v-btn>
		<v-btn prepend-icon="mdi-format-text" @click="onclickText"> Copy Title as Text</v-btn>
		<v-divider></v-divider>
		<v-btn prepend-icon="mdi-plus" stacked> add another pattern </v-btn>
	</div>
</template>
<style scoped>
.button-container {
	padding: 30px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

/* v-btnがTextをすべて大文字に変える仕様なので、その対応 */
* {
	text-transform: none !important;
}
</style>
