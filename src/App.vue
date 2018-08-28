<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>

		<!-- <div class="offline">
			<span><strong>Oh snap!</strong> You seem to be offline. Reconnect to enjoy more awesomeness</span>
		</div> -->
  </div>

</template>

<script>
export default {

	methods: {
		goToDetailPage(event, args) {
			this.$router.push({
				name: 'pokemon',
				params: {
					id: args
				}
			});
		},
	}
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P|Material+Icons');

html,
body {
		background-color: white;
		margin: 0;
		padding: 0;
		height: 100%;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

#app {
	font-family: 'Press Start 2P', cursive;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	box-sizing: border-box;
	text-align: center;
	color: #2c3e50;
	height: 100%;
}

/* .app--offline .offline {
	transform: translateY(0);
}

.offline {
	background-color: red;
	color: white;
	font-size: 14px;
	left: 0;
	padding: 20px;
	position: fixed;
	right: 0;
	top: 0;
	transition-property: transform;
	transition-duration: .3s;
	transition-timing-function: linear;
	transform: translateY(-100%);
} */
</style>
