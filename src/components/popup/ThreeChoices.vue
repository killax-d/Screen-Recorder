<template>
	<v-row justify="center">
		<v-dialog
		value="true"
		max-width="290"
		>
			<v-card>
				<v-card-title class="headline">{{ title }}</v-card-title>

				<v-card-text>
				{{ message }}
				</v-card-text>

				<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
					color="red darken-1"
					text
					@click="$emit('a')"
				>
					{{ a }}
				</v-btn>

				<v-btn
					color="blue darken-1"
					text
					@click="$emit('b')"
				>
					{{ b }}
				</v-btn>

				<v-btn
					color="green darken-1"
					text
					@click="$emit('c')"
				>
					{{ c }}
				</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
    name: "ThreeChoices",
        
    props: {
        title: String,
        message : String,
        a : String,
        b : String,
        c : String
    }
}
</script>