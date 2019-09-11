import * as core from "@actions/core";
import * as github from "@actions/github";
import * as httpm from "typed-rest-client/HttpClient";

const githubToken = core.getInput("githubToken");

class AcstGitHub {
  private token: string;
  rest: github.GitHub;
  constructor(token: string) {
    this.token = token;
    this.rest = new github.GitHub(token);
  }

  async downloadFromUrl(url: string): Promise<httpm.HttpClientResponse> {
    const http = new httpm.HttpClient("acst/github-release-download", [], {
      allowRedirects: true,
      allowRetries: true,
      maxRetries: 3
    });
    url = `${url}?access_token=${this.token}`; //Can't be a header as when a redirect happens we don't reauthenticate
    return http.get(url, {
      Accept: "application/octet-stream"
    });
  }
}

export let GitHub: AcstGitHub = new AcstGitHub(githubToken);
