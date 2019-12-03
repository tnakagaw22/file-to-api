-- Table: public.api_keys

-- DROP TABLE public.api_keys;

CREATE TABLE public.api_keys
(
    api_key character varying(100) COLLATE pg_catalog."default" NOT NULL,
    client_code character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT api_keys_pkey PRIMARY KEY (api_key)
)

TABLESPACE pg_default;

ALTER TABLE public.api_keys
    OWNER to postgres;