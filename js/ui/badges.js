(function(){
  var root = window.MotorProduct = window.MotorProduct || {};

  function hasPro(){
    return root.pro && typeof root.pro.isProUser == 'function' && root.pro.isProUser();
  }

  function markButtons(){
    var compareBtns = document.querySelectorAll('[onclick*="runSchemeComparison"], [onclick*="compareWithBestHistory"]');
    var csvBtns = document.querySelectorAll('[onclick*="exportCurrentCalc(\'csv\')"]');
    var targets = [];
    var i;
    for(i=0;i<compareBtns.length;i++){ targets.push(compareBtns[i]); }
    for(i=0;i<csvBtns.length;i++){ targets.push(csvBtns[i]); }
    for(i=0;i<targets.length;i++){
      var btn = targets[i];
      if(!btn){ continue; }
      btn.classList.toggle('is_pro_locked', !hasPro());
      var label = btn.textContent || '';
      if(!hasPro() && label.indexOf('PRO') === -1){
        btn.textContent = label + ' · PRO';
      }
      if(hasPro()){
        btn.textContent = label.replace(/\s*·\s*PRO/g, '');
      }
    }

    var upgradeBtn = document.getElementById('upgradeBtn');
    if(upgradeBtn){
      upgradeBtn.textContent = hasPro() ? 'PRO ✓' : 'PRO';
    }
  }

  function refresh(){
    setTimeout(markButtons, 0);
  }

  root.uiBadges = {
    refresh: refresh
  };
})();
