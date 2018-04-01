
let routes = {
    '/': name => ({
            'templateUrl': 'index.html',
            'controller': 'IndexController',
            'controllerAs': 'vm'
    }
    ),
    '/name/:names': name => ({
        'templateUrl': name + '/index.html',
        'controller': 'IndexController',
        'controllerAs': 'vm'
    }),

    '/login': name => ({
        'templateUrl': 'login.html',
        'controller': 'AuthController',
        'controllerAs': 'vm'
    }),
    '/auth/:action': name => ({
        'templateUrl': 'index.html',
        'controller': 'AuthController',
        'controllerAs': 'vm'
    }),

};

export {routes}