// Usage examples:
// ./node_modules/.bin/eslint srv
// ./node_modules/.bin/eslint --fix srv
// ./node_modules/.bin/eslint --print-config srv | less

module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["airbnb"],
    "rules": {
        "indent": ["error", 2, { "SwitchCase": 1 }],
        "max-len": ["error", { "ignoreUrls": true, "code": 120 }],
        "yoda": ["error", "always", { "exceptRange": true, "onlyEquality": true }],
        "object-curly-spacing": ["error", "never"],
        "arrow-parens": ["off"],
        "consistent-return": ["off"],
        "no-plusplus": ["off"],
        "no-shadow": ["off"],
        "no-use-before-define": ["off"],
        "object-shorthand": ["off"],
        "prefer-const": ["off"],
    }
};
