/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//solution for three finger screenshot
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
