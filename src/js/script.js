import $ from 'jquery';
import { goTop } from './_module/go-top';
import { headerScripts } from './_module/header';
import { pageLoader } from './_module/page-loader';
import { pageTransition } from './_module/page-transition';

$(function() {
  goTop();
  headerScripts();
  pageLoader();
  pageTransition();
});
