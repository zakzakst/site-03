import $ from 'jquery';
import barba from '@barba/core'
import { pageTopInit } from './page-transition-top'

export function pageTransition() {
  const el = $('#js-page-transition');
  if(!el) {return;}
  const nav = $('#js-header__navbar');
  const menu = $('#js-header__navbar-menu');
  const button = $('#js-header__navbar-button');
  const speed = 400;
  const navItem = $('.navbar-item');
  addEventLinkClick();

  barba.init({
    transitions: [{
      leave() {
        return new Promise(resolve => {
          pageLeave(speed);
          setTimeout(() => {
            menuClear();
            resolve();
          }, speed + 200);
        });
      },
      enter(data) {
        positionTop();
        activeNavChange(data);
        pageEnter();
      }
    }],
    views: [{
      namespace: 'top',
      afterEnter() {
        console.log('top-enter');
        pageTopInit();
      }
    }]
  });

  function pageEnter() {
    el.slideUp(speed);
  }

  function pageLeave() {
    el.slideDown(speed);
  }

  function menuClear() {
    menu.css('display', '');
    nav.removeClass('is-open');
    button.removeClass('is-active');
  }

  function activeNavChange(data) {
    const navName = data.next.container.dataset.navName;
    navItem.removeClass('is-active');
    const target = navItem.filter('[data-link-name="' + navName + '"]');
    target.addClass('is-active');
  }

  function positionTop() {
    scrollTo(0, 0);
  }

  function addEventLinkClick() {
    const links = $('a[href]');
    links.on('click', (e) => {
      if(e.currentTarget.href === window.location.href) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }
}
