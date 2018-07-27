const fs = require('fs');
const typescript = require('typescript');
const decamelize = require('decamelize');
const camelcase = require('camelcase');

module.exports = function(option) {
  const js = typescript.transpileModule(
    option.content || fs.readFileSync(option.path, 'utf8').toString(),
    {
      compilerOptions: {
        target: typescript.ScriptTarget.ES5,
        module: typescript.ModuleKind.CommonJS
      }
    }
  );
  const tree = new Function(
    `const exports={};${js.outputText};return exports;`
  )();
  const vars = {};
  Object.keys(tree).forEach(name => {
    const node = tree[name];
    const fname = decamelize(camelcase(name), '-');
    if (typeof node !== 'object') {
      vars[fname] = node;
    } else {
      Object.keys(node).forEach(name => {
        vars[fname + '-' + decamelize(camelcase(name), '-')] = node[name];
      });
    }
  });
  for (const i in vars) {
    vars[i] = typeof vars[i] === 'number' ? vars[i] + 'px' : vars[i];
  }
  return vars;
};
