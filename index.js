const colors = require("colors");
const yaml = require("js-yaml");

const startScriptLogLine = source => `\

====================================================================================================
Executing ${source}
====================================================================================================

`;

let showArgsVar;

const printable = (obj, delimiter = ", ") =>
  Object.entries(obj)
    .map(([k, v]) => `${k}: '${v}'`)
    .join(delimiter);

module.exports = function (eventEmitter, showArgs = false) {
  showArgsVar = showArgs;

  eventEmitter.on("script/start", logScriptStart);
  eventEmitter.on("step/start", logStepStart);
};

const logScriptStart = script => {
  const source = script.source
    ? `script in ${colors.bold(printable(script.source))}`
    : colors.bold("inline script");
  console.log(colors.cyan(startScriptLogLine(source)));

  if (testx.params.logScript)
    console.log("SCRIPT:", JSON.stringify(script, null, 2));
};

const logStepStart = function (step, context) {
  const fullName = step.meta["Full name"].cyan;
  const row = colors.yellow(`row ${step.meta.Row}`);
  if (Object.keys(step.arguments).length && showArgsVar) {
    console.log(`Executing step ${fullName} on ${row} with arguments:`);
    const opts = { noRefs: true, noCompatMode: true };
    console.log(colors.grey(yaml.safeDump(step.arguments)));
  } else {
    console.log(`Executing step ${fullName} on ${row}.\n`);
  }
};
