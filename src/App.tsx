import { tsx, create } from '@dojo/framework/core/vdom';

import Geolocate from './widgets/Geolocate';

import * as css from './App.m.css';

const factory = create();

export default factory(function App() {
	return (
		<div classes={[css.root]}>
			<Geolocate />
		</div>
	);
});
