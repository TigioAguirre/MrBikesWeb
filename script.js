document.documentElement.classList.add('js');

const WA='593990866442';
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

/* Catálogo. Solo la bici fotografada tiene ficha; el resto son
   espacios por completar con modelos, fotos y precios reales. */
const BIKES=[
  {marca:'X-PRO',modelo:'MTB aro 29 gris',cat:'montaña',rodado:'29"',foto:'assets/img/mtb-xpro-gris.webp',
   spec:'Cuadro de aluminio · Horquilla de suspensión · Freno de disco · Transmisión Shimano',tag:'Destacada'},
  {marca:'Hawk',modelo:'Montaña · por confirmar',cat:'montaña'},
  {marca:'Venzo',modelo:'Ruta · por confirmar',cat:'ruta'},
  {marca:'GW',modelo:'Ruta · por confirmar',cat:'ruta'},
  {marca:'Franco\'s',modelo:'Urbana · por confirmar',cat:'urbana'},
  {marca:'Tomcat',modelo:'Eléctrica · por confirmar',cat:'eléctrica'},
  {marca:'Vairo',modelo:'Niños · por confirmar',cat:'niños'}
];
const CATS=['todas','montaña','ruta','urbana','eléctrica','niños'];
const cap=s=>s[0].toUpperCase()+s.slice(1);

const grid=document.getElementById('grid'),filters=document.querySelector('.filters'),
      brandSel=document.getElementById('brand'),count=document.getElementById('count');
let cat='todas',brand='todas';

const wheels='<svg viewBox="0 0 64 40" aria-hidden="true"><circle cx="14" cy="28" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="50" cy="28" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M14 28l12-16h14l10 16M26 12l8 16h-20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></svg>';

function render(){
  const list=BIKES.filter(b=>(cat==='todas'||b.cat===cat)&&(brand==='todas'||b.marca===brand));
  count.textContent=`${list.length} ${list.length===1?'bicicleta':'bicicletas'}`;
  grid.innerHTML=list.length?list.map((b,i)=>{
    const msg=`Hola Mr.Bike, me interesa la ${b.marca} ${b.modelo}${b.rodado?` (rodado ${b.rodado})`:''}. ¿Está disponible?`;
    return `<article class="card" style="--i:${i}">
      <div class="pic">${b.tag?`<span class="tag new">${b.tag}</span>`:''}${b.foto
        ?`<img src="${b.foto}" alt="${b.marca} ${b.modelo}" loading="lazy">`
        :`<div class="soon">${wheels}<span>Foto próximamente</span></div>`}</div>
      <div class="body">
        <span class="brand">${b.marca} · ${cap(b.cat)}</span>
        <h3>${b.modelo}</h3>
        <p class="spec">${b.spec||'Ficha técnica próximamente'}</p>
        <div class="row"><span class="price">Consultar</span><a class="btn" href="${wa(msg)}" rel="noopener">WhatsApp</a></div>
      </div></article>`}).join('')
    :'<p class="empty">No hay bicicletas con ese filtro por ahora. Escríbenos y las conseguimos.</p>';
}
function setCat(c){
  cat=c;
  filters.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-selected',x.dataset.c===c));
  render();
}
filters.innerHTML=CATS.map(c=>`<button class="chip" role="tab" aria-selected="${c==='todas'}" data-c="${c}">${cap(c)}</button>`).join('');
brandSel.innerHTML='<option value="todas">Todas</option>'+[...new Set(BIKES.map(b=>b.marca))].map(m=>`<option>${m}</option>`).join('');
filters.addEventListener('click',e=>{const b=e.target.closest('.chip');if(b)setCat(b.dataset.c)});
brandSel.addEventListener('change',()=>{brand=brandSel.value;render()});
document.querySelectorAll('[data-cat]').forEach(a=>a.addEventListener('click',()=>{setCat(a.dataset.cat);closeMenu()}));
render();

/* menú móvil y mega-menú */
const burger=document.querySelector('.burger'),menu=document.getElementById('menu'),
      mega=document.querySelector('.has-mega'),megaBtn=document.querySelector('.mega-btn');
function closeMenu(){
  menu.classList.remove('open');burger.setAttribute('aria-expanded','false');
  mega.classList.remove('open');megaBtn.setAttribute('aria-expanded','false');
}
burger.addEventListener('click',()=>{
  const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);
});
megaBtn.addEventListener('click',()=>{
  const o=mega.classList.toggle('open');megaBtn.setAttribute('aria-expanded',o);
});
mega.addEventListener('mouseenter',()=>megaBtn.setAttribute('aria-expanded','true'));
mega.addEventListener('mouseleave',()=>megaBtn.setAttribute('aria-expanded',mega.classList.contains('open')));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();megaBtn.blur()}});
document.addEventListener('click',e=>{if(!e.target.closest('.has-mega'))mega.classList.remove('open')});
menu.addEventListener('click',e=>{if(e.target.matches('a'))closeMenu()});

/* revelado al scroll, escalonado por grupo */
const items=[...document.querySelectorAll('.reveal')];
items.forEach((el,i)=>el.style.setProperty('--d',i%5));
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
  items.forEach(el=>io.observe(el));
}else items.forEach(el=>el.classList.add('in'));

/* botones con mensaje de WhatsApp */
document.querySelectorAll('[data-wa]').forEach(a=>{a.href=wa(a.dataset.wa);a.rel='noopener'});

/* formulario → WhatsApp */
document.getElementById('form').addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.target,err=document.getElementById('err');
  if(!f.nombre.value.trim()){err.hidden=false;f.nombre.focus();return}
  err.hidden=true;
  const m=f.msg.value.trim()||'Quisiera más información.';
  window.open(wa(`Hola Mr.Bike, soy ${f.nombre.value.trim()}. ${m}`),'_blank','noopener');
});
document.getElementById('yr').textContent=new Date().getFullYear();
