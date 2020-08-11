class GithubApi {
  constructor(config) {
    this._perPage = config.perPage;
    this._apiURL = config.apiURL;
    this._user = config.user;
    this._reposName = config.reposName;
  }

  getCommits = () => {
    return fetch(`${this._apiURL}/repos/${this._user}/${this._reposName}/commits?per_page=${this._perPage}`, {
      method: 'GET',
    }).then((res) => res.json())
  }
}

export default GithubApi;
