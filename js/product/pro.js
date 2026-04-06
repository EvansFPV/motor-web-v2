(function(){
  var root = window.MotorProduct = window.MotorProduct || {};

  var featureMatrix = {
    basic_calculation: 'free',
    basic_visualization: 'free',
    basic_magnet_advisor: 'free',
    help: 'free',
    history: 'free',
    save_project: 'free',
    share_link: 'free',
    compare_mode: 'pro',
    advanced_export_csv: 'pro',
    advanced_presets: 'pro',
    unlimited_saved_projects: 'pro',
    advanced_history_management: 'pro',
    advanced_magnet_hooks: 'pro'
  };

  var limits = {
    free: {
      savedProjects: 5,
      customPresets: 5,
      csvExportsPerDay: 2
    },
    pro: {
      savedProjects: Infinity,
      customPresets: Infinity,
      csvExportsPerDay: Infinity
    }
  };

  function analytics(){
    return root.analytics;
  }

  function entitlements(){
    return root.entitlements;
  }

  function getAccessState(){
    if(root.auth && typeof root.auth.getState == 'function'){
      var authState = root.auth.getState();
      if(authState && authState.isAuthenticated){
        return {
          plan: (authState.userPlan === 'pro') ? 'pro' : 'free',
          source: 'supabase_profile',
          status: authState.isAuthenticated ? 'active' : 'inactive',
          localOnly: false
        };
      }
    }
    var e = entitlements();
    if(!e || typeof e.read != 'function'){
      return {plan:'free', status:'inactive', source:'fallback', localOnly:true};
    }
    return e.read();
  }

  function isProUser(){
    var st = getAccessState();
    return st.plan === 'pro' && (st.status === 'active' || st.status === 'trial');
  }

  function getPlanName(){
    return isProUser() ? 'pro' : 'free';
  }

  function getFeatureTier(featureKey){
    return featureMatrix[featureKey] || 'free';
  }

  function getLimit(name){
    var plan = getPlanName();
    var p = limits[plan] || limits.free;
    return p[name];
  }

  function canUseFeature(featureKey, context){
    var need = getFeatureTier(featureKey);
    if(need === 'free'){
      return {ok:true, feature:featureKey, required:'free', current:getPlanName()};
    }
    if(isProUser()){
      return {ok:true, feature:featureKey, required:'pro', current:'pro'};
    }
    return {
      ok:false,
      feature:featureKey,
      required:'pro',
      current:'free',
      sourceContext: context || ''
    };
  }

  function _openPaywall(featureKey, sourceContext, extra){
    if(analytics() && analytics().capture){
      analytics().capture('feature_blocked_by_paywall', {
        feature_name: featureKey,
        paywall_source: sourceContext || '',
        plan_name: getPlanName()
      });
    }
    if(root.paywall && typeof root.paywall.open == 'function'){
      root.paywall.open(featureKey, sourceContext || '', extra || {});
    }
  }

  function requireFeature(featureKey, sourceContext, extra){
    var check = canUseFeature(featureKey, sourceContext);
    if(check.ok){
      return true;
    }
    _openPaywall(featureKey, sourceContext, extra);
    return false;
  }

  function markProUnlocked(source){
    var e = entitlements();
    if(e && typeof e.setPro == 'function'){
      e.setPro(source || 'manual_unlock', 'active');
    }
    if(analytics() && analytics().capture){
      analytics().capture('pro_unlocked', {
        source: source || 'manual_unlock',
        plan_name: 'pro'
      });
    }
    if(root.uiBadges && typeof root.uiBadges.refresh == 'function'){
      root.uiBadges.refresh();
    }
  }

  function markProLocked(source){
    var e = entitlements();
    if(e && typeof e.setFree == 'function'){
      e.setFree(source || 'manual_lock');
    }
    if(root.uiBadges && typeof root.uiBadges.refresh == 'function'){
      root.uiBadges.refresh();
    }
  }

  function getFeatureMatrix(){
    return featureMatrix;
  }

  function getLimits(){
    return limits;
  }

  root.pro = {
    getAccessState: getAccessState,
    getPlanName: getPlanName,
    isProUser: isProUser,
    canUseFeature: canUseFeature,
    requireFeature: requireFeature,
    markProUnlocked: markProUnlocked,
    markProLocked: markProLocked,
    getFeatureMatrix: getFeatureMatrix,
    getFeatureTier: getFeatureTier,
    getLimit: getLimit,
    getLimits: getLimits
  };
})();
