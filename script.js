
// Mobile menu toggle
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
if(burger){
  burger.addEventListener('click', ()=>{
    if(menu.style.display === 'flex'){ menu.style.display = 'none'; }
    else { menu.style.display = 'flex'; menu.style.flexDirection='column'; }
  });
}

// Mark active nav item
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu a').forEach(a=>{
  if(a.getAttribute('href') === path) a.classList.add('active');
});
// === Home style-panels slideshow ===
(function(){
  const panels = document.querySelectorAll('.style-panel .slides');
  if(!panels.length) return;

  panels.forEach(slidesEl => {
    const urls = (slidesEl.dataset.images || '')
      .split(',').map(s => s.trim()).filter(Boolean);
    const [a,b] = slidesEl.querySelectorAll('.slide');
    if(!a || !b || !urls.length) return;

    const setBg = (el,url) => { el.style.backgroundImage = `url('${url}')`; };
    let idx = 0, showA = true;

    setBg(a, urls[idx]);              // first image
    a.classList.add('visible');
    setBg(b, urls[(idx+1)%urls.length]); // preload second

    setInterval(() => {
      idx = (idx + 1) % urls.length;
      const next = urls[idx];
      if (showA){
        setBg(b, next); b.classList.add('visible'); a.classList.remove('visible');
      } else {
        setBg(a, next); a.classList.add('visible'); b.classList.remove('visible');
      }
      showA = !showA;
    }, 4000); // change every 4s
  });
})();

// Portfolio artwork modal
(function(){
  const modal = document.getElementById('artworkModal');
  if(!modal) return;

  const modalImage = document.getElementById('modalArtworkImage');
  const modalTitle = document.getElementById('modalArtworkTitle');
  const modalDescription = document.getElementById('modalArtworkDescription');
  const modalButton = document.getElementById('modalArtworkButton');
  const closeButton = modal.querySelector('.artwork-modal__close');
  const backdrop = modal.querySelector('.artwork-modal__backdrop');

  document.querySelectorAll('.portfolio-page .card').forEach(card => {
    card.addEventListener('click', () => {
      const image = card.querySelector('img');
      const title = card.querySelector('.title')?.textContent.trim() || '';
      const price = card.querySelector('.price')?.textContent.trim() || '';
      const isSold = price.toUpperCase() === 'SOLD';

      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modalTitle.textContent = title;

      if(isSold){
        modalDescription.textContent = '';
        modalButton.style.display = 'none';
      } else {
        modalDescription.textContent = card.dataset.description || 'This artwork is available. Please enquire for more details.';
        modalButton.style.display = 'inline-block';
        modalButton.href = 'contact.html?artwork=' + encodeURIComponent(title);
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal(){
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeButton.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') closeModal();
  });
})();