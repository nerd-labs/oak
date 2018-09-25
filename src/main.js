/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase";
import { firebaseConfig } from '../public/firebase.config.js';

firebase.initializeApp(firebaseConfig);

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
		.register('sw.js')
		.then(reg => {
			console.log('Service worker has been registered');
            return Notification.requestPermission();
		});
}
