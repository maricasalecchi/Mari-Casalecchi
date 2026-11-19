(() => {
  const gallery = document.querySelector('.project-images');
  if (!gallery) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Imagem ou vídeo ampliado');
  box.innerHTML = '<button class="lightbox-close" type="button" aria-label="Fechar">×</button><img alt=""><video autoplay loop muted playsinline controls></video>';
  document.body.appendChild(box);

  const enlarged = box.querySelector('img');
  const enlargedVideo = box.querySelector('video');
  const closeButton = box.querySelector('.lightbox-close');

  function closeBox(){
    box.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    enlarged.removeAttribute('src');
    enlargedVideo.pause();
    enlargedVideo.removeAttribute('src');
    enlargedVideo.load();
    enlarged.style.display = 'none';
    enlargedVideo.style.display = 'none';
  }

  gallery.querySelectorAll('img, video').forEach((media) => {
    media.addEventListener('click', () => {
      enlarged.style.display = 'none';
      enlargedVideo.style.display = 'none';

      const r = media.getBoundingClientRect();
      const width = Math.min(r.width * 2.5, window.innerWidth * 0.90);

      if (media.tagName === 'IMG') {
        enlarged.src = media.src;
        enlarged.alt = media.alt || 'Imagem ampliada';
        enlarged.style.width = width + 'px';
        enlarged.style.maxHeight = '90vh';
        enlarged.style.display = 'block';
      } else {
        const source = media.querySelector('source');
        const videoSrc = source ? source.src : media.currentSrc;
        enlargedVideo.src = videoSrc;
        enlargedVideo.style.width = width + 'px';
        enlargedVideo.style.maxWidth = '90vw';
        enlargedVideo.style.maxHeight = '90vh';
        enlargedVideo.style.display = 'block';
        enlargedVideo.currentTime = 0;
        enlargedVideo.play().catch(() => {});
      }

      box.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', closeBox);
  box.addEventListener('click', (e) => { if (e.target === box || e.target === enlarged) closeBox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && box.classList.contains('is-open')) closeBox(); });
})();
