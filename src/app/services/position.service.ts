import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private positionUrl = 'https://crud-empresa-funcionario.azurewebsites.net/api/Position';

  constructor(private http: HttpClient) { }

  public get(): Observable<Position[]> {
    return this.http.get<Position[]>(this.positionUrl);
  }
}
