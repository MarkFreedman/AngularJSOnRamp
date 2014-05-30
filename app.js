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

app.controller("HomeController", function () {
});

app.controller("ClassroomController", function ($scope) {
  $scope.classrooms = [513, 602, 722];
});

app.controller("StudentController", function ($scope, $routeParams) {
  $scope.students = [
    {
      name: "John Doh",
      classroom: 602,
      grade: 93
    },
    {
      name: "Steve Smith",
      classroom: 513,
      grade: 72
    },
    {
      name: "Jane Doe",
      classroom: 722,
      grade: 87
    },
    {
      name: "Bobby Joe",
      classroom: 722,
      grade: 65
    },
    {
      name: "Sue Jackson",
      classroom: 602,
      grade: 90
    },
    {
      name: "Partha Biswas",
      classroom: 602,
      grade: 88
    },
    {
      name: "Steven Wright",
      classroom: 722,
      grade: 77
    },
    {
      name: "Gavin Saturday",
      classroom: 513,
      grade: 55
    },
    {
      name: "Paul Hewson",
      classroom: 602,
      grade: 95
    },
    {
      name: "Hayley Mary",
      classroom: 513,
      grade: 99
    }
  ];


  $scope.displayStudentInfo = function(student) {
    alert(student.name);
  }

  if ($routeParams.classroom) $scope.classroom = $routeParams.classroom;
});
