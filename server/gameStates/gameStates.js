const initialGameState = {
    player: {
      name: 'Hero',
      location: 'Village',
      inventory: [],
      stats: {
        strength: 10,
        intelligence: 10,
      },
    },
    world: {
      locations: [
        { name: 'Village', description: 'A small village with friendly inhabitants.' },
        { name: 'Forest', description: 'A dense forest filled with mysterious creatures.' },
        { name: 'Castle', description: 'A grand castle with tall towers.' },
      ],
      npcs: [
        { name: 'Old Man', location: 'Village', role: 'Quest Giver' },
        { name: 'Guard', location: 'Castle', role: 'Guard' },
      ],
      quests: [
        { id: 1, name: 'Find the Lost Sword', location: 'Forest', reward: 'Gold' },
      ],
    },
  };
  
  module.exports = { initialGameState };
  