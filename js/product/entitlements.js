(function(){
  var root = window.MotorProduct = window.MotorProduct || {};
  var STORAGE_KEY = 'motorlab_entitlements_v1';

  function nowIso(){
    return new Date().toISOString();
  }

  function defaultState(){
    return {
      plan: 'free',
      source: 'default',
      status: 'inactive',
      updatedAt: nowIso(),
      localOnly: true,
      note: 'client-cache-only'
    };
  }

  function normalizeState(raw){
    var base = defaultState();
    var s = raw || {};
    base.plan = (s.plan === 'pro') ? 'pro' : 'free';
    base.source = s.source || base.source;
    base.status = s.status || (base.plan === 'pro' ? 'active' : 'inactive');
    base.updatedAt = s.updatedAt || nowIso();
    base.localOnly = (typeof s.localOnly === 'boolean') ? s.localOnly : true;
    base.note = s.note || base.note;
    return base;
  }

  function read(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      if(!raw){
        return defaultState();
      }
      return normalizeState(JSON.parse(raw));
    }catch(e){
      return defaultState();
    }
  }

  function write(next){
    var normalized = normalizeState(next);
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }catch(e){}
    return normalized;
  }

  function setPro(source, status){
    return write({
      plan: 'pro',
      source: source || 'manual',
      status: status || 'active',
      updatedAt: nowIso(),
      localOnly: true,
      note: 'NEEDS_SERVER_VERIFICATION'
    });
  }

  function setFree(source){
    return write({
      plan: 'free',
      source: source || 'manual',
      status: 'inactive',
      updatedAt: nowIso(),
      localOnly: true,
      note: 'client-cache-only'
    });
  }

  function restoreAccess(){
    // Placeholder: replace with backend entitlement lookup.
    return Promise.resolve(read());
  }

  root.entitlements = {
    STORAGE_KEY: STORAGE_KEY,
    read: read,
    write: write,
    setPro: setPro,
    setFree: setFree,
    restoreAccess: restoreAccess
  };
})();
