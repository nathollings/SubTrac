import { Injectable } from '@angular/core';
import { Player } from './models/player.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: Player[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.getPlayers();
  }

  async getPlayers() {
    const storedPlayers = await this.storage.get('players');
    if (storedPlayers) {
      this.players = storedPlayers;
    }
    console.log(this.players);

    return [...this.players];
  }

  getPlayer(id: string) {
    return {...this.players.find(p => p.id === id)};
  }

  async addPlayer(name: string) {
    const newPlayer = new Player(name);
    this.players.push(newPlayer);
    await this.storage.set('players', this.players);
  }

  async updatePlayer(id: string, name: string) {
    const playerIndex = this.players.findIndex(p => p.id === id);
    if (playerIndex !== -1) {
      this.players[playerIndex] = new Player(id, name);
      await this.storage.set('players', this.players);
    }
  }

  async deletePlayer(id: string) {
    this.players = this.players.filter(p => p.id !== id);
    await this.storage.set('players', this.players);
  }
}
