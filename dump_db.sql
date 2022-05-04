--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE happmobi;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:VQ4+CWi2tr209i7gweD+dw==$8iGQ/SE+LoSK6uN+794SGnbHkirffdMx+0BIkFZwycQ=:WJ2JRYMR2LpzuNIfMih6eZZDbboCz2qNVyQc5QlTw7Y=';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "happmobi" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: happmobi; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE happmobi WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE happmobi OWNER TO postgres;

\connect happmobi

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cars" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    license_plate character varying NOT NULL,
    name character varying NOT NULL,
    brand character varying NOT NULL,
    daily_rate integer NOT NULL,
    fine_amount integer NOT NULL,
    available boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public."Cars" OWNER TO postgres;

--
-- Name: Rentals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Rentals" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    start_date timestamp without time zone DEFAULT '2022-05-03 17:20:53.773'::timestamp without time zone NOT NULL,
    end_date timestamp without time zone,
    expeect_end_date timestamp without time zone NOT NULL,
    total integer DEFAULT 0 NOT NULL,
    status character varying DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    id_user uuid,
    id_car uuid
);


ALTER TABLE public."Rentals" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying NOT NULL,
    lastname character varying NOT NULL,
    role character varying DEFAULT 'user'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO postgres;

--
-- Data for Name: Cars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cars" (id, license_plate, name, brand, daily_rate, fine_amount, available, created_at, updated_at, deleted_at) FROM stdin;
0dcbb198-adc2-431f-897b-54f15cf9f2d8	XYZ4321	Corcel	Ford	45	55	t	2022-05-03 17:24:32.090252	2022-05-03 17:24:32.090252	\N
fd0a8564-26a9-4213-bb6e-4376dd10aec4	KLM7654	Gol	Volkswagen	25	33	t	2022-05-03 17:24:55.474101	2022-05-03 17:24:55.474101	\N
b5ef2f05-494d-448c-95d8-84f80efa5dfc	ABC1234	Opala	Chevrolet	30	40	f	2022-05-03 17:24:11.361017	2022-05-03 17:25:35.708851	\N
\.


--
-- Data for Name: Rentals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Rentals" (id, start_date, end_date, expeect_end_date, total, status, created_at, updated_at, deleted_at, id_user, id_car) FROM stdin;
2a5bb5f1-133a-4927-afae-9184aa3cf413	2022-05-03 17:20:53.773	\N	2022-05-20 12:00:00	0	active	2022-05-03 17:25:35.723503	2022-05-03 17:25:35.723503	\N	3f735b25-8d56-4d65-b380-d2bb6b40c2c7	b5ef2f05-494d-448c-95d8-84f80efa5dfc
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, email, password, name, lastname, role, created_at, updated_at, deleted_at) FROM stdin;
3f735b25-8d56-4d65-b380-d2bb6b40c2c7	teste@teste.com	$2b$10$zdmsikttIxLLh364w9N9CuZ/2ykqNUdDD52bMhOEc7iQ1VEo6Bd/m	teste	teste	user	2022-05-03 17:17:09.543211	2022-05-03 17:17:09.543211	\N
08868ee2-1efb-4259-a579-2aa985e90ef8	admin@admin.com	$2b$10$U/JPFnhLm.nS.w2a/Ge8lOBZBLbO6Dq7Vfh4hVJ91AkdqTtQ4V6uu	Admin	Api	admin	2022-05-03 17:15:24.331305	2022-05-03 17:15:24.331305	\N
\.


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Name: Users PK_16d4f7d636df336db11d87413e3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY (id);


--
-- Name: Cars PK_37ee9dbe8c8c8ff70b35afaf2a8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT "PK_37ee9dbe8c8c8ff70b35afaf2a8" PRIMARY KEY (id);


--
-- Name: Rentals PK_8fa88a078d246647375c698d3e0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rentals"
    ADD CONSTRAINT "PK_8fa88a078d246647375c698d3e0" PRIMARY KEY (id);


--
-- Name: Users UQ_3c3ab3f49a87e6ddb607f3c4945; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE (email);


--
-- Name: Cars UQ_410f87a473e8a5d3b2b707b34e8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT "UQ_410f87a473e8a5d3b2b707b34e8" UNIQUE (license_plate);


--
-- Name: Rentals FK_4564782aad075c60f031687b342; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rentals"
    ADD CONSTRAINT "FK_4564782aad075c60f031687b342" FOREIGN KEY (id_car) REFERENCES public."Cars"(id);


--
-- Name: Rentals FK_e7bcd3d152259f022f5e46e4221; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rentals"
    ADD CONSTRAINT "FK_e7bcd3d152259f022f5e46e4221" FOREIGN KEY (id_user) REFERENCES public."Users"(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

