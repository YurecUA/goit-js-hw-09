const e=document.querySelector("body"),t=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]");let a=null,l=!1;t.addEventListener("click",(()=>{l||(t.disabled=!0,d.disabled=!1,l=!0,a=setInterval((()=>{e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3))})),d.addEventListener("click",(()=>{clearInterval(a),l=!1,t.disabled=!1,d.disabled=!0}));
//# sourceMappingURL=01-color-switcher.371ae6a0.js.map