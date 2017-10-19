(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.fab = global.fab || {})));
}(this, (function (exports) { 'use strict';

const COMMON_CSS = ".fab-wrap{margin:25px;position:fixed;z-index:999999;right:0;bottom:0}.fab-wrap>a{margin-bottom:0 !important}.fab-wrap a{text-decoration:none;height:52px;width:52px;line-height:52px;display:block;border-radius:50%;box-shadow:0 0 3px rgba(0,0,0,0.15),0 4px 8px rgba(0,0,0,0.28);cursor:pointer;position:relative;text-align:center;transition:all ease 0.2s;margin-bottom:8px}.fab-wrap a:hover:after{opacity:1}.fab-wrap a>svg{position:absolute;margin:auto;left:0;right:0;top:0;bottom:0;display:inline-block}.fab-wrap a+.fab-btns{visibility:hidden;position:absolute;bottom:100%;animation:0.5s out;padding-bottom:20px;margin-bottom:-20px}.fab-wrap a:after{content:attr(data-fab-label);box-sizing:border-box;font-size:14px;position:absolute;pointer-events:none;z-index:-1;transition:all ease 0.2s;opacity:0;border-radius:9px;padding:0 50px 0 1em;text-align:left;right:50%;line-height:52px}.fab-wrap:hover a+.fab-btns{visibility:visible;animation:0.5s in}@keyframes in{0%{opacity:0;transform:translate(0px, -25px)}100%{opacity:1;transform:translate(0px, 0px)}}@keyframes out{0%{opacity:1;transform:translate(0px, 0px)}100%{opacity:0;transform:translate(0px, -25px)}}";

const THEME = {
  bgColor: "#0083ca",
  hoverBgColor: "#4acc08",
  color: "white",
  labelBgColor: "rgba(239, 239, 239, 0.71)",
  labelColor: "#3a3a3a"
};

const getTheme = (id, theme) => {
  return `
#${id} a {
  background: ${theme.bgColor};
  color: ${theme.color};
}
#${id} a:hover {
  background: ${theme.hoverBgColor};
}    
#${id} svg {
  fill: ${theme.color};
} 
#${id} a:after {
  background: ${theme.labelBgColor};
  color: ${theme.labelColor};
}
`;
};

const render = (id, btn) => {
  return `
    <div id=${id} class="fab-wrap ${btn.className || ""}">
      ${renderBtn(btn)}
    </div>
  `;
};

const renderBtn = btn => {
  btn.id = uid();
  const label = btn.label ? ` data-fab-label=${btn.label}` : "";
  return `
    <a id=${btn.id} ${label}>
      ${btn.html}
    </a>  
    ${btn.btns
      ? `
        <div class="fab-btns">
          ${btn.btns
            .reverse()
            .map(renderBtn)
            .join("")}
        </div>  
      `
      : ""}    
  `;
};

const attachStyle = styles => {
  const s = document.createElement("style");
  s.innerHTML = styles;
  document.head.appendChild(s);
};

let _attached = false;
let _uid = 0;
const uid = () => "fab_" + _uid++;

const attachCallback = btn => {
  btn.fn &&
    document.getElementById(btn.id).addEventListener("mousedown", e => {
      btn.fn();
      e.stopPropagation();
    });
  btn.btns && btn.btns.forEach(attachCallback);
};

const create = (btn, theme) => {
  if (!_attached) {
    attachStyle(COMMON_CSS);
    _attached = true;
  }
  const id = uid();

  const html = render(id, btn);
  document.body.insertAdjacentHTML("afterend", html);
  attachCallback(btn);

  theme = Object.assign({}, THEME, theme);
  attachStyle(getTheme(id, theme));

  const el = document.getElementById(btn.id).parentNode;
  return {
    hide: () => {
      el.style.display = "none";
    },
    show: () => {
      el.style.display = "block";
    }
  };
};

exports.create = create;

Object.defineProperty(exports, '__esModule', { value: true });

})));
