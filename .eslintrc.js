module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": { "experimentalObjectRestSpread": true, "jsx": true },
        "sourceType": "module"
    },
    "plugins": ["react"],
    "rules": {
        "indent": ["error", 2, { "SwitchCase": 1 }],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "curly": ["error", "all"],
        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": ["error", { "anonymous": "always", "named": "never" }],
        "spaced-comment": ["error", "always"],
        "space-unary-ops": ["error"],
        "keyword-spacing": ["error", { "before": true, "after": true }],
        "space-infix-ops": ["error"],
        "space-in-parens": ["error", "never"],
        "no-with": ["error"],
        "one-var": ["error", "never"],
        "no-empty": ["error"],
        "wrap-iife": ["error", "any"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "comma-style": ["error", "last"],
        "no-multi-str": ["error"],
        "yoda": ["error", "always", { "exceptRange": true, "onlyEquality": true }],
        "array-bracket-spacing": ["error", "never"],
        "dot-notation": ["error"],
        "key-spacing": ["error"],
        "object-curly-spacing": ["error", "never"],
        "quote-props": ["error", "as-needed", { "keywords": true }],
        "max-len": ["error", { "ignoreUrls": true, "code": 120 }],
        "no-trailing-spaces": ["error"],
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }]
    }
};
