<template>
	<div class="text-center">
		<v-bottom-sheet v-model="sheet" inset>
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
				@click="sheet = false; $emit('sourceChange', screen.id)"
				>
					<v-icon x-large>mdi-monitor</v-icon>
					<v-list-item-title>{{ screen.name }}</v-list-item-title>
				</v-list-item>

				<v-list-item @click="sheet = false; dialog = true">
					<v-icon x-large>apps</v-icon>
					<v-list-item-title>{{ $t('video_source_apps') }}</v-list-item-title>
				</v-list-item>

				<v-list-item @click="sheet = false; $emit('sourceChange', undefined)">
					<v-icon x-large>camera</v-icon>
					<v-list-item-title>{{ $t('camera') }}</v-list-item-title>
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
												@click="dialog = false; $emit('sourceChange', app.id);"
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

	props: {
		stream: MediaStream
	},

	data: () => ({
		video: HTMLVideoElement,
		sheet: false,
		dialog: false,
		videosSources: {
			screens: [],
			apps: []
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

		playStream(stream) {
			this.video.srcObject = stream;
			this.video.play();
		}
	},

	mounted() {
		this.video = document.getElementById("preview");
		if (this.stream) {
			this.playStream(this.stream);
		}
	},

	watch: { 
		stream: function(oldStream, newStream) {
			if (this.video) {
				if (this.video.srcObject) {
					this.video.pause();
				}
				if (oldStream) {
					this.playStream(oldStream);
				}
			}
		}
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
		"video_source_apps": "Choose an app",
		"camera": "Camera"
	},
	"fr": {
		"video_source": "Selectionner une source",
		"video_source_apps": "Choisir une application",
		"camera": "Caméra"
	}
}
</i18n>
