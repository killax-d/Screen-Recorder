import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue';
import Settings from '../views/Settings.vue';
import Library from '../views/Library.vue';

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
	{
		path: '/home',
		name: 'Home',
		component: Home
	},
	{
		path: '/library',
		name: 'Library',
		component: Library
	},
	{
		path: '/about',
		name: 'About',
		component: About
	},
	{
		path: '/settings',
		name: 'Settings',
		component: Settings
	},
	{
		path: '**',
		redirect: '/home'
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
