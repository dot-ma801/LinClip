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
	<div class="title-container">
		<v-icon size="64" color="success">mdi-content-copy</v-icon>
		<span class="title-character">LinClip</span>
	</div>

	<div class="button-container">
		<template v-for="(item, key) in buttons">
			<div class="button-row">
				<v-btn
					class="feature-btn"
					:prepend-icon="item.prependIcon"
					:disabled="copyStatus[key] == 'loading'"
					@click="item.clickHandler"
				>
					{{ item.btnText }}
				</v-btn>
				<!-- NOTE: extension で見ると 開発サーバで確認したときより小さく描画されるので、size="x-large" としている -->
				<v-icon v-if="copyStatus[key] == 'success'" class="information-icon" color="success" size="x-large">
					mdi-check-circle
				</v-icon>
				<v-icon v-else-if="copyStatus[key] == 'fail'" class="information-icon" color="error" size="x-large">
					mdi-close-circle
				</v-icon>
				<v-tooltip v-else text="aaa" location="top">
					<template v-slot:activator="{ props }">
						<v-icon v-bind="props" class="information-icon" size="x-large">mdi-information-slab-circle</v-icon>
					</template>
				</v-tooltip>
			</div>
		</template>
		<v-divider></v-divider>
		<v-btn prepend-icon="mdi-plus" stacked :disabled="true"> add another pattern </v-btn>
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
}

.information-icon {
	margin: 0 10px;
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

/* v-btnがTextをすべて大文字に変える仕様なので、その対応 */
* {
	text-transform: none !important;
}
</style>
