import 'angular-route';
import 'angular-cookies';
import 'angular-resource';
import 'angular-ui-mask';
import 'angular-utf8-base64';
import 'angular-jwt-auth';
import 'angular-ui-bootstrap';

module.exports = {
    init: function (platform) {
        window._ = require('lodash');
        window.moment = require('moment');

        /**
         //  * We'll load jQuery and the Bootstrap jQuery plugin which provides support
         //  * for JavaScript based Bootstrap features such as modals and tabs. This
         //  * code may be modified to fit the specific needs of your application.
         //  */
        try {
            window.$ = window.jQuery = require('jquery');
            require('bootstrap-sass');

            this.setModules(platform);
            this.setServices(platform);
            this.setFactories(platform);
            this.setFilters(platform);
            this.setDirectives(platform);
            this.setControllers(platform);
            this.setRoutes(platform);
            this.setConstants(platform);
            this.setAuth(platform);
            this.setRun(platform);

        } catch (e) {
            console.log(e);
        }

    },

    /**
     * load all modules
     */
    setModules: platform => {
        angular.module('platform', platform.modules);
    },

    /**
     * Services
     */
    setServices: platform => {
        _.each(platform.services, (value, key) => {
            angular.module('platform').service(key, value);
        });
    },

    /**
     * Factories
     */
    setFactories: platform => {
        _.each(platform.factories, (value, key) => {
            angular.module('platform').factory(key, value.getInstance);
        });
    },

    /**
     * Filters
     */
    setFilters: platform => {
        _.each(platform.filters, (value, key) => {
            angular.module('platform').filter(key, () => value.getInstance);
        });
    },

    /**
     * Directives
     */
    setDirectives: platform => {
        _.each(platform.directives, (value, key) => {
            angular.module('platform').directive(key, () => new value());
        });
    },
    /**
     * Controllers
     */
    setControllers: platform => {
        _.each(platform.controllers, (value, key) => {
            angular.module('platform').controller(key, value);
        });
    },

    /**
     * Constants
     */
    setConstants: platform => {
        _.each(platform.constants, (value, key) => {
            angular.module('platform').constant(key, value);
        });
    },

    /**
     * Routes
     */
    setRoutes: platform => {
        angular.module('platform').config(($routeProvider, $locationProvider, projectStatus) => {

            _.each(platform.routes, (value, key) => {
                $routeProvider.when(key, value(projectStatus.current))
            });

            $routeProvider.otherwise(platform.routeOtherwise);
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        });
    },

    setAuth: platform => {
        angular.module('platform')
            .config(['ngJwtAuthServiceProvider', 'appConfig', (ngJwtAuthServiceProvider, appConfig) => {
                ngJwtAuthServiceProvider.configure({
                    tokenLocation: 'token',
                    apiEndpoints: {
                        base: appConfig.server.api,
                        login: '/login',
                        tokenExchange: '/token',
                        refresh: '/refresh'
                    },
                    tokenUser: 'user'
                })
            }])
            .config(['$compileProvider', function( $compileProvider ){
                    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|scheme|wonecall):/);
                }
            ])
    },

    /**
     * run
     */
    setRun: platform => {
        angular.module('platform').run(platform.run);
    }
};
