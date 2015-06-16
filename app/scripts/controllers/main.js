'use strict';

/**
 * @ngdoc function
 * @name sampleShopFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleShopFrontendApp
 */
angular.module('sampleShopFrontendApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
