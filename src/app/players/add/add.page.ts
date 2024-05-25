import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlayerService } from '../../players.service';
import { IonButton } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  providers: [PlayerService, ModalController, FormBuilder],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AddPage implements OnInit {
  playerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.playerForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.playerForm.valid) {
      this.playerService.addPlayer(this.playerForm.value.name);
      this.modalController.dismiss();
    }
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
