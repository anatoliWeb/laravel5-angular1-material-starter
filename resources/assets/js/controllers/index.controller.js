
class IndexController {
    constructor($scope, $routeParams) {
        this.$scope = $scope;
        console.log('init IndexController');
        console.log($routeParams    )
    }

    loggout(){
        console.log('fack');
    }

}

IndexController.$inject = ['$scope', '$routeParams'];

export {IndexController}
