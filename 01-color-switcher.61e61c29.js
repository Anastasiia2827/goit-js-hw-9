!function(){var t=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),e=null;function o(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}function a(t,n,e){t.disabled=e,n.disabled=!e}t.addEventListener("click",(function(){e=setInterval(o,1e3),a(t,n,!0)})),n.addEventListener("click",(function(){clearInterval(e),a(t,n,!1)}))}();
//# sourceMappingURL=01-color-switcher.61e61c29.js.map