import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSuccessComponent } from './video-success.component';

describe('VideoSuccessComponent', () => {
  let component: VideoSuccessComponent;
  let fixture: ComponentFixture<VideoSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
