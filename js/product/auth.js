(function(){
  var root = window.MotorProduct = window.MotorProduct || {};
  function i18nT(key, fallback){
    if(window.MotorI18n && typeof window.MotorI18n.t === 'function'){
      return window.MotorI18n.t(key, fallback);
    }
    return fallback || key;
  }

  var state = {
    currentUser: null,
    isAuthenticated: false,
    userPlan: 'free',
    profile: null,
    loading: false,
    authReady: false
  };
  var listeners = [];

  function notify(eventName){
    for(var i=0;i<listeners.length;i++){
      try{ listeners[i](eventName, getState()); }catch(e){}
    }
  }

  function getState(){
    return {
      currentUser: state.currentUser,
      isAuthenticated: state.isAuthenticated,
      userPlan: state.userPlan || 'free',
      profile: state.profile,
      currentProfile: state.profile,
      loading: state.loading,
      authReady: !!state.authReady
    };
  }

  function applyUser(user){
    state.currentUser = user || null;
    state.isAuthenticated = !!user;
    if(!user){
      state.userPlan = 'free';
      state.profile = null;
    }
    notify('user_updated');
  }

  function readProfile(){
    var sb = root.supabase && root.supabase.getClient ? root.supabase.getClient() : null;
    if(!sb || !state.currentUser){
      return Promise.resolve(null);
    }
    return sb.from('profiles').select('id,email,plan,created_at').eq('id', state.currentUser.id).maybeSingle()
      .then(function(res){
        if(res && !res.error && res.data){
          state.profile = res.data;
          state.userPlan = res.data.plan || 'free';
          notify('profile_updated');
          return res.data;
        }
        state.profile = null;
        state.userPlan = 'free';
        notify('profile_updated');
        return null;
      }).catch(function(){
        state.profile = null;
        state.userPlan = 'free';
        notify('profile_updated');
        return null;
      });
  }

  function sessionUserFromResult(res){
    return (res && res.data && res.data.session && res.data.session.user) ? res.data.session.user : null;
  }

  function signUp(email, password){
    var sb = root.supabase && root.supabase.getClient ? root.supabase.getClient() : null;
    if(!sb){
      return Promise.resolve({ok:false, message:i18nT('auth_supabase_not_configured', 'Supabase is not configured')});
    }
    state.loading = true;
    notify('loading');
    return sb.auth.signUp({email:email, password:password}).then(function(res){
      state.loading = false;
      notify('loading');
      if(res.error){
        return {ok:false, message:res.error.message || i18nT('auth_signup_failed', 'Sign up failed')};
      }
      var sessionUser = sessionUserFromResult(res);
      applyUser(sessionUser || null);
      if(!sessionUser){
        return {
          ok:true,
          pendingVerification:true,
          data:res.data,
          message:i18nT('auth_signup_verify', 'Account created. Confirm your email to sign in.')
        };
      }
      return readProfile().then(function(){
        return {ok:true, data:res.data};
      });
    }).catch(function(){
      state.loading = false;
      notify('loading');
      return {ok:false, message:i18nT('auth_network_signup', 'Network error during sign up')};
    });
  }

  function signIn(email, password){
    var sb = root.supabase && root.supabase.getClient ? root.supabase.getClient() : null;
    if(!sb){
      return Promise.resolve({ok:false, message:i18nT('auth_supabase_not_configured', 'Supabase is not configured')});
    }
    state.loading = true;
    notify('loading');
    return sb.auth.signInWithPassword({email:email, password:password}).then(function(res){
      state.loading = false;
      notify('loading');
      if(res.error){
        return {ok:false, message:res.error.message || i18nT('auth_signin_failed', 'Sign in failed')};
      }
      var sessionUser = sessionUserFromResult(res);
      if(!sessionUser){
        applyUser(null);
        return {ok:false, message:i18nT('auth_session_not_created', 'Session was not created. Check email confirmation and sign-in settings.')};
      }
      applyUser(sessionUser);
      return readProfile().then(function(){
        return {ok:true, data:res.data};
      });
    }).catch(function(){
      state.loading = false;
      notify('loading');
      return {ok:false, message:i18nT('auth_network_signin', 'Network error during sign in')};
    });
  }

  function signOut(){
    var sb = root.supabase && root.supabase.getClient ? root.supabase.getClient() : null;
    if(!sb){
      applyUser(null);
      return Promise.resolve({ok:true});
    }
    return sb.auth.signOut().then(function(res){
      applyUser(null);
      if(res && res.error){
        return {ok:false, message:res.error.message || i18nT('auth_signout_failed', 'Sign out failed')};
      }
      return {ok:true};
    }).catch(function(){
      applyUser(null);
      return {ok:false, message:i18nT('auth_network_signout', 'Network error during sign out')};
    });
  }

  function getCurrentUser(){
    return state.currentUser;
  }

  function getUser(){
    return getCurrentUser();
  }

  function isAuthenticated(){
    return !!state.isAuthenticated;
  }

  function getUserPlan(){
    return state.userPlan || 'free';
  }

  function isProUser(){
    return getUserPlan() === 'pro';
  }

  function onAuthStateChange(cb){
    if(typeof cb !== 'function'){
      return function(){};
    }
    listeners.push(cb);
    return function(){
      listeners = listeners.filter(function(fn){ return fn !== cb; });
    };
  }

  function restoreSession(){
    var sb = root.supabase && root.supabase.getClient ? root.supabase.getClient() : null;
    if(!sb){
      applyUser(null);
      state.authReady = true;
      notify('ready_no_client');
      return Promise.resolve({ok:false, reason:'no_client'});
    }
    return sb.auth.getSession().then(function(res){
      var user = res && res.data && res.data.session ? res.data.session.user : null;
      applyUser(user || null);
      return readProfile().then(function(){
        state.authReady = true;
        notify('session_restored');
        notify('auth_ready');
        return {ok:true, user:user || null};
      });
    }).catch(function(){
      applyUser(null);
      state.authReady = true;
      notify('session_restore_failed');
      notify('auth_ready');
      return {ok:false, reason:'session_failed'};
    });
  }

  function init(){
    var sb = root.supabase && root.supabase.initClient ? root.supabase.initClient() : null;
    if(!sb){
      applyUser(null);
      state.authReady = true;
      notify('ready_no_client');
      notify('auth_ready');
      return Promise.resolve({ok:false, reason:'no_client'});
    }

    return restoreSession().then(function(result){
      sb.auth.onAuthStateChange(function(_event, session){
        var user = session && session.user ? session.user : null;
        applyUser(user || null);
        state.authReady = true;
        notify('auth_ready');
        readProfile();
      });
      return result;
    });
  }

  root.auth = {
    init: init,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    getUser: getUser,
    getCurrentUser: getCurrentUser,
    isAuthenticated: isAuthenticated,
    getState: getState,
    getUserPlan: getUserPlan,
    isProUser: isProUser,
    readProfile: readProfile,
    getCurrentProfile: function(){ return state.profile; },
    restoreSession: restoreSession,
    onAuthStateChange: onAuthStateChange
  };
})();
