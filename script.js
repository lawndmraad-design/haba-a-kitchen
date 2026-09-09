const d = SITE_DATA;
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

$$('[data-site-name]').forEach(e=>e.textContent=d.name);
$$('[data-site-subtitle]').forEach(e=>e.textContent=d.subtitle);
$('[data-hero-title]').textContent=d.heroTitle;
$('[data-hero-text]').textContent=d.heroText;
$$('[data-rating]').forEach(e=>e.textContent=d.rating);
$$('[data-review-count]').forEach(e=>e.textContent=d.reviewCount);
$('[data-address]').textContent=d.address;
$('[data-hours]').textContent=d.hours;
$('[data-phone]').textContent=d.phone;
$('#callBtn').href='tel:'+d.phone.replace(/\s/g,'');
$('#waBtn').href='https://wa.me/'+d.whatsapp;

const categories=['الكل',...new Set(d.menu.map(x=>x.category))];
const tabs=$('#categoryTabs');
const grid=$('#menuGrid');
function renderMenu(category='الكل'){
  const list=category==='الكل'?d.menu:d.menu.filter(x=>x.category===category);
  grid.innerHTML=list.map(x=>`<article class="menu-item"><div class="price">${x.price}</div><div class="name">${x.name}</div><div class="desc">${x.desc}</div></article>`).join('');
}
categories.forEach((c,i)=>{const b=document.createElement('button');b.textContent=c;b.className=i===0?'active':'';b.onclick=()=>{$$('.category-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMenu(c)};tabs.appendChild(b)});
renderMenu();

$('#reviewsGrid').innerHTML=d.reviews.map(r=>`<article class="review-card"><div class="quote">“</div><p>${r.text}</p><div class="review-footer"><span>${r.name}</span><span class="review-stars">${'★'.repeat(r.stars)}</span></div></article>`).join('');

const toggle=$('#menuToggle'), nav=$('#nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
$$('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
