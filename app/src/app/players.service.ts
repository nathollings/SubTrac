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
    await this.getPlayers();
  }

  async getPlayers() {
    const storedPlayers = await this.storage.get('players');
    if (storedPlayers) {
      this.players = storedPlayers.map((p: Player) => new Player(p.name, p.id, p));
    }


    return [...this.players];
  }

   async getPlayer(id: string) {
    await this.getPlayers();
    const player = this.players.find(p => p.id === id);
    if (!player) {
      throw new Error('Player not found');
    }
    return player;
  }

  async addPlayer(player: Player) {
    const newPlayer = new Player(player.name);
    newPlayer.dateOfBirth = player.dateOfBirth;
    newPlayer.gameTime = player.gameTime;
    newPlayer.gamesPlayed = player.gamesPlayed;
    newPlayer.goalsScored = player.goalsScored;

    this.players.push(newPlayer);
    await this.storage.set('players', this.processedPlayers);
  }

  async updatePlayer(id: string, player: Player) {
    const playerIndex = this.players.findIndex(p => p.id === id);
    if (playerIndex !== -1) {
      this.players[playerIndex] = new Player(player.name, id, player);

      await this.storage.set('players', this.processedPlayers);
    }
  }

  async deletePlayer(id: string) {
    this.players = this.players.filter(p => p.id !== id);
    await this.storage.set('players', this.processedPlayers);
  }

  get processedPlayers() {
    return this.players
    .filter(p => !!p.id)
    .map(p => {
      return {
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gameTime: p.gameTime,
        gamesPlayed: p.gamesPlayed,
        goalsScored: p.goalsScored
      };
    });
  }
}
