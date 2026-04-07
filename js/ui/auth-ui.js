(function(){
  var root = window.MotorProduct = window.MotorProduct || {};

  function analytics(){ return root.analytics; }
  function isEn(){
    if(window.MotorI18n && typeof window.MotorI18n.getLang === 'function'){
      return window.MotorI18n.getLang() === 'en';
    }
    return (window.selected_lang || '').toLowerCase() === 'en';
  }
  function t(ru, en){ return isEn() ? en : ru; }

  function ensureModal(){
    var modal = document.getElementById('authOverlay');
    if(modal){
      return modal;
    }
    modal = document.createElement('div');
    modal.id = 'authOverlay';
    modal.className = 'auth_overlay';
    modal.hidden = true;
    modal.innerHTML = [
      '<div class="auth_modal" role="dialog" aria-modal="true" aria-labelledby="authTitle">',
      ' <button type="button" class="auth_close" id="authCloseBtn" aria-label="Close">×</button>',
      ' <h3 id="authTitle">Аккаунт</h3>',
      ' <p class="auth_sub">Войдите, чтобы хранить проекты в облаке и синхронизировать устройства.</p>',
      ' <div class="auth_forms">',
      '   <form id="signInForm" class="auth_form">',
      '     <h4>Вход</h4>',
      '     <input type="email" id="authSignInEmail" placeholder="Email" required />',
      '     <input type="password" id="authSignInPassword" placeholder="Пароль" required />',
      '     <button type="submit" class="calc_action_btn">Войти</button>',
      '   </form>',
      '   <form id="signUpForm" class="auth_form">',
      '     <h4>Регистрация</h4>',
      '     <input type="email" id="authSignUpEmail" placeholder="Email" required />',
      '     <input type="password" id="authSignUpPassword" placeholder="Пароль" required />',
      '     <button type="submit" class="calc_action_btn">Создать аккаунт</button>',
      '   </form>',
      ' </div>',
      ' <div id="authStatus" class="auth_status"></div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    modal.addEventListener('click', function(e){
      if(e.target === modal){ close(); }
    });

    document.getElementById('authCloseBtn').addEventListener('click', close);

    document.getElementById('signInForm').addEventListener('submit', function(e){
      e.preventDefault();
      var email = document.getElementById('authSignInEmail').value.trim();
      var pass = document.getElementById('authSignInPassword').value;
      var preSignInLocal = (root.userData && typeof root.userData.readLocalProjects === 'function')
        ? (root.userData.readLocalProjects() || []).slice(0)
        : getLocalProjectsFallback().slice(0);
      root.__skipNextAuthAutoLoad = true;
      setStatus(t('Вход...', 'Signing in...'));
      root.auth.signIn(email, pass).then(function(res){
        if(!res.ok){
          root.__skipNextAuthAutoLoad = false;
          setStatus(res.message || t('Не удалось войти', 'Sign in failed'));
          return;
        }
        setStatus(t('Вход выполнен', 'Signed in'));
        if(analytics() && analytics().capture){
          analytics().capture('login_success', {method:'email_password'});
        }
        if(root.userData && root.userData.maybeOfferImportLocal){
          root.userData.maybeOfferImportLocal(preSignInLocal).then(function(importRes){
            var skipped = importRes && importRes.reason === 'user_skipped';
            if(skipped){
              if(typeof window.renderCalcActions == 'function'){ window.renderCalcActions(); }
              if(typeof window.refreshHistoryTab == 'function'){ window.refreshHistoryTab(); }
              close();
              return;
            }
            if(root.userData && root.userData.loadCloudToLocal){
              root.userData.loadCloudToLocal().finally(function(){
                if(typeof window.renderCalcActions == 'function'){ window.renderCalcActions(); }
                if(typeof window.refreshHistoryTab == 'function'){ window.refreshHistoryTab(); }
                close();
              });
              return;
            }
            close();
          });
        }else{
          close();
        }
      });
    });

    document.getElementById('signUpForm').addEventListener('submit', function(e){
      e.preventDefault();
      var email = document.getElementById('authSignUpEmail').value.trim();
      var pass = document.getElementById('authSignUpPassword').value;
      setStatus(t('Регистрация...', 'Signing up...'));
      root.auth.signUp(email, pass).then(function(res){
        if(!res.ok){
          setStatus(res.message || t('Не удалось зарегистрироваться', 'Sign up failed'));
          return;
        }
        setStatus(res.message || t('Аккаунт создан. Проверьте email для подтверждения, если включено.', 'Account created. Check your email if confirmation is enabled.'));
        if(analytics() && analytics().capture){
          analytics().capture('signup_success', {method:'email_password'});
        }
      });
    });

    return modal;
  }

  function ensureCloudPanel(){
    var panel = document.getElementById('cloudProjectsOverlay');
    if(panel){ return panel; }
    panel = document.createElement('div');
    panel.id = 'cloudProjectsOverlay';
    panel.className = 'auth_overlay';
    panel.hidden = true;
    panel.innerHTML = [
      '<div class="auth_modal projects_modal" role="dialog" aria-modal="true" aria-labelledby="projectsTitle">',
      ' <button type="button" class="auth_close" id="projectsCloseBtn" aria-label="Close">×</button>',
      ' <h3 id="projectsTitle">My Projects</h3>',
      ' <p class="auth_sub">Проекты аккаунта. Можно открыть или удалить.</p>',
      ' <div id="cloudProjectsList" class="projects_list"></div>',
      '</div>'
    ].join('');
    document.body.appendChild(panel);
    panel.addEventListener('click', function(e){ if(e.target === panel){ closeProjects(); } });
    document.getElementById('projectsCloseBtn').addEventListener('click', closeProjects);
    return panel;
  }

  function setStatus(msg){
    var status = document.getElementById('authStatus');
    if(status){ status.textContent = msg || ''; }
  }

  function open(){
    var modal = ensureModal();
    modal.hidden = false;
    document.body.classList.add('auth_open');
    setStatus('');
  }

  function close(){
    var modal = document.getElementById('authOverlay');
    if(!modal){ return; }
    modal.hidden = true;
    document.body.classList.remove('auth_open');
  }

  function getLocalProjectsFallback(){
    if(typeof window.readSavedCalcs === 'function'){
      return window.readSavedCalcs() || [];
    }
    return [];
  }

  function renderCloudProjects(){
    var host = document.getElementById('cloudProjectsList');
    if(!host){ return; }
    host.innerHTML = '<div class="history_empty">'+t('Загрузка...', 'Loading...')+'</div>';

    var provider = (root.userData && typeof root.userData.loadProjects === 'function')
      ? root.userData.loadProjects({forceLocal:false})
      : Promise.resolve({ok:true, items:getLocalProjectsFallback()});

    provider.then(function(result){
      var list = result && result.items ? result.items : getLocalProjectsFallback();
      if(!list.length){
        host.innerHTML = '<div class="history_empty">'+t('Нет проектов', 'No projects')+'</div>';
        return;
      }
      var html = '';
      for(var i=0;i<list.length;i++){
        var p = list[i];
        var title = p.name || (p.isSchema ? p.nuten : (p.nuten+' / '+p.pole));
        html += '<div class="project_row">';
        html += '<div><b>'+title+'</b><div class="project_meta">'+(p.ts ? p.ts.substring(0,16).replace('T',' ') : '')+'</div></div>';
        html += '<div class="project_actions">';
        html += '<button type="button" class="calc_action_btn" data-open="'+p.id+'">'+t('Открыть', 'Open')+'</button>';
        html += '<button type="button" class="calc_action_btn" data-del="'+p.id+'">'+t('Удалить', 'Delete')+'</button>';
        html += '</div></div>';
      }
      host.innerHTML = html;
      host.querySelectorAll('[data-open]').forEach(function(btn){
        btn.addEventListener('click', function(){
          if(typeof window.loadSavedCalcById == 'function'){
            window.loadSavedCalcById(this.getAttribute('data-open'));
          }
          closeProjects();
        });
      });
      host.querySelectorAll('[data-del]').forEach(function(btn){
        btn.addEventListener('click', function(){
          var id = this.getAttribute('data-del');
          var removePromise;
          if(root.userData && typeof root.userData.deleteProject === 'function'){
            removePromise = root.userData.deleteProject(id);
          }else if(typeof window.deleteSavedCalcById === 'function'){
            window.deleteSavedCalcById(id);
            removePromise = Promise.resolve({ok:true});
          }else{
            removePromise = Promise.resolve({ok:false});
          }
          removePromise.finally(function(){
            if(typeof window.renderCalcActions == 'function'){ window.renderCalcActions(); }
            if(typeof window.refreshHistoryTab == 'function'){ window.refreshHistoryTab(); }
            renderCloudProjects();
          });
        });
      });
    }).catch(function(){
      host.innerHTML = '<div class="history_empty">'+t('Ошибка загрузки проектов', 'Failed to load projects')+'</div>';
    });
  }

  function openProjects(){
    var panel = ensureCloudPanel();
    panel.hidden = false;
    document.body.classList.add('auth_open');
    renderCloudProjects();
  }

  function closeProjects(){
    var panel = document.getElementById('cloudProjectsOverlay');
    if(!panel){ return; }
    panel.hidden = true;
    document.body.classList.remove('auth_open');
  }

  function updateHeaderState(){
    var st = root.auth ? root.auth.getState() : {isAuthenticated:false};
    var loginBtn = document.getElementById('authBtn');
    var projectsBtn = document.getElementById('myProjectsBtn');
    var chip = document.getElementById('userChip');
    if(loginBtn){
      loginBtn.textContent = st.isAuthenticated ? t('Выйти', 'Sign out') : t('Войти', 'Sign in');
    }
    if(projectsBtn){
      projectsBtn.textContent = t('Мои проекты', 'My projects');
    }
    if(projectsBtn){
      projectsBtn.hidden = !st.isAuthenticated;
    }
    if(chip){
      chip.textContent = st.isAuthenticated ? ((st.currentUser && st.currentUser.email) || 'user') : t('Гость', 'Guest');
      chip.classList.toggle('is_guest', !st.isAuthenticated);
    }
  }

  function bindHeaderButtons(){
    var loginBtn = document.getElementById('authBtn');
    var projectsBtn = document.getElementById('myProjectsBtn');
    if(loginBtn && !loginBtn.dataset.bound){
      loginBtn.dataset.bound = '1';
      loginBtn.addEventListener('click', function(){
        var st = root.auth ? root.auth.getState() : {isAuthenticated:false};
        if(st.isAuthenticated){
          root.auth.signOut().then(function(){
            if(analytics() && analytics().capture){
              analytics().capture('logout_completed', {});
            }
            if(typeof window.renderCalcActions == 'function'){ window.renderCalcActions(); }
            if(typeof window.refreshHistoryTab == 'function'){ window.refreshHistoryTab(); }
            updateHeaderState();
          });
          return;
        }
        open();
      });
    }
    if(projectsBtn && !projectsBtn.dataset.bound){
      projectsBtn.dataset.bound = '1';
      projectsBtn.addEventListener('click', function(){
        openProjects();
      });
    }
  }

  function init(){
    bindHeaderButtons();
    updateHeaderState();
    if(root.auth && root.auth.onAuthStateChange){
      root.auth.onAuthStateChange(function(){
        updateHeaderState();
      });
    }
  }

  root.authUI = {
    init: init,
    open: open,
    close: close,
    openProjects: openProjects,
    closeProjects: closeProjects,
    updateHeaderState: updateHeaderState,
    renderCloudProjects: renderCloudProjects
  };
})();
