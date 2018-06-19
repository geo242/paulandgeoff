import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Episode } from '../../interfaces/episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${environment.apiUrl}episodes`)
               .pipe(map((result: any[]) => result
                 .map((data: any) => {
                   data.created_at = new Date(data.created_at);
                   return data;
                 })
               ));
  }

  public show(episodeId: string): Observable<Episode> {
    return this.http.get<Episode>(`${environment.apiUrl}episodes/${episodeId}`)
      .pipe(map((data: any) => {
        data.created_at = new Date(data.created_at);
        return data;
      }));
  }
}
