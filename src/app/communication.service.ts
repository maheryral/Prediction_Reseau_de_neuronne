import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private _nbrunitentre= new BehaviorSubject<any>(0)
  nbrunitentre$=this._nbrunitentre.asObservable();

  private _nbrunitecache= new BehaviorSubject<any>(0)
  nbrunitecache$=this._nbrunitecache.asObservable();

  private _serie= new BehaviorSubject<any>([])
  serie$=this._serie.asObservable();

  private _poids= new BehaviorSubject<any>([[[]]])
  poids$=this._poids.asObservable();
  constructor() { }
   changenbrunitentre(entre:any){  
    this._nbrunitentre.next(entre)
   }
   changenbrunitecache(cache:any){
    this._nbrunitecache.next(cache)
   }
   changeserie(serie:any){
    this._serie.next(serie)
   }
   changepoid(poids:any){
    this._poids.next(poids)
   }
}
