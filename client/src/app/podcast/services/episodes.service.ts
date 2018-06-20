import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Episode } from '../../../interfaces/episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${environment.apiUrl}episodes`)
               .pipe(map((result: any[]) => result
                 .map(this.transformEpisodeData)
               ));
  }

  public show(episodeId: string): Observable<Episode> {
    return this.http.get<Episode>(`${environment.apiUrl}episodes/${episodeId}`)
               .pipe(map(this.transformEpisodeData));
  }

  public updateShowNotes(episodeId: number, newShowNotes: string): Observable<Episode> {
    return this.http.put<Episode>(`${environment.apiUrl}episodes/${episodeId}`, {
      showNotes: newShowNotes
    })
               .pipe(map(this.transformEpisodeData))
  }

  private transformEpisodeData = (data: any = {}): Episode => {
    data.created_at = new Date(data.created_at);
    return data;
  }
}
