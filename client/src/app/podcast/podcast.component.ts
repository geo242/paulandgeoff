import { Component, OnInit } from '@angular/core';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-podcast',
  template: `
    <app-episode *ngFor="let episode of episodes" [episode]="episode"></app-episode>`,
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements OnInit {
  public episodes: any[] = [];

  constructor(private episodesService: EpisodesService) { }

  ngOnInit() {
    this.episodesService.list()
        .subscribe((result: any[]) => {
          this.episodes = result;
        });
  }

}
