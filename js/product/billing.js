(function(){
  var root = window.MotorProduct = window.MotorProduct || {};

  var config = {
    publishableKey: 'pk_live_REPLACE_ME',
    backend: {
      createCheckoutSession: '/api/billing/create-checkout-session',
      verifyCheckout: '/api/billing/checkout-complete',
      restoreEntitlements: '/api/billing/restore-entitlements',
      customerPortal: '/api/billing/customer-portal'
    },
    checkoutPlans: {
      pro_monthly: {priceId: 'price_REPLACE_MONTHLY', mode: 'subscription'},
      pro_yearly: {priceId: 'price_REPLACE_YEARLY', mode: 'subscription'}
    },
    fallbackPricingUrl: '#pricing-pro'
  };

  function analytics(){
    return root.analytics;
  }

  function startCheckout(planId, sourceContext){
    var plan = planId || 'pro_monthly';
    if(analytics() && analytics().captureCheckout){
      analytics().captureCheckout(plan, sourceContext || 'unknown');
    }

    // Frontend integration point only. Real checkout requires backend session creation.
    var endpoint = config.backend.createCheckoutSession;
    var hasBackend = !!endpoint && endpoint.indexOf('/api/') === 0;

    if(!hasBackend){
      window.location.href = config.fallbackPricingUrl;
      return Promise.resolve({ok:false, reason:'missing_backend'});
    }

    return fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        planId: plan,
        source: sourceContext || '',
        // Backend should verify user/session and return secure checkout URL.
      })
    }).then(function(resp){
      if(!resp.ok){
        throw new Error('checkout_session_failed');
      }
      return resp.json();
    }).then(function(data){
      if(!data || !data.checkoutUrl){
        throw new Error('checkout_url_missing');
      }
      if(analytics() && analytics().capture){
        analytics().capture('checkout_redirected', {plan_name:plan, paywall_source:sourceContext || ''});
      }
      window.location.href = data.checkoutUrl;
      return {ok:true};
    }).catch(function(){
      if(analytics() && analytics().capture){
        analytics().capture('checkout_cancelled', {plan_name:plan, paywall_source:sourceContext || '', reason:'request_failed'});
      }
      return {ok:false, reason:'request_failed'};
    });
  }

  function handleCheckoutReturn(status, source){
    if(!status){
      return;
    }
    if(analytics() && analytics().capture){
      analytics().capture(status === 'success' ? 'checkout_completed' : 'checkout_cancelled', {
        paywall_source: source || 'return'
      });
    }
    if(status === 'success' && root.pro && typeof root.pro.markProUnlocked == 'function'){
      // TEMP UX unlock. Must be replaced/validated by server-side verification.
      root.pro.markProUnlocked('checkout_return_temp');
    }
  }

  root.billing = {
    config: config,
    startCheckout: startCheckout,
    handleCheckoutReturn: handleCheckoutReturn
  };
})();
