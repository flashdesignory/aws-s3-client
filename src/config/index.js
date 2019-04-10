import * as dev from './dev';
import * as build from './build';

export default process.env.NODE_ENV === 'development' ? dev : build;
