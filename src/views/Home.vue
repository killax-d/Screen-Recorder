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
			<video id="preview">{{ $t('no_source') }}</video>
		</v-container>
		<v-divider></v-divider>
		<v-container>
			<VideoSource></VideoSource>
		</v-container>
	</v-container>
</template>

<script>
import VideoSource from "@/components/home/VideoSource.vue";

export default {
	name: 'Home',

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