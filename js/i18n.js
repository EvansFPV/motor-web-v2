(function(){
  var dict = {
    en: {
      copy_link_prompt: 'Copy this link:',
      theme_dark: 'Dark theme',
      theme_light: 'Light theme',
      installed_app: 'App installed',
      tour_next: 'Next',
      tour_finish: 'Finish',
      update_status_checking: 'Checking updates…',
      update_status_available: 'Update available',
      update_status_applying: 'Applying update…',
      update_status_up_to_date: 'Up to date',
      update_status_error: 'Failed to check updates',
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
      theme_dark: 'Тёмная тема',
      theme_light: 'Светлая тема',
      installed_app: 'Приложение установлено',
      tour_next: 'Далее',
      tour_finish: 'Готово',
      update_status_checking: 'Проверка обновлений…',
      update_status_available: 'Доступно обновление',
      update_status_applying: 'Обновление применяется…',
      update_status_up_to_date: 'Версия актуальна',
      update_status_error: 'Не удалось проверить обновления',
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
    return (lang === 'en') ? 'en' : 'ru';
  }

  function getLang(){
    var saved = 'ru';
    try{ saved = localStorage.getItem('lang') || 'ru'; }catch(e){}
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

  function mergeLang(target, source){
    if(!source){ return target; }
    for(var key in source){
      if(Object.prototype.hasOwnProperty.call(source, key)){
        target[key] = source[key];
      }
    }
    return target;
  }

  function extend(extraDict){
    if(!extraDict){ return; }
    if(extraDict.ru){ mergeLang(dict.ru, extraDict.ru); }
    if(extraDict.en){ mergeLang(dict.en, extraDict.en); }
  }

  function applyI18n(rootNode){
    var root = rootNode || document;
    if(!root || !root.querySelectorAll){
      return;
    }
    var nodes = root.querySelectorAll('[data-i18n]');
    for(var i=0;i<nodes.length;i++){
      var key = nodes[i].getAttribute('data-i18n');
      if(!key){ continue; }
      nodes[i].innerHTML = t(key, nodes[i].innerHTML);
    }
    var placeholders = root.querySelectorAll('[data-i18n-placeholder]');
    for(var p=0;p<placeholders.length;p++){
      var pkey = placeholders[p].getAttribute('data-i18n-placeholder');
      if(!pkey){ continue; }
      placeholders[p].setAttribute('placeholder', t(pkey, placeholders[p].getAttribute('placeholder') || ''));
    }
    return getLang();
  }

  window.MotorI18n = {
    dict: dict,
    getLang: getLang,
    setLang: setLang,
    t: t,
    applyI18n: applyI18n,
    extend: extend
  };
  window.t = t;
})();
