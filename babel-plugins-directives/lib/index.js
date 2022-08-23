const types = require("@babel/types");

const jsxElementVisitor = path => {
  const {
    node,
    parentPath
  } = path;
  const attributes = node.openingElement.attributes;

  if (!attributes || attributes.length == 0) {
    return;
  }

  const qjIndex = attributes.findIndex(item => {
    return ["qj-if"].indexOf(item?.name?.name) > -1;
  });
  const findQjAttr = attributes[qjIndex];

  if (!findQjAttr || findQjAttr.value === null) {
    return;
  }

  attributes.splice(qjIndex, 1);
  const expression = findQjAttr.value.expression;
  const deiective = findQjAttr.name?.name;

  if (deiective === "qj-if") {
    const nullLiteral = types.nullLiteral();
    const conditionalExpression = types.conditionalExpression(expression, node, nullLiteral);
    const jsxExpressionContainer = types.jsxExpressionContainer(conditionalExpression);

    if (types.isReturnStatement(parentPath.node)) {
      path.replaceWith(conditionalExpression);
    } else {
      path.replaceWith(jsxExpressionContainer);
    }
  }
};

const visitor = {
  JSXElement: jsxElementVisitor
};

module.exports = function (babel) {
  return {
    visitor
  };
};