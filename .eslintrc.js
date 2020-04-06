module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false, "allowImplicit": false}],
        "import/extensions": ['error', 'always', {ignorePackages: true}],
        "no-param-reassign": [2, {"props": false}],
        
        
    },
};