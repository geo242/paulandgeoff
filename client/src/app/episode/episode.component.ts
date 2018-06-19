import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Episode } from '../../interfaces/episode';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-episode',
  template: `
    <mat-card [style.background-image]="backgroundImageCSS">
      <h2>{{episode.created_at | date: 'shortDate'}} | {{episode.title}} |
        {{episode.duration | date: 'H:mm:ss' : '+0000'}}</h2>
      <!--<img class="waveform" [src]="episode.waveform_url" alt="">-->
      <p>{{episode.description}}</p>
      <section [hidden]="!episode.showNotesHTML">
        <h3>Show Notes</h3>
        <div [innerHTML]="episode.showNotesHTML"></div>
      </section>
    </mat-card>`,
  styleUrls: ['./episode.component.scss'],
  host: {
    'class': 'episode'
  }
})
export class EpisodeComponent implements OnChanges {
  @Input()
  public episode: Episode;
  public backgroundImageCSS: string;

  constructor(private episodesService: EpisodesService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.episode && !!changes.episode.currentValue) {
      this.episodesService.show(changes.episode.currentValue.id)
          .subscribe((result: Episode) => this.episode = result);
      this.backgroundImageCSS = `url(${changes.episode.currentValue.waveform_url})`
    }
  }
}
