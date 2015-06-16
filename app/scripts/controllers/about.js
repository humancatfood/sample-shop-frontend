'use strict';

/**
 * @ngdoc function
 * @name sampleShopFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sampleShopFrontendApp
 */
angular.module('app')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
