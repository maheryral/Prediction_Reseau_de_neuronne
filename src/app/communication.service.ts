import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  
  constructor() { }
   valuexy (x0:any, y0:any, n:any){
    const a= 1.4;
    const b= 0.3;
    let XY = [];
    let xn = [x0];
    let yn= [y0];
    
  
    for (let i = 0; i < n; i++) {

         xn[i+1] = yn[i] + 1 - a * xn[i] ** 2;
         xn[i+1]=parseFloat(xn[i+1].toFixed(8))
         yn[i+1] = b * xn[i];
         yn[i+1]=parseFloat(yn[i+1].toFixed(8))
    }
  
       XY=[xn,yn]
    return XY;
};
}
