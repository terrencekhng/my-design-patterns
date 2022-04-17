interface Pokemon {
  id: string;
  attack: number;
  defense: number;
}

interface BaseRecord {
  id: string;
}

interface DataBase<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T | undefined;
}

// Factory pattern
function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements DataBase<T> {
    private db: Record<string, T> = {};

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string): T | undefined {
      return this.db[id];
    }
  }
  return InMemoryDatabase;
}

const Pokemon = createDatabase<Pokemon>();
const pokemon = new Pokemon();
pokemon.set({
  id: 'Terence',
  attack: 100,
  defense: 50
});
pokemon.set({
  id: 'Esther',
  attack: 120,
  defense: 100
});
console.log(pokemon.get('Terence'));
console.log(pokemon.get('Esther'));
console.log(pokemon.get('Hahaha'));
