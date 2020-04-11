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
					v-on:audioChange="updateAudio($event)"
					v-on:startRecord="startRecording()"
					v-on:stopRecord="stopRecording()"
				>
				</router-view>
			</v-col>
		</v-row>

		<v-container v-if="alert">
			<ThreeChoices
				v-bind:title="$t('recording')"
				v-bind:message="$t('recording_message')"
				v-bind:a="$t('stop')"
				v-bind:b="$t('continue')"
				v-bind:c="$t('cancel')"
				v-on:a="stopRecording(); alert=false"
				v-on:b="force = true; alert = false; selectSource(nextSource)"
				v-on:c="alert = false"
			>
			</ThreeChoices>
		</v-container>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from '@/components/nav/Menu.vue';
import { Dictionary } from 'vue-router/types/router';

import ThreeChoices from '@/components/popup/ThreeChoices.vue';

interface RecordSettings {
	source: string;
}

export default Vue.extend({
	name: 'App',

	components: {
		Menu,
		ThreeChoices
	},

	data() {
		return {
			alert: false,
			stream: new MediaStream(),
			currentSource: {},
			nextSource: {},
			recording: false,
			force: false,
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
			this.nextSource = args;
			if (this.recording && !this.force) {
				this.alert = true;
				return;
			}

			let constraints = {}
			if (args.source) {
				this.constraints.video.mandatory.chromeMediaSourceId = args.source;
				constraints = this.constraints;
			} else {
				constraints = {
					video: true
				}
			}
			
			this.currentSource = args;
			this.stream = await navigator.mediaDevices.getUserMedia(constraints);
			this.force = false;
		},
		updateAudio(value: boolean) {
			this.constraints.audio = value;
			this.force = true;
			this.selectSource(<RecordSettings> this.currentSource);
		},
		startRecording() {
			this.recording = true;
		},
		stopRecording() {
			this.recording = false;
		}
	},
});
</script>

<style>
</style>

<i18n>
	{
		"en": {
			"recording": "Recording",
			"recording_message": "You are currently recording, do you want to stop ?",
			"cancel": "Cancel",
			"continue": "Continue",
			"stop": "Stop"
		},
		"fr": {
			"recording": "Enregistrement",
			"recording_message": "Vous êtes actuellement en train d'enregistrer, Voulez vous arrêter ?",
			"cancel": "Annuler",
			"continue": "Continuer",
			"stop": "Stop"
		}
	}
</i18n>
