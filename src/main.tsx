import renderer, { tsx } from '@dojo/framework/core/vdom';
import '@dojo/themes/dojo/index.css';

import App from './App';

const r = renderer(() => <App />);
r.mount();
