(function(){
  var root = window.MotorProduct = window.MotorProduct || {};
  var modal = null;
  var lastFeature = '';
  var lastSource = '';

  function analytics(){ return root.analytics; }

  function ensureModal(){
    if(modal){
      return modal;
    }
    modal = document.createElement('div');
    modal.id = 'proPaywall';
    modal.className = 'pro_paywall_overlay';
    modal.hidden = true;
    modal.innerHTML = [
      '<div class="pro_paywall" role="dialog" aria-modal="true" aria-labelledby="proPaywallTitle">',
      '  <button type="button" class="pro_paywall_close" id="proPaywallClose" aria-label="Close">×</button>',
      '  <h3 id="proPaywallTitle"><span class="brand_mark">MotorLab</span> PRO</h3>',
      '  <p id="proPaywallReason" class="pro_paywall_reason"></p>',
      '  <ul class="pro_paywall_list">',
      '    <li>Безлимитные сохранения и пользовательские пресеты</li>',
      '    <li>Сравнение схем и расширенное управление историей</li>',
      '    <li>Расширенный экспорт и дальнейшие инженерные модули</li>',
      '  </ul>',
      '  <div class="pro_paywall_actions">',
      '    <button type="button" class="calc_action_btn" id="proPaywallUpgrade">Оформить PRO</button>',
      '    <button type="button" class="calc_action_btn" id="proPaywallRestore">Восстановить доступ</button>',
      '    <button type="button" class="calc_action_btn" id="proPaywallDismiss">Позже</button>',
      '  </div>',
      '  <p class="pro_paywall_note">Оплата и верификация подписки должны подтверждаться на сервере.</p>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    modal.addEventListener('click', function(e){
      if(e.target === modal){
        close();
      }
    });

    var closeBtn = document.getElementById('proPaywallClose');
    var dismissBtn = document.getElementById('proPaywallDismiss');
    var upgradeBtn = document.getElementById('proPaywallUpgrade');
    var restoreBtn = document.getElementById('proPaywallRestore');

    if(closeBtn){ closeBtn.addEventListener('click', close); }
    if(dismissBtn){ dismissBtn.addEventListener('click', close); }

    if(upgradeBtn){
      upgradeBtn.addEventListener('click', function(){
        if(analytics() && analytics().captureUpgradeCTA){
          analytics().captureUpgradeCTA(lastSource || 'paywall', {feature_name:lastFeature});
        }
        if(root.billing && typeof root.billing.startCheckout == 'function'){
          var plan = root.pricing && root.pricing.getDefaultCheckoutPlan ? root.pricing.getDefaultCheckoutPlan() : 'pro_monthly';
          root.billing.startCheckout(plan, lastSource || 'paywall');
        }
      });
    }

    if(restoreBtn){
      restoreBtn.addEventListener('click', function(){
        if(analytics() && analytics().capture){
          analytics().capture('restore_access_attempted', {
            feature_name: lastFeature,
            paywall_source: lastSource || ''
          });
        }
        if(root.entitlements && typeof root.entitlements.restoreAccess == 'function'){
          root.entitlements.restoreAccess().then(function(state){
            if(state && state.plan === 'pro' && root.pro && typeof root.pro.markProUnlocked == 'function'){
              root.pro.markProUnlocked('restore_access');
              close();
            }
          });
        }
      });
    }

    return modal;
  }

  function featureLabel(featureKey){
    var map = {
      compare_mode: 'Сравнение схем',
      advanced_export_csv: 'CSV-экспорт',
      advanced_presets: 'Расширенные пресеты',
      unlimited_saved_projects: 'Безлимитные сохранения',
      advanced_history_management: 'Расширенная история'
    };
    return map[featureKey] || 'Эта функция';
  }

  function open(featureKey, source, opts){
    ensureModal();
    lastFeature = featureKey || '';
    lastSource = source || '';

    var reason = document.getElementById('proPaywallReason');
    if(reason){
      reason.textContent = featureLabel(featureKey) + ' доступна в PRO.';
    }

    modal.hidden = false;
    document.body.classList.add('paywall_open');

    if(analytics() && analytics().capturePaywall){
      analytics().capturePaywall(featureKey, source, opts || {});
    }
  }

  function close(){
    if(!modal){
      return;
    }
    modal.hidden = true;
    document.body.classList.remove('paywall_open');
  }

  root.paywall = {
    open: open,
    close: close
  };
})();
