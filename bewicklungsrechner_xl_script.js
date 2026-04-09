var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");


//bei domredy starten
var isInit = false;
window.onDomReady = function(fn){
	if(window.addEventListener){
		window.addEventListener("DOMContentLoaded", fn, false);
	}else if(window.addEvent){
		window.addEvent('domready',fn);
	}else{
		document.onreadystatechange = function(){
			if(document.readyState == "interactive"  || document.readyState == "loaded" || document.readyState == "complete"){
				!isInit ? fn():0;
				isInit = true;				
			}
		}
        }
}
window.onDomReady(jsStart);

//für die einzelnen schritte
var v=window.location.search.substring(1, location.search.length).split('&');
var getVars = Array();
for(var i=0; i<v.length;i++){
	var temp = v[i].split('=');
	getVars[temp[0].toLowerCase()] = temp[1];
}
var act_schritt=1;
var nutenx = false;
var polex = false;
var schemax = false;
var schemay = false;
var schaltx = false;
var istSPS = false;
var verteilt = false;
var vonHand = false;
var SPSselector = document.createElement('select');
var schaltxy = false;
var verkuerzungValue = 0;
var schraegung_dazu=false;
var nutungsfaktor_dazu = false;
var rotorMagnetDiameterValue = '';
var magnetGoalValue = 'balanced';
var airGapValue = '';
var magnetThicknessValue = '';
var statorDiameterValue = '';
var schemeCalculated = false;
var fehlerV = false;
var enhancedView = {
	mode: 'winding',
	phase: 'all',
	showDirection: false,
	showSlots: true
};
var enhancedHoverPhase = 'all';


//für den wickelfactor
var WF = Array();
var WF1 = Array(Array(),Array());
var WF2 = Array(Array(),Array());
var WF3 = Array(Array(),Array());
var t = Array(0.25,0.55);


//wickelfacktor globsl
var w_factor = 0;
var s_advanced = false;
var ungenau = '';
var currentResultMeta = {
	kgv: false,
	wf: false,
	wfNumeric: false,
	balance: false,
	step: false,
	quality: false,
	assessment: false,
	magnet: false,
	schema: '',
	nuten: false,
	pole: false
};
var SAVED_CALC_KEY = 'winding_saved_calculations_v1';
var USER_PRESETS_KEY = 'winding_user_presets_v1';
var _lastCalcN = 0;
var _lastCalcP = 0;
var _calcBusy = false;
var _toastTimer = null;




//Sprachen
var lang = Array();

//Sprachen die zur auswahl stehen
lang[1] = 'de';
lang[2] = 'en';
lang[3] = 'ru';

// Die wörter in den verschiedenen sprachen

lang['nuten_de'] = 'Nuten';
lang['nuten_en'] = 'Slots';

lang['pole_de'] = 'Pole';
lang['pole_en'] = 'Magnet Poles';

lang['berechnen_de'] = 'Berechnen';
lang['berechnen_en'] = 'Calculate';

lang['kgv_de'] = 'KgV';
lang['kgv_en'] = 'LCM';

lang['rastetn1_de'] = 'Diese Nut/Pol kombination rastet voraussichtlich';
lang['rastetn1_en'] = 'This slot/magnet pole combination will have';

lang['rastetn2_de'] = 'mal pro Umdrehung';
lang['rastetn2_en'] = 'cogging steps per turn';

lang['kein_html5_de'] = '<p>Ihr Browser unterstützt kein HTML 5!<br />Grafische Darstellung nicht möglich.</p>';
lang['kein_html5_en'] = '<p>Your browser does not support HTML 5!<br /> graphical representation is not possible. </p>';

lang['nut_3_teilbar_de'] = 'Nutanzahl muss durch 3 teilbar sein!';
lang['nut_3_teilbar_en'] = 'Number of slots must be divisible by 3!';

lang['pol_grade_de'] = 'Polanzahl muss gerade sein!';
lang['pol_grade_en'] = 'Number of magnet poles must be divisible by 2!';

lang['nut_pol_ungleich_de'] = 'Polanzahl muss ungleich Nutanzahl sein!';
lang['nut_pol_ungleich_en'] = 'Magnet pole number and slot number must be different!';

lang['unausgewogen_de'] = 'Lösung unausgewogen!';
lang['unausgewogen_en'] = 'Unbalanced solution!';

lang['schritt_schritt_de'] = 'Schritt für Schritt';
lang['schritt_schritt_en'] = 'Winding animation';

lang['schritt_zurueck_de'] = 'Schritt zurück';
lang['schritt_zurueck_en'] = 'step back';

lang['schritt_vor_de'] = 'Nächster schritt';
lang['schritt_vor_en'] = 'next step';

lang['anfang_de'] = 'Anfang';
lang['anfang_en'] = 'Start';

lang['ende_de'] = 'Ende';
lang['ende_en'] = 'End';

lang['kein_wickelfaktor_de'] = 'Wickelfaktor berechnung nicht möglich. ';
lang['kein_wickelfaktor_en'] = 'Winding factor calculation is not possible.';

lang['wickelfaktor_de'] = 'Und hat einen Wickelfaktor von: ';
lang['wickelfaktor_en'] = 'And its winding factor is: ';

lang['erweitert_de'] = 'erweitert';
lang['erweitert_en'] = 'advanced';

lang['stator_d_de'] = 'Stator Durchmesser:';
lang['stator_d_en'] = 'Stator diameter:';

lang['nut_B_de'] = 'Nut Öffnung:';
lang['nut_B_en'] = 'Slot opening:';

lang['nutfaktor_de'] = 'Nutungsfaktor einbeziehen';
lang['nutfaktor_en'] = 'Involving the slot factor';

lang['einfach_de'] = 'einfach';
lang['einfach_en'] = 'simple';

lang['schema_de'] = 'Schema';
lang['schema_en'] = 'Scheme';

lang['hammer_leer_de'] = 'für leeren Hammer';
lang['hammer_leer_en'] = 'for empty hammer heads';

lang['teil_motor_de'] = 'um einen Teilmotor abzutrennen';
lang['teil_motor_en'] = 'to seperate a part motor';

lang['WF_tabelle_de'] = 'Wickelfaktoren für dieses Bewicklungschema';
lang['WF_tabelle_en'] = 'Winding factors for this winding scheme';

lang['WF_de'] = 'Wickelfaktor';
lang['WF_en'] = 'Winding factor';
lang['zeit_de'] = 'Zeit';
lang['zeit_en'] = 'Time';
lang['windungen_de'] = 'Windungen';
lang['windungen_en'] = 'Turns';
lang['anim_zeigen_de'] = 'Animation zeigen';
lang['anim_zeigen_en'] = 'Show animation';
lang['max_de'] = 'max';
lang['max_en'] = 'max';
lang['schnitt_de'] = 'schnitt';
lang['schnitt_en'] = 'avg';
lang['min_de'] = 'min';
lang['min_en'] = 'min';

lang['sieheauch_de'] = 'Siehe auch:';
lang['sieheauch_en'] = 'See also:'; 

lang['Schwankend_de'] = 'Unausgewogen!';
lang['Schwankend_en'] = 'Unbalanced!'; 

lang['inTabelle_de'] = 'in die Tabelle';
lang['inTabelle_en'] = 'into the table'; 

lang['schraegung1_de'] = 'Schrägung der Nuten';
lang['schraegung1_en'] = 'Skewed slots'; 

lang['schraegung2_de'] = 'Um wieviel Nuten wurde geschrägt';
lang['schraegung2_en'] = 'By how many slots is the skewing'; 

lang['Schwankend2_de'] = 'Wickelfaktor Schwankend! Anzeige nicht möglich';
lang['Schwankend2_en'] = 'Winding factor unbalanced! Representation is not possible.'; 

lang['kuerzung_de'] = "Verkürzung";
lang['kuerzung_en'] = "Shortening";
lang['anwenden_de'] = "Anwenden";
lang['anwenden_en'] = "Apply";
lang['adv_help_title_de'] = "So nutzt man den erweiterten Wickelfaktor";
lang['adv_help_title_en'] = "How to use advanced winding factor";
lang['adv_help_1_de'] = "1) Trage Stator-Durchmesser und Nutöffnung ein.";
lang['adv_help_1_en'] = "1) Enter stator diameter and slot opening.";
lang['adv_help_2_de'] = "2) Aktiviere den Haken, wenn der Nutfaktor in die Tabelle einfließen soll.";
lang['adv_help_2_en'] = "2) Enable the checkbox to include slot factor into the table.";
lang['adv_help_3_de'] = "3) Trage die Schrägung in Nuten ein und aktiviere den zweiten Haken bei Bedarf.";
lang['adv_help_3_en'] = "3) Enter skew in slots and enable the second checkbox if needed.";
lang['adv_help_4_de'] = "4) Klicke auf Anwenden, um die Tabelle mit den Zusatzfaktoren neu zu berechnen.";
lang['adv_help_4_en'] = "4) Press Apply to recalculate the table with advanced factors.";
lang['rotor_magnet_d_de'] = 'Rotor-Magnet Durchmesser:';
lang['rotor_magnet_d_en'] = 'Rotor magnet diameter:';
lang['magnet_target_de'] = 'Zielmodus';
lang['magnet_target_en'] = 'Target mode';
lang['air_gap_de'] = 'Luftspalt:';
lang['air_gap_en'] = 'Air gap:';
lang['magnet_thickness_de'] = 'Magnetdicke:';
lang['magnet_thickness_en'] = 'Magnet thickness:';
lang['magnet_smooth_de'] = 'Smooth';
lang['magnet_smooth_en'] = 'Smooth';
lang['magnet_balanced_de'] = 'Balanced';
lang['magnet_balanced_en'] = 'Balanced';
lang['magnet_torque_de'] = 'Torque';
lang['magnet_torque_en'] = 'Torque';
lang['magnet_block_title_de'] = 'Empfohlene Magnetbreite';
lang['magnet_block_title_en'] = 'Recommended magnet width';
lang['magnet_pitch_de'] = 'Polteilung';
lang['magnet_pitch_en'] = 'Pole pitch';
lang['magnet_target_line_de'] = 'Ziel';
lang['magnet_target_line_en'] = 'Target';
lang['magnet_coverage_de'] = 'Empfohlene Abdeckung';
lang['magnet_coverage_en'] = 'Recommended coverage';
lang['magnet_suggested_de'] = 'Empfehlung';
lang['magnet_suggested_en'] = 'Suggested width';
lang['magnet_range_de'] = 'Nutzbarer Bereich';
lang['magnet_range_en'] = 'Useful range';
lang['magnet_comment_smooth_de'] = 'Smoother setup: etwas schmalerer Magnet reduziert Cogging und Laufrauschen.';
lang['magnet_comment_smooth_en'] = 'Smoother setup: slightly narrower magnets usually reduce cogging and running noise.';
lang['magnet_comment_balanced_de'] = 'Balanced setup: guter Startpunkt zwischen ruhigem Lauf und Drehmoment.';
lang['magnet_comment_balanced_en'] = 'Balanced setup: good starting point between smoothness and torque.';
lang['magnet_comment_torque_de'] = 'Torque-oriented setup: breitere Magnete erhöhen meist Fluss und Drehmoment, aber auch Cogging.';
lang['magnet_comment_torque_en'] = 'Torque-oriented setup: wider magnets usually increase flux and torque, but may increase cogging.';
lang['magnet_note_de'] = 'Hinweis: Empfehlung für Magnetbreite entlang der Bogenlänge, kein vollständiges Rotordesign.';
lang['magnet_note_en'] = 'Note: arc-width recommendation only, not a complete rotor design.';
lang['magnet_limit_title_de'] = 'Wichtige Einschränkung';
lang['magnet_limit_title_en'] = 'Important limitation';
lang['magnet_limit_intro_de'] = 'Dies ist eine Empfehlung für die Magnetbreite aus der Polteilung, kein vollständiger elektromagnetischer Rotor-Check.';
lang['magnet_limit_intro_en'] = 'This is a pole-pitch-based arc-width recommendation, not a full electromagnetic rotor calculation.';
lang['magnet_limit_factors_de'] = 'Reale Auswahl hängt zusätzlich ab von: Luftspalt, Magnetdicke, Magnetmaterial, Back-Iron, Statorbreite, Zahnhöhe, Ziel-KV und zulässiger Sättigung.';
lang['magnet_limit_factors_en'] = 'Real selection also depends on: air gap, magnet thickness, magnet grade, back iron, stator width, tooth height, target KV, and allowable saturation.';
lang['magnet_warn_title_de'] = 'V2 Prüfhinweise';
lang['magnet_warn_title_en'] = 'V2 heuristic checks';
lang['magnet_warn_cov_de'] = 'Hohe Abdeckung: Cogging kann steigen.';
lang['magnet_warn_cov_en'] = 'High coverage: cogging may increase.';
lang['magnet_warn_wide_de'] = 'Empfohlene Breite ist relativ groß für diese Polteilung.';
lang['magnet_warn_wide_en'] = 'Suggested width is relatively wide for this pole pitch.';
lang['magnet_warn_sat_de'] = 'Hohe Dicke/Luftspalt-Relation: Sättigungsrisiko prüfen.';
lang['magnet_warn_sat_en'] = 'High thickness-to-air-gap ratio: check saturation risk.';
lang['magnet_warn_backiron_de'] = 'Kleiner Back-Iron-Puffer möglich (Rotor-D nahe Stator-D).';
lang['magnet_warn_backiron_en'] = 'Possible limited back-iron margin (rotor D close to stator D).';
lang['magnet_warn_cov_gap_de'] = 'Hohe Abdeckung bei kleinem Luftspalt: Cogging-Sensitivität kann steigen.';
lang['magnet_warn_cov_gap_en'] = 'High coverage with small air gap: cogging sensitivity may increase.';
lang['magnet_warn_cov_thick_de'] = 'Hohe Abdeckung mit dickerem Magnet: Sättigung und Verluste prüfen.';
lang['magnet_warn_cov_thick_en'] = 'High coverage with thicker magnet: check saturation risk and losses.';
lang['magnet_levels_title_de'] = 'Implementierungsstufen';
lang['magnet_levels_title_en'] = 'Implementation levels';
lang['magnet_level_v1_de'] = 'V1: Rotor-D + Zielmodus + Polteilung + Breitenempfehlung';
lang['magnet_level_v1_en'] = 'V1: rotor diameter + target mode + pole pitch + width recommendation';
lang['magnet_level_v2_de'] = 'V2: + Luftspalt + Magnetdicke + Stator-D + Warnungen';
lang['magnet_level_v2_en'] = 'V2: + air gap + magnet thickness + stator diameter + warnings';
lang['magnet_level_v3_de'] = 'V3: Flux path, Back-Iron-Check, Zahnsättigung, KV-Trend, torque/cogging';
lang['magnet_level_v3_en'] = 'V3: flux path, back-iron check, tooth saturation, KV trend, torque/cogging';
lang['magnet_level_active_de'] = 'aktiv';
lang['magnet_level_active_en'] = 'active';
lang['magnet_level_next_de'] = 'nächster Schritt';
lang['magnet_level_next_en'] = 'next step';
lang['magnet_level_plan_de'] = 'Roadmap';
lang['magnet_level_plan_en'] = 'roadmap';
lang['magnet_need_input_de'] = 'Gib Rotor-Magnet Durchmesser ein, um Empfehlung zu erhalten.';
lang['magnet_need_input_en'] = 'Enter rotor magnet diameter to get recommendation.';
lang['magnet_need_scheme_de'] = 'Zuerst die Wicklung berechnen, dann Magnetempfehlung.';
lang['magnet_need_scheme_en'] = 'Calculate winding first, then magnet recommendation.';
lang['magnet_invalid_rotor_de'] = 'Ungültiger Rotor-Magnet Durchmesser.';
lang['magnet_invalid_rotor_en'] = 'Invalid rotor magnet diameter.';
lang['magnet_invalid_rotor_input_de'] = 'Input looks unrealistic or is not a valid number.';
lang['magnet_invalid_rotor_input_en'] = 'Input looks unrealistic or is not a valid number.';
lang['magnet_invalid_rotor_stator_de'] = 'Rotor-Durchmesser muss kleiner als Stator-Durchmesser sein.';
lang['magnet_invalid_rotor_stator_en'] = 'Rotor diameter must be smaller than stator diameter.';
lang['magnet_invalid_rotor_range_de'] = 'Rotor-Durchmesser außerhalb sinnvoller Grenzen.';
lang['magnet_invalid_rotor_range_en'] = 'Rotor diameter is outside a practical range.';
lang['magnet_warn_group_coverage_de'] = 'Abdeckung / Cogging';
lang['magnet_warn_group_coverage_en'] = 'Coverage / cogging';
lang['magnet_warn_group_saturation_de'] = 'Luftspalt / Dicke / Sättigung';
lang['magnet_warn_group_saturation_en'] = 'Air gap / thickness / saturation';
lang['magnet_warn_group_geometry_de'] = 'Rotor / Stator Geometrie';
lang['magnet_warn_group_geometry_en'] = 'Rotor / stator geometry';
lang['magnet_inline_pitch_de'] = 'Polteilung';
lang['magnet_inline_pitch_en'] = 'Pole pitch';
lang['magnet_inline_cov_de'] = 'Abdeckung';
lang['magnet_inline_cov_en'] = 'Coverage';
lang['magnet_inline_width_de'] = 'Breite';
lang['magnet_inline_width_en'] = 'Width';
lang['view_mode_de'] = 'Ansicht';
lang['view_mode_en'] = 'View';
lang['view_winding_de'] = 'Wicklung';
lang['view_winding_en'] = 'Winding';
lang['view_electrical_de'] = 'Elektrisches Diagramm';
lang['view_electrical_en'] = 'Electrical Diagram';
lang['view_table_de'] = 'Tabelle';
lang['view_table_en'] = 'Table';
lang['phase_filter_de'] = 'Phase';
lang['phase_filter_en'] = 'Phase';
lang['phase_all_de'] = 'Alle';
lang['phase_all_en'] = 'All';
lang['show_direction_de'] = 'Stromrichtung zeigen';
lang['show_direction_en'] = 'Show current direction';
lang['show_slots_de'] = 'Nutnummern zeigen';
lang['show_slots_en'] = 'Show slot numbers';
lang['slot_col_de'] = 'Nut';
lang['slot_col_en'] = 'Slot';
lang['phase_col_de'] = 'Phase';
lang['phase_col_en'] = 'Phase';
lang['dir_col_de'] = 'Richtung';
lang['dir_col_en'] = 'Direction';
lang['dir_plus_de'] = '+';
lang['dir_plus_en'] = '+';
lang['dir_minus_de'] = '-';
lang['dir_minus_en'] = '-';
lang['save_calc_de'] = 'Speichern';
lang['save_calc_en'] = 'Save';
lang['load_calc_de'] = 'Laden';
lang['load_calc_en'] = 'Load';
lang['export_calc_de'] = 'Export';
lang['export_calc_en'] = 'Export';
lang['share_calc_de'] = 'Share Link';
lang['share_calc_en'] = 'Share Link';
lang['presets_de'] = 'Presets';
lang['presets_en'] = 'Presets';
lang['apply_de'] = 'Anwenden';
lang['apply_en'] = 'Apply';
lang['saved_none_de'] = 'Keine gespeicherten Berechnungen';
lang['saved_none_en'] = 'No saved calculations';
lang['saved_ok_de'] = 'Berechnung gespeichert';
lang['saved_ok_en'] = 'Calculation saved';
lang['ren_calc_de'] = 'Umbenennen';
lang['ren_calc_en'] = 'Rename';
lang['del_calc_de'] = 'Löschen';
lang['del_calc_en'] = 'Delete';
lang['exp_json_de'] = 'JSON';
lang['exp_json_en'] = 'JSON';
lang['exp_csv_de'] = 'CSV';
lang['exp_csv_en'] = 'CSV';
lang['preset_save_de'] = 'Preset speichern';
lang['preset_save_en'] = 'Save preset';
lang['preset_saved_de'] = 'Preset gespeichert';
lang['preset_saved_en'] = 'Preset saved';
lang['rename_prompt_de'] = 'Neuer Name';
lang['rename_prompt_en'] = 'New name';
lang['deleted_ok_de'] = 'Gelöscht';
lang['deleted_ok_en'] = 'Deleted';
lang['share_ready_de'] = 'Link kopiert';
lang['share_ready_en'] = 'Link copied';
lang['share_not_ready_de'] = 'Bitte zuerst berechnen';
lang['share_not_ready_en'] = 'Please calculate first';
lang['assessment_title_de'] = 'Wickelbarkeit';
lang['assessment_title_en'] = 'Winding practicality';
lang['manual_score_de'] = 'Manuelles Wickeln';
lang['manual_score_en'] = 'Manual winding';
lang['cross_score_de'] = 'Kreuzungsrisiko';
lang['cross_score_en'] = 'Crossing risk';
lang['layout_score_de'] = 'Verlegeaufwand';
lang['layout_score_en'] = 'Layup complexity';
lang['complexity_de'] = 'Komplexität';
lang['complexity_en'] = 'Complexity';
lang['complexity_simple_de'] = 'einfach';
lang['complexity_simple_en'] = 'simple';
lang['complexity_medium_de'] = 'mittel';
lang['complexity_medium_en'] = 'medium';
lang['complexity_hard_de'] = 'schwierig';
lang['complexity_hard_en'] = 'hard';

lang['schicht_de'] = "schicht";
lang['schicht_en'] = "layer";
lang['schicht_ru'] = "слой";

