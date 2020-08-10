import $ from 'jquery';
import { headerScripts } from './_module/header';
import { pageLoader } from './_module/page-loader';
import { pageTransition } from './_module/page-transition';

$(function() {
  headerScripts();
  pageLoader();
  pageTransition();
});
