<template>
		<div class="pokemon-list">
			<div class="pokemon" v-for="i in totalPokemons" :key="i" :class="{ 'pokemon--caught': inPokedex(i) }">
					<img :src="getPokemonImage(i)" @click="goToDetailPage(i)">
			</div>
		</div>
</template>

<script>
const STORAGE_KEY = 'pokedex';

export default {
	name: 'PokemonList',

	data: () => ({
		totalPokemons: 151,
		image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
		pokedex: [],
	}),

	mounted() {
		this.getPokedex();
	},

	methods: {
		getPokedex() {
			this.pokedex = JSON.parse(localStorage.getItem(STORAGE_KEY));
		},

		inPokedex(id) {
			let i = this.pokedex.indexOf(id);

			if(i != -1) {
				return true;
			}

			return false;
		},

		getPokemonImage(pokemonId) {
			return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
		},

		goToDetailPage(pokemonId) {
			this.$router.push({
				name: 'pokemon',
				params: {
					id: pokemonId
				}
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pokemon-list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	margin: 100px auto;
	max-width: 1800px;
	width: 100%;
}

.pokemon {
	display: inline-block;
	height: 100px;
	opacity: .25;
	position: relative;
	transition-duration: .3s;
	transition-property: filter, opacity, transform;
	transition-timing-function: ease-out;
	width: 100px;
}

.pokemon--caught {
	opacity: 1;
}

.pokemon::after {
	background-image:
		radial-gradient(circle at center, white 0%, white 6%, lightgrey 6%, lightgrey 8%, black 8%, black 13%, transparent 13%, transparent),
		linear-gradient(to bottom, red 0%, red 48%, black 48%, black 52%, white 52%, white 100%);
	box-shadow: 0 0 3px rgba(0,0,0,.5);	border-radius: 50%;
	border: 5px solid black;
	content: '';
	display: block;
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	transform: scale(0);
	transition-duration: .3s;
	transition-property: transform;
	transition-timing-function: ease-out;
	width: 100%;
	z-index: -1;
}

.pokemon-list:hover .pokemon.caught {
	opacity: .5;
}

.pokemon-list:hover .pokemon:hover {
	opacity: 1;
	transform: scale(1.3);
	z-index: 100;
}

.pokemon-list:hover .pokemon:hover::after {
	transform: scale(1);
}

.pokemon:hover {
	cursor: pointer;
}
</style>
