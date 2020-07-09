import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DraughtsModel} from '../models/Draughts.model';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DraughtsService {

  private url: string = 'http://localhost:4600';

  constructor(private http: HttpClient, private userService: UserService) {
  }

  get(){
    return this.http.get<DraughtsModel[]>(this.url + '/draughts');
  }

  getAllByUser(userId: string){
    return this.http.get<DraughtsModel[]>(this.url + '/draughts/user/' + userId);
  }

  post(game_name: string, board: string, turn: number){
    const creator = this.parseJwt()['_id'];
    const game = '{' +
      '"game_name": "' + game_name + '", ' +
      '"board": "' + board + '", ' +
      '"creator": "' + creator + '", ' +
      '"turn":"' + turn + '"}';
    return this.http.post<DraughtsModel>(this.url + '/draughts', JSON.parse(game));
  }

  put(game_name: string, board: string, turn: number){
    const game = '{' +
      '"board": "' + board + '", ' +
      '"turn":"' + turn + '"}';
    return this.http.put<DraughtsModel>(this.url + '/draughts/' + game_name, JSON.parse(game));
  }

  parseJwt () {
    const token = this.userService.getToken();
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
