<template>
    <div class="pokemon-detail">
        <div v-if="!loading">
            <div class="go-back" @click="goBack()">🔙</div>

            <h1>{{pokemon.name}}</h1>
            <img class="pokemon__sprite" :src="pokemon.sprites.front_default" :alt="pokemon.name">

            <ul class="pokemon__stats">
                <li v-for="stat in pokemon.stats" :key="stat.stat.name"><strong>{{stat.stat.name}}</strong> {{stat.base_stat}}</li>
            </ul>

            <a @click="addToPokedex()" class="pokemon__add" v-if="!isInPokedex">
                <i class="material-icons">add</i>
                Add to pokedex
            </a>

            <a @click="removeFromPokedex()" class="pokemon__add" v-if="isInPokedex">
                <i class="material-icons">clear</i>
                Remove from pokedex
            </a>
        </div>

        <div v-if="loading" class="loading">
        </div>
</div>
</template>

<script>
const Pokedex = require('pokeapi-js-wrapper');
const STORAGE_KEY = 'pokedex';

export default {
    name: 'Detail',

    data: () => ({
        pokemon: undefined,
        loading: true,
        isInPokedex: false,
    }),

    mounted () {
        this.fetchData();
        this.isInPokedex = this.checkPokedex();
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
        },

        addToPokedex() {
            let pokedex = JSON.parse(localStorage.getItem(STORAGE_KEY));

            if (!pokedex) pokedex = [];

            pokedex.push(parseInt(this.$route.params.id));

            localStorage.setItem(STORAGE_KEY, JSON.stringify(pokedex));

            new Notification(`New pokemon added to pokedex`, {
                body: this.pokemon.name,
                icon: this.pokemon.sprites.front_default,
                requireInteraction: false
            });

            this.isInPokedex = true;
        },

        removeFromPokedex() {
            let pokedex = JSON.parse(localStorage.getItem(STORAGE_KEY));

            if (!pokedex) pokedex = [];

            let i = pokedex.indexOf(parseInt(this.$route.params.id));

            if(i != -1) {
                pokedex.splice(i, 1);
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(pokedex));

            new Notification(`Pokemon removed from pokedex`, {
                body: this.pokemon.name,
                icon: this.pokemon.sprites.front_default,
                requireInteraction: false
            });

            this.isInPokedex = false;
        },

        checkPokedex() {
            const pokedex = JSON.parse(localStorage.getItem(STORAGE_KEY));

            if (pokedex) {
                const pkmn = pokedex.find((p) => {
                    return parseInt(p) === parseInt(this.$route.params.id);
                });

                if (pkmn) return true;
            }

            return false;
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
    line-height: 2;
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
    z-index: 20;
}

.pokemon__add {
    align-items: center;
    border: 1px solid black;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 5px 10px;
}

.pokemon__add:hover {
    background-color: black;
    color: white;
}

.pokemon__add i {
    margin-right: 10px;
}

.app--electron .go-back {
    top: 35px;
}

.loading {
    animation-duration: 2s;
    animation-name: ball;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
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
    height: 200px;
    margin: 20px auto;
    width: 200px;
}

@keyframes ball {
    from {
        transform: scale(.7) rotate(0deg);
    }
    to {
        transform: scale(1) rotate(720deg);
    }
}
</style>
