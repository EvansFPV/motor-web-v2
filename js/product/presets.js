(function(){
  var root = window.MotorProduct = window.MotorProduct || {};

  var registry = {
    p_9_12: {id:'p_9_12', label:'9 / 12 BLDC', nuten:'9', pole:'12', schalt:'-', tier:'free'},
    p_12_14: {id:'p_12_14', label:'12 / 14', nuten:'12', pole:'14', schalt:'-', tier:'free'},
    p_15_18: {id:'p_15_18', label:'15 / 18', nuten:'15', pole:'18', schalt:'Y', tier:'pro'},
    p_18_20: {id:'p_18_20', label:'18 / 20 Torque', nuten:'18', pole:'20', schalt:'Y', tier:'pro'}
  };

  function isProPreset(id){
    if(!registry[id]){
      return false;
    }
    return registry[id].tier === 'pro';
  }

  function withBadge(label, isPro){
    if(!isPro){
      return label;
    }
    return label + ' · PRO';
  }

  function filterPresetList(list){
    var pro = root.pro;
    if(!pro || typeof pro.isProUser != 'function' || pro.isProUser()){
      return list;
    }
    var out = [];
    for(var i=0;i<list.length;i++){
      var p = list[i];
      var proFlag = p && p.id ? isProPreset(p.id) : !!p.proOnly;
      if(!proFlag){
        out.push(p);
      }
    }
    return out;
  }

  root.presetsProduct = {
    registry: registry,
    isProPreset: isProPreset,
    withBadge: withBadge,
    filterPresetList: filterPresetList
  };
})();
