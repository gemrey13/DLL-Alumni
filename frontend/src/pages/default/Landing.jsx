import React from 'react';
import Nav from './Nav';
import { Hero, NewsUpdate, FAQ, Footer } from '../../index';

const Landing = () => {
	return (
		<>
			<Nav />
			<Hero />
			<NewsUpdate />
			<FAQ />
			<Footer />
		</>
	)
};

export default Landing;