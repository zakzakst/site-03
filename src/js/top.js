import $ from 'jquery';
import { hello } from "./sub";

function top() {
  console.log('test2');
  console.log('test');
}

$(function() {
  top();
  hello();
})
