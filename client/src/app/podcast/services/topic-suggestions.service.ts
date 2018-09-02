import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TopicSuggestion } from '../../../interfaces/topic-suggestion';

@Injectable({
  providedIn: 'root'
})
export class TopicSuggestionsService {
  constructor(private http: HttpClient) { }

  public list(): Observable<TopicSuggestion[]> {
    return this.http.get<TopicSuggestion[]>(`${environment.apiUrl}topic-suggestions`)
               .pipe(map((result: TopicSuggestion[]) => result.map(this.transformTopicSuggestionData)));
  }

  public add(topic: string): Observable<TopicSuggestion> {
    return this.http.post<TopicSuggestion>(`${environment.apiUrl}topic-suggestions`, {topic: topic})
      .pipe(map((result: TopicSuggestion) => this.transformTopicSuggestionData(result)));
  }

  public vote(topicSuggestion: TopicSuggestion): Observable<TopicSuggestion> {
    return this.http.post<TopicSuggestion>(`${environment.apiUrl}topic-suggestions/vote/${topicSuggestion.id}`, {})
               .pipe(map((result: TopicSuggestion) => this.transformTopicSuggestionData(result)));
  }

  private transformTopicSuggestionData = (data: TopicSuggestion): TopicSuggestion => {
    return {...data, createdAt: new Date(data.createdAt), updatedAt: new Date(data.updatedAt), id: data._id};
  }
}
