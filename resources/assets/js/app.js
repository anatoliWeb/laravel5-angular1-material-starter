import 'angular';

import {controllers} from './core/controllers';
import {services} from './core/services';
import {factories} from './core/factories';
import {filters} from './core/filters';
import {directives} from './core/directives';
import {constants} from './core/constants';
import {routes} from './core/routes';
import {Run} from './index.run';

let platform = {
    'modules': [
        'ngRoute',
        'ngCookies',
        'ngJwtAuth',
        'templates',
        'appTemplates',
        'ui.bootstrap',
    ],
    'controllers': controllers,
    'services': services,
    'factories': factories,
    'filters': filters,
    'directives': directives,
    'constants': constants,
    'routes': routes,
    'routeOtherwise': {
        'redirectTo': '/'
    },
    'run': Run
}

// index run

console.log('app downloaded');
var app = require('./bootstrap');

app.init(platform);
