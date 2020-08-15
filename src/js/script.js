import { headerScripts } from './_module/header';
import { pageLoader } from './_module/page-loader';
import { AuthCheck } from './_module/auth-check';

(function() {
  headerScripts();
  pageLoader();
  // authCheck();
  const authCheck = new AuthCheck();
  authCheck.init();
})();
