## Getting Started

First, clone this repository:

```bash
git clone https://github.com/develowl/happmobi-api.git
```

## Run docker image

On your terminal, run the commands below:

```bash
  1. docker-compose up -d
```

```bash
  2. cat dump_db.sql | docker exec -i db psql -U postgres
```

## Install Dependencies

Now, install the dependencies:

```bash
npm install
# or
yarn
```

## Commands

- `start:dev`: runs your application on `localhost:3333/api/v1`

## Usage

Open your browser and go to [http://localhost:3333/swagger](http://localhost:3333/swagger) and follow API instructions!

Made with 💜 by [Yan Gonçalves](https://github.com/develowl)
