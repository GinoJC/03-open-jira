interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: 'pending' | 'in-progress' | 'finished';
  createdAt: number;
}

const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: this is a first description',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'En progregso: this is a second description',
      status: 'in-progress',
      createdAt: Date.now() - 100000,
    },
    {
      description: 'Terminada: this is a third description',
      status: 'finished',
      createdAt: Date.now() - 500000,
    },
  ],
};

export default seedData;
