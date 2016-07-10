module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "angular": 1,
    "$": 1
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    }
  },
  "rules": {
    "no-console": 0,
    "indent": [
            1,
            2
        ],
    "linebreak-style": [
            1,
            "unix"
        ],
    "semi": [
            1,
            "always"
        ]
  }
};
