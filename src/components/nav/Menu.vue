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

			<v-list-item @click="exit">
				<v-list-item-action>
					<v-icon x-large>close</v-icon>
				</v-list-item-action>
			</v-list-item>

			<div class="drag"></div>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'HelloWorld',

    data: () => ({
      //
    }),
    
	methods: {
		exit: () => {
			const remote = require('electron').remote;
			const win = remote.getCurrentWindow();
			win.close();
		},
	},
  })
</script>

<style scoped>
	.drag {
		position: absolute;
		display: block;
		content: "";
		height: 650px;
		width: 80px;
		-webkit-user-select: none;
		-webkit-app-region: drag;
	}
</style>
