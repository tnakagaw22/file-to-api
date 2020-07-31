
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('public.api_keys').del()
    .then(function () {
      // Inserts seed entries
      return knex('public.api_keys').insert([
        {api_key: 'wuIcGYbEpB8EUNHLAsqVK5aIWW6ooCRs3rU7nwfX', client_code: 'demo'},
        {api_key: '64KWTmIOuK4dHf05gqBIu9uoGEbihLMW6gEwEz0s', client_code: 'dev'}
      ]);
    });
};
