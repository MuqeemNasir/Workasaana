const pc = require('picocolors');

const getTimestamp = () => {
  const now = new Date();
  return pc.gray(`[${now.toLocaleDateString()} ${now.toLocaleTimeString()}]`);
};

const logger = {
  info: (msg) => console.log(`${getTimestamp()} ${pc.blue('ℹ️  ' + msg)}`),
  
  success: (msg) => console.log(`${getTimestamp()} ${pc.green('✅ ' + pc.bold(msg))}`),
  
  warn: (msg) => console.log(`${getTimestamp()} ${pc.yellow('⚠️  ' + msg)}`),
  
  error: (msg, err = "") => {
    console.error(`${getTimestamp()} ${pc.red('❌ ' + pc.bold(msg))}`, pc.red(err));
  },
  
  launch: (port) => {
    console.log(`${getTimestamp()} ${pc.magenta('🚀 Server blasting off on port ' + pc.bold(port))}`);
  }
};

module.exports = logger;