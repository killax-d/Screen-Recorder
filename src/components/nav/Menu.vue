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
				<TwoChoices 
					v-bind:title="$t('close')"
					v-bind:message="$t('close_message')"
					v-bind:a="$t('no')"
					v-bind:b="$t('yes')"
					v-on:a="dialog=false"
					v-on:b="dialog=false, exit()"
				>
				</TwoChoices>
			</v-container>

			<div class="drag"></div>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'

import TwoChoices from '@/components/popup/TwoChoices.vue';

export default Vue.extend({
	name: 'Menu',

	components: { TwoChoices },

	data: () => ({
		dialog: false,
	}),

	methods: {
		exit: () => {
			const remote = require('electron').remote;
			const win = remote.getCurrentWindow();
			win.close();
		}
	}
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

<i18n>
	{
		"en": {
			"close": "Close application",
			"close_message": "Do you really want to close this app ?",
			"no": "No",
			"yes": "Yes"
		},
		"fr": {
			"close": "Fermer l'application",
			"close_message": "Voulez vous vraiment quitter l'application ?",
			"no": "Non",
			"yes": "Oui"
		}
	}
</i18n>
