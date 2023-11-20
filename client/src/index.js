import { render } from 'react-dom';
import App from './App';
import { setupIonicReact } from '@ionic/react';

setupIonicReact(); // set up Ionic React components

render(<App />, document.getElementById('root'));
