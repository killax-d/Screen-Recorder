<template>
	<v-row justify="center">
		<v-dialog
		value="true"
		max-width="290"
		>
			<v-card>
				<v-card-title class="headline">{{ $t('close') }}</v-card-title>

				<v-card-text>
				{{ $t('close_confirm') }}
				</v-card-text>

				<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
					color="red darken-1"
					text
					@click="$emit('no')"
				>
					{{ $t('no') }}
				</v-btn>

				<v-btn
					color="green darken-1"
					text
					@click="exit()"
				>
					{{ $t('yes') }}
				</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	name: "closeApp",
		
	methods: {
		exit: () => {
			const remote = require('electron').remote;
			const win = remote.getCurrentWindow();
			win.close();
		}
	},
}
</script>

<i18n>
	{
		"en": {
			"close": "Close application",
			"close_confirm": "Do you really want to close this app ?",
			"no": "No",
			"yes": "Yes"
		},
		"fr": {
			"close": "Fermer l'application",
			"close_confirm": "Voulez vous vraiment quitter l'application ?",
			"no": "Non",
			"yes": "Oui"
		}
	}
</i18n>