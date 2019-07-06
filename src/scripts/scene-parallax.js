const parallaxContainer = document.querySelector('.scene-parallax');
const parallax = document.querySelector(".scene-parallax__layer-list");
const particles = document.querySelector(".scene-parallax__particles");
const layers = [...parallax.children];

window.addEventListener("scroll", e => {
  const yScroll = window.pageYOffset;
  if(layers && parallaxContainer.clientHeight > yScroll) {
    layers.forEach(layer => {
      const divider = layer.dataset.speed;
      const strafe = yScroll * divider;
      if(divider) {
        layer.style.transform = `translateY(-${strafe}px)`;
      }
    })
  }
});


parallaxContainer.addEventListener('mousemove', (event) => {
  const deltaX = 1 - event.clientX / (window.innerWidth / 2);
  const deltaY = 1 - event.clientY / (window.innerHeight / 2);

  if(particles) {
    particles.style.transform = `translate(${deltaX}%, ${deltaY}%)`
  }
});
