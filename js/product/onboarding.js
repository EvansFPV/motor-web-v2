(function(){
  var root = window.MotorProduct = window.MotorProduct || {};
  var KEY = 'motorlab_onboarding_v1';

  function analytics(){ return root.analytics; }

  function readState(){
    try{
      var raw = localStorage.getItem(KEY);
      if(!raw){
        return {seen:false, dismissed:false, completed:false};
      }
      var p = JSON.parse(raw);
      return {
        seen: !!p.seen,
        dismissed: !!p.dismissed,
        completed: !!p.completed
      };
    }catch(e){
      return {seen:false, dismissed:false, completed:false};
    }
  }

  function writeState(next){
    var st = readState();
    var merged = {
      seen: typeof next.seen === 'boolean' ? next.seen : st.seen,
      dismissed: typeof next.dismissed === 'boolean' ? next.dismissed : st.dismissed,
      completed: typeof next.completed === 'boolean' ? next.completed : st.completed
    };
    try{ localStorage.setItem(KEY, JSON.stringify(merged)); }catch(e){}
    return merged;
  }

  function applyQuickExample(){
    if(!document.Windungsrechner){
      return;
    }
    document.Windungsrechner.Nuten.value = '9';
    document.Windungsrechner.Pole.value = '12';
    if(typeof window.checkSPS == 'function'){ window.checkSPS('9','12',true); }
    if(typeof window.checkVerteilt == 'function'){ window.checkVerteilt(); }
    if(typeof window.berechnen == 'function'){ window.berechnen(); }
    if(analytics() && analytics().capture){
      analytics().capture('preset_loaded', {preset_name:'onboarding_9_12'});
    }
  }

  function openMiniTour(){
    if(typeof window.motorOpenMiniTour == 'function'){
      window.motorOpenMiniTour();
      return;
    }
    var btn = document.getElementById('helpTourBtn');
    if(btn){ btn.click(); }
  }

  function ensureHost(){
    var tabCalc = document.getElementById('tab_calc');
    if(!tabCalc){
      return false;
    }
    var host = document.getElementById('onboardingHost');
    if(host){
      return host;
    }
    host = document.createElement('div');
    host.id = 'onboardingHost';
    host.className = 'onboarding_host';
    tabCalc.insertBefore(host, tabCalc.firstChild);
    return host;
  }

  function render(){
    var st = readState();
    var host = ensureHost();
    if(!host){
      return;
    }
    if(st.dismissed || st.completed){
      host.innerHTML = '';
      return;
    }
    host.innerHTML = [
      '<div class="onboarding_card">',
      ' <div class="onboarding_text">',
      '   <strong>Добро пожаловать в <span class="brand_mark">MotorLab</span></strong>',
      '   <p>Быстрый старт: загрузите рабочий пример 9/12 или пройдите мини-тур.</p>',
      ' </div>',
      ' <div class="onboarding_actions">',
      '   <button type="button" class="calc_action_btn" id="onboardingExampleBtn">Как начать за 30 секунд</button>',
      '   <button type="button" class="calc_action_btn" id="onboardingTourBtn">Мини-тур</button>',
      '   <button type="button" class="calc_action_btn" id="onboardingDismissBtn">Скрыть</button>',
      ' </div>',
      '</div>'
    ].join('');

    var ex = document.getElementById('onboardingExampleBtn');
    var tour = document.getElementById('onboardingTourBtn');
    var dis = document.getElementById('onboardingDismissBtn');

    if(ex){
      ex.addEventListener('click', function(){
        applyQuickExample();
        writeState({seen:true, completed:true});
        if(analytics() && analytics().capture){
          analytics().capture('onboarding_completed', {method:'quick_example'});
        }
        render();
      });
    }
    if(tour){
      tour.addEventListener('click', function(){
        openMiniTour();
        writeState({seen:true});
      });
    }
    if(dis){
      dis.addEventListener('click', function(){
        writeState({seen:true, dismissed:true});
        if(analytics() && analytics().capture){
          analytics().capture('onboarding_dismissed', {source:'onboarding_card'});
        }
        render();
      });
    }
  }

  function init(){
    var st = readState();
    if(!st.seen && analytics() && analytics().capture){
      analytics().capture('onboarding_started', {source:'first_launch'});
    }
    render();
  }

  root.onboarding = {
    init: init,
    render: render,
    readState: readState,
    writeState: writeState
  };
})();
