
class AuthService {
    constructor(ngJwtAuthService, $http, $routeParams, $location, appConfig){
        this.ngJwtAuthService = ngJwtAuthService;
        this.$http = $http;
        this.$routeParams = $routeParams;
        this.$location = $location;
        this.appConfig = appConfig;
        this.user = {};

        this.baseUrl = "/api";
    }

    /**
     * init autn service
     */
    init() {
        try {
            this.ngJwtAuthService.init()
                .then((res) => {
                    if(res){
                        angular.extend(this.user, this.ngJwtAuthService.user);
                    }
                });
        } catch (exception) {
            console.warn(exception);
        }
    }

    /**
     * set token
     *
     * @param token
     */
    setToken(token) {
        let parsed = this.ngJwtAuthService.readToken(token);
        try {
            this.ngJwtAuthService.processNewToken(token)
                .then(user => {
                    this.user = user;
                });
        } catch (e) {
            if (e.toString().indexOf('setItem') != -1) {
                this.StorageFactory.setItem('NgJwtAuthToken', token);
                this.user = parsed.data.user;
                this.ngJwtAuthService.setJWTHeader(token);
                this.ngJwtAuthService.loggedIn = true;
            }
        }
    }

    /**
     * user data
     *
     * @returns {*}
     */
    getUser() {
        return this.user;
    }

    /**
     * update data user
     *
     * @param user
     */
    setUser(user) {
        this.ngJwtAuthService.user = user;
    }

    /**
     * check is logged
     *
     * @returns {boolean}
     */
    isLogged() {
        return this.ngJwtAuthService.loggedIn;
    }

    /**
     * login user
     *
     * @param username
     * @param password
     * @param remember
     * @returns {*}
     */
    login(username, password, remember = false) {

        let promise = this.$http({
            method: 'POST',
            url: this.baseUrl + '/login',
            data: {
                remember: remember
            },
            headers: {
                Authorization: 'Basic ' + btoa(username + ':' + password)
            },
            responseType: 'json'
        });

        promise.then(success => {
            // this.Support.log('Error: ' + JSON.stringify(success));
            this.setToken(success.data.token);
        }).catch(error => {
                console.log(error);
        });

        return promise;
    }

    logOut() {
        this.ngJwtAuthService.logout();
        this.$location.path('/');
    }
}

AuthService.$inject = ['ngJwtAuthService', '$http', '$routeParams', '$location'];

export {AuthService}
