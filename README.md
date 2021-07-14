# DATABASE MIGRATION TOOL

The base tool used to build this migration tool is [migrate-mongo](https://www.npmjs.com/package/migrate-mongo).

Migration scripts are, by default, named with a timestamp for the purpose of tracking or sorting changes.

## Creating and Running Migrations

### Creating a migration script

To add a new migration script, use the CLI command

`migrate-mongo create name-of-my-script`

A new file will be created in the /migrations folder with a corresponding timestamp prefixed to the script name. Please do not create these file manually. Go ahead to edit the file by updating the `up` and `down` functions to make the expected changes. You can refer to other scripts to write new ones.

The `up` function is responsible for changing or updating the database schema.

The `down` function is how you go back to the previous database state. It is expected to revert, if possible, the changes done by the `up` function.

- There will be a `changelog` collection in the db which maintains all the migrations from inception. Please do not delete the documents.

### Running a migration script

1. To migrate up, use the command
   `npm run migrate:up`
2. To migrate up, use the command
   `npm run migrate:down`
