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
					v-bind:audio="constraints.audio"
					v-on:sourceChange="selectSource($event)"
					v-on:audioChange="constraints.audio = $event"
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

interface RecordSettings {
	source: string;
}

export default Vue.extend({
	name: 'App',

	components: {
		Menu
	},

	data() {
		return {
			stream: new MediaStream(),
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
		async selectSource(args: RecordSettings) {
			let constraints = {}
			if (args.source) {
				this.constraints.video.mandatory.chromeMediaSourceId = args.source;
				constraints = this.constraints;
			} else {
				constraints = {
					video: true
				}
			}
			
			this.stream = await navigator.mediaDevices.getUserMedia(constraints);
		},
	},
});
</script>

<style>
</style>
