<template>
	<v-app>
		<v-row>
			<v-col align="stretch" style="width: 80px" class="py-0 my-0 pr-0"  md="auto">
				<Menu></Menu>
			</v-col>
			<v-col class="p-0 m-0">
				<router-view 
					v-bind:recording="recording" 
					v-bind:stream="stream" 
					v-on:sourceChange="selectSource($event)"
					v-on:startRecord="recording = true"
					v-on:stopRecord="recording = false"
				>
				</router-view>
			</v-col>
		</v-row>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from '@/components/nav/Menu.vue';
import { Dictionary } from 'vue-router/types/router';

export default Vue.extend({
	name: 'App',

	components: {
		Menu
	},

	data() {
		return {
			stream: null,
			recording: false,
			constraints: {
				audio: false,
				video: {
					mandatory: {
						chromeMediaSource: 'desktop',
						chromeMediaSourceId: ''
					}
				}
			},
		}
	},

	methods: {
		async selectSource(source: string) {
			this.constraints.video.mandatory.chromeMediaSourceId = source;
			this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
		},
	},
});
</script>

<style>
</style>
