const parallax = document.querySelector(".drum-parallax__layer-list");
const layers = [...parallax.children];

window.addEventListener("scroll", e => {
  const yScroll = window.pageYOffset;
  const offsetTop = parallax.getBoundingClientRect().top;
  const delta = offsetTop - window.innerHeight;

  if(delta < 0) {
    layers.forEach(layer => {
      const divider = layer.dataset.speed;
      const strafe = delta * divider;
      console.log(delta);
      if(divider) {
        layer.style.transform = `translateY(${strafe}px)`;
      }
    })
  }
});
