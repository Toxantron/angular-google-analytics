/* global afterEach, before, beforeEach, describe, document, expect, inject, it, module, spyOn */
'use strict';

describe('Hybrid mobile tracking function', function() {
  var self = null;
  var argument = null;
  
  beforeEach(module('angular-google-analytics'));
  beforeEach(module(function (AnalyticsProvider) {
    AnalyticsProvider
      .setAccount('UA-XXXXXX-xx')
      .logAllCalls(true)
      .enterTestMode()
      .useAnalytics(true)
      .setHybridMobileSupport(true, 'myApp');
  }));
  
  afterEach(inject(function (Analytics) {
    Analytics.log.length = 0; // clear log
  }));
  
  it('tracks screen view', function () {
    inject(function(Analytics, $rootScope){
      Analytics.log.length = 0; // clear queue
      $rootScope.$broadcast('$routeChangeSuccess', { name: 'myScreen' });
      expect(Analytics.log.length).toBe(1);
      expect(Analytics.log[0]).toEqual(['send', 'screenview', { screenName: 'myScreen', appName: 'myApp' }]);
    });
  });
});