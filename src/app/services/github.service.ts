import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Repository } from '../models/repository';
import { Issue } from '../models/issue';
import { HttpService } from './http.service';

@Injectable()
export class GithubService {

  private endpoint: string = 'https://api.github.com';

  constructor(
    private httpService: HttpService
  ) {}

  /**
   * Get popular repositories
   * @return {Observable}
   */
  public getRepositories(): Observable<any> {
    let results = this.httpService.getUrl(`${this.endpoint}/search/repositories?q=user:threesquared&sort=stars&order=desc&per_page=5`);
    return this.httpService.mapResults(results, this.hydrateRepository);
  }

  /**
   * Get latest pull requests
   * @return {Observable}
   */
  public getPullRequests(): Observable<any> {
    let results = this.httpService.getUrl(`${this.endpoint}/search/issues?q=author:threesquared type:pr is:public state:closed&sort=created&order=desc&per_page=5`);
    return this.httpService.mapResults(results, this.hydrateIssue);
  }

  /**
   * Create a new Repository from data
   * @param  {Array} data
   * @return {Repository}
   */
  private hydrateRepository(data: { id; name; html_url; description; }): Repository {
    return new Repository(data.id, data.name, data.html_url, data.description);
  }

  /**
   * Create a new Issue from data
   * @param  {Array} data
   * @return {Issue}
   */
  private hydrateIssue(data: { title; html_url; }): Issue {
    return new Issue(data.title, data.html_url);
  }

}
