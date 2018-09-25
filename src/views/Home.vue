<template>
		<div class="pokemon-list">
			<div class="pokemon" v-for="i in totalPokemons" :key="i" :class="{ 'pokemon--caught': inPokedex(i) }">
					<img :src="getPokemonImage(i)" @click="goToDetailPage(i)" :alt="`pokemon ${i}`">
			</div>
		</div>
</template>

<script>
import firebase from 'firebase';

export default {
	name: 'PokemonList',

	data: () => ({
		totalPokemons: 151,
		pokedex: [],
        db: undefined,
	}),

	beforeMount() {
		this.getPokedex();
	},

	methods: {
		getPokedex() {
            var pokedex = firebase.database().ref(`pokedex`);

            pokedex.on('value', (snapshot) => {
                this.pokedex = Object.keys(snapshot.val());
                if (!this.pokedex) this.pokedex = [];
            });
		},

		inPokedex(id) {
			let i = this.pokedex.indexOf(id.toString());

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
        radial-gradient(
            circle at center,
            white 0%,
            white 5%,
            lightgrey 5%,
            lightgrey 6%,
            white 6%,
            white 8%,
            transparent 8%,
            transparent
        ),
        radial-gradient(
            circle at 50% 51%,
            rgba(0,0,0,.3) 0%,
            rgba(0,0,0,.3) 8%,
            transparent 12%,
            transparent
        ),
        radial-gradient(
            circle at center,
            lightgrey 0%,
            lightgrey 12%,
            #444 12%,
            #444 16%,
            rgba(68,68,68,.3) 16%,
            rgba(68,68,68,.3) 17%,
            transparent 14%,
            transparent
        ),
        linear-gradient(
            to bottom,
            transparent 0%,
            transparent 47%,
            rgba(68,68,68,.3) 47%,
            rgba(68,68,68,.3) 48%,
            #444 48%,
            #444 52%,
            rgba(68,68,68,.3) 52%,
            rgba(68,68,68,.3) 53%,
            transparent 53%,
            transparent 100%
        ),
        radial-gradient(
            circle at center,
            rgba(255,255,255,.3) 0%,
            transparent 50%,
            rgba(0,0,0,.3) 100%
        ),
        linear-gradient(
            to bottom,
            #eb3b2f 0%,
            #eb3b2f 50%,
            white 50%,
            white 100%
        );
    border-radius: 50%;
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
