// In-memory task storage
export const tasks = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the project',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Fix navigation bug',
    description: 'Address the navigation issue in the mobile view',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    title: 'Review pull requests',
    description: 'Check and approve pending PRs from the team',
    completed: false,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];