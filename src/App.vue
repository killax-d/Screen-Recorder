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

import ThreeChoices from '@/components/popup/ThreeChoices.vue';

import { writeFileSync } from 'fs';

interface RecordSettings {
	source: string;
}

// eslint-disable-next-line
declare const MediaRecorder: any;

export default Vue.extend({
	name: 'App',

	components: {
		Menu,
		ThreeChoices
	},

	data() {
		return {
			appPath: (require('os').homedir() + "\\ScreenRecorder"),
			libPath: "\\Records\\",
			alert: false,
			stream: new MediaStream(),
			mediaRecorder: new MediaRecorder(new MediaStream, {}),
			// eslint-disable-next-line
			dataChunks: [] as any,
			currentSource: {source: ""},
			nextSource: {},
			recording: false,
			force: false,
			constraints: {
				audio: false as boolean | {},
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

			let constraints = {audio: false as boolean | {}, video: true as boolean | {}}
			if (args.source) {
				this.constraints.video.mandatory.chromeMediaSourceId = args.source;
				constraints = this.constraints;
				
				// Temporary fix issue with audio
				constraints.audio = false; 
			} else {
				constraints = {
					audio: this.constraints.audio,
					video: true
				}
			}
			
			this.currentSource = args;
			this.stream = await navigator.mediaDevices.getUserMedia(constraints);
			this.force = false;
		
			if (this.recording) {
				await this.stopRecording();
				this.startRecording();
			}
		},
		async updateAudio(value: boolean) {
			this.constraints.audio = value;
			this.force = true;
			await this.selectSource(this.currentSource);
		},
		startRecording() {
			if (this.stream.active) {
				const options = { mimeType: 'video/webm; codecs=vp9' };
				this.mediaRecorder = new MediaRecorder(this.stream, options);

				this.mediaRecorder.ondataavailable = this.handleDataRecord;
				this.mediaRecorder.onstop = this.handleStopRecording;

				this.mediaRecorder.start();
				this.recording = true;
			}
		},
		// eslint-disable-next-line
		handleDataRecord(event: Record<string, any>) {
			this.dataChunks.push(event.data);
		},
		async stopRecording() {
			await this.mediaRecorder.stop();
			this.recording = false;
		},
		// eslint-disable-next-line
		async handleStopRecording(event: Record<string, any>) {
			event;
			const blob = new Blob(this.dataChunks, {
				type: 'video/webm; codecs=vp9'
			});

			const buffer = Buffer.from(await blob.arrayBuffer());
			
			const filePath = this.appPath + this.libPath + `vid-${Date.now()}.webm`

			if (filePath) {
				writeFileSync(filePath, buffer);
			}
			this.dataChunks = [];
		},
	}
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
