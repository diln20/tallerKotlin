(() => {
"use strict";
const $ = (s,root=document) => root.querySelector(s);
const $$ = (s,root=document) => Array.from(root.querySelectorAll(s));
const text = (s) => String(s??"");
const esc = (s) => text(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const read = (key,fallback) => {try {return JSON.parse(localStorage.getItem(key))??fallback} catch{return fallback}};
const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
const totals=Object.values(COURSE).flat().flatMap(p=>p.items).length;
let complete=read("kotlinlab-complete",{}),track="kotlin",phase=0,lesson=0;
const lessonId=(t,p,l)=>t+"-"+p+"-"+l;
function progress(){
 let count=Object.keys(complete).filter(k=>complete[k]).length;
 $("#progress-label").textContent=Math.round(count/totals*100)+"%";
 $("#progress-fill").style.width=(count/totals*100)+"%";
}
function drawNav(){
 const groups=COURSE[track],group=groups[phase];
 $("#phases").innerHTML=groups.map((p,i)=>'<button class="phase '+(i===phase?"active":"")+'" data-phase="'+i+'" aria-pressed="'+(i===phase)+'"><small>'+esc(p.id)+' · MÓDULO '+(i+1)+'</small>'+esc(p.name)+'</button>').join("");
 $("#lessons-count").textContent=group.items.length+" temas";
 $("#lessons").innerHTML=group.items.map((l,i)=>'<a class="lesson-link '+(i===lesson?"active":"")+'" href="#lesson-section" data-lesson="'+i+'"><small>'+(complete[lessonId(track,phase,i)]?"✓ COMPLETADA":"LECCIÓN "+String(i+1).padStart(2,"0"))+'</small>'+esc(l[0])+'</a>').join("");
 $$(".phase").forEach(b=>b.onclick=()=>{phase=Number(b.dataset.phase);lesson=0;render()});
 $$(".lesson-link").forEach(b=>b.onclick=()=>{lesson=Number(b.dataset.lesson);render();});
 $$(".track").forEach(b=>{const active=b.dataset.track===track;b.classList.toggle("active",active);b.setAttribute("aria-pressed",active)});
}
function drawLesson(){
 const item=COURSE[track][phase].items[lesson],id=lessonId(track,phase,lesson),done=!!complete[id];
 const [name,description,points,code,challenge,expected,tip]=item;
 $("#lesson-section").innerHTML='<span class="lesson-meta">'+(track==="kotlin"?"KOTLIN":"ANDROID / COMPOSE")+' · MÓDULO '+(phase+1)+' / LECCIÓN '+(lesson+1)+'</span><div class="lesson-header"><h2>'+esc(name)+'</h2><button class="button ghost" id="next-lesson">Siguiente tema →</button></div><p class="lesson-description">'+esc(description)+'</p><div class="lesson-columns"><article class="lesson-card"><h3>Lo que vas a aprender</h3><ul>'+points.map(p=>'<li>'+esc(p)+'</li>').join("")+'</ul><p class="small">Lee cada concepto, identifica las instrucciones y reproduce el ejemplo en tu entorno.</p></article><article class="lesson-card code-card"><div class="code-heading"><span>Ejemplo '+(track==="kotlin"?"Kotlin":"Android")+'</span><button class="copy" id="copy-code">Copiar código</button></div><pre><code id="lesson-code">'+esc(code)+'</code></pre></article></div><div class="exercise-panel"><span class="eyebrow">PRACTICA INDIVIDUAL</span><h3>Tu reto</h3><p>'+esc(challenge)+'</p><details><summary>Ver resultado esperado</summary><p>'+esc(expected)+'</p></details><details><summary>Una pista para resolverlo</summary><p class="hint">'+esc(tip)+'</p></details><label><input id="complete-lesson" type="checkbox" '+(done?"checked":"")+'><span>Marqué esta actividad como realizada en mi entorno</span></label><p class="small">Esta marca guarda tu autoevaluación; no significa que se haya compilado o ejecutado el programa automáticamente.</p></div>';
 $("#complete-lesson").onchange=e=>{complete[id]=e.target.checked;write("kotlinlab-complete",complete);progress();drawNav()};
 $("#copy-code").onclick=async()=>{try{await navigator.clipboard.writeText(code);$("#copy-code").textContent="¡Copiado!"}catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents($("#lesson-code"));selection.removeAllRanges();selection.addRange(range);$("#copy-code").textContent="Seleccionado: Ctrl+C"}};
 $("#next-lesson").onclick=()=>{if(lesson+1<COURSE[track][phase].items.length)lesson++;else if(phase+1<COURSE[track].length){phase++;lesson=0}else{track=track==="kotlin"?"android":"kotlin";phase=0;lesson=0}render();$("#lesson-section").scrollIntoView({block:"start",behavior:"smooth"})};
}
function render(){drawNav();drawLesson();progress();$("#stat-lessons").textContent=totals;$("#stat-exercises").textContent=totals}
$$(".track").forEach(b=>b.onclick=()=>{track=b.dataset.track;phase=0;lesson=0;render()});
$$(".nav-arrow").forEach(b=>b.onclick=()=>$("#"+b.dataset.scroll).scrollBy({left:Number(b.dataset.dir)*190,behavior:"smooth"}));
$("#theme").onclick=()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;write("kotlinlab-theme",next)};
document.documentElement.dataset.theme=read("kotlinlab-theme","dark");
$("#reset").onclick=()=>{if(confirm("¿Reiniciar todas las marcas de progreso?")){complete={};write("kotlinlab-complete",complete);render()}};
const sample=()=>[
{id:1,brand:"Toyota",model:"Corolla",kind:"Sedán",price:65000000},
{id:2,brand:"Renault",model:"Duster",kind:"SUV",price:79000000},
{id:3,brand:"Ford",model:"Ranger",kind:"Pickup",price:128000000}
];
let cars=read("kotlinlab-cars",sample()),editing=null,nextId=Math.max(0,...cars.map(c=>Number(c.id)||0))+1;
const money=n=>Number(n).toLocaleString("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0});
const carIcon=k=>({"Sedán":"🚗","SUV":"🚙","Pickup":"🛻","Eléctrico":"⚡","Deportivo":"🏎️"}[k]||"🚗");
function drawCars(){
 const q=$("#vehicle-search").value.trim().toLowerCase(),shown=cars.filter(c=>[c.brand,c.model,c.kind].some(v=>v.toLowerCase().includes(q)));
 $("#vehicle-list").innerHTML=shown.length?shown.map(c=>'<article class="vehicle"><span class="vehicle-icon">'+carIcon(c.kind)+'</span><div class="vehicle-main"><strong>'+esc(c.brand)+" "+esc(c.model)+'</strong><small>'+esc(c.kind)+' · '+money(c.price)+'</small></div><div class="vehicle-actions"><button data-edit="'+c.id+'" aria-label="Editar '+esc(c.brand)+'">Editar</button><button data-delete="'+c.id+'" aria-label="Eliminar '+esc(c.brand)+'">Eliminar</button></div></article>').join(""):'<p>No hay vehículos que coincidan.</p>';
 $$("[data-edit]").forEach(b=>b.onclick=()=>{const c=cars.find(x=>x.id===Number(b.dataset.edit));if(!c)return;editing=c.id;$("#brand").value=c.brand;$("#model").value=c.model;$("#kind").value=c.kind;$("#price").value=c.price;$("#save-vehicle").textContent="Guardar cambios";$("#cancel-edit").hidden=false;$("#brand").focus();});
 $$("[data-delete]").forEach(b=>b.onclick=()=>{cars=cars.filter(c=>c.id!==Number(b.dataset.delete));write("kotlinlab-cars",cars);drawCars();$("#lab-message").textContent="Vehículo eliminado en la simulación."});
}
function cancelEdit(){editing=null;$("#vehicle-form").reset();$("#save-vehicle").textContent="Agregar vehículo +";$("#cancel-edit").hidden=true}
$("#vehicle-form").onsubmit=e=>{e.preventDefault();const brand=$("#brand").value.trim(),model=$("#model").value.trim(),kind=$("#kind").value,price=Number($("#price").value);if(!brand||!model||!Number.isFinite(price)||price<=0){$("#lab-message").textContent="Revisa la marca, el modelo y el precio.";return}const c={id:editing??nextId++,brand,model,kind,price};if(editing!==null)cars=cars.map(x=>x.id===editing?c:x);else cars.push(c);write("kotlinlab-cars",cars);$("#lab-message").textContent=editing!==null?"Vehículo actualizado.":"Vehículo agregado.";cancelEdit();drawCars()};
$("#cancel-edit").onclick=cancelEdit;
$("#vehicle-search").oninput=drawCars;
$("#restore-vehicles").onclick=()=>{cars=sample();nextId=4;write("kotlinlab-cars",cars);cancelEdit();drawCars();$("#lab-message").textContent="Ejemplos restaurados."};
render();drawCars();
})();