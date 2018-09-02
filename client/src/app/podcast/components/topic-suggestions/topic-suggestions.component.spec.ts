import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSuggestionsComponent } from './topic-suggestions.component';

describe('TopicSuggestionsComponent', () => {
  let component: TopicSuggestionsComponent;
  let fixture: ComponentFixture<TopicSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
