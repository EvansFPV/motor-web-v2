(function(){
  var root = window.MotorProduct = window.MotorProduct || {};
  var queue = [];
  var initialized = false;
  var buildVersion = '1.1.0-beta';
  var installSource = 'browser';

  function platform(){
    var ua = (navigator.userAgent || '').toLowerCase();
    if(ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1 || ua.indexOf('ipod') !== -1){ return 'ios'; }
    if(ua.indexOf('android') !== -1){ return 'android'; }
    return 'desktop';
  }

  function environment(){
    var standalone = false;
    try{
      standalone = !!(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || !!navigator.standalone;
    }catch(e){}
    return standalone ? 'standalone' : 'browser';
  }

  function lang(){
    if(typeof window.selected_lang == 'string' && window.selected_lang){
      return window.selected_lang;
    }
    var htmlLang = (document.documentElement && document.documentElement.lang) || 'ru';
    return htmlLang;
  }

  function baseProps(){
    return {
      language: lang(),
      platform: platform(),
      ui_environment: environment(),
      viewport_w: window.innerWidth || 0,
      viewport_h: window.innerHeight || 0,
      build_version: buildVersion
    };
  }

  function send(name, props){
    var payload = {};
    var base = baseProps();
    for(var k in base){ payload[k] = base[k]; }
    var p = props || {};
    for(var x in p){ payload[x] = p[x]; }

    if(window.posthog && typeof window.posthog.capture == 'function'){
      window.posthog.capture(name, payload);
      return;
    }
    queue.push({event:name, props:payload, ts:new Date().toISOString()});
    if(queue.length > 200){
      queue = queue.slice(queue.length - 200);
    }
  }

  function init(opts){
    if(initialized){
      return;
    }
    initialized = true;
    var options = opts || {};
    if(options.buildVersion){
      buildVersion = options.buildVersion;
    }
    installSource = environment();
    send('app_opened', {install_source: installSource});
    send('session_started', {install_source: installSource});
  }

  function capture(name, props){
    send(name, props || {});
  }

  function captureFeatureUse(feature, props){
    var p = props || {};
    p.feature_name = feature;
    send('feature_used', p);
  }

  function capturePaywall(feature, source, extra){
    var p = extra || {};
    p.feature_name = feature || '';
    p.paywall_source = source || '';
    send('paywall_viewed', p);
  }

  function captureUpgradeCTA(source, extra){
    var p = extra || {};
    p.paywall_source = source || '';
    send('upgrade_cta_clicked', p);
  }

  function captureCheckout(plan, source, extra){
    var p = extra || {};
    p.plan_name = plan || '';
    p.paywall_source = source || '';
    send('checkout_started', p);
  }

  function getBufferedEvents(){
    return queue.slice(0);
  }

  root.analytics = {
    init: init,
    capture: capture,
    captureFeatureUse: captureFeatureUse,
    capturePaywall: capturePaywall,
    captureUpgradeCTA: captureUpgradeCTA,
    captureCheckout: captureCheckout,
    getBufferedEvents: getBufferedEvents
  };
})();
