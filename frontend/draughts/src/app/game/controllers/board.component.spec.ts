import {TestBed, async, ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {BoardComponent} from './board.component';
import {DraughtsService} from '../draughts.service';
import {Color, colorValues} from '../models/Color';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let testBedService: DraughtsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        BoardComponent
      ],
      providers: [
        DraughtsService
      ]
    });
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
  }));

  it('should instantiate', () => {
    expect(component).toBeDefined();
  });

  it('boardDimension is undefined', inject([DraughtsService], (injectService: DraughtsService) =>{
    expect(component.boardDimension).toBeUndefined();
  }));

  it('ngOnInit() works and boardDimension is initialize', inject([DraughtsService], (injectService: DraughtsService) =>{
    fixture.detectChanges();
    expect(component.boardDimension).toBe(injectService.getBoardView());
  }));

  it('getTurnColor() gets the correct color on init', inject([DraughtsService], (injectService: DraughtsService) =>{
    fixture.detectChanges();
    expect(component.getTurnColor()).toBe(colorValues()[Color.RED]);
  }));
});
