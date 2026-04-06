(function(){
  var root = window.MotorProduct = window.MotorProduct || {};

  var state = {
    currentUser: null,
    isAuthenticated: false,
    userPlan: 'free',
    profile: null,
    loading: false
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
      loading: state.loading
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

  function signUp(email, password){
    var sb = root.supabase && root.supabase.getClient ? root.supabase.getClient() : null;
    if(!sb){
      return Promise.resolve({ok:false, message:'Supabase не настроен'});
    }
    state.loading = true;
    notify('loading');
    return sb.auth.signUp({email:email, password:password}).then(function(res){
      state.loading = false;
      notify('loading');
      if(res.error){
        return {ok:false, message:res.error.message || 'Ошибка регистрации'};
      }
      applyUser(res.data && res.data.user ? res.data.user : null);
      return readProfile().then(function(){
        return {ok:true, data:res.data};
      });
    }).catch(function(){
      state.loading = false;
      notify('loading');
      return {ok:false, message:'Ошибка сети при регистрации'};
    });
  }

  function signIn(email, password){
    var sb = root.supabase && root.supabase.getClient ? root.supabase.getClient() : null;
    if(!sb){
      return Promise.resolve({ok:false, message:'Supabase не настроен'});
    }
    state.loading = true;
    notify('loading');
    return sb.auth.signInWithPassword({email:email, password:password}).then(function(res){
      state.loading = false;
      notify('loading');
      if(res.error){
        return {ok:false, message:res.error.message || 'Ошибка входа'};
      }
      applyUser(res.data && res.data.user ? res.data.user : null);
      return readProfile().then(function(){
        return {ok:true, data:res.data};
      });
    }).catch(function(){
      state.loading = false;
      notify('loading');
      return {ok:false, message:'Ошибка сети при входе'};
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
        return {ok:false, message:res.error.message || 'Ошибка выхода'};
      }
      return {ok:true};
    }).catch(function(){
      applyUser(null);
      return {ok:false, message:'Ошибка сети при выходе'};
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
      notify('ready_no_client');
      return Promise.resolve({ok:false, reason:'no_client'});
    }
    return sb.auth.getSession().then(function(res){
      var user = res && res.data && res.data.session ? res.data.session.user : null;
      applyUser(user || null);
      return readProfile().then(function(){
        notify('session_restored');
        return {ok:true, user:user || null};
      });
    }).catch(function(){
      applyUser(null);
      notify('session_restore_failed');
      return {ok:false, reason:'session_failed'};
    });
  }

  function init(){
    var sb = root.supabase && root.supabase.initClient ? root.supabase.initClient() : null;
    if(!sb){
      applyUser(null);
      notify('ready_no_client');
      return Promise.resolve({ok:false, reason:'no_client'});
    }

    return restoreSession().then(function(result){
      sb.auth.onAuthStateChange(function(_event, session){
        var user = session && session.user ? session.user : null;
        applyUser(user || null);
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
    restoreSession: restoreSession,
    onAuthStateChange: onAuthStateChange
  };
})();
