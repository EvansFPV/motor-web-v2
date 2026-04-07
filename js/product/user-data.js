(function(){
  var root = window.MotorProduct = window.MotorProduct || {};
  var LOCAL_KEY = 'winding_saved_calculations_v1';
  var syncing = false;
  var syncTimer = 0;

  function analytics(){ return root.analytics; }
  function i18nT(key, fallback){
    if(window.MotorI18n && typeof window.MotorI18n.t === 'function'){
      return window.MotorI18n.t(key, fallback);
    }
    return fallback || key;
  }

  function readLocalProjects(){
    try{
      var raw = localStorage.getItem(LOCAL_KEY);
      if(!raw){ return []; }
      var parsed = JSON.parse(raw);
      return parsed && parsed.length ? parsed : [];
    }catch(e){
      return [];
    }
  }

  function writeLocalProjects(list){
    try{ localStorage.setItem(LOCAL_KEY, JSON.stringify(list || [])); }catch(e){}
  }

  function isAuthenticated(){
    return root.auth && root.auth.getState && root.auth.getState().isAuthenticated;
  }

  function currentUserId(){
    var st = root.auth && root.auth.getState ? root.auth.getState() : null;
    return st && st.currentUser ? st.currentUser.id : null;
  }

  function getClient(){
    return root.supabase && root.supabase.getClient ? root.supabase.getClient() : null;
  }

  function normalizeName(p){
    return p && p.name ? p.name : ((p && p.isSchema) ? (p.nuten || 'schema') : ((p.nuten || '?')+' / '+(p.pole || '?')));
  }

  function normalizeProjectPayload(payload){
    var p = payload || {};
    var out = {};
    for(var k in p){
      if(Object.prototype.hasOwnProperty.call(p, k)){
        out[k] = p[k];
      }
    }
    if(!out.id){
      out.id = 'calc_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }
    if(!out.ts){
      out.ts = new Date().toISOString();
    }
    if(!out.name){
      out.name = normalizeName(out);
    }
    return out;
  }

  function replaceCloudFromLocal(list){
    var sb = getClient();
    var uid = currentUserId();
    if(!sb || !uid || !isAuthenticated()){
      return Promise.resolve({ok:false, reason:'guest_or_no_client'});
    }
    var projects = list || readLocalProjects();
    var payloadRows = [];
    var ids = [];
    for(var i=0;i<projects.length;i++){
      var p = projects[i];
      if(!p || !p.id){ continue; }
      ids.push(p.id);
      payloadRows.push({
        user_id: uid,
        client_project_id: p.id,
        name: normalizeName(p),
        payload: p,
        updated_at: new Date().toISOString()
      });
    }

    return sb.from('projects').select('id,client_project_id').eq('user_id', uid).then(function(existing){
      if(existing && existing.error){ throw existing.error; }
      var oldRows = existing && existing.data ? existing.data : [];
      var oldIds = oldRows.map(function(r){ return r.client_project_id; });

      var ops = [];
      if(payloadRows.length){
        ops.push(sb.from('projects').upsert(payloadRows, {onConflict:'user_id,client_project_id'}));
      }

      var toDelete = [];
      for(var j=0;j<oldIds.length;j++){
        if(ids.indexOf(oldIds[j]) === -1){
          toDelete.push(oldIds[j]);
        }
      }
      if(toDelete.length){
        ops.push(sb.from('projects').delete().eq('user_id', uid).in('client_project_id', toDelete));
      }

      if(!ops.length){
        return {ok:true, synced:0};
      }
      return Promise.all(ops).then(function(){
        return {ok:true, synced:payloadRows.length, deleted:toDelete.length};
      });
    }).catch(function(err){
      if(analytics() && analytics().capture){
        analytics().capture('project_sync_failed', {message: (err && err.message) ? err.message : 'sync_failed'});
      }
      return {ok:false, reason:'sync_failed'};
    });
  }

  function scheduleSync(list){
    if(!isAuthenticated()){
      return;
    }
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function(){
      if(syncing){
        return;
      }
      syncing = true;
      replaceCloudFromLocal(list).finally(function(){
        syncing = false;
      });
    }, 450);
  }

  function loadCloudToLocal(){
    var sb = getClient();
    var uid = currentUserId();
    if(!sb || !uid || !isAuthenticated()){
      return Promise.resolve({ok:false, reason:'guest_or_no_client'});
    }
    return sb.from('projects').select('id,client_project_id,name,payload,created_at,updated_at').eq('user_id', uid).order('updated_at', {ascending:false})
      .then(function(res){
        if(res.error){ throw res.error; }
        var rows = res.data || [];
        var mapped = [];
        for(var i=0;i<rows.length;i++){
          var r = rows[i];
          var payload = r.payload || {};
          if(!payload.id){ payload.id = r.client_project_id; }
          if(!payload.ts){ payload.ts = r.updated_at || r.created_at || new Date().toISOString(); }
          if(!payload.name && r.name){ payload.name = r.name; }
          mapped.push(payload);
        }
        writeLocalProjects(mapped);
        return {ok:true, items:mapped};
      }).catch(function(err){
        return {ok:false, reason:(err && err.message) ? err.message : 'load_failed'};
      });
  }

  function maybeOfferImportLocal(sourceList){
    if(!isAuthenticated()){
      return Promise.resolve({ok:false, reason:'guest'});
    }
    var local = Array.isArray(sourceList) ? sourceList : readLocalProjects();
    if(!local.length){
      return Promise.resolve({ok:false, reason:'no_local'});
    }
    var ask = window.confirm(i18nT('userdata_import_local_confirm', 'Local projects were found. Import them into your account?'));
    if(!ask){
      return Promise.resolve({ok:false, reason:'user_skipped'});
    }
    return replaceCloudFromLocal(local).then(function(res){
      if(res && res.ok && analytics() && analytics().capture){
        analytics().capture('local_projects_imported', {count: local.length});
      }
      return res;
    });
  }

  function saveProject(payload){
    var normalized = normalizeProjectPayload(payload);
    var local = readLocalProjects();
    local.unshift(normalized);
    if(local.length > 20){
      local = local.slice(0, 20);
    }
    writeLocalProjects(local);

    if(!isAuthenticated()){
      return Promise.resolve({ok:true, mode:'guest', project:normalized});
    }

    var sb = getClient();
    var uid = currentUserId();
    if(!sb || !uid){
      return Promise.resolve({ok:false, mode:'auth', reason:'no_client_or_user'});
    }
    return sb.from('projects').upsert({
      user_id: uid,
      client_project_id: normalized.id,
      name: normalizeName(normalized),
      payload: normalized,
      updated_at: new Date().toISOString()
    }, {onConflict:'user_id,client_project_id'}).then(function(res){
      if(res && res.error){
        return {ok:false, mode:'auth', reason:res.error.message || 'save_failed', project:normalized};
      }
      return {ok:true, mode:'auth', project:normalized};
    }).catch(function(err){
      return {ok:false, mode:'auth', reason:(err && err.message) ? err.message : 'save_failed', project:normalized};
    });
  }

  function loadProjects(opts){
    var options = opts || {};
    if(!isAuthenticated() || options.forceLocal){
      return Promise.resolve({ok:true, mode:'guest', items:readLocalProjects()});
    }
    return loadCloudToLocal().then(function(res){
      if(res && res.ok){
        return {ok:true, mode:'auth', items:res.items || readLocalProjects()};
      }
      return {ok:false, mode:'auth', reason:res && res.reason ? res.reason : 'load_failed', items:readLocalProjects()};
    });
  }

  function deleteProject(projectId){
    if(!projectId){
      return Promise.resolve({ok:false, reason:'missing_id'});
    }
    var local = readLocalProjects();
    var filtered = [];
    for(var i=0;i<local.length;i++){
      if(local[i] && local[i].id !== projectId){
        filtered.push(local[i]);
      }
    }
    writeLocalProjects(filtered);

    if(!isAuthenticated()){
      return Promise.resolve({ok:true, mode:'guest'});
    }
    var sb = getClient();
    var uid = currentUserId();
    if(!sb || !uid){
      return Promise.resolve({ok:false, mode:'auth', reason:'no_client_or_user'});
    }
    return sb.from('projects').delete().eq('user_id', uid).eq('client_project_id', projectId).then(function(res){
      if(res && res.error){
        return {ok:false, mode:'auth', reason:res.error.message || 'delete_failed'};
      }
      return {ok:true, mode:'auth'};
    }).catch(function(err){
      return {ok:false, mode:'auth', reason:(err && err.message) ? err.message : 'delete_failed'};
    });
  }

  root.userData = {
    readLocalProjects: readLocalProjects,
    writeLocalProjects: writeLocalProjects,
    scheduleSync: scheduleSync,
    replaceCloudFromLocal: replaceCloudFromLocal,
    loadCloudToLocal: loadCloudToLocal,
    maybeOfferImportLocal: maybeOfferImportLocal,
    saveProject: saveProject,
    loadProjects: loadProjects,
    deleteProject: deleteProject
  };
})();
