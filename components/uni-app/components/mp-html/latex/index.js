"use strict";
const components_uniApp_components_mpHtml_latex_katex_min = require("./katex.min.js");
function Latex() {
}
Latex.prototype.onParse = function(node, vm) {
  if (!vm.options.editable && node.type === "text" && /\$(.+?)\$/.test(node.text)) {
    delete node.type;
    node.name = "span";
    node.attrs = {};
    node.children = node.text.split("$").map((str, index) => {
      if ((index + 1) % 2 === 0) {
        return {
          name: "span",
          attrs: {},
          f: "display:inline-block",
          children: components_uniApp_components_mpHtml_latex_katex_min.parse.default(str)
        };
      }
      return {
        type: "text",
        text: str
      };
    }).filter((node2) => node2.name || node2.text);
    delete node.text;
  }
};
exports.Latex = Latex;
