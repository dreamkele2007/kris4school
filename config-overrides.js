const reqireBabel = require('./config/rewire-babel');
const reqireResolve = require('./config/rewire-resolve');
const reqireLess = require('./config/rewire-less');
/* config-overrides.js */
module.exports = function override(config, env) {

  const options = {
    sourceMap:false
  };
  config = reqireResolve(config, env);
  config = reqireBabel(config, env);
  config = reqireLess(config, env,options);
  return config;
};
