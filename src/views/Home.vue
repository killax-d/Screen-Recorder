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
			<VideoSource v-bind:stream="stream" v-on:sourceChange="$emit('sourceChange', $event)"></VideoSource>
			
			<div class="text-center">
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
	</v-container>
</template>

<script>
import VideoSource from "@/components/home/VideoSource.vue";

export default {
	name: 'Home',

	props: {
		stream: MediaStream,
		recording: Boolean
	},

	components: {
		VideoSource
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
	"no_source": "No source selected"
  },
  "fr": {
	"message": "L'application est actuellement en développement!",
	"no_source": "Aucune source définie"
  }
}
</i18n>