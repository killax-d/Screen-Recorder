<template>
	<v-container class="animated fadeIn faster">
		<v-combobox v-model="$i18n.locale" :items="langs.availables" :label="$t('langage')" outlined dense></v-combobox>
	</v-container>
</template>

<script>
export default {
	name: 'Settings',

	data: () => ({
		langs: {
			availables: ["fr", "en"]
		}
	}),
}
</script>
