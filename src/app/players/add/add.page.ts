import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlayerService } from '../../players.service';
import { IonButton } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Player } from 'src/app/models/player.model';

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

  @Input() playerId: string | undefined;

  playerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private playerService: PlayerService
  ) { }



  async ngOnInit() {
    this.playerForm = this.buildPlayerForm();
    if (this.playerId) {
      try {
        const player = await this.playerService.getPlayer(this.playerId);
        this.playerForm = this.buildPlayerForm(player);
      }
      catch (error) {
        this.modalController.dismiss();
      }
    }
  }

  private buildPlayerForm(player?: Player) {
    console.log(player);
    return this.formBuilder.group({
      name: [player ? player.name : '', Validators.required],
      dateOfBirth: [player ? player.dateOfBirth : null],
      gameTime: [player ? player.gameTime : 0],
      gamesPlayed: [player ? player.gamesPlayed : 0],
      goalsScored: [player ? player.goalsScored : 0]
    });
  }

  onSubmit() {
    if (this.playerForm.valid) {
      if(this.playerId) {
        this.playerService.updatePlayer(this.playerId, this.playerForm.value);
      } else {
        this.playerService.addPlayer(this.playerForm.value);
      }
      this.modalController.dismiss();
    }
  }

  onRemove() {
    if (this.playerId) {
      this.playerService.deletePlayer(this.playerId);
      this.modalController.dismiss();
    }
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
