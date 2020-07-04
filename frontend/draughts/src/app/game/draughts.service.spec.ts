import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DraughtsService} from './draughts.service';

describe('DraughtsService', () => {
  let service: DraughtsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [],
      providers: [
        DraughtsService
      ]
    });
    service = TestBed.inject(DraughtsService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
