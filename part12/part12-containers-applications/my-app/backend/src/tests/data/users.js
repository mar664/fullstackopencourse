const { List, Map } = require('immutable');

const users = [
  {
    username: 'mchan101',
    password: '#gfgfdg456%^',
    name: 'Michael Chan',
  },
  {
    username: 'eqdijkstra6456',
    password: 'fsdhuifsd8',
    name: 'Edsger W. Dijkstra',
  },
  {
    username: 'rmartin5',
    password: 'fdgg5656',
    name: 'Robert C. Martin',
  },
  {
    username: 'jmartin3443',
    password: '@#htfh*',
    name: 'John Martin',
  },
  {
    username: 'First class tests',
    password: 'dsrgf456345$#$%#',
    name: 'Martin Jones',
  },
];

const userList = List(users);
const usersData = userList.map((b) => {
  return Map(b);
});

// Deep copy to ensure original list is not changed
const usersSampleData = (numUsers) => {
  return usersData.slice(0, numUsers).toJS();
};

module.exports = { usersSampleData, usersData };
