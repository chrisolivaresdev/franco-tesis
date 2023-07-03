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
  nameValue:boolean = false
  descriptionValue:boolean = false
  quantityOfScansValue:boolean = false
  expirationValue:boolean = false

  constructor(private formBuilder: FormBuilder, private gQrService:GQrService) {

    this.formGroup = this.formBuilder.group(
      {
          name: [, [Validators.required]],
          description: [, [Validators.required]],
          quantityOfScans: [, [Validators.required]],
          expiration: [, [Validators.required]],
      })
   }

  ngOnInit(): void {
    this.fechaManana.setDate(this.fechaActual.getDate() + 1);


    this.formGroup.get('name')?.valueChanges.subscribe( resp => {
      if(resp.trim().length > 0) {
        this.nameValue = true
      }else {
        this.nameValue = false
        this.resetDescription()
      }
    })

    this.formGroup.get('description')?.valueChanges.subscribe( resp => {
      if(resp.trim().length > 0) {
        this.descriptionValue = true
      }else {
        this.descriptionValue = false
        this.resetQuantityOfScans()
      }
    })

    this.formGroup.get('quantityOfScans')?.valueChanges.subscribe( resp => {
      console.log(resp)
      if(resp > 0) {
        this.quantityOfScansValue = true
      }else {
        this.quantityOfScansValue = false
        this.resetExpiration()
      }
    })

    this.formGroup.get('expiration')?.valueChanges.subscribe( resp => {
      if(resp) {
        this.expirationValue = true
      }else {
        this.expirationValue = false
      }
    })

  }

  resetDescription() {
    this.formGroup.patchValue({ description: '' });
  }

  resetQuantityOfScans() {
    this.formGroup.patchValue({ quantityOfScans: '' });
  }

  resetExpiration() {
    this.formGroup.patchValue({ expiration: '' });
  }

  resetForm(){
    this.formGroup.patchValue({  name: '',
      description: '',
      quantityOfScans: '',
      expiration: ''});
  }

  GenerarQr(){
    let body = this.formGroup.value
    this.value = 'hola'
    this.gQrService.postPromotion(body).subscribe(resp => {
      this.value = `http://localhost:4200/Promo/${resp._id}`
      this.resetForm()
    })
  }
}
