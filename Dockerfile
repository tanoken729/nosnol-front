# ビルド環境
FROM node:lts-alpine as build-stage
# カレントワーキングディレクトリとして 'app' フォルダを指定する
WORKDIR /app
# `package.json` と `package-lock.json` （あれば）を両方コピーする
COPY package*.json ./
# プロジェクトの依存ライブラリをインストールする
RUN npm install
# カレントワーキングディレクトリ(つまり 'app' フォルダ)にプロジェクトのファイルやフォルダをコピーする
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]