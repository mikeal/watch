 module.exports = {

     "extends": "eslint:recommended",

     "rules": {
             "no-console": "off",
             "no-unused-vars": ["error" ,{ "vars": "all", "args": "none" }],
              "no-undef": 'error'
                           },
     "env": {
               "es6": true,
               "node": true
                         },

     "parserOptions": {
             "ecmaVersion": 6
                     }

 };

