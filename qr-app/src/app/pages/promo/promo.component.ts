import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GQrService } from 'src/app/services/g-qr.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {
  reclamar:boolean = true
  idPromo!:string
  promo:any
  constructor(private gQrService:GQrService, private ActivateRoute: ActivatedRoute, )  { }

  ngOnInit(): void {
    this.ActivateRoute.params.subscribe({
      next: ({ id }) => {
        this.idPromo = id
        this.getPromoById(this.idPromo)
      },
    });
  }


  getPromoById(id:string){
    this.gQrService.PostById(id).subscribe(resp=> {
      console.log(resp)
      this.reclamar = false
      this.promo = resp
    })
  }

}
