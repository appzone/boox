boox.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.

   
      when('/admin', {
        templateUrl: 'admin.html',
        controller: 'AdminController'
      }).
          when('/user', {
        templateUrl: 'user.html',
        controller: 'UserController'
      })
 


}]);
 
 