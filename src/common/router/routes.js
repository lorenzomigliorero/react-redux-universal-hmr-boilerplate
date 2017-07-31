import Home from '@/containers/Home';
import About from '@/containers/About';
import NotFound from '@/containers/NotFound';

export default [

	{
		path: '/',
		component: Home,
		exact: true,
		fetchData: Home.fetchData
	},
	{
		path: '/about',
		component: About
	},
	{
		component: NotFound
	}

];