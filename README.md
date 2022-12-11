# README

## Getting Started

### Create `.env`

```
DATABASE_URL="postgresql://root:secret@localhost:5432/postgres?schema=public"
```

### DB（Postgres）の構築

起動

```sh
docker-compose up
```

デーブルの作成

```sh
npx prisma db push
```

### アプリの起動

```sh
yarn dev
```

### prisma studio の起動

```sh
prisma studio
```