// Русские переводы (основные элементы интерфейса)
lang['nuten_ru'] = 'Пазы';
lang['pole_ru'] = 'Магнитные полюса';
lang['berechnen_ru'] = 'Рассчитать';
lang['kgv_ru'] = 'НОК';
lang['rastetn1_ru'] = 'Эта комбинация пазов/полюсов даст примерно';
lang['rastetn2_ru'] = 'шагов коггинга на оборот';
lang['kein_html5_ru'] = '<p>Ваш браузер не поддерживает HTML5!<br />Графическое отображение недоступно.</p>';
lang['nut_3_teilbar_ru'] = 'Количество пазов должно делиться на 3!';
lang['pol_grade_ru'] = 'Количество полюсов должно быть четным!';
lang['nut_pol_ungleich_ru'] = 'Количество пазов и полюсов не должно совпадать!';
lang['unausgewogen_ru'] = 'Несбалансированное решение!';
lang['schritt_schritt_ru'] = 'Анимация намотки';
lang['schritt_zurueck_ru'] = 'шаг назад';
lang['schritt_vor_ru'] = 'следующий шаг';
lang['anfang_ru'] = 'Старт';
lang['ende_ru'] = 'Конец';
lang['kein_wickelfaktor_ru'] = 'Расчет коэффициента обмотки невозможен.';
lang['wickelfaktor_ru'] = 'Коэффициент обмотки: ';
lang['erweitert_ru'] = 'расширенный';
lang['stator_d_ru'] = 'Диаметр статора:';
lang['nut_B_ru'] = 'Ширина паза:';
lang['nutfaktor_ru'] = 'Учитывать коэффициент заполнения паза';
lang['einfach_ru'] = 'простой';
lang['schema_ru'] = 'Схема';
lang['hammer_leer_ru'] = 'пустой паз';
lang['teil_motor_ru'] = 'разделитель части мотора';
lang['WF_tabelle_ru'] = 'Коэффициенты обмотки для этой схемы';
lang['WF_ru'] = 'Коэффициент обмотки';
lang['zeit_ru'] = 'Угол';
lang['windungen_ru'] = 'Витки';
lang['anim_zeigen_ru'] = 'Показать анимацию';
lang['max_ru'] = 'макс';
lang['schnitt_ru'] = 'среднее';
lang['min_ru'] = 'мин';
lang['sieheauch_ru'] = 'См. также:';
lang['Schwankend_ru'] = 'Несбалансировано!';
lang['inTabelle_ru'] = 'в таблицу';
lang['schraegung1_ru'] = 'Скос пазов';
lang['schraegung2_ru'] = 'На сколько пазов выполнен скос';
lang['Schwankend2_ru'] = 'Коэффициент обмотки нестабилен! Показ невозможен.';
lang['kuerzung_ru'] = "Укорочение";
lang['anwenden_ru'] = "Применить";
lang['adv_help_title_ru'] = "Как пользоваться расширенным коэффициентом";
lang['adv_help_1_ru'] = "1) Введите диаметр статора и ширину паза.";
lang['adv_help_2_ru'] = "2) Включите флажок, если нужно учитывать коэффициент заполнения паза в таблице.";
lang['adv_help_3_ru'] = "3) Введите скос в пазах и включите второй флажок, если нужно учесть скос.";
lang['adv_help_4_ru'] = "4) Нажмите «Применить», чтобы пересчитать таблицу с учетом введенных параметров.";
lang['rotor_magnet_d_ru'] = 'Диаметр по магнитам ротора:';
lang['magnet_target_ru'] = 'Режим';
lang['air_gap_ru'] = 'Воздушный зазор:';
lang['magnet_thickness_ru'] = 'Толщина магнита:';
lang['magnet_smooth_ru'] = 'Плавный ход';
lang['magnet_balanced_ru'] = 'Сбалансированный';
lang['magnet_torque_ru'] = 'Момент';
lang['magnet_block_title_ru'] = 'Рекомендованная ширина магнита';
lang['magnet_pitch_ru'] = 'Полюсный шаг';
lang['magnet_target_line_ru'] = 'Целевой режим';
lang['magnet_coverage_ru'] = 'Рекомендуемое покрытие';
lang['magnet_suggested_ru'] = 'Рекомендуемая ширина';
lang['magnet_range_ru'] = 'Рабочий диапазон';
lang['magnet_comment_smooth_ru'] = 'Плавный режим: более узкий магнит обычно снижает коггинг и шум.';
lang['magnet_comment_balanced_ru'] = 'Сбалансированный режим: рабочий компромисс между плавностью и моментом.';
lang['magnet_comment_torque_ru'] = 'Режим момента: более широкий магнит повышает поток и момент, но может увеличить коггинг.';
lang['magnet_note_ru'] = 'Важно: это рекомендация по ширине магнита по дуге, а не полный расчёт ротора.';
lang['magnet_limit_title_ru'] = 'Важное ограничение';
lang['magnet_limit_intro_ru'] = 'Это рекомендация по ширине магнита по полюсному шагу, а не полный электромагнитный расчёт ротора.';
lang['magnet_limit_factors_ru'] = 'Реальный выбор дополнительно зависит от: воздушного зазора, толщины и марки магнита, толщины магнитопровода ротора, ширины статора, высоты зуба, целевого KV и допустимого насыщения.';
lang['magnet_warn_title_ru'] = 'Проверки уровня 2';
lang['magnet_warn_cov_ru'] = 'Высокое покрытие полюса: возможен рост коггинга.';
lang['magnet_warn_wide_ru'] = 'Рекомендуемая ширина получилась относительно большой для данного полюсного шага.';
lang['magnet_warn_sat_ru'] = 'Большое отношение толщины магнита к зазору: проверьте риск насыщения.';
lang['magnet_warn_backiron_ru'] = 'Возможен малый запас по магнитопроводу ротора (диаметр ротора близок к диаметру статора).';
lang['magnet_warn_cov_gap_ru'] = 'Высокое покрытие при малом зазоре: чувствительность к коггингу может вырасти.';
lang['magnet_warn_cov_thick_ru'] = 'Высокое покрытие и более толстый магнит: проверьте риск насыщения и потерь.';
lang['magnet_levels_title_ru'] = 'Уровни реализации';
lang['magnet_level_v1_ru'] = 'Уровень 1: диаметр ротора + режим + полюсный шаг + рекомендация ширины';
lang['magnet_level_v2_ru'] = 'Уровень 2: + воздушный зазор + толщина магнита + диаметр статора + предупреждения';
lang['magnet_level_v3_ru'] = 'Уровень 3: анализ магнитного потока, проверка магнитопровода ротора, оценка насыщения зуба, тренд KV, компромисс момент/коггинг';
lang['magnet_level_active_ru'] = 'активно';
lang['magnet_level_next_ru'] = 'следующий шаг';
lang['magnet_level_plan_ru'] = 'план';
lang['magnet_need_input_ru'] = 'Введите диаметр по магнитам, чтобы получить рекомендацию.';
lang['magnet_need_scheme_ru'] = 'Сначала выполните расчёт схемы, затем смотрите рекомендацию магнита.';
lang['magnet_invalid_rotor_ru'] = 'Некорректный диаметр ротора по магнитам.';
lang['magnet_invalid_rotor_input_ru'] = 'Введено нереалистичное значение или нечисловой формат.';
lang['magnet_invalid_rotor_stator_ru'] = 'Диаметр ротора должен быть меньше диаметра статора.';
lang['magnet_invalid_rotor_range_ru'] = 'Диаметр ротора вне разумного диапазона.';
lang['magnet_warn_group_coverage_ru'] = 'Покрытие / коггинг';
lang['magnet_warn_group_saturation_ru'] = 'Зазор / толщина / насыщение';
lang['magnet_warn_group_geometry_ru'] = 'Геометрия ротора и статора';
lang['magnet_inline_pitch_ru'] = 'Полюсный шаг';
lang['magnet_inline_cov_ru'] = 'Покрытие';
lang['magnet_inline_width_ru'] = 'Ширина';
lang['view_mode_ru'] = 'Режим';
lang['view_winding_ru'] = 'Намотка';
lang['view_electrical_ru'] = 'Электрическая диаграмма';
lang['view_table_ru'] = 'Таблица';
lang['phase_filter_ru'] = 'Фаза';
lang['phase_all_ru'] = 'Все';
lang['show_direction_ru'] = 'Показывать направление тока';
lang['show_slots_ru'] = 'Показывать номера пазов';
lang['slot_col_ru'] = 'Паз';
lang['phase_col_ru'] = 'Фаза';
lang['dir_col_ru'] = 'Направление';
lang['dir_plus_ru'] = '+';
lang['dir_minus_ru'] = '-';
lang['save_calc_ru'] = 'Сохранить';
lang['load_calc_ru'] = 'Загрузить';
lang['export_calc_ru'] = 'Экспорт';
lang['share_calc_ru'] = 'Поделиться ссылкой';
lang['presets_ru'] = 'Пресеты';
lang['apply_ru'] = 'Применить';
lang['saved_none_ru'] = 'Нет сохраненных расчетов';
lang['saved_ok_ru'] = 'Расчет сохранен';
lang['ren_calc_ru'] = 'Переименовать';
lang['del_calc_ru'] = 'Удалить';
lang['exp_json_ru'] = 'JSON';
lang['exp_csv_ru'] = 'CSV';
lang['preset_save_ru'] = 'Сохранить пресет';
lang['preset_saved_ru'] = 'Пресет сохранен';
lang['rename_prompt_ru'] = 'Новое имя';
lang['deleted_ok_ru'] = 'Удалено';
lang['share_ready_ru'] = 'Ссылка скопирована';
lang['share_not_ready_ru'] = 'Сначала выполните расчет';
lang['assessment_title_ru'] = 'Оценка намотки';
lang['manual_score_ru'] = 'Удобство ручной намотки';
lang['cross_score_ru'] = 'Риск пересечений';
lang['layout_score_ru'] = 'Сложность укладки';
lang['complexity_ru'] = 'Итоговая сложность';
lang['complexity_simple_ru'] = 'простая';
lang['complexity_medium_ru'] = 'средняя';
lang['complexity_hard_ru'] = 'сложная';
lang['eng_tools_title_de'] = 'Engineering tools';
lang['eng_tools_title_en'] = 'Engineering tools';
lang['eng_tools_title_ru'] = 'Инженерные инструменты';
lang['quality_title_de'] = 'Schemenqualität';
lang['quality_title_en'] = 'Scheme quality';
lang['quality_title_ru'] = 'Качество схемы';
lang['quality_excellent_de'] = 'Ausgezeichnet';
lang['quality_excellent_en'] = 'Excellent';
lang['quality_excellent_ru'] = 'Отличная';
lang['quality_normal_de'] = 'Normal';
lang['quality_normal_en'] = 'Normal';
lang['quality_normal_ru'] = 'Нормальная';
lang['quality_bad_de'] = 'Schlecht';
lang['quality_bad_en'] = 'Bad';
lang['quality_bad_ru'] = 'Плохая';
lang['recommend_title_de'] = 'Empfehlung';
lang['recommend_title_en'] = 'Recommendation';
lang['recommend_title_ru'] = 'Рекомендатор';
lang['recommend_shortening_de'] = 'Bestes shortening';
lang['recommend_shortening_en'] = 'Best shortening';
lang['recommend_shortening_ru'] = 'Лучшее укорочение';
lang['recommend_layer_de'] = 'Empf. Typ';
lang['recommend_layer_en'] = 'Recommended type';
lang['recommend_layer_ru'] = 'Рекомендованный тип';
lang['recommend_conn_de'] = 'Connection';
lang['recommend_conn_en'] = 'Connection';
lang['recommend_conn_ru'] = 'Подключение';
lang['compare_title_de'] = 'Schemenvergleich';
lang['compare_title_en'] = 'Scheme comparison';
lang['compare_title_ru'] = 'Сравнение схем';
lang['compare_select_a_de'] = 'Schema A';
lang['compare_select_a_en'] = 'Scheme A';
lang['compare_select_a_ru'] = 'Схема 1';
lang['compare_select_b_de'] = 'Schema B';
lang['compare_select_b_en'] = 'Scheme B';
lang['compare_select_b_ru'] = 'Схема 2';
lang['compare_run_de'] = 'Vergleichen';
lang['compare_run_en'] = 'Compare';
lang['compare_run_ru'] = 'Сравнить';
lang['metric_wf_de'] = 'Wickelfaktor';
lang['metric_wf_en'] = 'Winding factor';
lang['metric_wf_ru'] = 'Коэффициент';
lang['metric_balance_de'] = 'Balance';
lang['metric_balance_en'] = 'Balance';
lang['metric_balance_ru'] = 'Баланс';
lang['metric_step_de'] = 'Schritt';
lang['metric_step_en'] = 'Step';
lang['metric_step_ru'] = 'Шаг';
lang['metric_cogging_de'] = 'Cogging';
lang['metric_cogging_en'] = 'Cogging';
lang['metric_cogging_ru'] = 'Коггинг';
lang['metric_complexity_de'] = 'Komplexität';
lang['metric_complexity_en'] = 'Complexity';
lang['metric_complexity_ru'] = 'Сложность';
lang['compare_best_de'] = 'Mit bester Historie vergleichen';
lang['compare_best_en'] = 'Compare with best history';
lang['compare_best_ru'] = 'Сравнить с лучшей из истории';
lang['compare_best_none_de'] = 'Keine Historie zum Vergleich';
lang['compare_best_none_en'] = 'No history records to compare';
lang['compare_best_none_ru'] = 'Нет сохраненной истории для сравнения';
lang['history_magnet_ru'] = 'Магнит';
lang['history_magnet_en'] = 'Magnet';
lang['history_magnet_de'] = 'Magnet';
lang['history_mode_ru'] = 'режим';
lang['history_mode_en'] = 'mode';
lang['history_mode_de'] = 'Modus';
lang['history_cov_ru'] = 'покрытие';
lang['history_cov_en'] = 'coverage';
lang['history_cov_de'] = 'Abdeckung';
lang['history_w_ru'] = 'ширина';
lang['history_w_en'] = 'width';
lang['history_w_de'] = 'Breite';
lang['history_range_ru'] = 'диапазон';
lang['history_range_en'] = 'range';
lang['history_range_de'] = 'Bereich';
lang['history_warn_ok_ru'] = 'V2: без предупреждений';
lang['history_warn_ok_en'] = 'V2: no warnings';
lang['history_warn_ok_de'] = 'V2: ohne Warnungen';
lang['history_warn_has_ru'] = 'V2: есть предупреждения';
lang['history_warn_has_en'] = 'V2: warnings present';
lang['history_warn_has_de'] = 'V2: Warnungen vorhanden';
lang['history_warn_na_ru'] = 'V2: нет данных';
lang['history_warn_na_en'] = 'V2: no data';
lang['history_warn_na_de'] = 'V2: keine Daten';
lang['calc_setup_ru'] = 'Конфигурация двигателя';
lang['calc_setup_en'] = 'Motor setup';
lang['calc_actions_title_ru'] = 'Действия и данные';
lang['calc_actions_title_en'] = 'Actions and data';
lang['calc_advanced_title_ru'] = 'Расширенные параметры';
lang['calc_advanced_title_en'] = 'Advanced options';
lang['calc_overview_title_ru'] = 'Обзор результата';
lang['calc_overview_title_en'] = 'Result overview';
lang['calc_winding_title_ru'] = 'Оценка обмотки';
lang['calc_winding_title_en'] = 'Winding assessment';
lang['calc_magnet_title_ru'] = 'Рекомендация по магниту';
lang['calc_magnet_title_en'] = 'Magnet advisor';
lang['view_controls_ru'] = 'Панель отображения';
lang['view_controls_en'] = 'Display controls';
lang['view_canvas_ru'] = 'Рабочая диаграмма';
lang['view_canvas_en'] = 'Winding diagram';
lang['view_details_ru'] = 'Детализация схемы';
lang['view_details_en'] = 'Enhanced view';
lang['action_duplicate_ru'] = 'Дублировать';
lang['action_duplicate_en'] = 'Duplicate';
lang['action_reset_ru'] = 'Сброс';
lang['action_reset_en'] = 'Reset';
lang['quick_presets_ru'] = 'Быстрые пресеты';
lang['quick_presets_en'] = 'Quick presets';
lang['quality_score_ru'] = 'Итоговый уровень';
lang['quality_score_en'] = 'Quality score';
lang['quality_hint_ru'] = 'Рекомендация учитывает коэффициент, баланс, шаг и коггинг.';
lang['quality_hint_en'] = 'Recommendation considers factor, balance, step and cogging.';
lang['compare_delta_ru'] = 'Разница';
lang['compare_delta_en'] = 'Delta';
lang['compare_better_a_ru'] = 'Лучше: A';
lang['compare_better_a_en'] = 'Better: A';
lang['compare_better_b_ru'] = 'Лучше: B';
lang['compare_better_b_en'] = 'Better: B';
lang['compare_equal_ru'] = 'Схемы близки';
lang['compare_equal_en'] = 'Schemes are close';
lang['reset_done_ru'] = 'Результат очищен';
lang['reset_done_en'] = 'Result cleared';

// Заполняем недостающие RU ключи английскими, чтобы не было undefined
for(var k in lang){
	if(typeof lang[k] == 'string' && k.indexOf('_en') > 0){
		var ruKey = k.replace('_en','_ru');
		if(typeof lang[ruKey] == 'undefined'){
			lang[ruKey] = lang[k];
		}
	}
}

//sprache finden
var selected_lang = (window.MotorI18n && typeof window.MotorI18n.getLang == 'function')
	? window.MotorI18n.getLang()
	: 'ru';
if(selected_lang !== 'ru' && selected_lang !== 'en'){
	selected_lang = 'ru';
}

//sprache wechseln
function setlang (id){
	selected_lang = id;
	if(window.MotorI18n && typeof window.MotorI18n.setLang == 'function'){
		selected_lang = window.MotorI18n.setLang(id);
	}else{
		try{ localStorage.setItem('lang', id); }catch(e){}
	}
	jsStart();
}


// Initiieren
var mainContainer = false;
function jsStart(){
	mainContainer = document.getElementById('jsContainer');
	mainContainer.innerHTML = '';
	s_advanced = false;
	istSPS = false;
	var sprachwahl = '<ul>';
	for(i = 1; i<lang.length;i++){
		if(lang[i].length < 3){
			if(selected_lang == lang[i]){
				sprachwahl += '<li id="'+lang[i]+'" onclick="setlang(this.id);" style="color:#0000FF; font-weight:bold;">'+lang[i]+'</li>';
			}else{
				sprachwahl += '<li id="'+lang[i]+'" onclick="setlang(this.id);">'+lang[i]+'</li>';
			}
		}
	}
	sprachwahl += '</ul>';
	var form = ''
	form += '<form style="margin:auto;" name="Windungsrechner" action="javascript:return false;">';
	form += '<label for="Nuten" id="nuten_t">'+lang['nuten_'+selected_lang]+'</label>';
	form += '<input type="number" inputmode="numeric" min="3" max="999" step="3" size="4" maxlength="3" id="Nuten" name="Nuten" autocomplete="off" placeholder="12" onfocus="this.select()" onchange="checkSPS(this.value,document.Windungsrechner.Pole.value,true); _checkStale();" />';
	form += '<label for="Pole">'+lang['pole_'+selected_lang]+'</label>';
	form += '<input type="number" inputmode="numeric" min="2" max="999" step="2" size="4" maxlength="3" id="Pole" name="Pole" autocomplete="off" placeholder="14" onfocus="this.select()" onchange="checkSPS(document.Windungsrechner.Nuten.value,this.value,true); checkVerteilt(); _checkStale();" />';
	form += '<span id="schalti"><select id="schalt">';
	form += '<option value="-">D</option>';
	form += '<option value="Y">Y</option>';
	form += '</select></span>';
	form += '<input type="submit" onclick="berechnen(); return false;" id="Berechnen" value="'+lang['berechnen_'+selected_lang]+'" />';
	form += '<button type="button" id="erweitert_einfach" class="adv_toggle_btn" onclick="schema_eingeben();">'+lang['erweitert_'+selected_lang]+'</button>';
	form += '</form><span id="info"></span>';
	
	mainContainer.innerHTML += sprachwahl;
	mainContainer.innerHTML += form;
	mainContainer.innerHTML += '<div id="calc_actions"></div><div id="Rasten"></div><div id="insights_row"><div id="engineering_tools"></div><div id="winding_assessment"></div><div id="magnet_advice"></div></div><div id="nutfacktor"></div><div id ="steps"></div><div id="Ergebnis"></div><div id="canvas_container"></div><div id="enhanced_controls"></div><div id="enhanced_view"></div><div id="link_container"></div>';
	mainContainer.innerHTML += '<div id="mobile_calc_bar"><button type="button" id="mobileCalcBtn" onclick="if(document.getElementById(\'Berechnen\')){document.getElementById(\'Berechnen\').click();}">'+lang['berechnen_'+selected_lang]+'</button></div>';
	setupEnhancedControls();
	renderCalcActions();
	applyWorkspaceLayout();
	refreshHistoryTab();
	
	if(getVars['schema'] && getVars['pole'] && isNaN(getVars['schema'])){
		setTimeout('schema_eingeben()',20);
		setTimeout('document.Windungsrechner.Nuten.value="'+getVars['schema']+'"',30);
		setTimeout('document.Windungsrechner.Pole.value="'+getVars['pole']+'"',30);
		setTimeout('mit_schema()',40);
	}else if(getVars['nuten'] && getVars['pole'] && !isNaN(getVars['nuten'])){
		setTimeout('document.Windungsrechner.Nuten.value="'+getVars['nuten']+'"',30);
		setTimeout('document.Windungsrechner.Pole.value="'+getVars['pole']+'"',30);
		setTimeout('berechnen()',40);
		setTimeout('checkSPS(false,false,false)',45);
		setTimeout('checkVerteilt()',50);
	}
}


function checkVerteilt(){
	var NutenCv = document.Windungsrechner.Nuten.value;
	var PoleCv = document.Windungsrechner.Pole.value;
	NutenCv = NutenCv.replace(/ /g,'');
	var Lochzahl = NutenCv/3/PoleCv;
	var containerCV = document.getElementById('schalti');
	if(!schaltxy){
		schaltxy = containerCV.innerHTML;
	}
	if(!isNaN(NutenCv) && !istSPS && Lochzahl >= 1){
		containerCV.innerHTML = "&nbsp;"+lang['kuerzung_'+selected_lang];
		containerCV.innerHTML += '<input type="text" size="2" maxlength="1" id="verkuerzung" value="'+verkuerzungValue+'" />';
	}else if(Lochzahl < 1){
		containerCV.innerHTML = schaltxy;
	}else{
		containerCV.innerHTML = "";
	}
}

function setupEnhancedControls(){
	var controls = document.getElementById('enhanced_controls');
	if(!controls){
		return;
	}
	var html = '';
	html += '<div class="enhanced_toolbar">';
	html += '<label>'+lang['view_mode_'+selected_lang]+'</label>';
	html += '<select id="enh_mode">';
	html += '<option value="winding">'+lang['view_winding_'+selected_lang]+'</option>';
	html += '<option value="electrical">'+lang['view_electrical_'+selected_lang]+'</option>';
	html += '<option value="table">'+lang['view_table_'+selected_lang]+'</option>';
	html += '</select>';
	html += '<label>'+lang['phase_filter_'+selected_lang]+'</label>';
	html += '<select id="enh_phase">';
	html += '<option value="all">'+lang['phase_all_'+selected_lang]+'</option>';
	html += '<option value="a">A</option><option value="b">B</option><option value="c">C</option>';
	html += '</select>';
	html += '<label class="enh_checkbox"><input type="checkbox" id="enh_dir" />'+lang['show_direction_'+selected_lang]+'</label>';
	html += '<label class="enh_checkbox"><input type="checkbox" id="enh_slots" />'+lang['show_slots_'+selected_lang]+'</label>';
	html += '</div>';
	controls.innerHTML = html;
	var mode = document.getElementById('enh_mode');
	var phase = document.getElementById('enh_phase');
	var dir = document.getElementById('enh_dir');
	var slots = document.getElementById('enh_slots');
	if(mode){ mode.value = enhancedView.mode; mode.onchange = function(){ enhancedView.mode = this.value; renderEnhancedView(act_schritt); }; }
	if(phase){ phase.value = enhancedView.phase; phase.onchange = function(){ enhancedView.phase = this.value; renderEnhancedView(act_schritt); }; }
	if(dir){ dir.checked = enhancedView.showDirection; dir.onchange = function(){ enhancedView.showDirection = this.checked; renderEnhancedView(act_schritt); }; }
	if(slots){ slots.checked = enhancedView.showSlots; slots.onchange = function(){ enhancedView.showSlots = this.checked; renderEnhancedView(act_schritt); }; }
}

function _createWorkspaceCard(titleText){
	var card = document.createElement('section');
	card.className = 'ml_card';
	if(titleText){
		var title = document.createElement('h3');
		title.className = 'ml_card_title';
		title.textContent = titleText;
		card.appendChild(title);
	}
	return card;
}

function _appendIfExists(card, node){
	if(card && node){
		card.appendChild(node);
	}
}

function applyWorkspaceLayout(){
	var calcHost = document.getElementById('jsContainer');
	if(!calcHost){
		return;
	}
	var form = calcHost.querySelector('form');
	var info = document.getElementById('info');
	var calcActions = document.getElementById('calc_actions');
	var rasten = document.getElementById('Rasten');
	var ergebnis = document.getElementById('Ergebnis');
	var nutf = document.getElementById('nutfacktor');
	var windingAssessment = document.getElementById('winding_assessment');
	var magnetAdvice = document.getElementById('magnet_advice');
	var links = document.getElementById('link_container');
	var mobileBar = document.getElementById('mobile_calc_bar');
	var layout = document.getElementById('mlCalcLayout');

	if(!layout){
		layout = document.createElement('div');
		layout.id = 'mlCalcLayout';
		layout.className = 'ml_calc_layout';
		calcHost.insertBefore(layout, calcHost.firstChild);
	}
	layout.innerHTML = '';

	var left = document.createElement('div');
	left.className = 'ml_calc_col ml_calc_col_left';
	var right = document.createElement('div');
	right.className = 'ml_calc_col ml_calc_col_right';

	var setupCard = _createWorkspaceCard(lang['calc_setup_'+selected_lang] || 'Motor setup');
	_appendIfExists(setupCard, form);
	_appendIfExists(setupCard, info);
	left.appendChild(setupCard);

	var actionsCard = _createWorkspaceCard(lang['calc_actions_title_'+selected_lang] || 'Actions');
	_appendIfExists(actionsCard, calcActions);
	_appendIfExists(actionsCard, links);
	left.appendChild(actionsCard);

	var advancedCard = _createWorkspaceCard(lang['calc_advanced_title_'+selected_lang] || 'Advanced');
	_appendIfExists(advancedCard, nutf);
	left.appendChild(advancedCard);

	var overviewCard = _createWorkspaceCard(lang['calc_overview_title_'+selected_lang] || 'Overview');
	_appendIfExists(overviewCard, rasten);
	_appendIfExists(overviewCard, ergebnis);
	right.appendChild(overviewCard);

	var windingCard = _createWorkspaceCard(lang['calc_winding_title_'+selected_lang] || 'Winding assessment');
	_appendIfExists(windingCard, windingAssessment);
	right.appendChild(windingCard);

	var magnetCard = _createWorkspaceCard(lang['calc_magnet_title_'+selected_lang] || 'Magnet advisor');
	_appendIfExists(magnetCard, magnetAdvice);
	right.appendChild(magnetCard);

	layout.appendChild(left);
	layout.appendChild(right);
	_appendIfExists(calcHost, mobileBar);

	var visualHost = document.getElementById('visual_workspace');
	var steps = document.getElementById('steps');
	var canvas = document.getElementById('canvas_container');
	var enhControls = document.getElementById('enhanced_controls');
	var enhView = document.getElementById('enhanced_view');
	if(visualHost){
		visualHost.innerHTML = '';
		var vControls = _createWorkspaceCard(lang['view_controls_'+selected_lang] || 'Display controls');
		_appendIfExists(vControls, enhControls);
		var vCanvas = _createWorkspaceCard(lang['view_canvas_'+selected_lang] || 'Winding diagram');
		_appendIfExists(vCanvas, steps);
		_appendIfExists(vCanvas, canvas);
		var vEnhanced = _createWorkspaceCard(lang['view_details_'+selected_lang] || 'Enhanced view');
		_appendIfExists(vEnhanced, enhView);
		visualHost.appendChild(vControls);
		visualHost.appendChild(vCanvas);
		visualHost.appendChild(vEnhanced);
	}

	var compareHost = document.getElementById('compare_workspace');
	var engineering = document.getElementById('engineering_tools');
	if(compareHost){
		compareHost.innerHTML = '';
		var compareCard = _createWorkspaceCard(lang['compare_title_'+selected_lang] || 'Scheme comparison');
		_appendIfExists(compareCard, engineering);
		compareHost.appendChild(compareCard);
	}
}

function getPresets(){
	var base = [
		{id:'p_9_12', label:'9 / 12 BLDC', nuten:'9', pole:'12', schalt:'-'},
		{id:'p_12_14', label:'12 / 14', nuten:'12', pole:'14', schalt:'-'},
		{id:'p_15_18', label:'15 / 18', nuten:'15', pole:'18', schalt:'Y'}
	];
	var user = readUserPresets();
	for(var i=0;i<user.length;i++){
		base.push(user[i]);
	}
	return base;
}

function readUserPresets(){
	try{
		var raw = localStorage.getItem(USER_PRESETS_KEY);
		if(!raw){ return []; }
		var parsed = JSON.parse(raw);
		return parsed && parsed.length ? parsed : [];
	}catch(e){
		return [];
	}
}

function writeUserPresets(list){
	try{
		localStorage.setItem(USER_PRESETS_KEY, JSON.stringify(list));
	}catch(e){}
}

function readSavedCalcs(){
	var userData = window.MotorProduct && window.MotorProduct.userData;
	if(userData && typeof userData.readLocalProjects == 'function'){
		try{
			var list = userData.readLocalProjects();
			return list && list.length ? list : [];
		}catch(e){}
	}
	try{
		var raw = localStorage.getItem(SAVED_CALC_KEY);
		if(!raw){ return []; }
		var parsed = JSON.parse(raw);
		return parsed && parsed.length ? parsed : [];
	}catch(e){
		return [];
	}
}

