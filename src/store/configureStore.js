import devConfigureStore from './configureStore.dev.js';
import prodConfigureStore from './configureStore.prod.js';
import { ENVIRONMENT } from '../helpers/constants';

export default ENVIRONMENT.PRODUCTION ? prodConfigureStore : devConfigureStore;
