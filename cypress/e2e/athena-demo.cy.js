describe('Athena', () => {
  it('Successfully queries S3 data using Athena', () => {
    cy.task('sendAthenaQuery', { sql: `SELECT * FROM table WHERE user_id = '123'` }).then(
      (result) => {
        // .. do stuff with response
      }
    );
  });
});
