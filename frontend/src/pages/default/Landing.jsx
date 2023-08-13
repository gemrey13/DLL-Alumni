import React from 'react';
import Nav from './Nav';
import { Hero, NewsUpdate, FAQ } from '../../index';

const Landing = () => {
	return (
		<>
			<Nav />
			<Hero />
			<NewsUpdate />
			<FAQ />
		</>
	)
};

export default Landing;