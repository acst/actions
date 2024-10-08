import * as core from "@actions/core";
import * as installer from "./installer";

async function run() {
  try {
    const version = core.getInput("version");
    await installer.getTerraform(version);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
