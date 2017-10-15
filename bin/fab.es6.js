(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.fab = global.fab || {})));
}(this, (function (exports) { 'use strict';

const COMMON_CSS = `
.fab-wrap {
  box-sizing: border-box;
  margin: 25px;
  position: fixed;
  z-index: 999999;
  right: 0;
  bottom: 0; }
  .fab-wrap .fab-btn {
    height: 52px;
    width: 52px;
    display: inline-block;
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.28);
    cursor: pointer;
    position: relative;
    line-height: 46px;
    text-align: center;
    transition: all ease 0.2s;
    margin-bottom: 7px; }
    .fab-wrap .fab-btn.fab-main {
      margin-bottom: 0; }
    .fab-wrap .fab-btn .fab-children {
      visibility: hidden;
      position: absolute;
      bottom: 100%;
      animation: 0.5s out; }
    .fab-wrap .fab-btn:after {
      content: attr(data-fab-label);
      opacity: 0;
      border-radius: 9px;
      padding: 0 60px 0 1em;
      text-align: left;
      font-size: 14px;
      pointer-events: none;
      position: absolute;
      right: 50%;
      line-height: 52px;
      width: 100px;
      z-index: -1;
      transition: all ease 0.2s; }
    .fab-wrap .fab-btn:hover .fab-children {
      visibility: visible;
      animation: 0.5s in; }
    .fab-wrap .fab-btn:hover:after {
      opacity: 1; }
    .fab-wrap .fab-btn svg {
      vertical-align: middle; }

@keyframes in {
  0% {
    opacity: 0;
    transform: translate(0px, -25px); }
  100% {
    opacity: 1;
    transform: translate(0px, 0px); } }

@keyframes out {
  0% {
    opacity: 1;
    transform: translate(0px, 0px); }
  100% {
    opacity: 0;
    transform: translate(0px, -25px); } }
`;

const DEFAULTS = {
  bgColor: "#0083ca",
  hoverBgColor: "gold",
  color: "white",
  labelBgColor: "rgba(0, 0, 0, 0.02)",
  labelColor: "#666"
};

const getCustomCSS = opts => {
  return `
#${opts.id} .fab-btn {
  background: ${opts.bgColor};
}
#${opts.id} .fab-btn:hover {
  background: ${opts.hoverBgColor};
}    
#${opts.id} svg {
  fill: ${opts.color};
} 
#${opts.id} .fab-btn:after {
  background: ${opts.labelBgColor};
  color: ${opts.labelColor};
}
`;
};

const render = opts => {
  return `
    <div id="${opts.id}" class="fab-wrap">
      ${renderBtn(opts.btn)}
    </div>
  `;
};

const renderBtn = btn => {
  btn.id = "fabbtn_" + _uid++;
  return `
    <div id=${btn.id} class="fab-btn" data-fab-label="${btn.label}">
      ${btn.svg}
      ${btn.children ? renderChildren(btn.children) : ""}
    </div>  
  `;
};

const renderChildren = children => {
  return `
    <div class="fab-children">
      ${children.reverse().map(btn => renderBtn(btn)).join("")}
    </div>  
  `;
};

const attachStyle = styles => {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
};

let _attached = false;
let _uid = 0;

const attachCallback = btn => {
  if (btn.fn) {
    document.getElementById(btn.id).addEventListener("click", e => {
      btn.fn();
      e.stopPropagation();
    });
  }
  btn.children &&
    btn.children.forEach(btn => {
      attachCallback(btn);
    });
};

const init = opts => {
  opts = Object.assign({}, DEFAULTS, opts);
  if (!_attached) {
    attachStyle(COMMON_CSS);
    _attached = true;
  }
  opts.id = "fab_" + _uid++;
  attachStyle(getCustomCSS(opts));
  const html = render(opts);
  document.body.insertAdjacentHTML("afterend", html);

  attachCallback(opts.btn);
  const el = document.getElementById(opts.id);
  return {
    hide: () => {
      el.style.display = "none";
    },
    show: () => {
      el.style.display = "block";
    }
  };
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
