(function(){
  var root = window.MotorProduct = window.MotorProduct || {};

  var cfg = {
    url: '', // set via window.MotorProductConfig.supabaseUrl or hardcode here
    anonKey: '', // set via window.MotorProductConfig.supabaseAnonKey or hardcode here
    options: {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  };

  var client = null;

  function resolveConfig(){
    var ext = window.MotorProductConfig || {};
    return {
      url: ext.supabaseUrl || cfg.url,
      anonKey: ext.supabaseAnonKey || cfg.anonKey,
      options: cfg.options
    };
  }

  function initClient(){
    if(client){
      return client;
    }
    var rcfg = resolveConfig();
    if(!rcfg.url || !rcfg.anonKey){
      return null;
    }
    if(!window.supabase || typeof window.supabase.createClient !== 'function'){
      return null;
    }
    client = window.supabase.createClient(rcfg.url, rcfg.anonKey, rcfg.options);
    return client;
  }

  function getClient(){
    return client || initClient();
  }

  root.supabase = {
    config: cfg,
    resolveConfig: resolveConfig,
    initClient: initClient,
    getClient: getClient
  };
})();
