import { Injectable } from '@angular/core';

@Injectable()
export class AnalyticsConfig {
  // All config values of the analytics module
  private _accounts : any[];
  private _analyticsJS : boolean = true;
  private _created : boolean = false;
  private _crossDomainLinker : boolean = false;
  private _crossLinkDomains : boolean = false;
  private _currency : string = 'USD';
  private _debugMode : boolean = false;
  private _delayScriptTag : boolean = false;
  private _displayFeatures : boolean = false;
  private _disableAnalytics : boolean = false;
  private _domainName : boolean;
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
  
  // Fluent API setter methods
  // ----------------------------
  trackPages(val : boolean) : AnalyticsConfig {
    this._trackRoutes = !!val;
    return this;
  }
  
  trackPrefix(prefix : string) : AnalyticsConfig {
    this._trackPrefix = prefix;
    return this;
  }
  
  setDomainName(domain : string) {
    this._domainName = domain;
    return this;
  }
}

@Injectable()
export class Analytics {
  // Config is passed to the analytics instance when it is resolved
  constructor(private config : AnalyticsConfig) {
    
  }
}
