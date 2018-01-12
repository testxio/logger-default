const colors = require("colors");

const startScriptLogLine = source => `\

====================================================================================================
Executing ${source}
====================================================================================================

`;

const printable = (obj, delimiter = ", ") =>
  Object.entries(obj)
    .map(([k, v]) => `${k}: '${v}'`)
    .join(delimiter);

module.exports = function(eventEmitter) {
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

var logStepStart = function(step, context) {
  const fullName = step.meta["Full name"].cyan;
  const row = colors.yellow(`row ${step.meta.Row}`);
  console.log(`Executing step ${fullName} on ${row} with arguments:`);

  const result = [];
  for (let k in step.arguments) {
    const v = step.arguments[k];
    result.push(
      console.log(colors.grey(`  ${k}: ${JSON.stringify(v, null, 4)}`))
    );
  }
};
