import { Injectable } from '@angular/core';

// Class that represents a page hit
class PageView {
  constructor(public page : string, // Page URL
              public title : string, // Title of the page
              ) {
  }
}

// Interface for universal and classic analytics
interface ITracker {
  // Create the script tag
  createTag() : void;
  // Track a page view
  track(page: PageView) : void;
}

// Tracker implementation for classic analytics
class ClassicTracker implements ITracker {
  createTag() : void {
    
  }
  
  track(page: PageView) : void {
    
  }
}

// Tracker implementation for universal analytics
class UniversalTracker implements ITracker {
  createTag() : void {
    
  }
  
  track(page: PageView) : void {
    
  }
}

@Injectable()
export class AnalyticsConfig {
  // All config values of the analytics module
  private _accounts : any[];
  private _created : boolean = false;
  private _crossDomainLinker : boolean = false;
  private _crossLinkDomains : boolean = false;
  private _currency : string = 'USD';
  private _debugMode : boolean = false;
  private _delayScriptTag : boolean = false;
  private _displayFeatures : boolean = false;
  private _disableAnalytics : boolean = false;
  private _domainName : string;
  private _ecommerce : boolean = false;
  private _enhancedEcommerce : boolean = false;
  private _enhancedLinkAttribution : boolean = false;
  private _experimentId : string;
  private _ignoreFirstPageLoad : boolean = false;
  private _logAllCalls : boolean = false;
  private _hybridMobileSupport : boolean = false;
  private _offlineMode : boolean = false;
  private _pageEvent : string = '$routeChangeSuccess';
  private _readFromRoute : boolean = false;
  private _removeRegExp : string;
  private _testMode : boolean = false;
  private _traceDebuggingMode : boolean = false;
  private _trackPrefix : string = '';
  private _trackRoutes : boolean = true;
  private _trackUrlParams : boolean = false;
  
  private _tracker : ITracker = new ClassicTracker();
  
  // Fluent API setter methods
  // ---------------------------->
  trackPages(val : boolean) : AnalyticsConfig {
    this._trackRoutes = val;
    return this;
  }
  
  trackPrefix(prefix : string) : AnalyticsConfig {
    this._trackPrefix = prefix;
    return this;
  }
  
  setDomainName(domain : string) : AnalyticsConfig {
    this._domainName = domain;
    return this;
  }
  
  useDisplayFeatures(val : boolean) : AnalyticsConfig {
    this._displayFeatures = val;
    return this;
  }
  
  useAnalytics(val : boolean) : AnalyticsConfig {
    this._tracker = val ? new UniversalTracker() : new ClassicTracker();
    return this;
  }
  
  useEnhancedLinkAttribution(val : boolean) : AnalyticsConfig {
    this._enhancedLinkAttribution = val;
    return this;
  }
  
  useCrossDomainLinker(val : boolean) : AnalyticsConfig {
    this._crossDomainLinker = val;
    return this;
  }
  
  setCrossLinkDomains(domains : boolean) : AnalyticsConfig {
    this._crossLinkDomains = domains;
    return this;
  }
  
  setPageEvent(name : string) : AnalyticsConfig {
    this_pageEvent = name;
    return this;
  }
  
  useECommerce(val : boolean, enhanced : boolean) : AnalyticsConfig {
    this._ecommerce = val;
    this._enhancedEcommerce = enhanced;
    return this;
  }
  
  setCurrency(currencyCode : string) : AnalyticsConfig {
    this._currency = currencyCode;
    return this;
  }
  
  setRemoveRegExp(regex : RegExp) : AnalyticsConfig {
    
    removeRegExp = regex;
    return this;
  }
  
  // <---- End of fluent API
}

/*
 * Decorator for the decorator approach
 * @Tracking({
 *   readFromRoute : true,
 *   useECommerce : true
 * })
 * class AppComponent { }
 */
export Tracking(target) {
  return function(config) {
    var analyticsConfig = new AnalyticsConfig();
    for (var key in config) {
      // Using reflection we can access the 'private' fields
      analyticsConfig['_' + key] = config[key];
    }
    target.$analytics = analyticsConfig;
  }
}

@Injectable()
export class Analytics {
  // Config is passed to the analytics instance when it is resolved
  constructor(private config : AnalyticsConfig) {
    
  }
}
