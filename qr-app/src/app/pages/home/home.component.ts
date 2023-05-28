import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { GQrService } from 'src/app/services/g-qr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value:string = ''
  formGroup: FormGroup;
  fechaActual:Date = new Date()
  fechaManana:Date = new Date()

  constructor(private formBuilder: FormBuilder, private gQrService:GQrService) {

    this.formGroup = this.formBuilder.group(
      {
          name: [, [Validators.required]],
          quantityOfScans: [, [Validators.required]],
          expiration: [, [Validators.required]],
      })
   }

  ngOnInit(): void {
    this.fechaManana.setDate(this.fechaActual.getDate() + 1);
  }




  GenerarQr(){
    let body = this.formGroup.value
    this.value = 'hola'
    this.gQrService.postPromotion(body).subscribe(resp => {
      this.value = `http://localhost:4200/Promo/${resp._id}`
      console.log(resp)
      console.log(this.value)
    })
  }
}
