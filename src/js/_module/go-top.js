import $ from 'jquery';

export function goTop() {
  const el = $('#js-go-top');
  if(!el) {return;}
  addEventGoTop();

  function addEventGoTop() {
    const speed = 600;
    el.find('a').on('click', (e) => {
      e.preventDefault();
      $('body,html').animate({scrollTop:0}, speed);
    });
  }
}
