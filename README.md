# cypress-aws-athena
Using AthenaExpress to send queries through a Cypress Task

## Auth

Either use the AWS CLI to create some temporary credentials that the aws sdk can detect (check your user ~s3 directory on machine) and use, or get direct access to the target bucket/db and hardcode the credentials in the cypress.config file itself. 

## Usage

> cy.task('sendAthenaQuery', {sql: your query}).then((response) => ...)