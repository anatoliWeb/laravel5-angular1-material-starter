
class AuthController {

    constructor($scope, $routeParams, AuthService) {
        this.$scope = $scope;
        this.$routeParams = $routeParams;
        this.AuthService = AuthService;
        console.log('init AuthController');
        console.log($routeParams)

        this.$scope.form = {};

        if(typeof $routeParams.action != 'undefined'){
            switch($routeParams.action){
                case 'logout':
                    this.AuthService.logOut();
                    break;
            }
        }

    }


    login(){
        if (this.$scope.loginForm.$invalid) return false;

        this.AuthService.login(this.$scope.form.email, this.$scope.form.password, this.$scope.form.remember)
            .then(success => {
                alert('succsess autorisation');
                console.log(success);
            })
            .catch(error => {
                console.log(error);
            })

        console.log(this.$scope.form);
        console.log('click login');


    }

}

AuthController.$inject = ['$scope', '$routeParams', 'AuthService'];

export {AuthController}
