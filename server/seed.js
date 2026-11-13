require('dotenv').config();
const mongoose = require('mongoose');
const { Project } = require('./models');

const projects = [
  {
    title: 'Project One',
    description: 'One or two lines on what it does and the problem it solves.',
    tech: ['React', 'Node.js', 'MongoDB'],
    live: 'https://example.com',
    repo: 'https://github.com/YOUR_USERNAME/project-one',
    order: 1,
  },
  {
    title: 'Project Two',
    description: 'One or two lines on what it does and the problem it solves.',
    tech: ['JavaScript', 'Express'],
    live: '',
    repo: 'https://github.com/YOUR_USERNAME/project-two',
    order: 2,
  },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log('Seeded', projects.length, 'projects');
  process.exit();
})();