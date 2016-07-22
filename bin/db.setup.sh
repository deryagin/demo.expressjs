#!/bin/sh

echo 'Recreate "test" database...'

# disconnect other postgres clients: see http://dba.stackexchange.com/a/11895
psql -U postgres -c "UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'test'"
psql -U postgres -c "SELECT pg_terminate_backend(procpid) FROM pg_stat_activity WHERE datname = 'test';"

# recreate test database
psql -U postgres -c "DROP DATABASE test"
psql -U postgres -c "CREATE DATABASE test"

# populate data and fix "order".product column type
psql -U postgres -d test -f sql/test.backup.sql
psql -U postgres -d test -c "ALTER TABLE \"order\" ALTER COLUMN product SET DATA TYPE VARCHAR;"
