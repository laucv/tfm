import {TestBed, async, ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {DialogGameBoard} from './dialog-game-board.component';
import {GameService} from '../../game.service';
import {Color, colorValues} from '../../models/Color';

describe('BoardComponent', () => {
  let component: DialogGameBoard;
  let fixture: ComponentFixture<DialogGameBoard>;
  let testBedService: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DialogGameBoard
      ],
      providers: [
        GameService
      ]
    });
    fixture = TestBed.createComponent(DialogGameBoard);
    component = fixture.componentInstance;
  }));

  it('should instantiate', () => {
    expect(component).toBeDefined();
  });

  it('boardDimension is undefined', inject([GameService], (injectService: GameService) =>{
    expect(component.boardDimension).toBeUndefined();
  }));

  it('ngOnInit() works and boardDimension is initialize', inject([GameService], (injectService: GameService) =>{
    fixture.detectChanges();
    expect(component.boardDimension).toBe(injectService.getBoardView());
  }));

  it('getTurnColor() gets the correct color on init', inject([GameService], (injectService: GameService) =>{
    fixture.detectChanges();
    expect(component.getTurnColor()).toBe(colorValues()[Color.RED]);
  }));
});
