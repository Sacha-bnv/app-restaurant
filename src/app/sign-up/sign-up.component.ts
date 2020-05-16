import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NotificationsComponent } from '../notifications/notifications.component'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _adapter: DateAdapter<any>) {
    this._adapter.setLocale('fr');
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      premierCtrl: ['', Validators.required],
      deuxiemeCtrl: ['', Validators.required],
      troisiemeCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      premierCtrl: ['', Validators.required],
      deuxiemeCtrl: ['', Validators.required],
      troisiemeCtrl: ['', Validators.required]
    });
  }

}