function writeSavedCalcs(list){
	var userData = window.MotorProduct && window.MotorProduct.userData;
	if(userData && typeof userData.writeLocalProjects == 'function'){
		try{
			userData.writeLocalProjects(list);
			if(typeof userData.scheduleSync == 'function'){
				userData.scheduleSync(list || []);
			}
			return;
		}catch(e){}
	}
	try{
		localStorage.setItem(SAVED_CALC_KEY, JSON.stringify(list));
	}catch(e){}
}

function buildCurrentPayload(){
	if(!document.Windungsrechner){
		return false;
	}
	if(document.getElementById('statorD')){
		statorDiameterValue = document.getElementById('statorD').value || statorDiameterValue || '';
	}
	var nuten = document.Windungsrechner.Nuten.value || '';
	var pole = document.Windungsrechner.Pole.value || '';
	if(!nuten || !pole){
		return false;
	}
	var isSchema = isNaN(parseFloat(nuten));
	var schalt = document.getElementById('schalt') ? document.getElementById('schalt').value : '-';
	return {
		id: 'calc_'+Date.now(),
		ts: new Date().toISOString(),
		name: '',
		nuten: nuten,
		pole: pole,
		schalt: schalt,
		isSchema: isSchema,
		kgv: currentResultMeta.kgv,
		wf: currentResultMeta.wf,
		wfNumeric: currentResultMeta.wfNumeric,
		balance: currentResultMeta.balance,
		step: currentResultMeta.step,
		quality: currentResultMeta.quality,
		assessment: currentResultMeta.assessment,
		magnet: currentResultMeta.magnet,
		magnetInputs: {
			rotorDiameter: rotorMagnetDiameterValue || '',
			mode: magnetGoalValue || 'balanced',
			airGap: airGapValue || '',
			magnetThickness: magnetThicknessValue || '',
			statorD: statorDiameterValue || ''
		}
	};
}

function calcStatusMessage(msg){
	var status = document.getElementById('calc_action_status');
	if(status){
		status.textContent = msg || '';
	}
}

function renderCalcActions(){
	var host = document.getElementById('calc_actions');
	if(!host){
		return;
	}
	var saved = readSavedCalcs();
	var presets = getPresets();
	var html = '';
	html += '<div class="calc_actions_row">';
	html += '<button type="button" class="calc_action_btn" onclick="saveCurrentCalc();">'+lang['save_calc_'+selected_lang]+'</button>';
	html += '<button type="button" class="calc_action_btn" onclick="duplicateCurrentCalc();">'+lang['action_duplicate_'+selected_lang]+'</button>';
	html += '<button type="button" class="calc_action_btn" onclick="exportCurrentCalc(\'json\');">'+lang['export_calc_'+selected_lang]+' '+lang['exp_json_'+selected_lang]+'</button>';
	html += '<button type="button" class="calc_action_btn" onclick="exportCurrentCalc(\'csv\');">'+lang['export_calc_'+selected_lang]+' '+lang['exp_csv_'+selected_lang]+'</button>';
	html += '<button type="button" class="calc_action_btn" onclick="shareCurrentCalc();">'+lang['share_calc_'+selected_lang]+'</button>';
	html += '<button type="button" class="calc_action_btn" onclick="resetCalculatorView();">'+lang['action_reset_'+selected_lang]+'</button>';
	html += '</div>';
	html += '<div class="calc_actions_row">';
	html += '<label class="calc_action_label">'+lang['load_calc_'+selected_lang]+'</label>';
	html += '<select id="saved_calc_select" class="calc_action_select">';
	if(!saved.length){
		html += '<option value="">'+lang['saved_none_'+selected_lang]+'</option>';
	}else{
		for(var i=0;i<saved.length;i++){
			var item = saved[i];
			var title = item.name && item.name.length ? item.name : (item.isSchema ? item.nuten : (item.nuten+' / '+item.pole));
			html += '<option value="'+item.id+'">'+title+' ['+item.ts.substring(0,16).replace('T',' ')+']</option>';
		}
	}
	html += '</select>';
	html += '<button type="button" class="calc_action_btn" onclick="loadSavedCalc();">'+lang['apply_'+selected_lang]+'</button>';
	html += '<button type="button" class="calc_action_btn" onclick="renameSavedCalc();">'+lang['ren_calc_'+selected_lang]+'</button>';
	html += '<button type="button" class="calc_action_btn" onclick="deleteSavedCalc();">'+lang['del_calc_'+selected_lang]+'</button>';
	html += '</div>';
	html += '<div class="calc_actions_row">';
	html += '<label class="calc_action_label">'+lang['presets_'+selected_lang]+'</label>';
	html += '<select id="preset_select" class="calc_action_select">';
	for(var p=0;p<presets.length;p++){
		html += '<option value="'+presets[p].id+'">'+presets[p].label+'</option>';
	}
	html += '</select>';
	html += '<button type="button" class="calc_action_btn" onclick="applyPreset();">'+lang['apply_'+selected_lang]+'</button>';
	html += '<button type="button" class="calc_action_btn" onclick="saveCurrentAsPreset();">'+lang['preset_save_'+selected_lang]+'</button>';
	html += '</div>';
	html += '<div class="quick_preset_wrap"><div class="calc_action_label">'+lang['quick_presets_'+selected_lang]+'</div><div class="quick_preset_grid">';
	var maxPresetButtons = presets.length > 6 ? 6 : presets.length;
	for(var q=0;q<maxPresetButtons;q++){
		var pLabel = presets[q].label || (presets[q].nuten+' / '+presets[q].pole);
		html += '<button type="button" class="quick_preset_btn" onclick="applyPresetById(\''+presets[q].id+'\');">'+pLabel+'</button>';
	}
	html += '</div></div>';
	html += '<div id="calc_action_status" class="calc_action_status"></div>';
	host.innerHTML = html;
}

function applyPresetById(id){
	if(!id){
		return;
	}
	var presets = getPresets();
	for(var i=0;i<presets.length;i++){
		if(presets[i].id == id){
			applyPayload(presets[i]);
			return;
		}
	}
}

function applyPayload(payload){
	if(!payload || !document.Windungsrechner){
		return;
	}
	var isSchema = payload.isSchema || isNaN(parseFloat(payload.nuten));
	if(isSchema){
		schema_eingeben();
	}
	document.Windungsrechner.Nuten.value = payload.nuten;
	document.Windungsrechner.Pole.value = payload.pole;
	if(document.getElementById('schalt') && payload.schalt){
		document.getElementById('schalt').value = payload.schalt;
	}
	if(payload.magnetInputs){
		rotorMagnetDiameterValue = payload.magnetInputs.rotorDiameter || '';
		magnetGoalValue = payload.magnetInputs.mode || 'balanced';
		airGapValue = payload.magnetInputs.airGap || '';
		magnetThicknessValue = payload.magnetInputs.magnetThickness || '';
		statorDiameterValue = payload.magnetInputs.statorD || '';
		if(document.getElementById('statorD')){ document.getElementById('statorD').value = statorDiameterValue; }
		if(document.getElementById('rotorMagD')){ document.getElementById('rotorMagD').value = rotorMagnetDiameterValue; }
		if(document.getElementById('airGap')){ document.getElementById('airGap').value = airGapValue; }
		if(document.getElementById('magnetThickness')){ document.getElementById('magnetThickness').value = magnetThicknessValue; }
		if(document.getElementById('magnetGoal')){ document.getElementById('magnetGoal').value = magnetGoalValue || 'balanced'; }
	}
	checkSPS(payload.nuten, payload.pole, true);
	checkVerteilt();
	if(isSchema){
		mit_schema();
	}else{
		berechnen();
	}
	// Safety sync: ensure magnet advisor is refreshed after payload-based UI update.
	setTimeout(function(){
		if(schemeCalculated && polex && nutenx){
			updateMagnetAdvisor();
		}
	}, 80);
}

function saveCurrentCalc(){
	var payload = buildCurrentPayload();
	if(!payload){
		return;
	}
	if(!payload.name){
		payload.name = payload.isSchema ? payload.nuten : (payload.nuten+' / '+payload.pole);
	}
	payload.favorite = false;
	var saved = readSavedCalcs();
	saved.unshift(payload);
	if(saved.length > 20){
		saved = saved.slice(0,20);
	}
	writeSavedCalcs(saved);
	renderCalcActions();
	calcStatusMessage(lang['saved_ok_'+selected_lang]);
	refreshHistoryTab();
}

function duplicateCurrentCalc(){
	var payload = buildCurrentPayload();
	if(!payload){
		return;
	}
	var baseName = payload.name && payload.name.length ? payload.name : (payload.isSchema ? payload.nuten : (payload.nuten+' / '+payload.pole));
	payload.name = baseName + ' (copy)';
	payload.favorite = false;
	var saved = readSavedCalcs();
	saved.unshift(payload);
	if(saved.length > 20){
		saved = saved.slice(0,20);
	}
	writeSavedCalcs(saved);
	renderCalcActions();
	calcStatusMessage(lang['saved_ok_'+selected_lang]);
	refreshHistoryTab();
}

function resetCalculatorView(){
	if(typeof clearResult == 'function'){
		clearResult();
	}
	calcStatusMessage(lang['reset_done_'+selected_lang]);
}

function renameSavedCalc(){
	var select = document.getElementById('saved_calc_select');
	if(!select || !select.value){
		return;
	}
	var saved = readSavedCalcs();
	for(var i=0;i<saved.length;i++){
		if(saved[i].id == select.value){
			var currentName = saved[i].name || '';
			var n = window.prompt(lang['rename_prompt_'+selected_lang], currentName);
			if(n === null){
				return;
			}
			saved[i].name = (n || '').trim();
			writeSavedCalcs(saved);
			renderCalcActions();
			calcStatusMessage(lang['saved_ok_'+selected_lang]);
			refreshHistoryTab();
			return;
		}
	}
}

function deleteSavedCalc(){
	var select = document.getElementById('saved_calc_select');
	if(!select || !select.value){
		return;
	}
	var saved = readSavedCalcs();
	var filtered = [];
	for(var i=0;i<saved.length;i++){
		if(saved[i].id != select.value){
			filtered.push(saved[i]);
		}
	}
	writeSavedCalcs(filtered);
	renderCalcActions();
	calcStatusMessage(lang['deleted_ok_'+selected_lang]);
	refreshHistoryTab();
}

function loadSavedCalc(){
	var select = document.getElementById('saved_calc_select');
	if(!select || !select.value){
		return;
	}
	var saved = readSavedCalcs();
	for(var i=0;i<saved.length;i++){
		if(saved[i].id == select.value){
			applyPayload(saved[i]);
			break;
		}
	}
}

function toggleFavoriteSavedCalc(id){
	var saved = readSavedCalcs();
	for(var i=0;i<saved.length;i++){
		if(saved[i].id == id){
			saved[i].favorite = !saved[i].favorite;
			break;
		}
	}
	writeSavedCalcs(saved);
	renderCalcActions();
	refreshHistoryTab();
}

function deleteSavedCalcById(id){
	var saved = readSavedCalcs();
	var filtered = [];
	for(var i=0;i<saved.length;i++){
		if(saved[i].id != id){
			filtered.push(saved[i]);
		}
	}
	writeSavedCalcs(filtered);
	renderCalcActions();
	refreshHistoryTab();
}

function loadSavedCalcById(id){
	var saved = readSavedCalcs();
	for(var i=0;i<saved.length;i++){
		if(saved[i].id == id){
			applyPayload(saved[i]);
			return;
		}
	}
}

function formatHistoryMagnetMeta(s){
	if(!s){ return ''; }
	var m = s.magnet || false;
	if(!m){
		return '';
	}
	var modeText = '';
	if(m.modeLabel){
		modeText = m.modeLabel;
	}else if(s.magnetInputs && s.magnetInputs.mode){
		modeText = s.magnetInputs.mode;
	}
	var parts = Array();
	if(modeText){
		parts[parts.length] = lang['history_mode_'+selected_lang]+': '+modeText;
	}
	if(typeof m.ratio == 'number'){
		parts[parts.length] = lang['history_cov_'+selected_lang]+': '+Math.round(m.ratio*100)+'%';
	}
	if(typeof m.suggested == 'number'){
		parts[parts.length] = lang['history_w_'+selected_lang]+': '+m.suggested.toFixed(2)+' mm';
	}
	if(typeof m.rangeMin == 'number' && typeof m.rangeMax == 'number'){
		parts[parts.length] = lang['history_range_'+selected_lang]+': '+m.rangeMin.toFixed(2)+'-'+m.rangeMax.toFixed(2)+' mm';
	}
	if(!parts.length){
		return '';
	}
	return '<div class="history_meta">'+lang['history_magnet_'+selected_lang]+': '+parts.join(' | ')+'</div>';
}

function _historyWarningCount(groups){
	if(!groups){
		return 0;
	}
	var keys = ['coverage','saturation','geometry'];
	var count = 0;
	for(var i=0;i<keys.length;i++){
		var arr = groups[keys[i]];
		if(arr && arr.length){
			count += arr.length;
		}
	}
	return count;
}

function formatHistoryMagnetBadge(s){
	if(!s || !s.magnet){
		return '<div class="history_badges"><span class="history_badge is_na">'+lang['history_warn_na_'+selected_lang]+'</span></div>';
	}
	var groups = s.magnet.warningGroups;
	var count = _historyWarningCount(groups);
	if(count > 0){
		return '<div class="history_badges"><span class="history_badge is_warn">'+lang['history_warn_has_'+selected_lang]+' ('+count+')</span></div>';
	}
	return '<div class="history_badges"><span class="history_badge is_ok">'+lang['history_warn_ok_'+selected_lang]+'</span></div>';
}

function refreshHistoryTab(){
	var host = document.getElementById('history_list');
	if(!host){
		return;
	}
	var search = document.getElementById('history_search');
	var favOnly = document.getElementById('history_fav_only');
	var q = search ? search.value.toLowerCase() : '';
	var onlyFav = favOnly ? favOnly.checked : false;
	var saved = readSavedCalcs();
	var html = '';
	for(var i=0;i<saved.length;i++){
		var s = saved[i];
		if(onlyFav && !s.favorite){
			continue;
		}
		var title = s.name && s.name.length ? s.name : (s.isSchema ? s.nuten : (s.nuten+' / '+s.pole));
		var hay = (title+' '+(s.ts||'')+' '+(s.wf||'')).toLowerCase();
		if(q && hay.indexOf(q) == -1){
			continue;
		}
		var favClass = s.favorite ? 'is_fav' : '';
		html += '<div class="history_item '+favClass+'">';
		html += '<div class="history_head"><b>'+title+'</b><span>'+(s.ts ? s.ts.substring(0,16).replace('T',' ') : '')+'</span></div>';
		html += '<div class="history_meta">WF: '+(s.wf || '-')+' | KgV/LCM: '+(s.kgv || '-')+'</div>';
		html += formatHistoryMagnetMeta(s);
		html += formatHistoryMagnetBadge(s);
		html += '<div class="history_actions">';
		html += '<button type="button" class="calc_action_btn" onclick="loadSavedCalcById(\''+s.id+'\');">'+lang['apply_'+selected_lang]+'</button>';
		html += '<button type="button" class="calc_action_btn" onclick="toggleFavoriteSavedCalc(\''+s.id+'\');">★</button>';
		html += '<button type="button" class="calc_action_btn" onclick="deleteSavedCalcById(\''+s.id+'\');">'+lang['del_calc_'+selected_lang]+'</button>';
		html += '</div></div>';
	}
	if(!html){
		html = '<div class="history_empty">'+lang['saved_none_'+selected_lang]+'</div>';
	}
	host.innerHTML = html;
}

function applyPreset(){
	var select = document.getElementById('preset_select');
	if(!select || !select.value){
		return;
	}
	var presets = getPresets();
	for(var i=0;i<presets.length;i++){
		if(presets[i].id == select.value){
			applyPayload(presets[i]);
			break;
		}
	}
}

function saveCurrentAsPreset(){
	var payload = buildCurrentPayload();
	if(!payload){
		return;
	}
	var defaultName = payload.isSchema ? payload.nuten : (payload.nuten+' / '+payload.pole);
	var name = window.prompt(lang['rename_prompt_'+selected_lang], defaultName);
	if(name === null){
		return;
	}
	name = (name || '').trim();
	if(!name){
		name = defaultName;
	}
	var presets = readUserPresets();
	presets.unshift({
		id:'u_'+Date.now(),
		label:name,
		nuten:payload.nuten,
		pole:payload.pole,
		schalt:payload.schalt,
		isSchema:payload.isSchema
	});
	if(presets.length > 20){
		presets = presets.slice(0,20);
	}
	writeUserPresets(presets);
	renderCalcActions();
	calcStatusMessage(lang['preset_saved_'+selected_lang]);
}

