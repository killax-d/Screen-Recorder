<template>
	<v-container class="animated fadeIn faster">
		<v-alert
			border="bottom"
			colored-border
			type="warning"
			elevation="2"
		>
			{{ $t('message') }}
		</v-alert>

		<v-container>
			<VideoSource v-bind:stream="stream" v-on:sourceChange="$emit('sourceChange', {source: $event})"></VideoSource>
			
			<div class="text-center">
				<v-btn class="ma-2" tile outlined :color="audio ? 'success' : 'error'" @click="recording ? popup = true : $emit('audioChange', !audioEnabled)">
					<v-icon left>{{ audio ? "mdi-volume-high" : "mdi-volume-off" }}</v-icon> Audio
				</v-btn>
				<v-btn class="ma-2" tile outlined color="success" @click="$emit('startRecord')" :disabled="!stream || recording">
					<v-icon left>mdi-record</v-icon> Start
				</v-btn>
				<v-btn class="ma-2" tile outlined color="error" @click="$emit('stopRecord')" :disabled="!recording">
					<v-icon left>mdi-stop</v-icon> Stop
				</v-btn>
			</div>
		</v-container>

		<v-divider></v-divider>
		<v-container>
			<video id="preview">{{ $t('no_source') }}</video>
		</v-container>

		<v-container v-if="popup">
			<TwoChoices
				v-bind:title="$t('audio')"
				v-bind:message="$t('audio_message')"
				v-bind:a="$t('cancel')"
				v-bind:b="$t('ok')"
				v-on:a="popup = false"
				v-on:b="popup = false; $emit('audioChange', !audioEnabled)"
			>
			</TwoChoices>
		</v-container>
	</v-container>
</template>

<script>
import TwoChoices from "@/components/popup/TwoChoices.vue";
import VideoSource from "@/components/home/VideoSource.vue";

export default {
	name: 'Home',

	props: {
		stream: MediaStream,
		recording: Boolean,
		audio: Boolean
	},

	data() {
		return {
			popup: false,
			audioEnabled: this.audio,
		}
	},

	watch: {
		audio: function(newValue, oldValue) {
			this.audioEnabled = newValue;
		}
	},

	components: {
		VideoSource,
		TwoChoices
	}
}
</script>

<style scoped>
video {
	width: 100%;
	height: auto;
}
</style>

<i18n>
{
  "en": {
	"message": "Application is currently in devlopment!",
	"no_source": "No source selected",
	"audio": "Audio",
	"audio_message": "Changing audio while recording gonna stop, save and re-run recording",
	"ok": "Okay",
	"cancel": "Cancel"
  },
  "fr": {
	"message": "L'application est actuellement en développement!",
	"no_source": "Aucune source définie",
	"audio": "Audio",
	"audio_message": "Changer l'audio pendant l'enregistrement va l'arrêter, le sauvegarder et redémarrer",
	"ok": "Ok",
	"cancel": "Annuler"
  }
}
</i18n>