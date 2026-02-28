/**
 * Inicializa o efeito de card 3D no bloco da imagem do hero:
 * ativado apenas com clique (segurar o mouse pressionado) e
 * desativado ao soltar o botão ou ao sair do card.
 */
function initHeroCard3D() {
  var wrap = document.querySelector('.hero-image-wrap');
  if (!wrap) return;

  // Flip-left manual na entrada (substitui AOS nesse elemento)
  wrap.classList.add('flip-left-enter');
  wrap.addEventListener('animationend', function onFlipEnd(e) {
    if (e.animationName !== 'heroFlipLeft') return;
    wrap.classList.remove('flip-left-enter');
  }, { once: true });

  var maxTilt = 12;
  var insetPx = 12;
  var ativo = false;

  function resetTilt() {
    wrap.style.setProperty('--rotate-x', '0deg');
    wrap.style.setProperty('--rotate-y', '0deg');
  }

  function desativar() {
    ativo = false;
    resetTilt();
  }

  function onMove(e) {
    if (!ativo) return;

    var rect = wrap.getBoundingClientRect();
    var left = rect.left + insetPx;
    var right = rect.right - insetPx;
    var top = rect.top + insetPx;
    var bottom = rect.bottom - insetPx;

    if (e.clientX <= left || e.clientX >= right || e.clientY <= top || e.clientY >= bottom) {
      resetTilt();
      return;
    }

    var innerWidth = right - left;
    var innerHeight = bottom - top;
    var x = (e.clientX - left) / innerWidth;
    var y = (e.clientY - top) / innerHeight;

    var rotateY = (x - 0.5) * 2 * maxTilt;
    var rotateX = (0.5 - y) * 2 * maxTilt;
    wrap.style.setProperty('--rotate-x', rotateX + 'deg');
    wrap.style.setProperty('--rotate-y', rotateY + 'deg');
  }

  wrap.addEventListener('mousedown',  (e) => {
    e.preventDefault();
    ativo = true;
  });

  wrap.addEventListener('mouseleave', desativar);

  wrap.addEventListener('mousemove', onMove);

  document.addEventListener('mouseup', desativar);
}

AOS.init({
  duration: 1500,
  easing: 'ease-out-cubic',
  once: true,
});
initHeroCard3D();
