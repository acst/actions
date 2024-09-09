import * as core from "@actions/core";

async function run() {
  try {
    const varsString = core.getInput("variables");
    const vars = varsString.split(",");
    vars.forEach(envVar => {
      const value = process.env[envVar] || "";
      core.exportVariable(envVar, value);
    });
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
