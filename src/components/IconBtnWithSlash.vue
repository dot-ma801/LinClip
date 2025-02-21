<template>
	<v-btn icon size="small" @click="toggleQueryMode" class="query-btn">
		<v-icon :class="{ slashed: isQueryOff }">mdi-pound</v-icon>
	</v-btn>
</template>

<script setup>
import { ref } from 'vue';

const isQueryOff = ref(false);

const toggleQueryMode = () => {
	isQueryOff.value = !isQueryOff.value;
};
</script>

<style>
.query-btn {
	position: relative;
}

.slashed::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	/* 線の長さはここ */
	width: 150%;
	height: 2px;
	background-color: rgba(0, 0, 0);
	transform: translate(-50%, -50%) rotate(-45deg);
	pointer-events: none;
}
</style>
