// Small enhancements: scroll entrance animations, filters, lightbox, and progress.
document.documentElement.classList.add('js');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.getElementById('siteHeader');
const progress = document.getElementById('progress');
let scheduled = false;
function onScroll(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+'%';header.classList.toggle('scrolled',window.scrollY>14);scheduled=false;});}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
const reveals=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window&&!prefersReducedMotion){const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}})},{threshold:.08,rootMargin:'0px 0px 80px 0px'});reveals.forEach(el=>observer.observe(el));}else reveals.forEach(el=>el.classList.add('visible'));
const filters=[...document.querySelectorAll('[data-filter]')];const cards=[...document.querySelectorAll('.art-card')];
filters.forEach(btn=>btn.addEventListener('click',()=>{const category=btn.dataset.filter;filters.forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});cards.forEach(card=>card.classList.toggle('hidden',category!=='all'&&card.dataset.category!==category));}));
const modal=document.getElementById('lightbox');const modalImage=document.getElementById('lightboxImage');const modalTitle=document.getElementById('lightboxTitle');const modalMedium=document.getElementById('lightboxMedium');let lastTrigger=null;
document.querySelectorAll('.art-trigger').forEach(button=>button.addEventListener('click',()=>{lastTrigger=button;const src=button.dataset.src;modalImage.src=src;modalImage.alt=button.querySelector('img').alt;modalTitle.textContent=button.dataset.title;modalMedium.textContent=button.dataset.medium;if(typeof modal.showModal==='function')modal.showModal();else window.open(src,'_blank','noopener');}));
function closeModal(){modal.close();lastTrigger?.focus();}
document.getElementById('lightboxClose').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
modal.addEventListener('close',()=>{modalImage.removeAttribute('src');lastTrigger?.focus();});

// Discourage casual saving without breaking keyboard navigation or normal browsing.
document.querySelectorAll('img').forEach(img=>img.addEventListener('dragstart',e=>e.preventDefault()));
document.addEventListener('contextmenu',e=>{if(e.target.closest('.art-image,.hero-art-frame,.lightbox-image-wrap'))e.preventDefault();});
