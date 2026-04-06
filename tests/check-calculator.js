#!/usr/bin/env node

function kgvLoop(a, b) {
  let x = a;
  let y = b;
  while (x !== y) {
    if (x < y) x += a;
    else y += b;
  }
  return x;
}

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

function validateInputs(slots, poles) {
  if (slots % 3 !== 0 || slots < 3) return 'slots_div_3';
  if (poles % 2 !== 0 || poles < 2) return 'poles_even';
  if (slots === poles) return 'slots_not_equal_poles';
  return 'ok';
}

function run() {
  const report = {
    lcmChecks: { total: 0, failed: [] },
    validationChecks: { total: 0, failed: [] }
  };

  for (let slots = 3; slots <= 96; slots += 3) {
    for (let poles = 2; poles <= 48; poles += 2) {
      if (slots === poles) continue;
      const got = kgvLoop(slots, poles);
      const exp = lcm(slots, poles);
      report.lcmChecks.total += 1;
      if (got !== exp) {
        report.lcmChecks.failed.push({ slots, poles, got, exp });
      }
    }
  }

  const validationCases = [
    { slots: 9, poles: 12, exp: 'ok' },
    { slots: 8, poles: 12, exp: 'slots_div_3' },
    { slots: 12, poles: 7, exp: 'poles_even' },
    { slots: 12, poles: 12, exp: 'slots_not_equal_poles' },
    { slots: 3, poles: 2, exp: 'ok' },
    { slots: 0, poles: 2, exp: 'slots_div_3' },
    { slots: 15, poles: 1, exp: 'poles_even' }
  ];

  for (const t of validationCases) {
    report.validationChecks.total += 1;
    const got = validateInputs(t.slots, t.poles);
    if (got !== t.exp) {
      report.validationChecks.failed.push({ ...t, got });
    }
  }

  const lcmOk = report.lcmChecks.failed.length === 0;
  const valOk = report.validationChecks.failed.length === 0;

  console.log('=== Calculator Checks ===');
  console.log(`LCM/KgV: ${lcmOk ? 'OK' : 'FAIL'} (${report.lcmChecks.total} cases)`);
  console.log(`Validation rules: ${valOk ? 'OK' : 'FAIL'} (${report.validationChecks.total} cases)`);

  if (!lcmOk) {
    console.log('\nLCM mismatches:');
    for (const f of report.lcmChecks.failed.slice(0, 20)) {
      console.log(` slots=${f.slots} poles=${f.poles} got=${f.got} exp=${f.exp}`);
    }
  }

  if (!valOk) {
    console.log('\nValidation mismatches:');
    for (const f of report.validationChecks.failed) {
      console.log(` slots=${f.slots} poles=${f.poles} got=${f.got} exp=${f.exp}`);
    }
  }

  process.exit(lcmOk && valOk ? 0 : 1);
}

run();
