<template>
  <v-navigation-drawer fixed permanent dark mini-variant mini-variant-width="80" :stateless="true">
		<v-list dense nav>

			<v-list-item :to="{name: 'Home'}" :value="false">
				<v-list-item-action>
					<v-icon x-large>dashboard</v-icon>
				</v-list-item-action>
			</v-list-item>

			<v-list-item :to="{name: 'Settings'}">
				<v-list-item-action>
					<v-icon x-large>settings</v-icon>
				</v-list-item-action>
			</v-list-item>

			<v-list-item @click="dialog=true">
				<v-list-item-action>
					<v-icon x-large>close</v-icon>
				</v-list-item-action>
			</v-list-item>

			<v-container v-if="dialog">
				<Close v-on:no="dialog=false"></Close>
			</v-container>

			<div class="drag"></div>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'

import Close from '@/components/nav/Close.vue';

export default Vue.extend({
	name: 'Menu',

	components: { Close },

	data: () => ({
		dialog: false,
	}),
})
</script>

<style scoped>
	.drag {
		z-index: 0;
		position: absolute;
		display: block;
		content: "";
		height: 650px;
		width: 80px;
		-webkit-user-select: none;
		-webkit-app-region: drag;
	}
</style>
