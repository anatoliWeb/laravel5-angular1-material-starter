let Run = ['$routeParams', '$rootScope', '$location', 'projectStatus','$window', 'AuthService',

    function ($routeParams, $rootScope, $location, projectStatus, $window, AuthService){

        console.log('fack fack fack !!!');

        AuthService.init();

        if (AuthService.isLogged()){
            console.log('Logged In');
            $rootScope.loggout = {
                '_show':true,
                '_href':projectStatus.current + '/auth/logout'
            };

        }else{
            console.log('Logged Out');
            $rootScope.loggout = {
                '_show': false,
                '_href':''
            };
        }

    }
];


export {Run};