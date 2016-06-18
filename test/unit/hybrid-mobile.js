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
      .useAnalytics(true);
  }));
  
  afterEach(inject(function (Analytics) {
    Analytics.log.length = 0; // clear log
  }));
  
  it('is false by default', function() {
    inject(function(Analytics){
      expect(Analytics.configuration.hybridMobileSupport).toBe(false);
      expect(Analytics.configuration.mobileAppProperties).toBe(null);
    });
  });
  
  
  describe('can be configured with bool', function(){
    beforeEach(module(function(AnalyticsProvider){
      AnalyticsProvider.setHybridMobileSupport(true);
    }));
    
    it('and be present in configuration', function(){
      inject(function(Analytics){
        expect(Analytics.configuration.hybridMobileSupport).toBe(true);
        expect(Analytics.configuration.mobileAppProperties).toBe(null);
      });      
    });
    
    it('and log warning on call', function(){
      inject(function($log){
        spyOn($log, 'warn');
        inject(function(Analytics, $rootScope) {
          $rootScope.$broadcast('$routeChangeSuccess', { name: 'myScreen' });
          expect($log.warn).toHaveBeenCalledWith('Analytics can not track mobile apps without basic \'appName\' properties');
        });
      });
    });
  });
  
  
  describe('can be configured with string', function(){
    beforeEach(module(function(AnalyticsProvider){
      AnalyticsProvider.setHybridMobileSupport('myApp');
    }));
    
    it('and be present in configuration', function(){
      inject(function(Analytics){
        expect(Analytics.configuration.hybridMobileSupport).toBe(true);
        expect(Analytics.configuration.mobileAppProperties).toEqual({appName: 'myApp'});
      });      
    });
    
    it('track screen view', function () {
      inject(function(Analytics, $rootScope){
        Analytics.log.length = 0; // clear queue
        $rootScope.$broadcast('$routeChangeSuccess', { name: 'myScreen' });
        expect(Analytics.log.length).toBe(1);
        expect(Analytics.log[0]).toEqual(['send', 'screenview', { screenName: 'myScreen', appName: 'myApp' }]);
      });
    });
  });
  
  describe('can be configured with object', function(){
    
    describe('but needs \'appName\' property', function() {
      beforeEach(module(function(AnalyticsProvider){
        AnalyticsProvider.setHybridMobileSupport({ valueMissing: 10 });
      }));
      
      it('and log warning on call', function(){
        inject(function($log){
          spyOn($log, 'warn');
          inject(function(Analytics, $rootScope) {
            $rootScope.$broadcast('$routeChangeSuccess', { name: 'myScreen' });
            expect($log.warn).toHaveBeenCalledWith('Analytics can not track mobile apps without basic \'appName\' properties');
          });
        });
      });
    });
    
    describe('if appName was set', function(){
      beforeEach(module(function(AnalyticsProvider){
        AnalyticsProvider.setHybridMobileSupport({ appName: 'myApp', appVersion: '0.1' });
      }));
      
      it('and be present in configuration', function(){
        inject(function(Analytics){
          expect(Analytics.configuration.hybridMobileSupport).toBe(true);
          expect(Analytics.configuration.mobileAppProperties).toEqual({ appName: 'myApp', appVersion: '0.1' });
        });      
      });
      
      it('track screen view', function () {
        inject(function(Analytics, $rootScope){
          Analytics.log.length = 0; // clear queue
          $rootScope.$broadcast('$routeChangeSuccess', { name: 'myScreen' });
          expect(Analytics.log.length).toBe(1);
          expect(Analytics.log[0]).toEqual(['send', 'screenview', { screenName: 'myScreen', appName: 'myApp', appVersion: '0.1' }]);
        });
      });
    });
  });
});