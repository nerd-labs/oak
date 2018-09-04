/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

if (navigator.serviceWorker.controller) {
	console.log('[PWA Builder] active service worker found, no need to register')
} else {
	//Register the ServiceWorker
	navigator.serviceWorker
		.register('sw.js', {
    	scope: './'
  	})
		.then(reg => {
			console.log('Service worker has been registered');
		});
}
