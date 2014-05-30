var app = angular.module("app", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
    when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    }).
    when('/classrooms', {
        templateUrl: 'partials/classrooms.html',
        controller: 'ClassroomController'
    }).
    when('/students/:classroom', {
        templateUrl: 'partials/studentsClassrooms.html',
        controller: 'StudentController'
    }).
    when('/students', {
        templateUrl: 'partials/students.html',
        controller: 'StudentController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);

app.factory("studentRepository", function ($http) {
  var factory = {};

  factory.getStudents = function () {
     return $http.get("http://localhost/students.json");
  }

  return factory;
});

app.controller("HomeController", function () {
});

app.controller("ClassroomController", function ($scope) {
  $scope.classrooms = [513, 602, 722];
});

app.controller("StudentController", function ($scope, $routeParams, studentRepository) {
  studentRepository.getStudents().then(function (result) {
    $scope.students = result.data;
  });

  $scope.displayStudentInfo = function(student) {
    alert(student.name);
  }

  if ($routeParams.classroom) $scope.classroom = $routeParams.classroom;
});
