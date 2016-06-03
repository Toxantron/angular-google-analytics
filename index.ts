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
  public _accounts : any[];
  public _created : boolean = false;
  public _crossDomainLinker : boolean = false;
  public _crossLinkDomains : boolean = false;
  public _currency : string = 'USD';
  public _debugMode : boolean = false;
  public _delayScriptTag : boolean = false;
  public _displayFeatures : boolean = false;
  public _disableAnalytics : boolean = false;
  public _domainName : string;
  public _ecommerce : boolean = false;
  public _enhancedEcommerce : boolean = false;
  public _enhancedLinkAttribution : boolean = false;
  public _experimentId : string;
  public _ignoreFirstPageLoad : boolean = false;
  public _logAllCalls : boolean = false;
  public _hybridMobileSupport : boolean = false;
  public _offlineMode : boolean = false;
  public _pageEvent : string = '$routeChangeSuccess';
  public _readFromRoute : boolean = false;
  public _removeRegExp : string;
  public _testMode : boolean = false;
  public _traceDebuggingMode : boolean = false;
  public _trackPrefix : string = '';
  public _trackRoutes : boolean = true;
  public _trackUrlParams : boolean = false;
  
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
