<template>
	<div class="pokemon-detail">
		<div v-if="!loading">
			<div class="go-back" @click="goBack()">🔙</div>

			<h1>{{pokemon.name}}</h1>
			<img class="pokemon__sprite" :src="pokemon.sprites.front_default" :alt="pokemon.name">

			<ul class="pokemon__stats">
				<li v-for="stat in pokemon.stats"><strong>{{stat.stat.name}}</strong> {{stat.base_stat}}</li>
			</ul>
		</div>

		<div v-if="loading" class="loading">
		</div>
</div>
</template>

<script>
const Pokedex = require('pokeapi-js-wrapper');

export default {
	name: 'Detail',

	data: () => ({
			pokemon: undefined,
			loading: true,
	}),

	mounted () {
	   this.fetchData();
  },

	methods: {
		fetchData: function () {
			const options = {
				protocol: 'https',
				versionPath: '/api/v2/',
				cache: true
				// timeout: 5 * 1000 // 5s
			};

			const P = new Pokedex.Pokedex(options);

			P
			.resource(`api/v2/pokemon/${this.$route.params.id}`)
			.then((response) => {
				console.log('response', response);
				this.pokemon = response;
				setTimeout(() => {
					this.loading = false;
				}, 1000);
			});
		},

		goBack() {
			this.$router.push({
				name: 'home'
			});
		}
	}

}
</script>

<style scoped>

.pokemon-detail {
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: center;
}

.pokemon__stats {
	padding: 0;
	list-style: none;
}

.pokemon__sprite {
	min-width: 300px;
}

.go-back {
		cursor: pointer;
		font-size: 30px;
		left: 20px;
		position: absolute;
		top: 20px;
}

.loading {
	animation-duration: 1s;
	animation-name: rotateBall;
	animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
	background-image:
		radial-gradient(circle at center, white 0%, white 6%, lightgrey 6%, lightgrey 8%, black 8%, black 13%, transparent 13%, transparent),
		linear-gradient(to bottom, red 0%, red 48%, black 48%, black 52%, white 52%, white 100%);
	box-shadow: 0 0 3px rgba(0,0,0,.5);
  border-radius: 50%;
	border: 10px solid black;
  content: '';
  display: block;
  height: 300px;
	margin: 20px auto;
  width: 300px;
}

@keyframes rotateBall {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
