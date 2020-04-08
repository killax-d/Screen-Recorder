<template>
	<v-app>
		<v-row>
			<v-col align="stretch" style="width: 80px" class="py-0 my-0 pr-0"  md="auto">
				<Menu></Menu>
			</v-col>
			<v-col class="p-0 m-0">
				<router-view></router-view>
			</v-col>
		</v-row>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from '@/components/nav/Menu.vue';

export default Vue.extend({
	name: 'App',

	components: {
		Menu
	},

	data: () => ({
		//
	}),

	methods: {
		//
	},
});
</script>

<style>
</style>
