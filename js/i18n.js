(function(){
  var dict = {
    en: {
      copy_link_prompt: 'Copy this link:',
      auth_supabase_not_configured: 'Supabase is not configured',
      auth_signup_failed: 'Sign up failed',
      auth_signup_verify: 'Account created. Confirm your email to sign in.',
      auth_network_signup: 'Network error during sign up',
      auth_signin_failed: 'Sign in failed',
      auth_session_not_created: 'Session was not created. Check email confirmation and sign-in settings.',
      auth_network_signin: 'Network error during sign in',
      auth_signout_failed: 'Sign out failed',
      auth_network_signout: 'Network error during sign out',
      userdata_import_local_confirm: 'Local projects were found. Import them into your account?'
    },
    ru: {
      copy_link_prompt: 'Скопируйте ссылку:',
      auth_supabase_not_configured: 'Supabase не настроен',
      auth_signup_failed: 'Ошибка регистрации',
      auth_signup_verify: 'Аккаунт создан. Подтвердите email для входа.',
      auth_network_signup: 'Ошибка сети при регистрации',
      auth_signin_failed: 'Ошибка входа',
      auth_session_not_created: 'Сессия не создана. Проверьте подтверждение email и настройки входа.',
      auth_network_signin: 'Ошибка сети при входе',
      auth_signout_failed: 'Ошибка выхода',
      auth_network_signout: 'Ошибка сети при выходе',
      userdata_import_local_confirm: 'Найдены локальные проекты. Импортировать их в аккаунт?'
    }
  };

  function normalize(lang){
    return (lang === 'ru') ? 'ru' : 'en';
  }

  function getLang(){
    var saved = 'en';
    try{ saved = localStorage.getItem('lang') || 'en'; }catch(e){}
    return normalize((saved || '').toLowerCase());
  }

  function setLang(lang){
    var normalized = normalize((lang || '').toLowerCase());
    try{ localStorage.setItem('lang', normalized); }catch(e){}
    return normalized;
  }

  function t(key, fallback){
    var lang = getLang();
    if(dict[lang] && typeof dict[lang][key] !== 'undefined'){
      return dict[lang][key];
    }
    if(dict.en && typeof dict.en[key] !== 'undefined'){
      return dict.en[key];
    }
    return (typeof fallback !== 'undefined') ? fallback : key;
  }

  function applyI18n(rootNode){
    var root = rootNode || document;
    if(!root || !root.querySelectorAll){
      return;
    }
    var lang = getLang();
    var nodes = root.querySelectorAll('[data-i18n-key]');
    for(var i=0;i<nodes.length;i++){
      var key = nodes[i].getAttribute('data-i18n-key');
      if(!key){ continue; }
      nodes[i].textContent = t(key);
    }
    var placeholders = root.querySelectorAll('[data-i18n-placeholder-key]');
    for(var p=0;p<placeholders.length;p++){
      var pkey = placeholders[p].getAttribute('data-i18n-placeholder-key');
      if(!pkey){ continue; }
      placeholders[p].setAttribute('placeholder', t(pkey));
    }
    return lang;
  }

  window.MotorI18n = {
    dict: dict,
    getLang: getLang,
    setLang: setLang,
    t: t,
    applyI18n: applyI18n
  };
  window.t = t;
})();
