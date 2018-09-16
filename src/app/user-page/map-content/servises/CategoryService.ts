import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Category} from '../classes/Category';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = 'http://localhost:8080/categories';
  constructor( private http: HttpClient) { }

  public httpGetCategories(): Observable<Category[]> {
    console.log('send Get request categoryies');
    return this.http.get(this.url).pipe(map(value => value as Category[]));
  }

}
