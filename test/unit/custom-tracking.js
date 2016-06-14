/* global afterEach, before, beforeEach, describe, document, expect, inject, it, module, spyOn */
'use strict';

describe('Custom tracking function', function() {
  var self = null;
  var argument = null;
  
  beforeEach(module('angular-google-analytics'));
  beforeEach(module(function (AnalyticsProvider) {
    AnalyticsProvider
      .setAccount('UA-XXXXXX-xx')
      .logAllCalls(true)
      .enterTestMode()
      .setPageEvent('event')
      .trackRouteFunction(function(event, arg){
        self = this;
        argument = arg;
      });
  }));
  
  afterEach(inject(function (Analytics) {
    Analytics.log.length = 0; // clear log
  }));
  
  it('registers a listener', function(){
    inject(function($rootScope) {
      spyOn($rootScope, '$on');
      inject(function(Analytics) {
        expect($rootScope.$on).toHaveBeenCalled();
      });
    });
  });
  
  it('called with arguments', function() {
    inject(function(Analytics, $rootScope){
      var someObj = { };
      $rootScope.$emit('event', someObj);
      expect(argument).toBe(someObj);
    });
  });
  
  it('has access to the protected object', function(){
    inject(function(Analytics, $rootScope){
      $rootScope.$emit('event', null);
      expect(typeof self._trackPage).toBe('function');
    });
  });
});