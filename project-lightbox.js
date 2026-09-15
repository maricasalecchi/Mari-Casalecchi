(() => {
  const gallery = document.querySelector('.project-images');
  if (!gallery) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Pôster ampliado');
  box.innerHTML = '<button class="lightbox-close" type="button" aria-label="Fechar">×</button><img alt="">';
  document.body.appendChild(box);

  const enlarged = box.querySelector('img');
  const closeButton = box.querySelector('.lightbox-close');

  function closeBox(){
    box.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    enlarged.removeAttribute('src');
  }

  gallery.querySelectorAll('img').forEach((img) => {
    img.addEventListener('click', () => {
      enlarged.src = img.src;
      enlarged.alt = img.alt || 'Pôster ampliado';

      // 2,5x o tamanho renderizado na grade, limitado à área útil da tela.
      const r = img.getBoundingClientRect();
      enlarged.style.width = Math.min(r.width * 2.5, window.innerWidth * 0.90) + 'px';
      enlarged.style.maxHeight = '90vh';

      box.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', closeBox);
  box.addEventListener('click', (e) => { if (e.target === box || e.target === enlarged) closeBox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && box.classList.contains('is-open')) closeBox(); });
})();
