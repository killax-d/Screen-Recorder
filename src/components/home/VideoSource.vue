<template>
	<div class="text-center">
		<v-bottom-sheet v-model="sheet">
			<template v-slot:activator="{ on }">
				<v-btn color="purple" dark v-on="on" @click="sources()">
					{{ $t('video_source') }}
				</v-btn>
			</template>
			<v-list>
				<v-subheader>{{ $t('video_source') }}</v-subheader>
				<v-list-item
				v-for="screen in videosSources.screens"
				:key="screen.name"
				@click="sheet = false; selectSource(screen.id)"
				>
					<v-icon x-large>mdi-monitor</v-icon>
					<v-list-item-title>{{ screen.name }}</v-list-item-title>
				</v-list-item>

				<v-list-item @click="sheet = false; dialog = true">
					<v-icon x-large>apps</v-icon>
					<v-list-item-title>{{ $t('video_source_apps') }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-bottom-sheet>

		<v-row justify="center">
			<v-dialog v-model="dialog" max-width="600px">
				<v-card>
					<v-card-title>
						<span class="headline">{{ $t('video_source_apps') }}</span>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="dialog = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-item-group>
								<v-row>
									<v-col v-for="(app, i) in videosSources.apps" :key="i" cols="12" md="6">
										<v-item>
											<v-card 
												@click="dialog = false; selectSource(app.id)"
												style="cursor: pointer"
											>
												<v-img
													:src="app.image"
													height="150"
													class="text-right pa-2"
												>
												</v-img>
												<v-card-subtitle class="pb-0">{{ app.name }}</v-card-subtitle>
											</v-card>
										</v-item>
									</v-col>
								</v-row>
							</v-item-group>
						</v-container>
					</v-card-text>
				</v-card>
			</v-dialog>
		</v-row>

	</div>
</template>

<script>
import { desktopCapturer, remote } from 'electron';

import { writeFile } from 'fs';

export default {
	name: "VideoSource",

	data: () => ({
		sheet: false,
		dialog: false,
		videosSources: {
			screens: [],
			apps: []
		},
		constraints: {
			audio: false,
			video: {
				mandatory: {
					chromeMediaSource: 'desktop',
					chromeMediaSourceId: undefined
				}
			}
		},
	}),

	methods: {
		async sources() {
			this.videosSources.screens = [{id: -1, name: "Loading..."}]
			this.videosSources.apps = [{id: -1, name: "Loading..."}]

			const inputScreens = await desktopCapturer.getSources({
				types: ['screen']
			});
			const inputWindows = await desktopCapturer.getSources({
				types: ['window']
			});
			
			this.videosSources.screens = []
			this.videosSources.apps = []

			inputScreens.forEach(source => {
				this.videosSources.screens.push({id: source.id, name: source.name})
			});
			inputWindows.forEach(source => {
				if (!source.name.startsWith("C:\\")) {
					this.videosSources.apps.push({id: source.id, image: source.thumbnail.toDataURL().toString(), name: source.name})
				}
			});
		},
		async selectSource(source) {
			this.constraints.video.mandatory.chromeMediaSourceId = source;

			const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
			const video = document.getElementById("preview");
			video.srcObject = stream;
			video.play();
		},
	}
}
</script>

<style scoped>
.app-enter-active,
.app-leave-active {
  transition: all 0.25s;
}
.app-enter,
.app-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

<i18n>
{
	"en": {
		"video_source": "Select source",
		"video_source_apps": "Choose an app"
	},
	"fr": {
		"video_source": "Selectionner une source",
		"video_source_apps": "Choisir une application"
	}
}
</i18n>
