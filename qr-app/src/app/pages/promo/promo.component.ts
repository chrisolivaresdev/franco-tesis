import { Component, Inject , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { GQrService } from 'src/app/services/g-qr.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
  providers: [
    { provide: DOCUMENT, useValue: document }
    // Otros proveedores
  ],
})
export class PromoComponent implements OnInit {
  reclamar:boolean = true
  idPromo!:string
  promo:any
  NotexistPromo:any

  linkVisited:boolean
  constructor(private gQrService:GQrService, private ActivateRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document)  { }

  ngOnInit(): void {
    this.ActivateRoute.params.subscribe({
      next: ({ id }) => {
        this.idPromo = id
        this.getPromoById(this.idPromo)
      }
    });

  }

  getPromoById(id:string){
    this.gQrService.GetById(id).subscribe({
      next: (resp) => {
        console.log(resp)
        this.promo = resp

        const linkVisited = this.checkCookieExists(this.promo.name);
        console.log(linkVisited)
      },
      error: (error) => {
        console.log(error)
        this.NotexistPromo = "No existe la promoción"
      }
    })
  }

  claim(id:string){
    this.gQrService.PostById(id).subscribe(resp=> {
      this.reclamar = false
      this.promo = resp
      this.setLinkVisitedCookie(this.promo.name)
    })
  }

  checkCookieExists(cookieName: string): boolean {
    const cookies = this.document.cookie.split(';');
    return cookies.some(cookie => cookie.trim().startsWith(cookieName + '='));
  }

  setLinkVisitedCookie(cookieName: string) {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    this.document.cookie = cookieName + '=true; expires=' + expirationDate.toUTCString();
  }

}
