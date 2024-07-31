import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../players.service';
import { Player } from '../models/player.model';
import { ModalController } from '@ionic/angular';
import { AddPage } from '../players/add/add.page';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonFooter, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
  providers: [PlayerService, ModalController],
  standalone: true,
  imports: [IonButton, IonFooter, IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PlayersPage implements OnInit {

  players: Player[] = [];

  constructor(
    private playerService: PlayerService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getPlayers();
  }

  async openAddPlayerModal() {
    const modal = await this.modalController.create({
      component: AddPage,
      cssClass: 'full height'
    });

    await modal.present();

    modal.onDidDismiss().then(() => {
      this.getPlayers();
    });
  }

  async openPlayerOptionsDropdown(playerId: string) {
    const modal = await this.modalController.create({
      component: AddPage,
      componentProps: {
        playerId
      }
    });

    await modal.present();

    modal.onDidDismiss().then(() => {
      this.getPlayers();
    });
  }

  removePlayer(playerId: string) {
    this.playerService.deletePlayer(playerId);
  }

  async getPlayers() {
    this.players = await this.playerService.getPlayers();
  }



}
