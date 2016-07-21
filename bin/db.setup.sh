#!/bin/sh

echo 'Recreate "test" database...'

psql -U postgres -c 'DROP DATABASE test';
psql -U postgres -c 'CREATE DATABASE test';
psql -U postgres -d test -f sql/test.backup.sql
