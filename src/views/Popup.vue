<script setup lang="ts">
import { getTabInfo } from '@/Utils/tabs';
import { copyToClipboard } from '@/Utils/copy';
import { ref } from 'vue';

type CopyStatus = 'waiting' | 'loading' | 'success' | 'fail';

const copyStatus = ref<{ markdown: CopyStatus; blob: CopyStatus; text: CopyStatus }>({
	markdown: 'waiting',
	blob: 'waiting',
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

const onclickBlob = async () => {
	const { title, url } = await getTabInfo();

	const blob = {
		'text/html': new Blob([`<a href="${url}">${title}</a>`], {
			type: 'text/html',
		}),
	};
	const clipboardItem = new ClipboardItem(blob);

	copyToClipboardWithStatus(clipboardItem, 'blob');
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
		prependIcon: 'mdi-alpha-m-box',
		clickHandler: onclickMarkdown,
	},
	blob: {
		btnText: 'Copy Link as Blob',
		prependIcon: 'mdi-code-braces',
		clickHandler: onclickBlob,
	},
	text: {
		btnText: 'Copy Title as Text',
		prependIcon: 'mdi-format-text',
		clickHandler: onclickText,
	},
};
</script>

<template>
	<div class="button-container">
		<template v-for="(item, key) in buttons">
			<v-btn :prepend-icon="item.prependIcon" :disabled="copyStatus[key] == 'loading'" @click="item.clickHandler">
				{{ item.btnText }}
				<template v-slot:append v-if="copyStatus[key] == 'success'">
					<v-icon color="success">mdi-check-circle</v-icon>
				</template>
				<template v-slot:append v-if="copyStatus[key] == 'fail'">
					<v-icon color="error">mdi-close-circle</v-icon>
				</template>
			</v-btn>
		</template>
		<v-divider></v-divider>
		<v-btn prepend-icon="mdi-plus" stacked :disabled="true"> add another pattern </v-btn>
	</div>
</template>

<style scoped>
.button-container {
	background-color: #efeef5;
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
