import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DraughtsModel} from '../models/Draughts.model';

@Injectable({
  providedIn: 'root',
})
export class DraughtsService {

  private url: string = 'http://localhost:4600';

  constructor(private http: HttpClient) {
  }

  get(){
    return this.http.get<DraughtsModel[]>(this.url + '/draughts');
  }

  getOne(game_name: string){
    return this.http.get<DraughtsModel>(this.url + '/draughts/' + game_name);
  }

  post(game_name: string, board: string, turn: number){
    const creator = "5ecfc2db3b672506e025c4bb";
    const game = '{' +
      '"game_name": "' + game_name + '", ' +
      '"board": "' + board + '", ' +
      '"creator": "' + creator + '", ' +
      '"turn":"' + turn + '"}';
    return this.http.post<DraughtsModel>(this.url + '/draughts', JSON.parse(game));
  }

  put(game_name: string, board: string, turn: number){
    const id = "5f04a0c57828a32750dbd055";
    const game = '{' +
      '"board": "' + board + '", ' +
      '"turn":"' + turn + '"}';
    return this.http.put<DraughtsModel>(this.url + '/draughts/' + game_name, JSON.parse(game));
  }
}
