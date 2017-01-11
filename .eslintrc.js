module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb",
    "rules": {
        "indent": ["error", 2, { "SwitchCase": 1 }],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "max-len": ["error", { "ignoreUrls": true, "code": 120 }],
        "arrow-parens": ["off"],
        "consistent-return": ["off"],
        "no-plusplus": ["off"],
        "no-shadow": ["off"],
        "no-use-before-define": ["off"],
        "object-shorthand": ["off"],
        "prefer-const": ["off"],
        "yoda": ["error", "always", { "exceptRange": true, "onlyEquality": true }],
    }
};
