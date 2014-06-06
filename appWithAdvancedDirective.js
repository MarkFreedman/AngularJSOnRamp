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
        templateUrl: 'partials/studentsWithAdvancedDirective.html',
        controller: 'StudentController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);

app.factory("studentRepository", function () {
  var factory = {};
  var students = [
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

  factory.getStudents = function () {
    return students;
  }

  return factory;
});

app.controller("HomeController", function () {
});

app.controller("ClassroomController", function ($scope) {
  $scope.classrooms = [513, 602, 722];
});

app.controller("StudentController", function ($scope, $routeParams, studentRepository) {
  $scope.students = studentRepository.getStudents();

  $scope.displayStudentInfo = function(student) {
    alert(student.name);
  }

  if ($routeParams.classroom) $scope.classroom = $routeParams.classroom;
});


app.directive("collapsible", function () {
  return {
    restrict: "E", // Only use as an element directive
    scope: {
      title: "@" // One-way data-binding to the "title" attribute on the directive element to the isolated scope.
    },
    template: "<div>" +
                "<h3 data-ng-click='toggleVisibility()'>{{title}}</h3>" +
                "<div data-ng-show='visible' data-ng-transclude></div>" +
              "</div>",
    replace: true, // Completely replace the directive HTML with the resulting template.
    link: function (scope, element, attrs, ctrls, transclude) {
      // Used for preparing the DOM for the resulting template. Here, because transcluded HTML does not use isolated
      // scope, AND because it gets a new COPY of the outside controller's scope, we can't do two way data binding
      // on the data model used for filtering unless we "clone" the elements at link time. Also, we have to remove the
      // originally transcluded HTML, otherwise we'll have a double occurance of the INPUT tag, with the original not
      // working due to the scope issue mentioned above. So we need to remove that element first, then append the cloned
      // version.
      //
      // I banged my head against this for days, and it's still not crystalized in my mind. When I finally do grok it,
      // I'll update my comments.
      transclude(scope.$parent, function(clone, scope) {
        element.children().eq(1).empty();
        element.children().append(clone);
      });
    },
    controller: function ($scope) {
      $scope.visible = true;

      $scope.toggleVisibility = function () {
        $scope.visible = !$scope.visible;
        if (!$scope.visible) $scope.$parent.search.name = ""; // Reset the search string when turning off the filter.
      };
    },
    transclude: true // Include the HTML wrapped inside the directive element into the resulting HTML.
  };
});
