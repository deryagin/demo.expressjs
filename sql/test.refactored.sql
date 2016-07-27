CREATE SEQUENCE product_id_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE product(
  id INTEGER NOT NULL DEFAULT nextval('product_id_seq'),
  name VARCHAR NOT NULL,
  CONSTRAINT product_id_pk PRIMARY KEY (id)
);
COMMENT ON TABLE product IS 'Product feature descriptions.';
COMMENT ON COLUMN product.id IS 'Primary key.';
COMMENT ON COLUMN product.name IS 'Name.';
INSERT INTO product VALUES
  (1, 'product1'),
  (2, 'product2'),
  (3, 'product3'),
  (4, 'product4'),
  (5, 'product5'),
  (6, 'product6'),
  (7, 'product7');
SELECT pg_catalog.setval('product_id_seq', 7, true);


CREATE SEQUENCE provider_id_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE provider(
  id INTEGER NOT NULL DEFAULT nextval('provider_id_seq'),
  name VARCHAR NOT NULL,
  credit INTEGER DEFAULT 0,
  CONSTRAINT provider_id_pk PRIMARY KEY (id),
  CONSTRAINT provider_credit_check CHECK (0 <= credit)
);
COMMENT ON TABLE provider IS 'Provider description and credit.';
COMMENT ON COLUMN provider.id IS 'Primary key.';
COMMENT ON COLUMN provider.name IS 'Name.';
COMMENT ON COLUMN provider.credit IS 'Money for writing off.';
INSERT INTO provider VALUES
  (1, 'provider1', 1000000),
  (2, 'provider2', 1000000),
  (3, 'provider3', 197),
  (4, 'provider4', 1000000),
  (5, 'provider5', 1000000),
  (6, 'provider6', 1000000);
SELECT pg_catalog.setval('provider_id_seq', 6, true);


CREATE SEQUENCE offer_id_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE offer(
  id INTEGER NOT NULL DEFAULT nextval('offer_id_seq'),
  product_id INTEGER NOT NULL,
  provider_id INTEGER NOT NULL,
  price INTEGER DEFAULT 1,
  CONSTRAINT offer_id_pk PRIMARY KEY (id),
  CONSTRAINT offer_price_check CHECK (0 < price)
);
CREATE INDEX offer_product_id_idx ON offer (product_id);
CREATE INDEX offer_provider_id_idx ON offer (provider_id);
COMMENT ON TABLE offer IS 'Product offers from various prividers.';
COMMENT ON COLUMN offer.id IS 'Primary key.';
COMMENT ON COLUMN offer.product_id IS 'FK to product.product_id.';
COMMENT ON COLUMN offer.provider_id IS 'FK to provider.provider_id.';
COMMENT ON COLUMN offer.price IS 'Cost of the product from a given provider.';
INSERT INTO offer VALUES
  (1, 1, 1, 100),
  (2, 1, 2, 101),
  (3, 1, 3, 99),
  (4, 2, 1, 102),
  (5, 2, 2, 101),
  (6, 3, 1, 101),
  (7, 3, 2, 100),
  (8, 3, 5, 100),
  (9, 4, 4, 50),
  (10, 4, 5, 100),
  (11, 5, 2, 100),
  (12, 5, 3, 10),
  (13, 5, 4, 100),
  (14, 5, 5, 10),
  (15, 6, 6, 60),
  (16, 7, 6, 100),
  (17, 7, 6, 99),
  (18, 8, 6, 100);
SELECT pg_catalog.setval('offer_id_seq', 18, true);


CREATE SEQUENCE booking_id_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE booking(
  id INTEGER NOT NULL DEFAULT nextval('booking_id_seq'),
  offer_id INTEGER NOT NULL,
  datetime TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
  CONSTRAINT booking_id_pk PRIMARY KEY (id)
);
COMMENT ON TABLE booking IS 'Orders of a concrete product.';
COMMENT ON COLUMN booking.id IS 'Primary key.';
COMMENT ON COLUMN booking.offer_id IS 'FK to offer.offer_id.';
COMMENT ON COLUMN booking.datetime IS 'Booking timestamp ar UTC.';
