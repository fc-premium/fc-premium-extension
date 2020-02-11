import Vue from 'vue'
import VueRouter from 'vue-router'

import Core from '../components/layouts/core.vue'
import Modules from '../components/layouts/modules.vue'
import ModuleDisplay from '../components/layouts/module-display.vue'
import Themes from '../components/layouts/themes.vue'
import Install from '../components/layouts/install.vue'

import NotFound from '../components/layouts/not-found.vue'


Vue.use(VueRouter)

const routes = [
	{ path: '/', redirect: '/core' },
	{ path: '/core', component: Core },
	{ path: '/modules', component: Modules },
	{ path: '/module/:moduleName', component: ModuleDisplay },
	{ path: '/themes', component: Themes },
	{ path: '/install', component: Install },
	{ path: '/notfound', component: NotFound },
	{ path: '/*', redirect: '/' }

]

const router = new VueRouter({
	routes
})

export default router
