(function(){
  var root = window.MotorProduct = window.MotorProduct || {};

  var plans = {
    free: {
      id: 'free',
      label: 'Free',
      description: 'Базовый доступ для расчёта и визуализации.',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'basic_calculation',
        'basic_visualization',
        'basic_magnet_advisor',
        'basic_history',
        'basic_presets',
        'help'
      ]
    },
    pro_monthly: {
      id: 'pro_monthly',
      planName: 'pro',
      label: 'PRO Monthly',
      description: 'Расширенный режим для инженеров и мастерских.',
      monthlyPrice: 9,
      yearlyPrice: null,
      features: [
        'unlimited_saved_projects',
        'compare_mode',
        'advanced_export_csv',
        'advanced_presets',
        'advanced_history_management',
        'advanced_magnet_hooks'
      ]
    },
    pro_yearly: {
      id: 'pro_yearly',
      planName: 'pro',
      label: 'PRO Yearly',
      description: 'Оптимальный вариант для регулярного использования.',
      monthlyPrice: null,
      yearlyPrice: 79,
      features: [
        'unlimited_saved_projects',
        'compare_mode',
        'advanced_export_csv',
        'advanced_presets',
        'advanced_history_management',
        'advanced_magnet_hooks'
      ]
    }
  };

  function getPlans(){
    return plans;
  }

  function getPlan(planId){
    return plans[planId] || plans.free;
  }

  function getDefaultCheckoutPlan(){
    return 'pro_monthly';
  }

  root.pricing = {
    getPlans: getPlans,
    getPlan: getPlan,
    getDefaultCheckoutPlan: getDefaultCheckoutPlan
  };
})();