function exportCurrentCalc(format){
	var payload = buildCurrentPayload();
	if(!payload){
		return;
	}
	payload.schema = currentResultMeta.schema || '';
	var content = '';
	var type = '';
	var ext = '';
	if(format == 'csv'){
		content = 'name,nuten,pole,schalt,isSchema,kgv,wf,manual,cross,layout,complexity,magnetMode,magnetModeLabel,rotorDiameter,airGap,magnetThickness,statorD,magnetPolePitch,magnetCoverage,magnetSuggested,magnetRangeMin,magnetRangeMax,timestamp\n';
		content += [
			'"'+(payload.name||'').replace(/"/g,'""')+'"',
			'"'+payload.nuten+'"',
			'"'+payload.pole+'"',
			'"'+payload.schalt+'"',
			payload.isSchema ? '1':'0',
			payload.kgv || '',
			'"'+(payload.wf||'')+'"',
			payload.assessment ? payload.assessment.manual : '',
			payload.assessment ? payload.assessment.cross : '',
			payload.assessment ? payload.assessment.layout : '',
			'"'+(payload.assessment ? payload.assessment.level : '')+'"',
			'"'+(payload.magnetInputs ? payload.magnetInputs.mode : '')+'"',
			'"'+(payload.magnet && payload.magnet.modeLabel ? payload.magnet.modeLabel : '')+'"',
			payload.magnetInputs ? payload.magnetInputs.rotorDiameter : '',
			payload.magnetInputs ? payload.magnetInputs.airGap : '',
			payload.magnetInputs ? payload.magnetInputs.magnetThickness : '',
			payload.magnetInputs ? payload.magnetInputs.statorD : '',
			payload.magnet ? payload.magnet.polePitch.toFixed(4) : '',
			payload.magnet ? (payload.magnet.ratio*100).toFixed(2) : '',
			payload.magnet ? payload.magnet.suggested.toFixed(4) : '',
			payload.magnet ? payload.magnet.rangeMin.toFixed(4) : '',
			payload.magnet ? payload.magnet.rangeMax.toFixed(4) : '',
			'"'+payload.ts+'"'
		].join(',')+'\n';
		type = 'text/csv;charset=utf-8';
		ext = 'csv';
	}else{
		content = JSON.stringify(payload, null, 2);
		type = 'application/json;charset=utf-8';
		ext = 'json';
	}
	var blob = new Blob([content], {type:type});
	var url = URL.createObjectURL(blob);
	var a = document.createElement('a');
	a.href = url;
	a.download = 'winding-calc-'+Date.now()+'.'+ext;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

function shareCurrentCalc(){
	var payload = buildCurrentPayload();
	if(!payload){
		calcStatusMessage(lang['share_not_ready_'+selected_lang]);
		return;
	}
	var base = location.origin + location.pathname;
	var query = '';
	if(payload.isSchema){
		query = '?schema='+encodeURIComponent(payload.nuten)+'&pole='+encodeURIComponent(payload.pole);
	}else{
		query = '?nuten='+encodeURIComponent(payload.nuten)+'&pole='+encodeURIComponent(payload.pole);
	}
	var link = base + query;
	if(navigator.share){
		navigator.share({url:link, title:'Калькулятор схем обмотки'}).catch(function(){});
		return;
	}
	if(navigator.clipboard && navigator.clipboard.writeText){
		navigator.clipboard.writeText(link).then(function(){
			calcStatusMessage(lang['share_ready_'+selected_lang]);
		}).catch(function(){
			window.prompt((window.MotorI18n && window.MotorI18n.t ? window.MotorI18n.t('copy_link_prompt') : 'Copy this link:'), link);
		});
	}else{
		window.prompt((window.MotorI18n && window.MotorI18n.t ? window.MotorI18n.t('copy_link_prompt') : 'Copy this link:'), link);
	}
}

function analyseWindingLayout(schema, nuten, pole, isDistributed){
	var clean = '';
	for(var i=0;i<schema.length;i++){
		var ch = schema[i];
		if(ch == 'A' || ch == 'B' || ch == 'C' || ch == 'a' || ch == 'b' || ch == 'c' || ch == '-'){
			clean += ch;
		}
	}
	var active = [];
	for(var j=0;j<clean.length;j++){
		var c = clean[j];
		if(c != '-'){
			active.push({idx:j, ph:c.toLowerCase(), up:(c==c.toUpperCase())});
		}
	}
	var transitions = 0;
	for(var k=1;k<active.length;k++){
		if(active[k].ph != active[k-1].ph){
			transitions++;
		}
	}
	var phasePos = {a:[], b:[], c:[]};
	var upCount = {a:0,b:0,c:0};
	var lowCount = {a:0,b:0,c:0};
	for(var p=0;p<active.length;p++){
		phasePos[active[p].ph].push(active[p].idx);
		if(active[p].up){ upCount[active[p].ph]++; } else { lowCount[active[p].ph]++; }
	}
	var edges = [];
	for(var ph in phasePos){
		var arr = phasePos[ph];
		if(arr.length < 2){ continue; }
		for(var e=0;e<arr.length;e++){
			var a1 = arr[e];
			var b1 = arr[(e+1)%arr.length];
			if(a1 == b1){ continue; }
			var aa = Math.min(a1,b1);
			var bb = Math.max(a1,b1);
			edges.push([aa,bb]);
		}
	}
	var crossings = 0;
	for(var x=0;x<edges.length;x++){
		for(var y=x+1;y<edges.length;y++){
			var e1 = edges[x], e2 = edges[y];
			if((e1[0] < e2[0] && e2[0] < e1[1] && e1[1] < e2[1]) || (e2[0] < e1[0] && e1[0] < e2[1] && e2[1] < e1[1])){
				crossings++;
			}
		}
	}
	var imbalance = Math.abs(upCount.a-lowCount.a)+Math.abs(upCount.b-lowCount.b)+Math.abs(upCount.c-lowCount.c);
	var emptySlots = 0;
	for(var z=0;z<clean.length;z++){ if(clean[z] == '-'){ emptySlots++; } }

	var manualScore = 100 - Math.max(0, (nuten-9)*2) - transitions - (isDistributed ? 6 : 0) - emptySlots*1.2;
	var crossScore = 100 - crossings*7 - Math.max(0, imbalance*5);
	var balanceScore = 100 - Math.max(0, imbalance*12);
	var layoutScore = 100 - Math.max(0, (nuten-12)*2.4) - transitions*0.8 - emptySlots*1.5 - (isDistributed ? 8 : 0);
	manualScore = Math.max(10, Math.min(100, Math.round(manualScore)));
	crossScore = Math.max(10, Math.min(100, Math.round(crossScore)));
	balanceScore = Math.max(10, Math.min(100, Math.round(balanceScore)));
	layoutScore = Math.max(10, Math.min(100, Math.round(layoutScore)));
	var avg = Math.round((manualScore + crossScore + layoutScore + balanceScore) / 4);
	var level = 'complexity_medium';
	if(avg >= 72){ level = 'complexity_simple'; }
	if(avg <= 48){ level = 'complexity_hard'; }
	return {
		manual: manualScore,
		cross: crossScore,
		balance: balanceScore,
		layout: layoutScore,
		avg: avg,
		level: level
	};
}

function renderWindingAssessment(schema, nuten, pole, isDistributed){
	var holder = document.getElementById('winding_assessment');
	if(!holder || !schema){
		return;
	}
	var a = analyseWindingLayout(schema, nuten, pole, isDistributed);
	var levelText = lang[a.level+'_'+selected_lang] || '';
	var html = '<div class="assessment_panel">';
	html += '<div class="assessment_title">'+lang['assessment_title_'+selected_lang]+'</div>';
	html += '<div class="assessment_grid">';
	html += '<div class="assessment_item"><span>'+lang['manual_score_'+selected_lang]+'</span><b>'+a.manual+'/100</b></div>';
	html += '<div class="assessment_item"><span>'+lang['cross_score_'+selected_lang]+'</span><b>'+a.cross+'/100</b></div>';
	html += '<div class="assessment_item"><span>'+lang['layout_score_'+selected_lang]+'</span><b>'+a.layout+'/100</b></div>';
	html += '<div class="assessment_item"><span>'+lang['complexity_'+selected_lang]+'</span><b>'+levelText+'</b></div>';
	html += '</div></div>';
	holder.innerHTML = html;
	currentResultMeta.assessment = {
		manual: a.manual,
		cross: a.cross,
		balance: a.balance,
		layout: a.layout,
		avg: a.avg,
		level: levelText
	};
	currentResultMeta.balance = a.balance;
}

function _qualityBadgeData(avgScore){
	if(avgScore >= 76){
		return {key:'quality_excellent', cls:'is_good'};
	}
	if(avgScore >= 52){
		return {key:'quality_normal', cls:'is_mid'};
	}
	return {key:'quality_bad', cls:'is_bad'};
}

function _coggingQualityScore(kgv, nuten){
	if(!kgv || !nuten){
		return 50;
	}
	var ratio = kgv / nuten;
	var score = ratio * 28;
	return Math.max(15, Math.min(100, Math.round(score)));
}

function buildSchemeMetricsFromPayload(p){
	var wfN = (typeof p.wfNumeric == 'number' && !isNaN(p.wfNumeric)) ? p.wfNumeric : parseFloat(p.wfNumeric || p.wf);
	var wfScore = isNaN(wfN) ? 40 : Math.max(10, Math.min(100, Math.round(wfN * 100)));
	var bal = (p.balance && !isNaN(p.balance)) ? parseFloat(p.balance) : (p.assessment && p.assessment.balance ? p.assessment.balance : 50);
	var lay = (p.assessment && p.assessment.layout) ? p.assessment.layout : 50;
	var cog = _coggingQualityScore(p.kgv, p.nuten);
	var qAvg = Math.round((wfScore + bal + lay + cog) / 4);
	var badge = _qualityBadgeData(qAvg);
	return {
		wf: isNaN(wfN) ? '-' : wfN.toFixed(5),
		balance: Math.round(bal),
		step: (p.step && !isNaN(p.step)) ? parseFloat(p.step).toFixed(2) : (p.nuten && p.pole ? (p.nuten/p.pole).toFixed(2) : '-'),
		cogging: p.kgv || '-',
		complexity: (p.assessment && p.assessment.level) ? p.assessment.level : '-',
		qualityAvg: qAvg,
		qualityText: lang[badge.key+'_'+selected_lang],
		qualityClass: badge.cls
	};
}

function computeRecommendation(nuten, pole, kgv, qualityAvg){
	var q = nuten/(3*pole);
	var shortening = 0;
	if(q >= 1.0){ shortening = 1; }
	if(q >= 1.45){ shortening = 2; }
	var layer = (nuten % 2 == 0 && q >= 0.75) ? '2L' : '1L';
	var conn = 'D';
	if((kgv && kgv < (nuten*2.4)) || qualityAvg < 60){
		conn = 'Y';
	}else if(q >= 1.0){
		conn = 'Y/D';
	}
	return {
		shortening: shortening,
		layer: layer,
		connection: conn
	};
}

function getCompareCandidates(){
	var saved = readSavedCalcs();
	var out = [];
	var cur = buildCurrentPayload();
	if(cur){
		cur.id = 'current_live';
		cur.name = 'Текущий расчёт';
		out.push(cur);
	}
	for(var i=0;i<saved.length;i++){
		out.push(saved[i]);
	}
	return out;
}

function renderEngineeringTools(){
	var host = document.getElementById('engineering_tools');
	if(!host){
		return;
	}
	var cur = buildCurrentPayload();
	if(!cur || !cur.nuten || !cur.pole){
		host.innerHTML = '';
		return;
	}
	var metrics = buildSchemeMetricsFromPayload(cur);
	currentResultMeta.quality = {avg:metrics.qualityAvg, text:metrics.qualityText, cls:metrics.qualityClass};
	currentResultMeta.step = parseFloat(metrics.step);
	var rec = computeRecommendation(parseFloat(cur.nuten), parseFloat(cur.pole), cur.kgv, metrics.qualityAvg);
	var all = getCompareCandidates();
	var html = '<div class="eng_tools_panel">';
	html += '<div class="eng_tools_title">'+lang['eng_tools_title_'+selected_lang]+'</div>';
	html += '<div class="eng_quality_row"><span>'+lang['quality_title_'+selected_lang]+'</span><span class="eng_badge '+metrics.qualityClass+'">'+metrics.qualityText+'</span></div>';
	html += '<div class="quality_score_panel '+metrics.qualityClass+'">';
	html += '<div class="quality_score_head">'+lang['quality_score_'+selected_lang]+'</div>';
	html += '<div class="quality_score_value">'+metrics.qualityAvg+'/100</div>';
	html += '<div class="quality_score_hint">'+lang['quality_hint_'+selected_lang]+'</div>';
	html += '</div>';
	html += '<div class="eng_reco_grid">';
	html += '<div class="eng_reco_item"><span>'+lang['recommend_shortening_'+selected_lang]+'</span><b>'+rec.shortening+'</b></div>';
	html += '<div class="eng_reco_item"><span>'+lang['recommend_layer_'+selected_lang]+'</span><b>'+rec.layer+'</b></div>';
	html += '<div class="eng_reco_item"><span>'+lang['recommend_conn_'+selected_lang]+'</span><b>'+rec.connection+'</b></div>';
	html += '</div>';
	html += '<div class="eng_compare_box">';
	html += '<div class="eng_compare_title">'+lang['compare_title_'+selected_lang]+'</div>';
	html += '<div class="eng_compare_controls">';
	html += '<label>'+lang['compare_select_a_'+selected_lang]+'</label><select id="compareA">';
	for(var i=0;i<all.length;i++){
		var aLabel = all[i].name && all[i].name.length ? all[i].name : ((all[i].isSchema ? all[i].nuten : (all[i].nuten+' / '+all[i].pole)));
		html += '<option value="'+all[i].id+'">'+aLabel+'</option>';
	}
	html += '</select>';
	html += '<label>'+lang['compare_select_b_'+selected_lang]+'</label><select id="compareB">';
	for(var j=0;j<all.length;j++){
		var bLabel = all[j].name && all[j].name.length ? all[j].name : ((all[j].isSchema ? all[j].nuten : (all[j].nuten+' / '+all[j].pole)));
		html += '<option value="'+all[j].id+'"'+(j==0 && all.length>1 ? '' : '')+'>'+bLabel+'</option>';
	}
	html += '</select>';
	html += '<button type="button" class="calc_action_btn" onclick="runSchemeComparison();">'+lang['compare_run_'+selected_lang]+'</button>';
	html += '<button type="button" class="calc_action_btn" onclick="compareWithBestHistory();">'+lang['compare_best_'+selected_lang]+'</button>';
	html += '</div><div id="eng_compare_result"></div></div></div>';
	host.innerHTML = html;
	applyWorkspaceLayout();
	if(all.length > 1){
		var b = document.getElementById('compareB');
		if(b){ b.selectedIndex = 1; }
	}
	runSchemeComparison();
}

function _findCandidateById(id){
	var all = getCompareCandidates();
	for(var i=0;i<all.length;i++){
		if(all[i].id == id){
			return all[i];
		}
	}
	return false;
}

function runSchemeComparison(){
	var aSel = document.getElementById('compareA');
	var bSel = document.getElementById('compareB');
	var out = document.getElementById('eng_compare_result');
	if(!aSel || !bSel || !out){
		return;
	}
	var a = _findCandidateById(aSel.value);
	var b = _findCandidateById(bSel.value);
	if(!a || !b){
		out.innerHTML = '';
		return;
	}
	var ma = buildSchemeMetricsFromPayload(a);
	var mb = buildSchemeMetricsFromPayload(b);
	var scoreDelta = ma.qualityAvg - mb.qualityAvg;
	var decision = lang['compare_equal_'+selected_lang];
	if(scoreDelta > 2){ decision = lang['compare_better_a_'+selected_lang]; }
	if(scoreDelta < -2){ decision = lang['compare_better_b_'+selected_lang]; }
	var html = '<div class="compare_dual_cards">';
	html += '<article class="compare_card"><h4>A</h4>';
	html += '<div class="compare_metric"><span>'+lang['metric_wf_'+selected_lang]+'</span><b>'+ma.wf+'</b></div>';
	html += '<div class="compare_metric"><span>'+lang['metric_balance_'+selected_lang]+'</span><b>'+ma.balance+'/100</b></div>';
	html += '<div class="compare_metric"><span>'+lang['metric_step_'+selected_lang]+'</span><b>'+ma.step+'</b></div>';
	html += '<div class="compare_metric"><span>'+lang['metric_cogging_'+selected_lang]+'</span><b>'+ma.cogging+'</b></div>';
	html += '<div class="compare_metric"><span>'+lang['quality_title_'+selected_lang]+'</span><b><span class="eng_badge '+ma.qualityClass+'">'+ma.qualityText+'</span></b></div>';
	html += '</article>';
	html += '<article class="compare_card"><h4>B</h4>';
	html += '<div class="compare_metric"><span>'+lang['metric_wf_'+selected_lang]+'</span><b>'+mb.wf+'</b></div>';
	html += '<div class="compare_metric"><span>'+lang['metric_balance_'+selected_lang]+'</span><b>'+mb.balance+'/100</b></div>';
	html += '<div class="compare_metric"><span>'+lang['metric_step_'+selected_lang]+'</span><b>'+mb.step+'</b></div>';
	html += '<div class="compare_metric"><span>'+lang['metric_cogging_'+selected_lang]+'</span><b>'+mb.cogging+'</b></div>';
	html += '<div class="compare_metric"><span>'+lang['quality_title_'+selected_lang]+'</span><b><span class="eng_badge '+mb.qualityClass+'">'+mb.qualityText+'</span></b></div>';
	html += '</article>';
	html += '</div>';
	html += '<div class="compare_summary"><span>'+lang['compare_delta_'+selected_lang]+': '+Math.abs(scoreDelta)+'</span><b>'+decision+'</b></div>';
	out.innerHTML = html;
}

function compareWithBestHistory(){
	var aSel = document.getElementById('compareA');
	var bSel = document.getElementById('compareB');
	var out = document.getElementById('eng_compare_result');
	if(!aSel || !bSel || !out){
		return;
	}
	var all = getCompareCandidates();
	var best = false;
	var bestScore = -1;
	for(var i=0;i<all.length;i++){
		var c = all[i];
		if(c.id == 'current_live'){
			continue;
		}
		var m = buildSchemeMetricsFromPayload(c);
		if(m.qualityAvg > bestScore){
			bestScore = m.qualityAvg;
			best = c;
		}
	}
	if(!best){
		out.innerHTML = '<div class="history_empty">'+lang['compare_best_none_'+selected_lang]+'</div>';
		return;
	}
	for(var a=0;a<aSel.options.length;a++){
		if(aSel.options[a].value == 'current_live'){
			aSel.selectedIndex = a;
			break;
		}
	}
	for(var b=0;b<bSel.options.length;b++){
		if(bSel.options[b].value == best.id){
			bSel.selectedIndex = b;
			break;
		}
	}
	runSchemeComparison();
}

function _magnetModeConfig(mode){
	if(mode == 'smooth'){
		return {ratio:0.70, min:0.68, max:0.72, label:lang['magnet_smooth_'+selected_lang]};
	}
	if(mode == 'torque'){
		return {ratio:0.80, min:0.79, max:0.83, label:lang['magnet_torque_'+selected_lang]};
	}
	return {ratio:0.75, min:0.73, max:0.78, label:lang['magnet_balanced_'+selected_lang]};
}

function _textFromInput(id, fallback){
	var el = document.getElementById(id);
	if(el){
		return (el.value || '').toString();
	}
	return fallback;
}

function _readNumericInput(id, fallbackRaw){
	var el = document.getElementById(id);
	var raw = el ? (el.value || '').toString() : ((fallbackRaw || '')+'');
	var cleaned = raw.replace(/,/g,'.').trim();
	if(cleaned === ''){
		return {raw:raw, value:false, invalid:false};
	}
	var parsed = parseFloat(cleaned);
	if(isNaN(parsed)){
		return {raw:raw, value:false, invalid:true};
	}
	return {raw:raw, value:parsed, invalid:false};
}

function buildMagnetContext(){
	var rotorIn = _readNumericInput('rotorMagD', rotorMagnetDiameterValue);
	var airIn = _readNumericInput('airGap', airGapValue);
	var thickIn = _readNumericInput('magnetThickness', magnetThicknessValue);
	var statorIn = _readNumericInput('statorD', statorDiameterValue);
	var ctx = {
		nuten: nutenx || false,
		pole: polex || false,
		kgv: currentResultMeta.kgv || false,
		rotorDiameter: rotorIn.value,
		mode: _textFromInput('magnetGoal', magnetGoalValue || 'balanced'),
		airGap: airIn.value,
		magnetThickness: thickIn.value,
		statorD: statorIn.value,
		rotorInputRaw: rotorIn.raw,
		rotorInputInvalid: rotorIn.invalid
	};
	if(isNaN(ctx.rotorDiameter)){ ctx.rotorDiameter = false; }
	if(isNaN(ctx.airGap)){ ctx.airGap = false; }
	if(isNaN(ctx.magnetThickness)){ ctx.magnetThickness = false; }
	if(isNaN(ctx.statorD)){ ctx.statorD = false; }
	rotorMagnetDiameterValue = ctx.rotorDiameter ? String(ctx.rotorDiameter) : (rotorMagnetDiameterValue || '');
	magnetGoalValue = ctx.mode || 'balanced';
	airGapValue = ctx.airGap ? String(ctx.airGap) : (airGapValue || '');
	magnetThicknessValue = ctx.magnetThickness ? String(ctx.magnetThickness) : (magnetThicknessValue || '');
	statorDiameterValue = ctx.statorD ? String(ctx.statorD) : (statorDiameterValue || '');
	return ctx;
}

function validateMagnetContext(ctx){
	if(!ctx || !ctx.pole || !ctx.nuten){
		return {ok:false, msg:lang['magnet_need_scheme_'+selected_lang]};
	}
	if(ctx.rotorInputInvalid){
		return {ok:false, msg:lang['magnet_invalid_rotor_input_'+selected_lang]};
	}
	if(!ctx.rotorDiameter){
		return {ok:false, msg:lang['magnet_need_input_'+selected_lang]};
	}
	if(ctx.rotorDiameter <= 0){
		return {ok:false, msg:lang['magnet_invalid_rotor_'+selected_lang]};
	}
	if(ctx.rotorDiameter > 1000){
		return {ok:false, msg:lang['magnet_invalid_rotor_range_'+selected_lang]};
	}
	if(ctx.statorD && ctx.statorD > 0 && ctx.rotorDiameter >= ctx.statorD){
		return {ok:false, msg:lang['magnet_invalid_rotor_stator_'+selected_lang]};
	}
	return {ok:true, msg:''};
}

function calcMagnetRecommendation(rotorD, mode, pole, nuten, kgv){
	if(!rotorD || !pole){
		return false;
	}
	var cfg = _magnetModeConfig(mode);
	var polePitch = Math.PI * rotorD / pole;
	var ratio = cfg.ratio;
	var coggingAdjust = 0;
	if(kgv && nuten){
		var kgvPerSlot = kgv / nuten;
		if(kgvPerSlot < 1.7){
			coggingAdjust -= 0.02;
		}else if(kgvPerSlot < 2.2){
			coggingAdjust -= 0.015;
		}else if(kgvPerSlot < 2.8){
			coggingAdjust -= 0.008;
		}
	}
	coggingAdjust = Math.max(-0.02, Math.min(0.0, coggingAdjust));
	ratio = ratio + coggingAdjust;
	ratio = Math.max(cfg.min, Math.min(cfg.max, ratio));
	var commentKey = 'magnet_comment_balanced';
	if(mode == 'smooth'){ commentKey = 'magnet_comment_smooth'; }
	if(mode == 'torque'){ commentKey = 'magnet_comment_torque'; }
	return {
		rotorD: rotorD,
		polePitch: polePitch,
		modeLabel: cfg.label,
		ratio: ratio,
		suggested: polePitch * ratio,
		rangeMin: polePitch * cfg.min,
		rangeMax: polePitch * cfg.max,
		comment: lang[commentKey+'_'+selected_lang] || ''
	};
}

function buildMagnetWarnings(result, ctx){
	var grouped = {
		coverage: Array(),
		saturation: Array(),
		geometry: Array()
	};
	if(!result){
		return grouped;
	}
	var airGap = ctx && ctx.airGap ? ctx.airGap : 0;
	var magnetThickness = ctx && ctx.magnetThickness ? ctx.magnetThickness : 0;
	var statorD = ctx && ctx.statorD ? ctx.statorD : 0;
	var rotorD = result.rotorD || 0;
	var rotorToStator = (statorD > 0 && rotorD > 0) ? (rotorD / statorD) : 0;
	if(result.ratio >= 0.81){
		grouped.coverage[grouped.coverage.length] = lang['magnet_warn_cov_'+selected_lang];
	}
	if(result.ratio >= 0.78 && airGap > 0 && airGap < 0.35){
		grouped.coverage[grouped.coverage.length] = lang['magnet_warn_cov_gap_'+selected_lang];
	}
	if(result.ratio >= 0.79 && magnetThickness >= 3.0){
		grouped.saturation[grouped.saturation.length] = lang['magnet_warn_cov_thick_'+selected_lang];
	}
	// "Too wide" should trigger on high coverage combined with at least one hard geometry/stress factor.
	var tooWideCombo = (result.ratio >= 0.79) && (
		(airGap > 0 && airGap < 0.35) ||
		(magnetThickness >= 3.0) ||
		(rotorToStator >= 0.90)
	);
	if(tooWideCombo){
		grouped.geometry[grouped.geometry.length] = lang['magnet_warn_wide_'+selected_lang];
	}
	if(airGap > 0 && magnetThickness > 0 && (magnetThickness / airGap) >= 3.5){
		grouped.saturation[grouped.saturation.length] = lang['magnet_warn_sat_'+selected_lang];
	}
	if(rotorToStator >= 0.92){
		grouped.geometry[grouped.geometry.length] = lang['magnet_warn_backiron_'+selected_lang];
	}
	return grouped;
}

function buildMagnetSnapshot(ctx, result, groupedWarnings){
	if(!result || !ctx){
		return false;
	}
	var snapshot = {
		mode: ctx.mode || 'balanced',
		modeLabel: result.modeLabel || '',
		rotorDiameter: ctx.rotorDiameter || false,
		airGap: ctx.airGap || false,
		magnetThickness: ctx.magnetThickness || false,
		statorD: ctx.statorD || false,
		nuten: ctx.nuten || false,
		pole: ctx.pole || false,
		kgv: ctx.kgv || false,
		polePitch: result.polePitch,
		ratio: result.ratio,
		suggested: result.suggested,
		rangeMin: result.rangeMin,
		rangeMax: result.rangeMax,
		comment: result.comment || '',
		warningGroups: groupedWarnings || {coverage:Array(), saturation:Array(), geometry:Array()},
		inputs: {
			mode: ctx.mode || 'balanced',
			rotorDiameter: ctx.rotorDiameter || false,
			airGap: ctx.airGap || false,
			magnetThickness: ctx.magnetThickness || false,
			statorD: ctx.statorD || false
		},
		result: {
			polePitch: result.polePitch,
			ratio: result.ratio,
			suggested: result.suggested,
			rangeMin: result.rangeMin,
			rangeMax: result.rangeMax
		},
		warnings: groupedWarnings || {coverage:Array(), saturation:Array(), geometry:Array()}
	};
	return snapshot;
}

function renderMagnetWarnings(grouped){
	if(!grouped){
		return '';
	}
	var rows = Array();
	function addGroup(key, items){
		if(!items || !items.length){ return; }
		rows[rows.length] = '<li><b>'+lang['magnet_warn_group_'+key+'_'+selected_lang]+':</b> '+items.join(' ')+'</li>';
	}
	addGroup('coverage', grouped.coverage);
	addGroup('saturation', grouped.saturation);
	addGroup('geometry', grouped.geometry);
	if(!rows.length){
		return '';
	}
	return '<div class="magnet_warn_box"><div class="magnet_warn_title">'+lang['magnet_warn_title_'+selected_lang]+'</div><ul>'+rows.join('')+'</ul></div>';
}

function renderMagnetInlineHint(result, msg){
	if(msg){
		return '<div class="magnet_note">'+msg+'</div>';
	}
	if(!result){
		return '<div class="magnet_note">'+lang['magnet_need_input_'+selected_lang]+'</div>';
	}
	return '<div class="magnet_note">'+
		lang['magnet_inline_pitch_'+selected_lang]+': <b>'+result.polePitch.toFixed(2)+' mm</b> | '+
		lang['magnet_inline_cov_'+selected_lang]+': <b>'+Math.round(result.ratio*100)+'%</b> | '+
		lang['magnet_inline_width_'+selected_lang]+': <b>'+result.suggested.toFixed(2)+' mm</b>'+
	'</div>';
}

function renderMagnetAdviceCard(result, groupedWarnings, infoMsg){
	var html = '<div class="magnet_panel">';
	html += '<div class="magnet_title">'+lang['magnet_block_title_'+selected_lang]+'</div>';
	if(!result){
		html += '<div class="magnet_note">'+(infoMsg || lang['magnet_need_input_'+selected_lang])+'</div>';
		html += '<div class="magnet_limit_box"><div class="magnet_warn_title">'+lang['magnet_limit_title_'+selected_lang]+'</div><div class="magnet_note">'+lang['magnet_limit_intro_'+selected_lang]+'</div><div class="magnet_note">'+lang['magnet_limit_factors_'+selected_lang]+'</div></div>';
		html += '<div class="magnet_levels"><div class="magnet_warn_title">'+lang['magnet_levels_title_'+selected_lang]+'</div>';
		html += '<div class="magnet_level_row"><span>'+lang['magnet_level_v1_'+selected_lang]+'</span><b>'+lang['magnet_level_active_'+selected_lang]+'</b></div>';
		html += '<div class="magnet_level_row"><span>'+lang['magnet_level_v2_'+selected_lang]+'</span><b>'+lang['magnet_level_next_'+selected_lang]+'</b></div>';
		html += '<div class="magnet_level_row"><span>'+lang['magnet_level_v3_'+selected_lang]+'</span><b>'+lang['magnet_level_plan_'+selected_lang]+'</b></div>';
		html += '</div></div>';
		return html;
	}
	html += '<div class="magnet_rows">';
	html += '<div class="magnet_row"><span>'+lang['magnet_pitch_'+selected_lang]+'</span><b>'+result.polePitch.toFixed(2)+' mm</b></div>';
	html += '<div class="magnet_row"><span>'+lang['magnet_target_line_'+selected_lang]+'</span><b>'+result.modeLabel+'</b></div>';
	html += '<div class="magnet_row"><span>'+lang['magnet_coverage_'+selected_lang]+'</span><b>'+Math.round(result.ratio*100)+'%</b></div>';
	html += '<div class="magnet_row"><span>'+lang['magnet_suggested_'+selected_lang]+'</span><b>'+result.suggested.toFixed(2)+' mm</b></div>';
	html += '<div class="magnet_row"><span>'+lang['magnet_range_'+selected_lang]+'</span><b>'+result.rangeMin.toFixed(2)+'-'+result.rangeMax.toFixed(2)+' mm</b></div>';
	html += '</div>';
	html += '<div class="magnet_note">'+result.comment+'</div>';
	html += renderMagnetWarnings(groupedWarnings);
	html += '<div class="magnet_limit_box"><div class="magnet_warn_title">'+lang['magnet_limit_title_'+selected_lang]+'</div><div class="magnet_note">'+lang['magnet_limit_intro_'+selected_lang]+'</div><div class="magnet_note">'+lang['magnet_limit_factors_'+selected_lang]+'</div></div>';
	html += '<div class="magnet_levels"><div class="magnet_warn_title">'+lang['magnet_levels_title_'+selected_lang]+'</div>';
	html += '<div class="magnet_level_row"><span>'+lang['magnet_level_v1_'+selected_lang]+'</span><b>'+lang['magnet_level_active_'+selected_lang]+'</b></div>';
	html += '<div class="magnet_level_row"><span>'+lang['magnet_level_v2_'+selected_lang]+'</span><b>'+lang['magnet_level_next_'+selected_lang]+'</b></div>';
	html += '<div class="magnet_level_row"><span>'+lang['magnet_level_v3_'+selected_lang]+'</span><b>'+lang['magnet_level_plan_'+selected_lang]+'</b></div>';
	html += '</div>';
	html += '<div class="magnet_note">'+lang['magnet_note_'+selected_lang]+'</div></div>';
	return html;
}

function collectMagnetAdvisorState(){
	var ctx = buildMagnetContext();
	var check = validateMagnetContext(ctx);
	var hasScheme = !!(schemeCalculated && ctx.pole && ctx.nuten);
	return {
		ctx: ctx,
		check: check,
		hasScheme: hasScheme
	};
}

function computeMagnetAdvisorModel(state){
	if(!state || !state.hasScheme){
		return {
			valid: false,
			infoMsg: lang['magnet_need_scheme_'+selected_lang],
			result: false,
			groupedWarnings: false,
			snapshot: false
		};
	}
	if(!state.check || !state.check.ok){
		return {
			valid: false,
			infoMsg: state.check ? state.check.msg : lang['magnet_need_input_'+selected_lang],
			result: false,
			groupedWarnings: false,
			snapshot: false
		};
	}
	var result = calcMagnetRecommendation(
		state.ctx.rotorDiameter,
		state.ctx.mode || 'balanced',
		state.ctx.pole,
		state.ctx.nuten,
		state.ctx.kgv
	);
	var groupedWarnings = buildMagnetWarnings(result, state.ctx);
	return {
		valid: !!result,
		infoMsg: '',
		result: result,
		groupedWarnings: groupedWarnings,
		snapshot: buildMagnetSnapshot(state.ctx, result, groupedWarnings) || false
	};
}

function renderMagnetAdvisorModel(state, model){
	var mainHolder = document.getElementById('magnet_advice');
	var inlineHolder = document.getElementById('magnet_hint');
	if(!model || !model.valid){
		currentResultMeta.magnet = false;
		if(mainHolder){
			mainHolder.innerHTML = renderMagnetAdviceCard(false, false, model ? model.infoMsg : lang['magnet_need_input_'+selected_lang]);
		}
		if(inlineHolder){
			inlineHolder.innerHTML = renderMagnetInlineHint(false, model ? model.infoMsg : lang['magnet_need_input_'+selected_lang]);
		}
		return;
	}
	currentResultMeta.magnet = model.snapshot || false;
	if(mainHolder){
		mainHolder.innerHTML = renderMagnetAdviceCard(model.result, model.groupedWarnings, '');
	}
	if(inlineHolder){
		inlineHolder.innerHTML = renderMagnetInlineHint(model.result, '');
	}
}

function updateMagnetAdvisor(){
	var state = collectMagnetAdvisorState();
	var model = computeMagnetAdvisorModel(state);
	renderMagnetAdvisorModel(state, model);
}

function _enhGetSlots(){
	var raw = schemay || schemax || '';
	var out = Array();
	for(var i=0;i<raw.length;i++){
		var ch = raw[i];
		if(ch == '-' || ch == 'a' || ch == 'b' || ch == 'c' || ch == 'A' || ch == 'B' || ch == 'C'){
			out[out.length] = ch;
		}
	}
	return out;
}

function _enhStepToSlot(step){
	var raw = schemay || '';
	var count = 0;
	for(var i=0;i<raw.length && i<step;i++){
		var ch = raw[i];
		if(ch == '-' || ch == 'a' || ch == 'b' || ch == 'c' || ch == 'A' || ch == 'B' || ch == 'C'){
			count++;
		}
	}
	return count > 0 ? count-1 : -1;
}

function _phaseColor(phase){
	if(phase == 'a'){ return '#EA0000'; }
	if(phase == 'b'){ return '#008AE6'; }
	if(phase == 'c'){ return '#00CA00'; }
	return '#94a3b8';
}

function renderEnhancedView(activeStep){
	var container = document.getElementById('enhanced_view');
	if(!container){
		return;
	}
	var slots = _enhGetSlots();
	if(!slots || slots.length == 0){
		container.innerHTML = '';
		return;
	}
	if(enhancedView.mode == 'electrical'){
		container.innerHTML = renderElectricalDiagramSVG(slots);
		return;
	}
	if(enhancedView.mode == 'table'){
		container.innerHTML = renderEnhancedTable(slots);
		return;
	}
	container.innerHTML = renderWindingSVG(slots, activeStep);
	attachEnhancedInteractions();
}

function renderWindingSVG(slots, activeStep){
	var size = 680;
	var cx = 340;
	var cy = 340;
	var rOuter = 300;
	var rInner = 170;
	var slotR = 250;
	var activeSlot = _enhStepToSlot(activeStep || 0);
	var s = '<svg class="enhanced_svg" viewBox="0 0 '+size+' '+size+'" xmlns="http://www.w3.org/2000/svg">';
	s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+rOuter+'" class="enh_ring"/>';
	s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+rInner+'" class="enh_ring_inner"/>';
	for(var i=0;i<slots.length;i++){
		var ch = slots[i];
		var ph = ch.toLowerCase();
		var isPhase = ph == 'a' || ph == 'b' || ph == 'c';
		var a = ((i/slots.length)*Math.PI*2)-Math.PI/2;
		var x1 = cx + Math.cos(a)*(rInner+15);
		var y1 = cy + Math.sin(a)*(rInner+15);
		var x2 = cx + Math.cos(a)*slotR;
		var y2 = cy + Math.sin(a)*slotR;
		var xn = cx + Math.cos(a)*(rOuter-14);
		var yn = cy + Math.sin(a)*(rOuter-14);
		var tx = cx + Math.cos(a)*(rInner+45);
		var ty = cy + Math.sin(a)*(rInner+45);
		var showPhase = enhancedView.phase == 'all' || ph == enhancedView.phase || !isPhase;
		var opacity = showPhase ? '1' : '0.14';
		var activeClass = (i == activeSlot) ? ' is_active_slot' : '';
		var phaseAttr = isPhase ? ph : 'x';
		s += '<g class="enh_slot'+activeClass+'" data-phase="'+phaseAttr+'" data-slot="'+(i+1)+'" style="opacity:'+opacity+'">';
		s += '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+_phaseColor(ph)+'" stroke-width="5" stroke-linecap="round"/>';
		if(isPhase){
			s += '<circle cx="'+x2+'" cy="'+y2+'" r="8" fill="'+_phaseColor(ph)+'"/>';
		}
		if(enhancedView.showDirection && isPhase){
			var d = (ch == ch.toUpperCase()) ? lang['dir_plus_'+selected_lang] : lang['dir_minus_'+selected_lang];
			s += '<text x="'+tx+'" y="'+ty+'" class="enh_dir">'+d+'</text>';
		}
		if(enhancedView.showSlots){
			s += '<text x="'+xn+'" y="'+yn+'" class="enh_slot_num">'+(i+1)+'</text>';
		}
		s += '</g>';
	}
	s += '</svg>';
	return s;
}

function _applyEnhancedPhaseHover(phase){
	var container = document.getElementById('enhanced_view');
	if(!container){
		return;
	}
	var nodes = container.querySelectorAll('.enh_slot[data-phase]');
	for(var i=0;i<nodes.length;i++){
		var node = nodes[i];
		var p = node.getAttribute('data-phase');
		node.classList.remove('is_phase_focus');
		node.classList.remove('is_dim');
		if(phase != 'all' && p != 'x'){
			if(p == phase){
				node.classList.add('is_phase_focus');
			}else{
				node.classList.add('is_dim');
			}
		}
	}
}

function attachEnhancedInteractions(){
	var container = document.getElementById('enhanced_view');
	if(!container || enhancedView.mode != 'winding'){
		return;
	}
	var nodes = container.querySelectorAll('.enh_slot[data-phase]');
	for(var i=0;i<nodes.length;i++){
		nodes[i].onmouseenter = function(){
			var phase = this.getAttribute('data-phase');
			if(phase && phase != 'x'){
				enhancedHoverPhase = phase;
				_applyEnhancedPhaseHover(phase);
			}
		};
		nodes[i].onmouseleave = function(){
			enhancedHoverPhase = 'all';
			_applyEnhancedPhaseHover('all');
		};
	}
}

function renderElectricalDiagramSVG(slots){
	var w = 680;
	var h = 280;
	var left = 36;
	var right = w-20;
	var mid = 140;
	var amp = 70;
	var twoPi = Math.PI*2;
	function pathFor(shift){
		var p = '';
		for(var x=0;x<=600;x++){
			var t = (x/600)*twoPi + shift;
			var y = mid - Math.sin(t)*amp;
			var xx = left + x;
			p += (x==0 ? 'M':'L')+xx.toFixed(2)+' '+y.toFixed(2)+' ';
		}
		return p;
	}
	var pa = (enhancedView.phase == 'all' || enhancedView.phase == 'a') ? 1 : 0.15;
	var pb = (enhancedView.phase == 'all' || enhancedView.phase == 'b') ? 1 : 0.15;
	var pc = (enhancedView.phase == 'all' || enhancedView.phase == 'c') ? 1 : 0.15;
	var s = '<svg class="enhanced_svg enh_electrical" viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg">';
	s += '<line x1="'+left+'" y1="'+mid+'" x2="'+right+'" y2="'+mid+'" class="enh_axis"/>';
	s += '<path d="'+pathFor(0)+'" class="enh_wave_a" style="opacity:'+pa+'"/>';
	s += '<path d="'+pathFor((2*Math.PI)/3)+'" class="enh_wave_b" style="opacity:'+pb+'"/>';
	s += '<path d="'+pathFor((4*Math.PI)/3)+'" class="enh_wave_c" style="opacity:'+pc+'"/>';
	if(enhancedView.showSlots){
		for(var i=0;i<slots.length;i++){
			var xx = left + (600*(i/(slots.length)));
			s += '<line x1="'+xx+'" y1="'+(mid-88)+'" x2="'+xx+'" y2="'+(mid+88)+'" class="enh_slot_tick"/>';
			s += '<text x="'+xx+'" y="'+(mid+104)+'" class="enh_slot_num">'+(i+1)+'</text>';
		}
	}
	s += '</svg>';
	return s;
}

function renderEnhancedTable(slots){
	var html = '<table class="enhanced_table"><thead><tr><th>'+lang['slot_col_'+selected_lang]+'</th><th>'+lang['phase_col_'+selected_lang]+'</th><th>'+lang['dir_col_'+selected_lang]+'</th></tr></thead><tbody>';
	for(var i=0;i<slots.length;i++){
		var ch = slots[i];
		var ph = ch.toLowerCase();
		if(ph != 'a' && ph != 'b' && ph != 'c'){
			continue;
		}
		if(enhancedView.phase != 'all' && ph != enhancedView.phase){
			continue;
		}
		var dir = (ch == ch.toUpperCase()) ? lang['dir_plus_'+selected_lang] : lang['dir_minus_'+selected_lang];
		html += '<tr><td>'+(i+1)+'</td><td style="color:'+_phaseColor(ph)+';font-weight:bold;">'+ch.toUpperCase()+'</td><td>'+dir+'</td></tr>';
	}
	html += '</tbody></table>';
	return html;
}



//checkt ob quasi SPS möglich ist, wenn ja dan giebts die auswahlmögl.
function checkSPS(NutenCx,PoleCx,refresh){
	var NutenCx  = document.Windungsrechner.Nuten.value;
	var PoleCx = document.Windungsrechner.Pole.value;
	NutenCx = NutenCx.replace(/ /g,'');
	
	if(NutenCx%2==0 && !isNaN(NutenCx)){
		SPSselector.name="SPSsel";
		SPSselector.onchange = function(){schaltSPS();}
		SPSselector.innerHTML ="";
		var SPSoption2 = document.createElement('option');
		SPSoption2.value = "SPS";
		SPSoption2.innerHTML = "1 "+lang['schicht_'+selected_lang];
		var SPSoption1 = document.createElement('option');
		SPSoption1.value = "-";
		SPSoption1.innerHTML = "2 "+lang['schicht_'+selected_lang];
		if(istSPS){
			SPSoption2.selected="selected";
			SPSselector.appendChild(SPSoption2);
			SPSselector.appendChild(SPSoption1);
		}else if(!istSPS){
			SPSoption1.selected="selected";
			SPSselector.appendChild(SPSoption1);
			SPSselector.appendChild(SPSoption2);
		}
		document.Windungsrechner.insertBefore(SPSselector,document.getElementById('schalti'));
	}else if(document.Windungsrechner.SPSsel){
		document.Windungsrechner.removeChild(SPSselector);
		if(refresh){
			istSPS = false;
		}
	}
}

function schaltSPS(){
	if(document.Windungsrechner.SPSsel.value == "SPS"){
		istSPS = true;
		verteilt = false;
		verkuerzungValue = 0;
		checkVerteilt();
	}else if(document.Windungsrechner.SPSsel.value == "-"){
		istSPS = false;
		verteilt = false;
		checkVerteilt();
	}
}



// schema erweitert / einfach
function schema_eingeben(){
	document.getElementById('nuten_t').innerHTML=lang['schema_'+selected_lang];
	document.getElementById('info').innerHTML = '<span style="color:#999; font-size:9px;">( - '+lang['hammer_leer_'+selected_lang]+')</span> &nbsp; <span style="color:#999; font-size:9px;">( / '+lang['teil_motor_'+selected_lang]+')</span>'
	document.getElementById('Nuten').size='35';
	document.getElementById('Nuten').maxLength='99';
	if(schemax && !verteilt){
		document.getElementById('Nuten').value = schemax;
	}else if(verteilt){
		document.getElementById('Nuten').value = verteilt;
	}
	var eEl=document.getElementById('erweitert_einfach');
	if(eEl){eEl.textContent=lang['einfach_'+selected_lang];eEl.classList.add('is_open');eEl.onclick=function(){nut_pol_eingeben();}}
	document.getElementById('Berechnen').onclick = function(){mit_schema(); return false;}
	checkSPS(document.Windungsrechner.Nuten.value,document.Windungsrechner.Pole.value,false);
	checkVerteilt();
}
function nut_pol_eingeben(){
	document.getElementById('nuten_t').innerHTML=lang['nuten_'+selected_lang];
	document.getElementById('Nuten').size='3';
	document.getElementById('Nuten').maxLength='2';
	document.getElementById('info').innerHTML = '';
	if(schemax && !verteilt){
		document.getElementById('Nuten').value = schemax.length;
	}else if(verteilt){
		var nutZahL = verteilt.split('|');
		document.getElementById('Nuten').value = nutZahL.length-1;
	}
	var eEl2=document.getElementById('erweitert_einfach');
	if(eEl2){eEl2.textContent=lang['erweitert_'+selected_lang];eEl2.classList.remove('is_open');eEl2.onclick=function(){schema_eingeben();}}
	document.getElementById('Berechnen').onclick = function(){berechnen(document.Windungsrechner); return false;}
	fehler = false;
	checkSPS(document.Windungsrechner.Nuten.value,document.Windungsrechner.Pole.value,false);
	checkVerteilt();
}



function mit_schema(){
	var SPS = false;
	var schema = document.getElementById('Nuten').value.replace(/ /g,'');
	schema = schema.replace(/U/g,'A');
	schema = schema.replace(/u/g,'a');
	schema = schema.replace(/V/g,'B');
	schema = schema.replace(/v/g,'b');
	schema = schema.replace(/W/g,'C');
	schema = schema.replace(/w/g,'c');
	if(schema.indexOf('|')!=-1){
		verteilt = true;
	}else{
		verteilt = false;
	}
	
	if(verteilt){
		verteilt = schema;
		var nutcount = schema.split('|');
		schema = "";
		for(i=0;i<nutcount.length;i++){
			schema = schema+"-";
		}
		schema = schema.replace(/\|/g,'').replace(/a/g,'').replace(/b/g,'').replace(/c/g,'');
	}
	
	schema.indexOf('-')!=-1?SPS = true:0;
	if(schema[0] == '-' && schema[schema.length-1]== '-'){
		schema = schema.substr(1);
	}else if(schema[0] != '-' && schema[schema.length-1]!= '-' && SPS && schema.length % 3 != 0){
		schema = schema+'-';
	}
	var schema_y = schema;
	schema = schema.replace(/\//g,'');
	var Nuten = schema.length;
	var Pole = document.getElementById('Pole').value;
	if( Nuten % 3 != 0 || Nuten < 3 ) {
		document.getElementById('Ergebnis').innerHTML = lang['nut_3_teilbar_'+selected_lang];
		document.Windungsrechner.Nuten.focus();
		document.Windungsrechner.Nuten.select();
		blink(document.Windungsrechner.Nuten.id);
		clear();
		return;
	}

	if( Pole % 2 != 0 || Pole < 2 ) {
		document.getElementById('Ergebnis').innerHTML  = lang['pol_grade_'+selected_lang];
		document.Windungsrechner.Pole.focus();
		document.Windungsrechner.Pole.select();
		blink(document.Windungsrechner.Pole.id);
		clear();
		return;
	}
	
	if( Pole == Nuten ) {
		document.getElementById('Ergebnis').innerHTML  = lang['nut_pol_ungleich_'+selected_lang];
		document.Windungsrechner.Pole.focus();
		document.Windungsrechner.Pole.select();
		blink(document.Windungsrechner.Pole.id);
		clear();
		return;
	}
	vonHand = true;
	Schema_ausgeben(Nuten,Pole,schema,false,SPS,schema_y);
}







// Schema färben, KgV berechnen
function Schema_ausgeben(nuten,pole,schema,fehler,SPS,schema_y){
	nutenx = nuten;
	schemax = schema;
	if(!vonHand){
		schema_y = normalisiereSchemaAnzeige(schema_y);
	}
	schemay = schema_y;
	polex = pole;
	s_advanced = false;
	var ergebnis = document.getElementById('Ergebnis');
	var farbiges_ergebniss = '';
	
	//Buchstaben färben
	if(!verteilt){
		for(y=0;y<schema_y.length;y++){
			text_color = farbe_zu (schema_y[y]);
			farbiges_ergebniss += '<span class="phase_char" id="s_'+(y+1)+'" style="color:'+text_color+';">'+schema_y[y]+'</span>';
		}
	}else{
		var ohnestator = verteilt.replace(/\|/g,'');
		for(i=0;i<ohnestator.length;i++){
			if(ohnestator[0] == ohnestator[ohnestator.length-1]){
				var zwischen_Z = ohnestator[ohnestator.length-1];
				ohnestator = zwischen_Z+ohnestator.substring(0,ohnestator.length-1);
			}else{
				break;
			}
		}
		verteilt = "";
		for(i=0;i<ohnestator.length;i++){
			verteilt += ohnestator[i]+'|';
		}
		if(!istSPS && !vonHand){
			var ZweiSchichtV = "";
			for(y=0;y<verteilt.length;y++){
				if(verteilt[y]!='|' && verteilt[y]!='/' && verteilt[y]!='-'){
					ZweiSchichtV+=verteilt[y]+verteilt[y];
				}else{
					ZweiSchichtV+=verteilt[y];
				}
			}
			verteilt = ZweiSchichtV;
		}
		for(y=0;y<verteilt.length;y++){
			text_color = farbe_zu (verteilt[y]);
			farbiges_ergebniss += '<span class="phase_char" id="s_'+(y+1)+'" style="color:'+text_color+';">'+verteilt[y]+'</span>';
		}
	}
	if(document.getElementById('verkuerzung') && !isNaN(document.getElementById('verkuerzung').value) && !istSPS && verteilt){
		var um_verkuertzt = document.getElementById('verkuerzung').value;
		verkuerzungValue = um_verkuertzt;
		var nutbelag_xx = verteilt.split('|');	
		var erste_schicht = ""; 
		var zweite_schicht = "";
		for(i=0;i<nutbelag_xx.length-1;i++){
			erste_schicht += nutbelag_xx[i][1];
			zweite_schicht += nutbelag_xx[i][0];
		}
		var verteilt_neu = "";
		
		for(i=0;i<um_verkuertzt;i++){
			var zwischen_Z = erste_schicht[0];
			erste_schicht = erste_schicht.substring(1)+zwischen_Z;
		}
		for(i=0;i<nutbelag_xx.length-1;i++){
			verteilt_neu += erste_schicht[i]+zweite_schicht[i]+'|';
		}
		verteilt=verteilt_neu;
		farbiges_ergebniss = "";
		for(y=0;y<verteilt.length;y++){
			text_color = farbe_zu (verteilt[y]);
			farbiges_ergebniss += '<span class="phase_char" id="s_'+(y+1)+'" style="color:'+text_color+';">'+verteilt[y]+'</span>';
		}
	}
	
	if(!verteilt){
		var schritt_div = document.getElementById('steps');
		schritt_div.innerHTML = "<span></span>";
		schritt_div.firstChild.innerHTML = lang['schritt_schritt_'+selected_lang];
		schritt_div.firstChild.onclick = function(){schritt_fur_schritt();}
		act_schritt=1;
	}else{
		document.getElementById('steps').innerHTML='';
	}
	
	
	if(fehler){
		ergebnis.innerHTML = fehler+"( "+farbiges_ergebniss+" )";
		fehlerV = true;
	}else{
		ergebnis.innerHTML = farbiges_ergebniss;
		fehlerV = false;
	}
	//KgV errechnen
	var KgV = false;
	a = nuten;
	b = pole;
	x = a;
	y = b; 
        
	while (x<y||x>y){
		if (x-y<0){
			x=x*1+a*1;
		}else{
			y=y*1+b*1;
		}
        
		}
	KgV = x;
	currentResultMeta.kgv = KgV;
	currentResultMeta.nuten = nuten;
	currentResultMeta.pole = pole;
		
	document.getElementById('Rasten').innerHTML = lang['rastetn1_'+selected_lang]+' <span style="font-weight:bold;">'+KgV+'</span> '+lang['rastetn2_'+selected_lang]+'. <span style="font-size:10px; color:#999; font-style:italic;">'+lang['kgv_'+selected_lang]+'('+nuten+','+pole+')</span>';
	document.getElementById('Rasten').style.borderBottom = "1px solid #000";
	if(document.getElementById('schalt')){
		var schaltung = document.getElementById('schalt').value;
	}else{
		var schaltung  = '-';
	}
	schaltung  == '-' ? schaltung= false:0;
	
	schaltx = schaltung;
	var zeichnen_schema = schema_y;
	if(verteilt){
		zeichnen_schema = verteiltZuKlassisch(verteilt);
	}
	if(!vonHand){
		zeichnen_schema = normalisiereSchemaAnzeige(zeichnen_schema);
	}
	currentResultMeta.schema = zeichnen_schema;
	drawStator(nuten,zeichnen_schema,false,schaltung);
	renderEnhancedView(0);
	WF_FFT(schema,SPS);
	Wickel_Faktor_zeigen();
	renderWindingAssessment(zeichnen_schema, nuten, pole, !!verteilt);
	renderEngineeringTools();
	schemeCalculated = true;
	updateMagnetAdvisor();
	gen_tabelle(WF);
	if(nutungsfaktor_dazu){
		document.getElementById('WFMN').checked = "checked";
		w_n_factor();
	}
	if(schraegung_dazu){
		document.getElementById('WFMS').checked = "checked";
		w_s_factor();
	}
		
	//weiteführende links finden
	var alle_links = document.getElementsByTagName('a');
	var link_container = document.getElementById('link_container');
	link_container.innerHTML = '';
	var weitere_links = Array();
	for(i=0;i<alle_links.length;i++){
		if(alle_links[i].className == 'N_'+nuten+'_'+'P_'+pole){
			weitere_links[weitere_links.length] = alle_links[i];
		}
	}
	if(weitere_links[0] && weitere_links[0] != ''){
		var w_links = '<div>'+lang['sieheauch_'+selected_lang]+'</div><ul>';
		for(i=0;i<weitere_links.length;i++){
			w_links += '<li><a href="'+weitere_links[i].href+'">'+weitere_links[i].innerHTML+'</a></li>';
		}
		link_container.innerHTML = w_links+'</ul>';
	}
	if(document.getElementById('WFMN')){
		if(!nutungsfaktor_dazu){
			document.getElementById('WFMN').checked = false;
		}
		if(!schraegung_dazu){
			document.getElementById('WFMS').checked = false;
		}
	}
	if(!s_advanced){
		gen_SAnzeige();
	}
	_postCalcUX();
}

function Wickel_Faktor_zeigen(){
	if(WF[0][(polex/2)-1]==WF[1][(polex/2)-1]){
		w_factor = WF[0][(polex/2)-1];
	}else{
		w_factor = '<span style="color:#CC0000;">'+lang['Schwankend_'+selected_lang]+'</span>'
	}
	currentResultMeta.wf = (typeof w_factor == 'string') ? w_factor.replace(/<[^>]*>/g,'') : w_factor;
	currentResultMeta.wfNumeric = (typeof w_factor == 'number') ? w_factor : parseFloat(currentResultMeta.wf);
	
	if(document.getElementById('wf_tabelle')){
		einf_erw = '<button type="button" id="advanced" class="adv_toggle_btn is_open" onclick="z_einfach();">'+lang['einfach_'+selected_lang]+'</button>';
	}else{
		einf_erw = '<button type="button" id="advanced" class="adv_toggle_btn" onclick="advanced();">'+lang['erweitert_'+selected_lang]+'</button>';
	}
	
	document.getElementById('Rasten').innerHTML += '<br />'+lang['wickelfaktor_'+selected_lang]+'<span style="font-weight:bold;">'+w_factor+'</span> '+einf_erw;
	
	
}




// nutfaktor felder einblenden
function advanced(){
	if(!s_advanced){
		var w_und_nut ='<section id="advanced_panel">';
		w_und_nut +='<div id="wf_auswahl">'+lang['WF_tabelle_'+selected_lang]+'</div>';
		w_und_nut +='<div id="special">';
		w_und_nut +='<div class="adv_block">';
		w_und_nut +='<div class="adv_block_title">'+lang['nutfaktor_'+selected_lang]+'</div>';
		w_und_nut +='<label class="adv_field_label" for="statorD">'+lang['stator_d_'+selected_lang]+'</label>';
		w_und_nut +='<div class="adv_field_wrap"><input onblur="w_n_factor();" onchange="w_n_factor();" type="text" id="statorD" value="'+statorDiameterValue+'" /><span class="adv_unit">mm</span></div>';
		w_und_nut +='<label class="adv_field_label" for="nutB">'+lang['nut_B_'+selected_lang]+'</label>';
		w_und_nut +='<div class="adv_field_wrap"><input onchange="w_n_factor();" onblur="w_n_factor();" type="text" id="nutB" /><span class="adv_unit">mm</span></div>';
		w_und_nut +='<label class="adv_check"><input id="WFMN" onchange="w_n_factor();" type="checkbox" /> '+lang['inTabelle_'+selected_lang]+'</label>';
		w_und_nut +='</div>';
		w_und_nut +='<div class="adv_block">';
		w_und_nut +='<div class="adv_block_title">'+lang['schraegung1_'+selected_lang]+'</div>';
		w_und_nut +='<label class="adv_field_label" for="schraegung">'+lang['schraegung2_'+selected_lang]+':</label>';
		w_und_nut +='<div class="adv_field_wrap"><input type="text" onchange="w_s_factor();" onblur="w_s_factor();" id="schraegung" /><span class="adv_unit">'+lang['nuten_'+selected_lang]+'</span></div>';
		w_und_nut +='<label class="adv_check"><input onchange="w_s_factor();" id="WFMS" type="checkbox" /> '+lang['inTabelle_'+selected_lang]+'</label>';
		w_und_nut +='</div>';
		w_und_nut +='<div class="adv_block">';
		w_und_nut +='<div class="adv_block_title">'+lang['magnet_block_title_'+selected_lang]+'</div>';
		w_und_nut +='<label class="adv_field_label" for="rotorMagD">'+lang['rotor_magnet_d_'+selected_lang]+'</label>';
		w_und_nut +='<div class="adv_field_wrap"><input type="text" onchange="updateMagnetAdvisor();" onblur="updateMagnetAdvisor();" id="rotorMagD" value="'+rotorMagnetDiameterValue+'" /><span class="adv_unit">mm</span></div>';
		w_und_nut +='<label class="adv_field_label" for="magnetGoal">'+lang['magnet_target_'+selected_lang]+'</label>';
		w_und_nut +='<div class="adv_field_wrap"><select id="magnetGoal" onchange="updateMagnetAdvisor();">';
		w_und_nut +='<option value="smooth">'+lang['magnet_smooth_'+selected_lang]+'</option>';
		w_und_nut +='<option value="balanced">'+lang['magnet_balanced_'+selected_lang]+'</option>';
		w_und_nut +='<option value="torque">'+lang['magnet_torque_'+selected_lang]+'</option>';
		w_und_nut +='</select></div>';
		w_und_nut +='<label class="adv_field_label" for="airGap">'+lang['air_gap_'+selected_lang]+'</label>';
		w_und_nut +='<div class="adv_field_wrap"><input type="text" onchange="updateMagnetAdvisor();" onblur="updateMagnetAdvisor();" id="airGap" value="'+airGapValue+'" /><span class="adv_unit">mm</span></div>';
		w_und_nut +='<label class="adv_field_label" for="magnetThickness">'+lang['magnet_thickness_'+selected_lang]+'</label>';
		w_und_nut +='<div class="adv_field_wrap"><input type="text" onchange="updateMagnetAdvisor();" onblur="updateMagnetAdvisor();" id="magnetThickness" value="'+magnetThicknessValue+'" /><span class="adv_unit">mm</span></div>';
		w_und_nut +='<div id="magnet_hint"></div>';
		w_und_nut +='</div>';
		w_und_nut +='</div>';
		w_und_nut +='<div id="adv_help_box"><div id="adv_help_title">'+lang['adv_help_title_'+selected_lang]+'</div><div class="adv_help_line">'+lang['adv_help_1_'+selected_lang]+'</div><div class="adv_help_line">'+lang['adv_help_2_'+selected_lang]+'</div><div class="adv_help_line">'+lang['adv_help_3_'+selected_lang]+'</div><div class="adv_help_line">'+lang['adv_help_4_'+selected_lang]+'</div></div>';
		w_und_nut +='<div><button type="button" id="WundNberechnen" onclick="w_n_factor(); w_s_factor(); updateMagnetAdvisor();">'+lang['anwenden_'+selected_lang]+'</button></div>';
		w_und_nut +='<div id="WFschwankung"></div><div id="wf_tabelle"></div></section>';

		document.getElementById('nutfacktor').innerHTML += w_und_nut;
		if(document.getElementById('magnetGoal')){
			document.getElementById('magnetGoal').value = magnetGoalValue || 'balanced';
		}
		updateMagnetAdvisor();
		s_advanced = true;
		var advBtn = document.getElementById('advanced');
		if(advBtn){
			advBtn.textContent = lang['einfach_'+selected_lang];
			advBtn.className = 'adv_toggle_btn is_open';
			advBtn.onclick = function(){ z_einfach(); };
		}
		gen_SAnzeige();
		gen_tabelle(WF);
	}
	gen_SAnzeige();
}
var darfleufen=false;
function gen_SAnzeige(){
	if(!verteilt){
		var AZcontainer = document.getElementById("WFschwankung");
		AZcontainer.innerHTML = '';
		if(!verteilt){
			var started = false;
			var AnzeigeInhalt = "";
			AnzeigeInhalt += '<span style="font-weight:bold;">'+lang['windungen_'+selected_lang]+':</span><div style="font-size:11px;">';
			var zaehler = 0
			for(i=0;i<schemax.length;i++){
				if(zaehler ==0){AnzeigeInhalt += '<div style="margin:2px; background-color:#EAEAEA;">';}
				if(schemax[i]!='-'){
					AnzeigeInhalt += schemax[i]+'<input type="text" size="1" style="width:20px;" id="gAZ_'+[i]+'" value="1" />&nbsp;';
				}else{
					AnzeigeInhalt += schemax[i]+'<input type="text" size="1" style="width:20px;" id="gAZ_'+[i]+'" value="0" disabled="disabled" />&nbsp;';
				}
				zaehler++;
				if(zaehler ==20){AnzeigeInhalt += '<div>'; zaehler = 0; }
			}
			if(zaehler !=0){AnzeigeInhalt += '<div>'; zaehler = 0; }
			AnzeigeInhalt += '<br /><br /><input type="button" style="cursor:pointer; cursor:hand;" onclick="startAnim()" value="'+lang['anim_zeigen_'+selected_lang]+'" />';
			AnzeigeInhalt += '<div id="animationC"></div></div>';
			AZcontainer.innerHTML=AnzeigeInhalt;
		}
	}
}
var ergebnisse = Array();
function startAnim(){
	document.getElementById('animationC').innerHTML="";
	var GZfehler = false;
	var windungszahlen = Array();
	for(i=0;i<schemax.length;i++){
		var GZahl = document.getElementById("gAZ_"+[i]).value;
		windungszahlen[windungszahlen.length] = GZahl;
		if(GZahl == '' || isNaN(GZahl)){
			blink("gAZ_"+[i]);
			GZfehler = true;
		}
	}
	if(!GZfehler){
		var maxnutb = 1;
		for(k=0;k<windungszahlen.length;k++){
			var Z1 = 0;
			var Z2 = 0;
			
			Z1 = windungszahlen[k];
			if(k==0){
				Z2 = windungszahlen[windungszahlen.length-1];
			}else{
				Z2 = windungszahlen[k-1];
			}
			var maxnbtest = parseInt(Z1)+parseInt(Z2);
			if(maxnbtest>maxnutb){
				maxnutb = maxnbtest;
			}
		}
		var berWFs = holWFs(schemax,windungszahlen,polex,maxnutb);
	}
}

function holWFs(schemax,windungszahlen,polek,maxnutb){
	ergebnisse = Array();
	for(tg=0;tg<400;tg++){
		var testXS = WF_FFTschnell(schemax,windungszahlen,polek,(tg/100),maxnutb);
		ergebnisse[ergebnisse.length]  = testXS;
	}
	darfleufen=false;
	setTimeout('Ezeigen();',150);
}


function Ezeigen(){
	var anzCont = document.getElementById('animationC');
	var xmin = 1;
	var xmax = 0;
	var xschnitt = 0;
	for(e=0;e<ergebnisse.length;e++){
		if(xmin>ergebnisse[e]){xmin = ergebnisse[e];}
		if(xmax<ergebnisse[e]){xmax = ergebnisse[e];}
		xschnitt = xschnitt+ergebnisse[e];
	}
	xschnitt = Math.round((xschnitt/ergebnisse.length)* 100000) / 100000;
	
	
	
	var anzContI = '<table width="100%" border="0" cellpadding="1" cellspacing="0">';
	anzContI += '<tr><td width="80%"><table height="250" width="100%" border="0" cellpadding="1" cellspacing="0"><tr>';
	for(y2=17; y2>0;y2--){
		anzContI += '<td colspan="2" height="11" id="anzT_'+y2+'" valign="bottom" style="font-size:9px;"></td>';
	}
	anzContI += '</tr>';
	anzContI += '<tr>';
	for(y2=34; y2>0;y2--){
		anzContI += '<td height="238" valign="bottom"><div style="width:15px; height:0px; background-color:#339966;" id="anz_'+y2+'"></div></td>';
	}
	anzContI += '</tr></table></td><td width="20%"><table height="250" width="100%" border="0" cellpadding="1" cellspacing="0">';
	anzContI += '<tr>';
	anzContI += '<td height="16%" id="minWF" valign="top">'+lang['zeit_'+selected_lang]+'</td>';
	anzContI += '</tr>';
	anzContI += '<tr>';
	anzContI += '<td height="28%" id="minWF" valign="top">'+lang['max_'+selected_lang]+':<br />'+xmax+'</td>';
	anzContI += '</tr>';
	anzContI += '<tr>';
	anzContI += '<td height="28%" id="maxWF" valign="middle">'+lang['schnitt_'+selected_lang]+':<br />'+xschnitt+'</td>';
	anzContI += '</tr>';
	anzContI += '<tr>';
	anzContI += '<td height="28%" id="schnittWF" valign="bottom">'+lang['min_'+selected_lang]+':<br />'+xmin+'</td>';
	anzContI += '</tr>';
	anzContI += '</table></td></tr></table>';
	darfleufen=true;
	anzCont.innerHTML=anzContI;
	startesx(0);
}

function startesx(a_count){
	if(darfleufen){
		if(a_count>=400){
			a_count = 0;
			setTimeout('Tanzeigen('+a_count+')',200);
		}else{
			setTimeout('Tanzeigen('+a_count+')',60);
		}
	}
}

function Tanzeigen(a_count){
	for(y3=1; y3<34;y3++){
		if(ergebnisse[a_count-y3]){
			document.getElementById('anz_'+y3).style.height = Math.round(ergebnisse[a_count-y3]*236)+"px"
			if(y3%2==0){
				document.getElementById('anzT_'+(y3/2)).innerHTML = ((a_count-y3)/100);
			}
		}else{
			document.getElementById('anz_'+y3).style.height = 0+"px"
			if(y3%2==0){
				document.getElementById('anzT_'+(y3/2)).innerHTML = '';
			}
		}
	}
	a_count = a_count+1
	startesx(a_count);
}	



function z_einfach(){
	s_advanced = false;
	document.getElementById('nutfacktor').innerHTML = '';
	var advBtn = document.getElementById('advanced');
	if(advBtn){
		advBtn.textContent = lang['erweitert_'+selected_lang];
		advBtn.className = 'adv_toggle_btn';
		advBtn.onclick = function(){ advanced(); };
	}
}

function gen_tabelle(WFA){
	if(document.getElementById('wf_tabelle')){
		var WFtabelle = document.getElementById('wf_tabelle');

		var Tanzeige = '<table border="0" cellspacing="1" cellpadding="0" width="100%" style="border-bottom:1px solid #000; padding-bottom:5px; padding-top:5px;">';
		Tanzeige += '<tr><td style="border:1px solid #CCC; border-left:none; border-top:none; font-weight:bold;" width="35">'+lang['pole_'+selected_lang]+'</td><td  width="35" style="border:1px solid #CCC; border-left:none; border-top:none; font-weight:bold;">'+lang['zeit_'+selected_lang]+'</td><td style=" font-weight:bold; border:1px solid #CCC;border-left:none; border-right:none; border-top:none;">'+lang['WF_'+selected_lang]+'</td></tr>';	
		
		var bg_farbe = "#EAEAEA";
		for(i=0;i<(nutenx*2);i++){
			
			for(T=0;T<t.length;T++){
				if(WFA[T][i] >1){
					WFA[T][i] = "err"
				}
				if(WFA[0][i] > 0 && WFA[0][i] == WFA[1][i]){
					if(T==0){
						var balkenfarbe = "#339966";
					}else{
						var balkenfarbe = "#55BB88";
					}
				}else{
					if(WFA[0][i] != WFA[1][i]){
						if(T==0){
							var balkenfarbe = "#CC0000";
						}else{
							var balkenfarbe = "#FF2222";
						}
					}else{
						var balkenfarbe = "#CC0000";
					}
				}
				Tanzeige += '<tr><td style="background:'+bg_farbe+'; border-right:1px solid #CCC;">'+(i+1)*2+'</td><td style="background:'+bg_farbe+'; border-right:1px solid #CCC;">'+t[T]+'</td><td style="background:'+bg_farbe+';"><div style="background:'+balkenfarbe+'; width:'+Math.round(WFA[T][i]*520)+'px; float:left;">&nbsp</div><div style="float:left;"> &nbsp;'+WFA[T][i]+'</div></td></tr>';
			}
			if(bg_farbe == "#EAEAEA"){
				bg_farbe = "";
			}else{
				bg_farbe = "#EAEAEA";
			}
		}
		
		Tanzeige += '</table>';
		WFtabelle.innerHTML = Tanzeige;
		document.getElementById('special').style.display= "grid";
		document.getElementById('wf_auswahl').style.display= "block";
	}
}




//Wickelfaktor mit nutfaktor berechnen
function w_n_factor(){
	if(document.getElementById('WFMN') && document.getElementById('WFMN').checked == true){
		if(document.getElementById('WFMS') && document.getElementById('WFMS').checked == true){
			var alterWF = WF2;
		}else{
			var alterWF = WF;
		}
		
		if(document.getElementById('statorD') && document.getElementById('nutB')){
			var SDa = document.getElementById('statorD').value;
			var bs = document.getElementById('nutB').value;
			SDa = SDa.replace(/,/,'.');
			bs = bs.replace(/,/,'.');
		}
		if(SDa != 0 && SDa!='' && bs!=0 && bs!='' && !isNaN(SDa) && !isNaN(bs)){
			for(i=0;i<alterWF.length;i++){
				for(y=0;y<alterWF[i].length;y++){
					var w_factor_m_nut2 = WF[i][y]*(Math.sin((y+1)*bs/SDa)/((y+1)*bs/SDa));
					w_factor_m_nut2 = Math.round(w_factor_m_nut2 * 100000) / 100000;					
					WF1[i][y] = w_factor_m_nut2;
					if(document.getElementById('WFMS') && document.getElementById('WFMS').checked == true){
						var w_factor_m_nut = alterWF[i][y]*(Math.sin((y+1)*bs/SDa)/((y+1)*bs/SDa));
						w_factor_m_nut = Math.round(w_factor_m_nut * 100000) / 100000;
						WF3[i][y] = w_factor_m_nut;
					}
				}
			}
			if(document.getElementById('WFMS') && document.getElementById('WFMS').checked == true){
				gen_tabelle(WF3);
			}else{
				gen_tabelle(WF1);
			}
			nutungsfaktor_dazu = true;
		}else{
			if(SDa == 0 || SDa =='' || isNaN(SDa)){
				document.getElementById('statorD').value = 0;
				blink('statorD');
			}
			if(bs ==0 || bs=='' || isNaN(bs)){
				document.getElementById('nutB').value = 0;
				blink('nutB');
			}
			document.getElementById('WFMN').checked = false;
			if(document.getElementById('WFMS') && document.getElementById('WFMS').checked == true){
				gen_tabelle(WF2);
			}else{
				gen_tabelle(WF);
			}
			nutungsfaktor_dazu = false;
		}
	}else{
		if(document.getElementById('WFMS') && document.getElementById('WFMS').checked == true){
			gen_tabelle(WF2);
		}else{
			gen_tabelle(WF);
		}
		nutungsfaktor_dazu = false;
	}
}

function w_s_factor(){
	if(document.getElementById('WFMS') && document.getElementById('WFMS').checked == true){
		if(document.getElementById('WFMN') && document.getElementById('WFMN').checked == true){
			var alterWF = WF1;
		}else{
			var alterWF = WF;
		}
		
		if(document.getElementById('schraegung')){
			var schraegungE = document.getElementById('schraegung').value;
			schraegungE = schraegungE.replace(/,/,'.');
		}
		if(schraegungE != 0 && schraegungE!='' && !isNaN(schraegungE)){
			for(i=0;i<alterWF.length;i++){
				for(y=0;y<alterWF[i].length;y++){ //sin(z*pi*i/2/N1) / (z*pi*i/2/N1)
					var w_factor_m_S2 = WF[i][y]*(Math.sin(schraegungE*Math.PI*(y+1)/nutenx) / (schraegungE*Math.PI*(y+1)/nutenx));
					w_factor_m_S2 = Math.round(w_factor_m_S2 * 100000) / 100000;
					WF2[i][y] = w_factor_m_S2;
					if(document.getElementById('WFMN') && document.getElementById('WFMN').checked == true){
						var w_factor_m_S = alterWF[i][y]*(Math.sin(schraegungE*Math.PI*(y+1)/nutenx) / (schraegungE*Math.PI*(y+1)/nutenx));
						w_factor_m_S = Math.round(w_factor_m_S * 100000) / 100000;
						WF3[i][y] = w_factor_m_S;
					}
				}
			}
			if(document.getElementById('WFMN') && document.getElementById('WFMN').checked == true){
				gen_tabelle(WF3);
			}else{
				gen_tabelle(WF2);
			}
			schraegung_dazu=true;
		}else{
			document.getElementById('schraegung').value = 0;
			document.getElementById('WFMS').checked = false;
			blink('schraegung');
			if(document.getElementById('WFMN') && document.getElementById('WFMN').checked == true){
				gen_tabelle(WF1);
			}else{
				gen_tabelle(WF);
			}
			schraegung_dazu=false;
		}
	}else{
		if(document.getElementById('WFMN') && document.getElementById('WFMN').checked == true){
			gen_tabelle(WF1);
		}else{
			gen_tabelle(WF);
		}
		schraegung_dazu=false;
		
	}
}








//die einzelnen schritte
function schritt_fur_schritt(){
	drawStator(nutenx,schemay,act_schritt,schaltx);
	var schritt_div = document.getElementById('steps');
	var chars = document.querySelectorAll('[id^="s_"]');
	for(var i=0;i<chars.length;i++){
		chars[i].className = 'phase_char';
	}
	if(document.getElementById('s_'+act_schritt)){
		document.getElementById('s_'+act_schritt).className = 'phase_char is_active';
	}
	var canvas_container = document.getElementById('canvas_container');
	if(canvas_container){
		canvas_container.classList.remove('is_step_pulse');
		void canvas_container.offsetWidth;
		canvas_container.classList.add('is_step_pulse');
	}
	renderEnhancedView(act_schritt);
	schritt_div.innerHTML = '<span class="step_nav_btn" onclick="if(act_schritt!=1){act_schritt = act_schritt-1;schritt_fur_schritt();};return false;">&lt;-'+lang['schritt_zurueck_'+selected_lang]+'</span><span class="step_progress">'+act_schritt+'/'+schemay.length+'</span><span class="step_nav_btn" onclick="if(act_schritt < schemay.length){act_schritt = act_schritt+1;schritt_fur_schritt();};return false;">'+lang['schritt_vor_'+selected_lang]+'-&gt;</span>';
}

function farbe_zu (buchstabe) {
	var farbe = '#00CA00';
	buchstabe = buchstabe.toLowerCase();
	if(buchstabe == '|'){farbe = '#000000';}
	if(buchstabe == '/'){farbe = '#000000';}
	if(buchstabe == '-'){farbe = '#000000';}
	if(buchstabe == 'a'){farbe = '#EA0000';}
	if(buchstabe == 'b'){farbe = '#008AE6';}
	if(buchstabe == 'c'){farbe = '#00CA00';}
	return farbe;
}

function verteiltZuKlassisch(verteiltSchema){
	if(!verteiltSchema){
		return '';
	}
	function nextPhase(ph){
		if(ph == 'a'){ return 'b'; }
		if(ph == 'b'){ return 'c'; }
		if(ph == 'c'){ return 'a'; }
		return ph;
	}
	var slots = verteiltSchema.split('|');
	var klassisch = '';
	var prev = false;
	for(var i=0;i<slots.length;i++){
		var slot = slots[i];
		if(!slot){
			continue;
		}
		slot = slot.replace(/[^abcABC\-]/g,'');
		if(slot.length == 0){
			continue;
		}
		var kandidaten = Array();
		for(var k=0;k<slot.length;k++){
			if(slot[k] != '-'){
				kandidaten[kandidaten.length] = slot[k];
			}
		}
		if(kandidaten.length == 0){
			klassisch += '-';
			continue;
		}
		var zeichen = kandidaten[0];
		if(prev){
			var exp = nextPhase(prev.toLowerCase());
			for(var j=0;j<kandidaten.length;j++){
				if(kandidaten[j].toLowerCase() == exp){
					zeichen = kandidaten[j];
					break;
				}
			}
			if(zeichen.toLowerCase() == prev.toLowerCase() && kandidaten.length > 1){
				for(var m=0;m<kandidaten.length;m++){
					if(kandidaten[m].toLowerCase() == zeichen.toLowerCase() && kandidaten[m] != prev){
						zeichen = kandidaten[m];
						break;
					}
				}
			}
		}else{
			for(var n=0;n<kandidaten.length;n++){
				if(kandidaten[n].toUpperCase() == kandidaten[n]){
					zeichen = kandidaten[n];
					break;
				}
			}
		}
		klassisch += zeichen;
		prev = zeichen;
	}
	return klassisch;
}

function normalisiereSchemaAnzeige(schemaRaw){
	if(!schemaRaw){
		return schemaRaw;
	}
	var teile = schemaRaw.split('/');
	for(var tIdx=0;tIdx<teile.length;tIdx++){
		var teil = teile[tIdx];
		if(!teil){
			continue;
		}
		var first = {a:-1,b:-1,c:-1};
		for(var i=0;i<teil.length;i++){
			var ch = teil[i].toLowerCase();
			if((ch=='a' || ch=='b' || ch=='c') && first[ch] == -1){
				first[ch] = i;
			}
		}
		var reihenfolge = Array();
		for(var p=0;p<3;p++){
			var key = p==0 ? 'a' : (p==1 ? 'b' : 'c');
			if(first[key] != -1){
				reihenfolge[reihenfolge.length] = {k:key, i:first[key]};
			}
		}
		reihenfolge.sort(function(x,y){ return x.i-y.i; });
		if(reihenfolge.length == 3){
			var ziel = Array('a','b','c');
			var map = {};
			for(var r=0;r<3;r++){
				map[reihenfolge[r].k] = ziel[r];
			}
			var out = '';
			for(var j=0;j<teil.length;j++){
				var c = teil[j];
				var lc = c.toLowerCase();
				if(map[lc]){
					out += (c==c.toUpperCase()) ? map[lc].toUpperCase() : map[lc];
				}else{
					out += c;
				}
			}
			teil = out;
		}
		var aPos = -1;
		for(var k=0;k<teil.length;k++){
			var ck = teil[k].toLowerCase();
			if(ck == 'a'){
				aPos = k;
				break;
			}
		}
		if(aPos > 0){
			teil = teil.substring(aPos) + teil.substring(0,aPos);
		}
		teile[tIdx] = teil;
	}
	return teile.join('/');
}


function _mainSvgSlots(schema){
	var out = Array();
	if(!schema){
		return out;
	}
	for(var i=0;i<schema.length;i++){
		var ch = schema[i];
		if(ch == 'a' || ch == 'b' || ch == 'c' || ch == 'A' || ch == 'B' || ch == 'C' || ch == '-'){
			out[out.length] = ch;
		}
	}
	return out;
}

function _mainSvgStepToSlot(schema, schritt){
	if(!schritt){
		return -1;
	}
	var count = 0;
	for(var i=0;i<schema.length && i<schritt;i++){
		var ch = schema[i];
		if(ch == 'a' || ch == 'b' || ch == 'c' || ch == 'A' || ch == 'B' || ch == 'C' || ch == '-'){
			count++;
		}
	}
	return count > 0 ? count-1 : -1;
}

function _polarPoint(cx, cy, r, a){
	return {
		x: cx + Math.cos(a) * r,
		y: cy + Math.sin(a) * r
	};
}

function _arcPath(cx, cy, r, a1, a2){
	var p1 = _polarPoint(cx, cy, r, a1);
	var p2 = _polarPoint(cx, cy, r, a2);
	var large = (Math.abs(a2-a1) > Math.PI) ? 1 : 0;
	return 'M '+p1.x.toFixed(2)+' '+p1.y.toFixed(2)+' A '+r+' '+r+' 0 '+large+' 1 '+p2.x.toFixed(2)+' '+p2.y.toFixed(2);
}

function _normAngle(a){
	while(a < 0){ a += Math.PI*2; }
	while(a >= Math.PI*2){ a -= Math.PI*2; }
	return a;
}

function _cwDiff(fromA, toA){
	var f = _normAngle(fromA);
	var t = _normAngle(toA);
	if(t >= f){
		return t-f;
	}
	return (Math.PI*2 - f) + t;
}

function _ccwDiff(fromA, toA){
	return (Math.PI*2) - _cwDiff(fromA, toA);
}

function _arcPathDir(cx, cy, r, a1, a2, sweep){
	var p1 = _polarPoint(cx, cy, r, a1);
	var p2 = _polarPoint(cx, cy, r, a2);
	var arcLen = sweep ? _cwDiff(a1,a2) : _ccwDiff(a1,a2);
	var large = arcLen > Math.PI ? 1 : 0;
	return 'M '+p1.x.toFixed(2)+' '+p1.y.toFixed(2)+' A '+r+' '+r+' 0 '+large+' '+(sweep?1:0)+' '+p2.x.toFixed(2)+' '+p2.y.toFixed(2);
}

function renderMainStatorSvg(nuten, schema, schritt, Y_D){
	var canvas_container = document.getElementById('canvas_container');
	if(!canvas_container){
		return false;
	}
	var slots = _mainSvgSlots(schema);
	if(!slots || slots.length == 0){
		canvas_container.innerHTML = '';
		return true;
	}

	var size = 700;
	var cx = 350;
	var cy = 350;
	var slotCount = slots.length;
	var rOuter = 316;
	var rInner = 188;
	var rSlotInner = 217;
	var rSlotOuter = 279;
	var rToothRoot = rInner + 16;
	var rToothTip = rOuter - 44;
	var showDirection = enhancedView.showDirection;
	var showSlotNumbers = enhancedView.showSlots;
	var phaseFilter = enhancedView.phase || 'all';
	var activeSlot = _mainSvgStepToSlot(schema, schritt);
	var progressive = !!schritt;

	var firstPos = {a:-1,b:-1,c:-1}; // Start = first uppercase occurrence
	var lastPos = {a:-1,b:-1,c:-1};  // End   = first lowercase occurrence
	for(var i=0;i<slots.length;i++){
		var lc = slots[i].toLowerCase();
		if(lc == 'a' || lc == 'b' || lc == 'c'){
			if(firstPos[lc] == -1 && slots[i] == slots[i].toUpperCase()){
				firstPos[lc] = i;
			}
			if(lastPos[lc] == -1 && slots[i] == slots[i].toLowerCase()){
				lastPos[lc] = i;
			}
		}
	}
	for(var fi=0;fi<slots.length;fi++){
		var flc = slots[fi].toLowerCase();
		if((flc == 'a' || flc == 'b' || flc == 'c') && firstPos[flc] == -1){
			firstPos[flc] = fi;
		}
	}
	for(var li=slots.length-1;li>=0;li--){
		var llc = slots[li].toLowerCase();
		if((llc == 'a' || llc == 'b' || llc == 'c') && lastPos[llc] == -1){
			lastPos[llc] = li;
		}
	}
	var slotMeta = Array();
	for(var si=0;si<slots.length;si++){
		slotMeta[si] = {
			index: si,
			ch: slots[si],
			phase: slots[si].toLowerCase(),
			up: slots[si] == slots[si].toUpperCase()
		};
	}
	function circularDist(a,b,n){
		var d = Math.abs(a-b);
		return Math.min(d, n-d);
	}
	function buildPairs(phaseKey){
		var upper = Array();
		var lower = Array();
		for(var ps=0;ps<slotMeta.length;ps++){
			if(slotMeta[ps].phase == phaseKey){
				if(slotMeta[ps].up){
					upper[upper.length] = slotMeta[ps].index;
				}else{
					lower[lower.length] = slotMeta[ps].index;
				}
			}
		}
		var pairs = Array();
		var usedLower = {};
		for(var u=0;u<upper.length;u++){
			var from = upper[u];
			var best = -1;
			var bestDist = 9999;
			var bestCW = 9999;
			for(var l=0;l<lower.length;l++){
				var to = lower[l];
				if(usedLower[to]){
					continue;
				}
				var cw = _cwDiff((from/slots.length)*Math.PI*2, (to/slots.length)*Math.PI*2);
				var dist = circularDist(from, to, slots.length);
				// Prefer nearest opposite-side pair; on tie choose forward (cw) option.
				if(dist < bestDist || (dist == bestDist && cw < bestCW)){
					bestDist = dist;
					bestCW = cw;
					best = to;
				}
			}
			if(best >= 0){
				usedLower[best] = true;
				pairs[pairs.length] = [from, best];
			}
		}
		return pairs;
	}
	var coilPairs = buildPairs('a').concat(buildPairs('b')).concat(buildPairs('c'));

	var svg = '';
	svg += '<svg id="statorCanvas" class="main_stator_svg" viewBox="0 0 '+size+' '+size+'" xmlns="http://www.w3.org/2000/svg">';
	svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+rOuter+'" class="main_stator_ring"/>';
	svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+rInner+'" class="main_stator_hole"/>';
	// outer pole sectors (classic pink/blue marks)
	var segCount = Math.max(3, slots.length);
	for(var pm=0; pm<segCount; pm++){
		var ma1 = (pm/segCount)*Math.PI*2 - Math.PI/2 + 0.1;
		var ma2 = ((pm+1)/segCount)*Math.PI*2 - Math.PI/2 - 0.1;
		var mcls = (pm % 2 == 0) ? 'main_magnet_seg_n' : 'main_magnet_seg_s';
		svg += '<path d="'+_arcPath(cx,cy,rOuter-20,ma1,ma2)+'" class="'+mcls+'"/>';
	}

	// Stator teeth
	var pitch = (Math.PI*2)/slots.length;
	var toothHalfRoot = pitch * 0.17;
	var toothHalfTip = pitch * 0.12;
	var toothHalfHead = pitch * 0.26;
	for(var tIdx=0;tIdx<slots.length;tIdx++){
		var ta = (tIdx/slots.length)*Math.PI*2 - Math.PI/2;
		var p1 = _polarPoint(cx,cy,rToothRoot,ta-toothHalfRoot);
		var p2 = _polarPoint(cx,cy,rToothTip,ta-toothHalfTip);
		var p3 = _polarPoint(cx,cy,rToothTip+5,ta-toothHalfHead);
		var p4 = _polarPoint(cx,cy,rToothTip+5,ta+toothHalfHead);
		var p5 = _polarPoint(cx,cy,rToothTip,ta+toothHalfTip);
		var p6 = _polarPoint(cx,cy,rToothRoot,ta+toothHalfRoot);
		svg += '<polygon points="'+p1.x.toFixed(2)+','+p1.y.toFixed(2)+' '+p2.x.toFixed(2)+','+p2.y.toFixed(2)+' '+p3.x.toFixed(2)+','+p3.y.toFixed(2)+' '+p4.x.toFixed(2)+','+p4.y.toFixed(2)+' '+p5.x.toFixed(2)+','+p5.y.toFixed(2)+' '+p6.x.toFixed(2)+','+p6.y.toFixed(2)+'" class="main_tooth"/>';
	}

	// Coil phase arcs (classic look)
	for(var cp=0; cp<coilPairs.length; cp++){
		var iFrom = coilPairs[cp][0];
		var iTo = coilPairs[cp][1];
		var phase = slots[iFrom].toLowerCase();
		if(phase != 'a' && phase != 'b' && phase != 'c'){
			continue;
		}
		var aFrom = (iFrom/slots.length)*Math.PI*2 - Math.PI/2;
		var aTo = (iTo/slots.length)*Math.PI*2 - Math.PI/2;
		var radOffset = phase == 'a' ? -1.5 : (phase == 'b' ? 0 : 1.5);
		var rBridge = rInner + 21 + radOffset;
		var pFromStem = _polarPoint(cx,cy,rInner+10,aFrom);
		var pFromArc = _polarPoint(cx,cy,rBridge,aFrom);
		var pToArc = _polarPoint(cx,cy,rBridge,aTo);
		var pToStem = _polarPoint(cx,cy,rInner+10,aTo);
		var cw = _cwDiff(aFrom,aTo);
		var ccw = _ccwDiff(aFrom,aTo);
		var useSweep = cw <= ccw;
		var arcD = _arcPathDir(cx,cy,rBridge,aFrom,aTo,useSweep).replace(/^M [^A]+/,'');
		var bridgePath = 'M '+pFromStem.x.toFixed(2)+' '+pFromStem.y.toFixed(2)+' L '+pFromArc.x.toFixed(2)+' '+pFromArc.y.toFixed(2)+' '+arcD+' L '+pToStem.x.toFixed(2)+' '+pToStem.y.toFixed(2);
		var showBridge = (phaseFilter == 'all' || phaseFilter == phase);
		var activeBridge = (activeSlot == iFrom || activeSlot == iTo) ? ' is_active' : '';
		if(!progressive || (progressive && activeSlot >= 0 && (iFrom <= activeSlot || iTo <= activeSlot))){
			svg += '<path d="'+bridgePath+'" class="main_phase_arc main_phase_arc_'+phase+activeBridge+'" style="opacity:'+(showBridge?1:0.14)+'"/>';
		}
	}

	// Slots/coils
	for(var s=0;s<slots.length;s++){
		var ch = slots[s];
		var lc = ch.toLowerCase();
		var isPhase = lc == 'a' || lc == 'b' || lc == 'c';
		var color = _phaseColor(lc);
		var ang = (s/slots.length)*Math.PI*2 - Math.PI/2;
		var pIn = _polarPoint(cx,cy,rSlotInner,ang);
		var pOut = _polarPoint(cx,cy,rSlotOuter-10,ang);
		var pStem = _polarPoint(cx,cy,rInner+10,ang);
		var pNum = _polarPoint(cx,cy,rOuter-8,ang);
		var pDir = _polarPoint(cx,cy,rSlotInner-20,ang);
		var pBody = _polarPoint(cx,cy,(rSlotInner+rSlotOuter)/2,ang);
		var ux = Math.cos(ang);
		var uy = Math.sin(ang);
		var tx = -uy;
		var ty = ux;
		var showPhase = (phaseFilter == 'all' || phaseFilter == lc || !isPhase);
		var opacity = showPhase ? 1 : 0.14;
		if(progressive && s > activeSlot){
			opacity = showPhase ? 0.2 : 0.08;
		}
		var activeClass = (s == activeSlot) ? ' is_active' : '';
		var slotRot = ang * 180 / Math.PI + 90;
		function at(r, off){
			return {
				x: cx + ux*r + tx*off,
				y: cy + uy*r + ty*off
			};
		}
		svg += '<g class="main_slot'+activeClass+'" style="opacity:'+opacity+'">';
		// bundle turns inside slot
		if(isPhase){
			var rStart = rSlotInner + 11;
			var rEnd = rSlotOuter - 26;
			var half = 13;
			var side1In = at(rStart, -half);
			var side1Out = at(rEnd, -half);
			var side2In = at(rStart, half);
			var side2Out = at(rEnd, half);
			// coil side conductors + head connector (classic "ladder" packet)
			svg += '<line x1="'+pStem.x.toFixed(2)+'" y1="'+pStem.y.toFixed(2)+'" x2="'+((side1In.x+side2In.x)/2).toFixed(2)+'" y2="'+((side1In.y+side2In.y)/2).toFixed(2)+'" stroke="'+color+'" class="main_slot_stem"/>';
			svg += '<line x1="'+side1In.x.toFixed(2)+'" y1="'+side1In.y.toFixed(2)+'" x2="'+side1Out.x.toFixed(2)+'" y2="'+side1Out.y.toFixed(2)+'" stroke="'+color+'" class="main_coil_side"/>';
			svg += '<line x1="'+side2In.x.toFixed(2)+'" y1="'+side2In.y.toFixed(2)+'" x2="'+side2Out.x.toFixed(2)+'" y2="'+side2Out.y.toFixed(2)+'" stroke="'+color+'" class="main_coil_side"/>';
			svg += '<line x1="'+side1Out.x.toFixed(2)+'" y1="'+side1Out.y.toFixed(2)+'" x2="'+side2Out.x.toFixed(2)+'" y2="'+side2Out.y.toFixed(2)+'" stroke="'+color+'" class="main_coil_head"/>';
			var turns = slotCount <= 9 ? 8 : (slotCount <= 12 ? 7 : 6);
			for(var turn=0; turn<turns; turn++){
				var frac = (turn+1)/(turns+1);
				var rr = rStart + frac * (rEnd-rStart);
				var p1 = at(rr, -half+2.3);
				var p2 = at(rr + 2.8, half-2.3);
				var x1 = p1.x;
				var y1 = p1.y;
				var x2 = p2.x;
				var y2 = p2.y;
				svg += '<line x1="'+x1.toFixed(2)+'" y1="'+y1.toFixed(2)+'" x2="'+x2.toFixed(2)+'" y2="'+y2.toFixed(2)+'" stroke="'+color+'" class="main_turn"/>';
			}
		}else{
			svg += '<line x1="'+pIn.x.toFixed(2)+'" y1="'+pIn.y.toFixed(2)+'" x2="'+pOut.x.toFixed(2)+'" y2="'+pOut.y.toFixed(2)+'" stroke="#a3a3a3" class="main_slot_stem"/>';
		}
		if(showDirection && isPhase){
			var sign = (ch == ch.toUpperCase()) ? lang['dir_plus_'+selected_lang] : lang['dir_minus_'+selected_lang];
			svg += '<text x="'+pDir.x.toFixed(2)+'" y="'+pDir.y.toFixed(2)+'" class="main_dir">'+sign+'</text>';
		}
		if(showSlotNumbers){
			svg += '<text x="'+pNum.x.toFixed(2)+'" y="'+pNum.y.toFixed(2)+'" transform="rotate('+slotRot.toFixed(2)+' '+pNum.x.toFixed(2)+' '+pNum.y.toFixed(2)+')" class="main_slot_num">'+(s+1)+'</text>';
		}
		svg += '<title>'+lang['slot_col_'+selected_lang]+': '+(s+1)+'</title>';
		svg += '</g>';
	}

	// Start/End labels by phase
	function labelPhase(phaseKey, textKey, idx){
		if(idx < 0){ return ''; }
		var aBase = (idx/slots.length)*Math.PI*2 - Math.PI/2;
		var phaseOff = phaseKey == 'a' ? -0.04 : (phaseKey == 'b' ? 0.0 : 0.04);
		var endOff = textKey == 'ende' ? -0.03 : 0.03;
		var a = aBase + phaseOff + endOff;
		var pt = _polarPoint(cx,cy,rOuter+24,a);
		var rot = a * 180 / Math.PI + 90;
		if(rot > 90 && rot < 270){
			rot += 180;
		}
		var txt = lang[textKey+'_'+selected_lang]+' '+phaseKey.toUpperCase();
		return '<text x="'+pt.x.toFixed(2)+'" y="'+pt.y.toFixed(2)+'" transform="rotate('+rot.toFixed(2)+' '+pt.x.toFixed(2)+' '+pt.y.toFixed(2)+')" class="main_phase_label">'+txt+'</text>';
	}
	svg += labelPhase('a','anfang',firstPos.a);
	svg += labelPhase('b','anfang',firstPos.b);
	svg += labelPhase('c','anfang',firstPos.c);
	svg += labelPhase('a','ende',lastPos.a);
	svg += labelPhase('b','ende',lastPos.b);
	svg += labelPhase('c','ende',lastPos.c);

	svg += '</svg>';
	canvas_container.innerHTML = svg;
	return true;
}



//Stator und bewicklung via canvas
function drawStator(nuten,schema,schritt,Y_D){
	var xzx = schema.split('/').length-1
	!schritt ? schritt = nuten+1+xzx:0;
	
	if(schema[schritt-1] == '/'){
	      schritt = schritt -1;
	}
	
	
	//Canvas Element ertellen und anpassen
	var canvas_container = document.getElementById('canvas_container');
	
	if(document.getElementById("statorCanvas")){
		canvas_container.removeChild(document.getElementById("statorCanvas"));
	}
	
	var statorCanvas = document.createElement('canvas');
	statorCanvas.id="statorCanvas";
	statorCanvas.height = "700";
	statorCanvas.width = "700";
	statorCanvas.innerHTML = lang['kein_html5_'+selected_lang];
	canvas_container.appendChild(statorCanvas);

	var stator = statorCanvas.getContext('2d');
	var mobileSimple = window.matchMedia && window.matchMedia("(max-width: 640px)").matches;
	
	//Grundlegende hammer Maße
	var hammerHeight = 255;
	var hammerWidth = 950;
	hammerWidth = hammerWidth/nuten
	hammerHeight = hammerHeight - (nuten/3);
	if(nuten ==6){
		hammerWidth = hammerWidth+3;	
	}else if(nuten ==3){
		hammerWidth = hammerWidth-80;
	}
	
	//Innerer Kreis des Stators
	stator.fillStyle = "rgb(186,186,186)";
	stator.beginPath();
	stator.arc(350,350,148,0,Math.PI*2,true);
	stator.closePath();
	stator.fill();

	stator.fillStyle = (document.documentElement && document.documentElement.classList && document.documentElement.classList.contains('theme-dark')) ? "#111B2F" : "#FFF";
	stator.beginPath();
	stator.arc(350,350,112,0,Math.PI*2,true);
	stator.closePath();
	stator.fill();

	
	// höhe der verschaltung
	var s_basis = 100;
	
	if(nuten > 21 && nuten <= 36){
		s_basis = s_basis + (nuten/3.8);
	}
	
	// ebenen der verschaltung
	var ebene = Array();
	ebene['a1'] = 40+s_basis;
	ebene['a2'] = 35+s_basis;
	ebene['b1'] = 30+s_basis;
	ebene['b2'] = 25+s_basis;
	ebene['c1'] = 20+s_basis;
	ebene['c2'] = 15+s_basis;
	

	
	stator.translate(350, 350);
	

	//Grade drehen .. hab bei 90 grad angefangen :/
	stator.rotate(270*Math.PI/180);
	//Stator hämmer und drähte malen und drehen
	for(var i=0; i<nuten; i++){
		
		//hämmer
		stator.beginPath();
		stator.moveTo(130,hammerWidth/4);
		stator.lineTo(Math.round(hammerHeight/1.03),hammerWidth/4);
		stator.lineTo(Math.round(hammerHeight/1.025),hammerWidth/2);
		stator.lineTo(hammerHeight,hammerWidth/2);
		stator.lineTo(hammerHeight+hammerWidth/20,0);
		stator.lineTo(hammerHeight,-hammerWidth/2);
		stator.lineTo(Math.round(hammerHeight/1.025),-hammerWidth/2);
		stator.lineTo(Math.round(hammerHeight/1.03),-hammerWidth/4);
		stator.lineTo(130,-hammerWidth/4);
		stator.textBaseline = 'middle';
		
		stator.fillStyle = "rgb(186,186,186)";
		stator.fill();
		//zum nächsten drehen
		stator.rotate(Math.PI/(nuten/2));
	}
	
	stator.fillStyle = (document.documentElement && document.documentElement.classList && document.documentElement.classList.contains('theme-dark')) ? "#D8E4F6" : "#111";

	pole_dazu();
	var Swikel = schema.substr(0,schritt).split('/');
	
	//wenn schritte dann immer letzte spule oben
	if(schritt){
		stator.rotate(-(schritt-1-(Swikel.length-1))*Math.PI/(nuten/2));
	}
	var Sschemen = schema.split('/');
	var schemen = Array();
	for(i=0;i<Swikel.length;i++){
		schemen[i] = Sschemen[i];
	}
	var gesamtlength = -1;
	for(zx=0;zx<schemen.length;zx++){
		schema = schemen[zx];

		//Anfäng und enden merken
		var f_u = Array(); 
		f_u['a'] = false;
		f_u['b']  = false;
		f_u['c']  = false;
		
		//Verlauf der ebenen
		ebenen_verlauf = Array();
		ebenen_verlauf['a1'] = false;
		ebenen_verlauf['a2'] = false;
		ebenen_verlauf['b1'] = false;
		ebenen_verlauf['b2'] = false;
		ebenen_verlauf['c1'] = false;
		ebenen_verlauf['c2'] = false;

		// Y und D kramz
		var enden = Array();
		enden[0] = 0;
		enden[3] ='abc';
		var das_nicht = false;
		var erstefarbe = false;

		
		for(var i=0; i<schema.length; i++){
			gesamtlength = gesamtlength+1;
			if((gesamtlength+1+zx) <= schritt){
				// Bewicklung und verschaltung
				var wire_color = farbe_zu (schema[i]);
				
				var richtung = 15;
				if(schema[i].toLowerCase() == schema[i]){
					richtung = -15;
				}
				var abc = 'abc';
			
				// Bewicklung
				var schon_beschriftet = false;
				for(var y=0; y<75; y=y+15){
					das_nicht = false;
					if(schema[i].toLowerCase() != '-'){
						stator.beginPath();
						var arrow_start_x = 0;
						var arrow_start_y = 0;
						var arrow_end_x = 0;
						var arrow_end_y = 0;
						//nur bis zum bestimmten schritt bewickeln
					
						if(richtung == 15){
							//Lienie in richtung 1
							arrow_start_x = 156+y;
							arrow_start_y = (hammerWidth/4)+2;
							arrow_end_x = 156+y+richtung;
							arrow_end_y = -(hammerWidth/4)-2;
							stator.moveTo(arrow_start_x,arrow_start_y);
							stator.lineTo(arrow_end_x, arrow_end_y);
							
							if(y == 0){
								// Anfangs punkt richtung 1
								stator.moveTo(156+y, -(hammerWidth/4)+2);
								stator.lineTo(156+y, -(hammerWidth/4)-2);
								
								if(!f_u[schema[i].toLowerCase()]){
									// wenns die erste spule einer fase in richtung 1 ist anfang malen
									f_u[schema[i].toLowerCase()] = schema.toLowerCase().lastIndexOf(schema[i].toLowerCase());
									stator.moveTo(156+y, -(hammerWidth/4)+2);
									stator.lineTo(156+y, -(hammerWidth/3.5)-5);
									stator.moveTo(154+y, -(hammerWidth/3.5)-5);
									stator.lineTo(300, -(hammerWidth/3.5)-5);
									stator.font =  "16px 'verdana'";
									stator.fillText && nuten != 3 && !mobileSimple ? stator.fillText(lang['anfang_'+selected_lang]+' '+schema[i].toUpperCase(), 275, 0):0;
									schon_beschriftet = true;
									
									ebenen_verlauf[schema[i].toLowerCase()+'1'] = false;
									ebenen_verlauf[schema[i].toLowerCase()+'2'] = false;
								}else{
									// anfang einer spule in richtung 1 aus verschaltung
									if(ebenen_verlauf[schema[i].toLowerCase()+'1']){
										var sub_e = '1';
									}else if(ebenen_verlauf[schema[i].toLowerCase()+'2']){
										var sub_e = '2';
									}else{
										var sub_e = '1';
									}
									ebenen_verlauf[schema[i].toLowerCase()+sub_e] = true;
									stator.moveTo(156+y, -(hammerWidth/4.3)-2);
									stator.lineTo(ebene[schema[i].toLowerCase()+sub_e]-(18/nuten), -(hammerWidth/4.3)-2);

									//ende spule oben links
									stator.arc(0,0,ebene[schema[i].toLowerCase()+sub_e], (-Math.PI/nuten)+0.001, -Math.PI/nuten, true);

									
								}
							}
							if(y == 60){
								// Ende richtung 1
								stator.moveTo(171+y, (hammerWidth/4)+2);
								stator.lineTo(171+y, (hammerWidth/4)-2);

								if(i == f_u[schema[i].toLowerCase()]){
									// wenns die lätzte spule einer fase in richtung 1 ist ende malen
									if(!Y_D){
										stator.moveTo(171+y, (hammerWidth/4)-2);
										stator.lineTo(300, (hammerWidth/4)-2);
										stator.font =  "16px 'verdana'";
										stator.fillText && !schon_beschriftet && !mobileSimple ? stator.fillText(lang['ende_'+selected_lang]+' '+schema[i].toUpperCase(), 275, 0):0;
									}else if(Y_D == 'Y'){
										das_nicht = true;
										stator.moveTo(171+y, (hammerWidth/4.5)-2);
										stator.lineTo(171+y, (hammerWidth/4)+5);
									
										stator.moveTo(171+y, (hammerWidth/4)+5);
										stator.lineTo(148, (hammerWidth/4)+5);
										enden[1] = schema[i].toLowerCase();
										switch(enden[0]){
											case(0):
												enden[0] = 1; 
												stator.arc(0,0,100,Math.PI/nuten, (Math.PI/nuten)+0.001, false); 
												erstefarbe = schema[i].toLowerCase();
											break;
											case(1):
												stator.lineTo(100, 0);
												enden[0] = 2; 
												das_nicht = 'mitte';
												stator.moveTo(100, 0);
												stator.lineTo(90, 0);
											break;
											case(2):
												enden[0] = 3; 
												stator.arc(0,0,100,(-Math.PI/nuten)+0.001, -Math.PI/nuten, true); 
											break;
										}	
									}
				
									ebenen_verlauf[schema[i].toLowerCase()+'1'] = false;
									ebenen_verlauf[schema[i].toLowerCase()+'2'] = false;
								}else{
									
									// ende einer spule in richtung 1 zu verschaltung
									if(!ebenen_verlauf[schema[i].toLowerCase()+'1']){
										var sub_e = '1';
										ebenen_verlauf[schema[i].toLowerCase()+'2'] = false;
									}else if(!ebenen_verlauf[schema[i].toLowerCase()+'2']){
										var sub_e = '2';
										ebenen_verlauf[schema[i].toLowerCase()+'1'] = false;
									}
									ebenen_verlauf[schema[i].toLowerCase()+sub_e] = true;
									// ende einer spule rechts
									stator.moveTo(171+y, (hammerWidth/4.5)-2);
									stator.lineTo(171+y, (hammerWidth/4)+5);
									
									stator.moveTo(171+y, (hammerWidth/4)+5);
									stator.lineTo(ebene[schema[i].toLowerCase()+sub_e]-(18/nuten), (hammerWidth/4)+5);
					
									//ende spule oben rechts
									stator.arc(0,0,ebene[schema[i].toLowerCase()+sub_e], Math.PI/nuten, (Math.PI/nuten)+0.001, false);
								}
							}

						}else{
							//Lienie in richtung 2
							arrow_start_x = 171+y;
							arrow_start_y = (hammerWidth/4)+2;
							arrow_end_x = 171+y+richtung;
							arrow_end_y = -(hammerWidth/4)-2;
							stator.moveTo(arrow_start_x,arrow_start_y);
							stator.lineTo(arrow_end_x,arrow_end_y);

							if(y == 0){
								// Anfangs punkt richtung 2
								stator.moveTo(156+y, (hammerWidth/4)+2);
								stator.lineTo(156+y, (hammerWidth/4)-2);
								if(!f_u[schema[i].toLowerCase()]){
									// wenns die erste spule einer fase in richtung 2 ist anfang malen
									f_u[schema[i].toLowerCase()] = schema.toLowerCase().lastIndexOf(schema[i].toLowerCase());
									stator.moveTo(156+y, (hammerWidth/4)+2);
									stator.lineTo(156+y, (hammerWidth/3.5)+5);
									stator.moveTo(154+y, (hammerWidth/3.5)+5);
									stator.lineTo(300, (hammerWidth/3.5)+5);
									stator.font =  "16px 'verdana'";
									stator.fillText && nuten != 3 && !mobileSimple ? stator.fillText(lang['anfang_'+selected_lang]+' '+schema[i].toUpperCase(), 275, 0):0;
									schon_beschriftet = true;

									ebenen_verlauf[schema[i].toLowerCase()+'1'] = false;
									ebenen_verlauf[schema[i].toLowerCase()+'2'] = false;
								}else{
									// anfang einer spule in richtung 2 aus verschaltung
									if(ebenen_verlauf[schema[i].toLowerCase()+'1']){
										var sub_e = '1';
									}else if(ebenen_verlauf[schema[i].toLowerCase()+'2']){
										var sub_e = '2';
									}else{
										var sub_e = '1';
									}
									ebenen_verlauf[schema[i].toLowerCase()+sub_e] = true;
									stator.moveTo(156+y, (hammerWidth/4.5)+3);
									stator.lineTo(ebene[schema[i].toLowerCase()+sub_e]-(18/nuten), (hammerWidth/4.5)+2);
									
									stator.lineTo(ebene[schema[i].toLowerCase()+sub_e],0);
									stator.arc(0,0,ebene[schema[i].toLowerCase()+sub_e],0, -Math.PI/nuten, true);
									
								}
							}
							if(y == 60){
								// Ende richtung 2
								stator.moveTo(171+y, -(hammerWidth/4)+2);
								stator.lineTo(171+y, -(hammerWidth/4)-2);

								if(i == f_u[schema[i].toLowerCase()]){
									// wenns die lätzte spule einer fase in richtung 2 ist ende malen
									if(!Y_D){
										stator.moveTo(171+y, -(hammerWidth/4));
										stator.lineTo(300, -(hammerWidth/4));
										stator.font =  "16px 'verdana'";
										stator.fillText && !schon_beschriftet && !mobileSimple ? stator.fillText(lang['ende_'+selected_lang]+' '+schema[i].toUpperCase(), 275, 0):0;
									}else if(Y_D == 'Y'){
										das_nicht = true;
										stator.moveTo(171+y, -(hammerWidth/4.5)+2);
										stator.lineTo(171+y, -(hammerWidth/4)-5);

										stator.moveTo(171+y, -(hammerWidth/4)-5);
										stator.lineTo(148, -(hammerWidth/4)-5);
										enden[1] = schema[i].toLowerCase();
										switch(enden[0]){
											case(0):
												enden[0] = 1; 
												stator.arc(0,0,100,Math.PI/nuten, (Math.PI/nuten)+0.001, false); 
												erstefarbe = schema[i].toLowerCase();
											break;
											case(1):
												stator.lineTo(100, 0);
												enden[0] = 2; 
												das_nicht = 'mitte';
												stator.moveTo(100, 0);
												stator.lineTo(90, 0);
											break;
											case(2):
												enden[0] = 3; 
												stator.arc(0,0,100,(-Math.PI/nuten)+0.001, -Math.PI/nuten, true); 
											break;
										}								
									}

									ebenen_verlauf[schema[i].toLowerCase()+'1'] = false;
									ebenen_verlauf[schema[i].toLowerCase()+'2'] = false;
								}else{
									// ende einer spule in richtung 1 zu verschaltung
									if(!ebenen_verlauf[schema[i].toLowerCase()+'1']){
										var sub_e = '1';
										ebenen_verlauf[schema[i].toLowerCase()+'2'] = false;
									}else if(!ebenen_verlauf[schema[i].toLowerCase()+'2']){
										var sub_e = '2';
										ebenen_verlauf[schema[i].toLowerCase()+'1'] = false;
									}
									
									ebenen_verlauf[schema[i].toLowerCase()+sub_e] = true;
									stator.moveTo(171+y, -(hammerWidth/4.5)+2);
									stator.lineTo(171+y, -(hammerWidth/4)-5);

									stator.moveTo(171+y, -(hammerWidth/4)-5);
									stator.lineTo(ebene[schema[i].toLowerCase()+sub_e]-(18/nuten), -(hammerWidth/4)-5);

									stator.moveTo(ebene[schema[i].toLowerCase()+sub_e]-(18/nuten), -(hammerWidth/4)-5);
									
									stator.lineTo(ebene[schema[i].toLowerCase()+sub_e], 0);
									stator.arc(0,0,ebene[schema[i].toLowerCase()+sub_e],0, (Math.PI/nuten)+0.001, false);
									
								}
							}
						}
						

						
						stator.strokeStyle = wire_color;
						
						
						stator.lineWidth=4; 
						if(nuten > 42){
							stator.lineWidth=2;  
						}
						if(nuten > 24 && nuten <= 42){
							stator.lineWidth=3;  
						}
						
						stator.stroke();
					}
				}
				
				//sternpunkt
				if(!das_nicht || das_nicht == 'mitte'){
					if(das_nicht != 'mitte'){
						stator.beginPath();
						switch(enden[0]){
							case(1):
								stator.arc(0,0,100,-Math.PI/nuten, Math.PI/nuten, false); 
								stator.strokeStyle = farbe_zu(enden[1]);
							break;
							case(2):
								stator.arc(0,0,100,Math.PI/nuten, -Math.PI/nuten, true); 
								stator.strokeStyle = farbe_zu(enden[3]);
							break;
						}
						stator.stroke();
						enden[3] = enden[3].replace(enden[1],'');
					}else{
						stator.beginPath();
						stator.arc(0,0,100,-Math.PI/nuten, 0, false);
						stator.moveTo(100, -4);
						stator.lineTo(90, -4);					
						stator.strokeStyle = farbe_zu(erstefarbe);
						stator.stroke();
						
						stator.beginPath();
						stator.arc(0,0,100,Math.PI/nuten, 0, true); 
						stator.moveTo(100, 4);
						stator.lineTo(90, 4);		
						var farbe2 = abc.replace(erstefarbe,'').replace(enden[1],'');
						stator.strokeStyle = farbe_zu(farbe2);
						stator.stroke();
						enden[3] = enden[3].replace(enden[1],'');
					}

				}else{
					
				}
					
				// Linien auf dem weg zur nächsten spule weiterführen
				for(z=1;z<3;z++){
					for(x=0; x< abc.length; x++){
						if(ebenen_verlauf[abc[x]+z] && abc[x] != schema[i].toLowerCase()){
								
							stator.beginPath();
								
							stator.arc(0,0,ebene[abc[x]+z], Math.PI/nuten, -Math.PI/nuten, true);
							stator.strokeStyle = farbe_zu(abc[x]);	
							stator.stroke();
						}
					}
				}
					
				//hämmer nummerieren
				stator.font =  "12px 'verdana'";
				if(nuten <= 6){
					stator.fillText ? stator.fillText(i+1, hammerHeight+14, 0):0;
				}else{
					stator.fillText ? stator.fillText(i+1, hammerHeight+7, 0):0;
				}
				
			//zum nächsten drehen
			stator.rotate(Math.PI/(nuten/2));
			}
		}
	}
	if(document.getElementById("statorCanvas2")){
		mainContainer.removeChild(document.getElementById("statorCanvas2"));
	}
}

function pole_dazu(){
	var statorCanvas = document.getElementById("statorCanvas");
	var poleC = statorCanvas.getContext('2d');
	Pcolor1 = "rgba(255,0,0,0.3)";
	Pcolor2 = "rgba(0,0,255,0.3)";
	
	for(var i=0; i<polex; i++){
		//RR
		poleC.beginPath();
		poleC.lineWidth=10; 
		poleC.arc(0,0,301, Math.PI/(polex/2), -Math.PI/(polex/2), true);
		poleC.strokeStyle = "rgba(68,68,68,0.3)";
		poleC.stroke();
		
		//Pole
		poleC.beginPath();
		poleC.lineWidth=18; 
		poleC.arc(0,0,287, (Math.PI/(polex/2)/200)*67, (-Math.PI/(polex/2)/200)*67, true);
		if(i%2!=0){
			poleC.strokeStyle = Pcolor2;
		}else{
			poleC.strokeStyle = Pcolor1;
		}	
		poleC.stroke();
		//zum nächsten drehen
		poleC.rotate(Math.PI/(polex/2));
	}
}


function WF_FFTschnell(schemak,gruppenk,polek,zeit,maxnut){
	var Nutzahl=schemak.length;
	var Fasen = Array();
	Fasen['a'] = Array();
	Fasen['b'] = Array();
	Fasen['c'] = Array();
	Fasen['-'] = Array();
	//U
	Fasen['a'][zeit] = 1*Math.sin(zeit*2*Math.PI);
	//V
	Fasen['b'][zeit] = 1*Math.sin(zeit*2*Math.PI+(2*Math.PI)/3);
	//W
	Fasen['c'][zeit] = 1*Math.sin(zeit*2*Math.PI-(2*Math.PI)/3);
	//0 
	Fasen['-'][zeit] = 0;
	Strombelag = Array();
	for(i=0;i<schemak.length;i++){
		var wert1 = 0;
		var wert2 = 0;
		
		var windungen1 = 0;
		var windungen2 = 0;
			
		wert1 = 1*(Fasen[schemak[i].toLowerCase()][zeit]);
		windungen1 = gruppenk[i];
		if(schemak[i].toLowerCase() == schemak[i]){
			wert1 = -1*(Fasen[schemak[i].toLowerCase()][zeit]);
		}
		wert1 = wert1*windungen1;
		
		if(i==0){
			wert2 = 1*(Fasen[schemak[schemak.length-1].toLowerCase()][zeit]);
			windungen2 = gruppenk[schemak.length-1];
			if(schemak[schemak.length-1].toLowerCase() != schemak[schemak.length-1]){
				wert2 = -1*(Fasen[schemak[schemak.length-1].toLowerCase()][zeit]);
			}
			wert2 = wert2*windungen2;
		}else{
			wert2 = 1*(Fasen[schemak[i-1].toLowerCase()][zeit]);
			windungen2 = gruppenk[i-1];
			if(schemak[i-1].toLowerCase() != schemak[i-1]){
				wert2 = -1*(Fasen[schemak[i-1].toLowerCase()][zeit]);
			}
			wert2 = wert2*windungen2;			
		}
		Strombelag[i] = (wert1+wert2)/maxnut;
	}
	zw = 0;
	for (x=0;x<Nutzahl;x++){
		zw = zw + Strombelag[x] / Nutzahl * Math.sin(polek * Math.PI * x / Nutzahl);
	}
	CK_Re = zw * 2;
	zw = 0;

	for (x=0;x<Nutzahl;x++){
		zw = zw + Strombelag[x] / Nutzahl * Math.cos(polek * Math.PI * x / Nutzahl);
	}
	CK_Im = zw * 2;

	WFausgabe = Math.round(Math.pow(Math.pow(CK_Im,2) + Math.pow(CK_Re,2),0.5)* 100000) / 100000;  //Betrag des Faktors
	return WFausgabe;
}






function WF_FFT(schema,SPS){
	var Nutzahl=schema.length;
	var OWmax = Nutzahl*6;      //Bis zu welcher OW soll ich rechnen (Default: 2*Nutzahl reicht)
	var Fasen = Array();
	
	for(T=0;T<t.length;T++){
		Fasen['a'] = Array();
		Fasen['b'] = Array();
		Fasen['c'] = Array();
		Fasen['-'] = Array();

		
		//U
		Fasen['a'][t[T]] = 1*Math.sin(t[T]*2*Math.PI);
		//V
		Fasen['b'][t[T]] = 1*Math.sin(t[T]*2*Math.PI+(2*Math.PI)/3);
		//W
		Fasen['c'][t[T]] = 1*Math.sin(t[T]*2*Math.PI-(2*Math.PI)/3);
		//0 
		Fasen['-'][t[T]] = 0;

		Strombelag = Array();
		if(!verteilt){
			for(i=0;i<schema.length;i++){
				var wert1 = 0;
				var wert2 = 0;
					
				wert1 = 1*(Fasen[schema[i].toLowerCase()][t[T]]);
				if(schema[i].toLowerCase() == schema[i]){
					wert1 = -1*(Fasen[schema[i].toLowerCase()][t[T]]);
				}
				
				if(i==0){
					wert2 = 1*(Fasen[schema[schema.length-1].toLowerCase()][t[T]]);
					if(schema[schema.length-1].toLowerCase() != schema[schema.length-1]){
						wert2 = -1*(Fasen[schema[schema.length-1].toLowerCase()][t[T]]);
					}
				}else{
					wert2 = 1*(Fasen[schema[i-1].toLowerCase()][t[T]]);
					if(schema[i-1].toLowerCase() != schema[i-1]){
						wert2 = -1*(Fasen[schema[i-1].toLowerCase()][t[T]]);
					}		
				}

				Strombelag[i] = wert1+wert2;
				if(wert1!=0 && wert2!=0){
					Strombelag[i] = (wert1+wert2)/2;
				}
			}
		}else{
			var NutBelag = verteilt.split('|');
			for(i=0;i<(NutBelag.length-1);i++){
				var wert1 = 1*(Fasen[NutBelag[i][0].toLowerCase()][t[T]]);
				if(NutBelag[i][0].toLowerCase() == NutBelag[i][0]){
					wert1 = -1*(Fasen[NutBelag[i][0].toLowerCase()][t[T]]);
				}
				var wert2 = 0;
				if(NutBelag[i][1]){
					wert2 = 1*(Fasen[NutBelag[i][1].toLowerCase()][t[T]]);
					if(NutBelag[i][1].toLowerCase() == NutBelag[i][1]){
						wert2 = -1*(Fasen[NutBelag[i][1].toLowerCase()][t[T]]);
					}
					Strombelag[i] = (wert1+wert2)/2;
				}else{
					Strombelag[i] = wert1;
				}
			}
		}

		WF[T] = Array();

		for(n=0;n<=OWmax;n++){
			zw = 0;
			for (x=0;x<Nutzahl;x++){
				zw = zw + Strombelag[x] / Nutzahl * Math.sin(n * 2 * Math.PI * x / Nutzahl);
			}
			CK_Re = zw * 2;
			zw = 0;

			for (x=0;x<Nutzahl;x++){
				zw = zw + Strombelag[x] / Nutzahl * Math.cos(n * 2 * Math.PI * x / Nutzahl);
			}
			CK_Im = zw * 2;

			WF[T][n-1] = Math.round(Math.pow(Math.pow(CK_Im,2) + Math.pow(CK_Re,2),0.5)* 100000) / 100000;  //Betrag des Faktors
		}
	}
}

function blink(id){
	var el = document.getElementById(id);
	if(!el) return;
	el.style.backgroundColor = '';
	el.classList.add('input-error');
	el.setAttribute('aria-invalid', 'true');
	var clearErr = function(){
		el.classList.remove('input-error');
		el.removeAttribute('aria-invalid');
		var msg = document.getElementById('ferr_'+id);
		if(msg) msg.remove();
		el.removeEventListener('input', clearErr);
		el.removeEventListener('change', clearErr);
	};
	el.addEventListener('input', clearErr);
	el.addEventListener('change', clearErr);
}

function _showFieldError(id, msg){
	blink(id);
	var existingMsg = document.getElementById('ferr_'+id);
	if(existingMsg) existingMsg.remove();
	var el = document.getElementById(id);
	if(!el) return;
	var errEl = document.createElement('span');
	errEl.id = 'ferr_'+id;
	errEl.className = 'field-error-msg';
	errEl.textContent = msg;
	el.parentNode && el.parentNode.insertBefore(errEl, el.nextSibling);
}

function clearResult(){
	var snap = null;
	if(schemeCalculated && nutenx && polex){
		snap = buildCurrentPayload();
	}
	if(document.getElementById('Ergebnis')){
		document.getElementById('Ergebnis').innerHTML = '';
	}
	clear();
	if(snap) _showClearToast(snap);
}

function clear(){
		if(document.getElementById('Rasten')){
			document.getElementById('Rasten').innerHTML ='';
		}
		if(document.getElementById('steps')){
			var statorCanvas = document.getElementById("statorCanvas");
			var canvasContainer = document.getElementById('canvas_container');
			if(statorCanvas && canvasContainer && canvasContainer.contains(statorCanvas)){
				canvasContainer.removeChild(statorCanvas);
			}
			document.getElementById('steps').innerHTML = '';
		}
		var statorCanvas2 = document.getElementById("statorCanvas2");
		if(statorCanvas2 && mainContainer && mainContainer.contains(statorCanvas2)){
			mainContainer.removeChild(statorCanvas2);
		}
		if(document.getElementById('advanced')){
			document.getElementById('advanced').innerHTML="";
		}
		if(document.getElementById('special')){
			document.getElementById('nutfacktor').innerHTML='';
		}
		if(document.getElementById('enhanced_view')){
			document.getElementById('enhanced_view').innerHTML = '';
		}
		if(document.getElementById('winding_assessment')){
			document.getElementById('winding_assessment').innerHTML = '';
		}
		if(document.getElementById('engineering_tools')){
			document.getElementById('engineering_tools').innerHTML = '';
		}
		if(document.getElementById('magnet_advice')){
			document.getElementById('magnet_advice').innerHTML = '';
		}
		currentResultMeta.kgv = false;
		currentResultMeta.wf = false;
		currentResultMeta.wfNumeric = false;
		currentResultMeta.balance = false;
		currentResultMeta.step = false;
		currentResultMeta.quality = false;
		currentResultMeta.assessment = false;
		currentResultMeta.magnet = false;
		currentResultMeta.schema = '';
		schemeCalculated = false;
		// Remove result badges from tabs
		var _tabs = document.querySelectorAll('.tab_btn');
		for(var _ci=0;_ci<_tabs.length;_ci++){
			_tabs[_ci].classList.remove('has_results');
		}
		var _mBtn = document.getElementById('mobileCalcBtn');
		if(_mBtn){ _mBtn.classList.remove('has_calc'); _mBtn.removeAttribute('data-np'); }
}

function _setCalcLoading(on){
	var btn = document.getElementById('Berechnen');
	var mBtn = document.getElementById('mobileCalcBtn');
	if(btn){
		btn.disabled = !!on;
		btn.classList.toggle('is_calculating', !!on);
	}
	if(mBtn){
		mBtn.disabled = !!on;
	}
	_calcBusy = !!on;
}

function _checkStale(){
	if(!schemeCalculated || !_lastCalcN || !_lastCalcP) return;
	var nEl = document.getElementById('Nuten');
	var pEl = document.getElementById('Pole');
	if(!nEl || !pEl) return;
	var n = parseInt(nEl.value, 10);
	var p = parseInt(pEl.value, 10);
	var stale = (n !== _lastCalcN || p !== _lastCalcP);
	var staleIds = ['Rasten','Ergebnis','winding_assessment','engineering_tools','magnet_advice','enhanced_view','canvas_container'];
	for(var i=0;i<staleIds.length;i++){
		var s = document.getElementById(staleIds[i]);
		if(s) s.classList.toggle('is_stale', stale);
	}
	var calcTab = document.querySelector('.tab_btn[data-tab-target="tab_calc"]');
	if(calcTab) calcTab.classList.toggle('has_stale', stale);
}

function _showClearToast(snap){
	var toast = document.getElementById('ux-toast');
	if(!toast) return;
	clearTimeout(_toastTimer);
	toast.innerHTML = '';
	var msg = document.createElement('span');
	msg.textContent = lang['cleared_'+selected_lang] || 'Результат очищен';
	var undoBtn = document.createElement('button');
	undoBtn.type = 'button';
	undoBtn.className = 'toast-undo-btn';
	undoBtn.textContent = lang['undo_'+selected_lang] || 'Отменить';
	undoBtn.onclick = function(){ if(snap) applyPayload(snap); _hideToast(); };
	toast.appendChild(msg);
	toast.appendChild(undoBtn);
	toast.classList.add('is_visible');
	_toastTimer = setTimeout(_hideToast, 4000);
}

function _hideToast(){
	clearTimeout(_toastTimer);
	var toast = document.getElementById('ux-toast');
	if(toast) toast.classList.remove('is_visible');
}

function _postCalcUX(){
	_setCalcLoading(false);
	// Store params for stale detection
	_lastCalcN = nutenx;
	_lastCalcP = polex;
	// Remove stale indicators
	var _staleIds = ['Rasten','Ergebnis','winding_assessment','engineering_tools','magnet_advice','enhanced_view','canvas_container'];
	for(var _si=0;_si<_staleIds.length;_si++){
		var _s = document.getElementById(_staleIds[_si]);
		if(_s) _s.classList.remove('is_stale');
	}
	// Mark Visual/Compare tabs with "has results" indicator dot
	var _tabs = document.querySelectorAll('.tab_btn');
	for(var _ti=0;_ti<_tabs.length;_ti++){
		var _t = _tabs[_ti].getAttribute('data-tab-target');
		if(_t === 'tab_visual' || _t === 'tab_compare'){
			_tabs[_ti].classList.add('has_results');
		}
		if(_t === 'tab_calc'){
			_tabs[_ti].classList.remove('has_stale');
		}
	}
	// Update mobile calc button with N/P label
	var _mBtn = document.getElementById('mobileCalcBtn');
	if(_mBtn && nutenx && polex){
		_mBtn.setAttribute('data-np', nutenx+'/'+polex);
		_mBtn.classList.add('has_calc');
	}
	// Smooth scroll to results on mobile
	if(window.innerWidth <= 900){
		var _rasten = document.getElementById('Rasten');
		if(_rasten && _rasten.innerHTML){
			setTimeout(function(){
				_rasten.scrollIntoView({behavior:'smooth', block:'start'});
			}, 180);
		}
	}
}

function berechnen() {
	if(_calcBusy) return;
	_setCalcLoading(true);
	var form = document.Windungsrechner;
	Nuten = eval( form.Nuten.value );
	Pole  = eval( form.Pole.value );

	if( Nuten % 3 != 0 || Nuten < 3 ) {
		_setCalcLoading(false);
		_showFieldError('Nuten', lang['nut_3_teilbar_'+selected_lang]);
		document.Windungsrechner.Nuten.focus();
		document.Windungsrechner.Nuten.select();
		clear();
		return;
	}

	if( Pole % 2 != 0 || Pole < 2 ) {
		_setCalcLoading(false);
		_showFieldError('Pole', lang['pol_grade_'+selected_lang]);
		document.Windungsrechner.Pole.focus();
		document.Windungsrechner.Pole.select();
		clear();
		return;
	}

	if( Pole == Nuten ) {
		_setCalcLoading(false);
		_showFieldError('Pole', lang['nut_pol_ungleich_'+selected_lang]);
		document.Windungsrechner.Pole.focus();
		document.Windungsrechner.Pole.select();
		clear();
		return;
	}
	
	var Lochzahl = Nuten/3/Pole;
	
	if(Lochzahl >= 1 ){
		verteilt=true;
	}else{
		verteilt = false;
	}
	
	Winkel = 180 * Pole / Nuten;
	a = 0; b = 0; c = 0;
	A = 0; B = 0; C = 0;
	m = 0;
	schema = ""
	summe = 0;
	if(!verteilt){
		for( i = 0; i < Nuten; i++ ) {
			if(i%2!=0 && istSPS){
				schema += "-";m++;
			}else{
				if( summe >= 330 || summe <  30 ){schema += "A";A++;}
				if( summe >=  30 && summe <  90 ){schema += "b";b++;}
				if( summe >=  90 && summe < 150 ){schema += "C";C++;}
				if( summe >= 150 && summe < 210 ){schema += "a"; a++;}
				if( summe >= 210 && summe < 270 ){schema += "B";B++;}
				if( summe >= 270 && summe < 330 ){schema += "c"; c++;}
			}
			summe = ( summe + Winkel ) % 360;
		}
	}else{
		
		for( i = 0; i < Nuten;i++) {
			if( summe >= 330 || summe <  30 ){schema += "A";A++;}
			if( summe >=  30 && summe <  90 ){schema += "b";b++;}
			if( summe >=  90 && summe < 150 ){schema += "C";C++;}
			if( summe >= 150 && summe < 210 ){schema += "a"; a++;}
			if( summe >= 210 && summe < 270 ){schema += "B";B++;}
			if( summe >= 270 && summe < 330 ){schema += "c"; c++;}
			schema += "|";
			summe = (summe + Winkel) % 360;
		}
			
	}
		
	vonHand = false;
	if( a == b && a == c && A == B && A == C  && schema.indexOf('a')!=-1 && schema.indexOf('A')!=-1){
		while( schema.charAt(schema.length-1) == 'a' || schema.charAt(schema.length-1) == 'A' ) {
			schema = schema.charAt(schema.length-1) + schema.slice( 0, -1 );
		}
	}
	if( schema.charAt( 0 ) == "a" ) {
		schema = schema.replace( /a/g, 'x' );
		schema = schema.replace( /b/g, 'y' );
		schema = schema.replace( /c/g, 'z' );
		schema = schema.replace( /A/g, 'a' );
		schema = schema.replace( /B/g, 'b' );
		schema = schema.replace( /C/g, 'c' );
		schema = schema.replace( /x/g, 'A' );
		schema = schema.replace( /y/g, 'B' );
		schema = schema.replace( /z/g, 'C' );
	}

	if( schema.search( /[bB]/ ) > schema.search( /[cC]/ ) ) {
		schema = schema.replace( /b/g, 'x' );
		schema = schema.replace( /c/g, 'y' );
		schema = schema.replace( /x/g, 'c' );
		schema = schema.replace( /y/g, 'b' );
		schema = schema.replace( /B/g, 'x' );
		schema = schema.replace( /C/g, 'y' );
		schema = schema.replace( /x/g, 'C' );
		schema = schema.replace( /y/g, 'B' );
	}
	//document.Windungsrechner.Ergebnis.value = schema;
	if(verteilt){
		verteilt = schema;
		var nutcount = schema.split('|');
		schema = "";
		schema_y = "";
		for(i=1;i<nutcount.length;i++){
			schema = schema+"-";
			schema_y = schema;
		}
		schema = schema.replace(/\|/g,'').replace(/a/g,'').replace(/b/g,'').replace(/c/g,'');
		if(verteilt.replace(/a/g,'').length == verteilt.replace(/A/g,'').length && verteilt.replace(/b/g,'').length == verteilt.replace(/B/g,'').length && verteilt.replace(/c/g,'').length == verteilt.replace(/C/g,'').length) {
			if( a != b || a != c || A != B || A != C ){
				Schema_ausgeben(Nuten,Pole,schema,lang['unausgewogen_'+selected_lang],false,schema);
			}else{
				Schema_ausgeben(Nuten,Pole,schema,false,false,schema);
			}
		}else{
			Schema_ausgeben(Nuten,Pole,schema,lang['unausgewogen_'+selected_lang],false,schema);
		}
	}else{
		if( a != b || a != c || A != B || A != C ) {
			Schema_ausgeben(Nuten,Pole,schema,lang['unausgewogen_'+selected_lang],false,schema);
		}else{
			Schema_ausgeben(Nuten,Pole,schema,false,false,schema);
		}
	}

}

}
