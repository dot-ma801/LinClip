<script setup lang="ts">
import { getTabInfo } from '@/Utils/tabs';
import { copyToClipboard } from '@/Utils/copy';
import { ref } from 'vue';

import IconBtnWithSlash from '@/components/IconBtnWithSlash.vue';

type CopyStatus = 'waiting' | 'loading' | 'success' | 'fail';

const ignoreQuery = ref(false);
const ignoreAnchor = ref(false);

const copyStatus = ref<{ markdown: CopyStatus; blob: CopyStatus; text: CopyStatus }>({
	markdown: 'waiting',
	blob: 'waiting',
	text: 'waiting',
});

const onclickMarkdown = async () => {
	const { title, url } = await getTabInfo(ignoreQuery.value, ignoreAnchor.value);
	const markdownText = `[${title}](${url})`;
	const blob = {
		'text/plain': new Blob([markdownText], { type: 'text/plain' }),
	};
	const clipboardItem = new ClipboardItem(blob);

	copyToClipboardWithStatus(clipboardItem, 'markdown');
};

const onclickBlob = async () => {
	const { title, url } = await getTabInfo(ignoreQuery.value, ignoreAnchor.value);

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
		<IconBtnWithSlash></IconBtnWithSlash>
		<!-- <v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-title height="36px">
					<v-icon size="x-small">mdi-cog</v-icon>
					<span style="margin-left: 5px">options</span>
				</v-expansion-panel-title>
				<v-expansion-panel-text>
					<div class="checkbox-container">
						<v-checkbox v-model="ignoreQuery" hide-details label="kill query(?)"></v-checkbox>
						<v-checkbox v-model="ignoreAnchor" hide-details label="kill anchor(#)"></v-checkbox>
					</div>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels> -->

		<v-divider></v-divider>

		<template v-for="(item, key) in buttons">
			<v-btn :prepend-icon="item.prependIcon" :disabled="copyStatus[key] == 'loading'" @click="item.clickHandler">
				{{ item.btnText }}
				<!-- FIXME: ボタンの外に出したい: Styleが崩れてしまい、うまく出せていない -->
				<template v-slot:append>
					<Transition name="bounce">
						<div>
							<v-icon v-if="copyStatus[key] == 'success'" color="success">mdi-check-circle</v-icon>
							<v-icon v-if="copyStatus[key] == 'fail'" color="error">mdi-close-circle</v-icon>
						</div>
					</Transition>
				</template>
			</v-btn>
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

.checkbox-container {
	display: flex;
	justify-content: space-around;
}

.button-container {
	padding: 30px;
	display: flex;
	flex-direction: column;
	gap: 10px;
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

.slashed-icon {
	background-image: linear-gradient(to bottom right, transparent 50%, red 50%);
	background-size: 2px 100%; /* 斜線の太さ */
	background-repeat: no-repeat;
	background-position: top left;
}

/* v-btnがTextをすべて大文字に変える仕様なので、その対応 */
* {
	text-transform: none !important;
}
</style>
