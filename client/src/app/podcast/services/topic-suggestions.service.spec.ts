import { TestBed, inject } from '@angular/core/testing';

import { TopicSuggestionsService } from './topic-suggestions.service';

describe('TopicSuggestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicSuggestionsService]
    });
  });

  it('should be created', inject([TopicSuggestionsService], (service: TopicSuggestionsService) => {
    expect(service).toBeTruthy();
  }));
});
