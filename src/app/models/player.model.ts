export class Player {
  public id: string = '';
  public dateOfBirth: Date | null = null;
  public gameTime: number = 0;
  public gamesPlayed: number = 0;
  public goalsScored: number = 0;
  public name: string = '';

  constructor(name: string, id: string | null = null, args?: Partial<Player>) {
    this.name = name;
    if (!id) {
      this.id = this.generateId();
    } else {
      this.id = id;
    }
    if (args) {
      Object.assign(this, args);
    }
  }


  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  get age(): number {
    if (!this.dateOfBirth) {
      return 0;
    }
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  get initials(): string {
    const name = this.name.toUpperCase();
    const names = name.split(' ');
    if (names.length === 0) {
      alert('Name is empty');
      return Math.floor(Math.random() * 90 + 10).toString();
    } else {
      console.log(names);
    }
    return names.length > 1 ? names[0].charAt(0) + names[names.length - 1].charAt(0) : names[0].charAt(0);
  }
}
