import Vue from 'vue'
import App from './App.vue'
import "./assets/css/app.scss"

Vue.config.productionTip = false

import BaseComponents from './components/index';

BaseComponents.forEach((component) => {
  // Globally register the component
  Vue.component(component.name, component)
})

new Vue({
  render: h => h(App),
}).$mount('#app')
