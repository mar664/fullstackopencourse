db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('users');

db.users.insert({
  username: 'jmith1',
  passwordHash: '$2a$10$NmVvJzNPulfPBX9NMi/wXO4sIbAzlrdVSuNffBow.AIXqfSnor3aa',
  name: 'John Smith',
});
