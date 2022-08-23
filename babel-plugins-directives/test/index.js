const fs = require("fs");
const path = require("path");
const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");
const jsxElementVisitor = require("../src/index");

function run(srourceCode) {
  const ast = parser.parse(srourceCode, {
    sourceType: "module",
    allowImportExportEverywhere: true,
    plugins: ["jsx"],
  });

  fs.writeFileSync(path.join(__dirname, "./ast.json"), JSON.stringify(ast));

  const visitor = {
    JSXElement: jsxElementVisitor(types),
  };

  traverse.default(ast, visitor);
  return generator.default(ast, {}, srourceCode);
}
const srourceCode = fs.readFileSync(
  path.join(__dirname, "./source.jsx"),
  "utf-8"
);

const traverseCode = run(srourceCode).code;
fs.writeFileSync(path.join(__dirname, "./result.jsx"), traverseCode);
