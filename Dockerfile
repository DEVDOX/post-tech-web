# イメージの指定
FROM node:13.12.0-alpine

# コンテナ内で cd /app しているようなもの
WORKDIR /app

# コマンド実行
# linux 最新化,gitのインストール、npm最新化、vue-cli インストール　をしている。
RUN apk update && \
    apk add git && \
    curl -o- -L https://yarnpkg.com/install.sh | sh && \
    yarn

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

ENV HOST 0.0.0.0
EXPOSE 8000
