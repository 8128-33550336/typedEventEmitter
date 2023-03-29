<samp>
<div align="center">

# typedEventEmitter

</div>
[![publish](https://github.com/8128-33550336/typedEventEmitter/actions/workflows/publish.yml/badge.svg?branch=main&event=push)](https://github.com/8128-33550336/typedEventEmitter/actions/workflows/publish.yml)

Language: [English](./README.md)

# これはなに?

[`EventEmiter`](https://nodejs.org/dist/latest-v18.x/docs/api/events.html#class-eventemitter) をTypeScriptで使いやすくするためのものです。

# インストール
~/.npmrc
```
@8128-33550336:registry=https://npm.pkg.github.com

//npm.pkg.github.com/:_authToken=あなたのトークン
```

```
$ npm i @8128-33550336/typedeventemitter

```

# 使い方

## 親Classとして

```ts
class MyClass extends TypedEventEmitter<{
    hoge: [value: string];
    fuga: [];
    piyo: [value: number];
}> {
    constructor() {
        super();
        this.on('piyo', num => {
            this.emit('hoge', num + '');
            this.emit('fuga');
        });
    }
}

const myClass = new MyClass();

myClass.on('hoge', value => {
    console.log('hoge', value);
});

myClass.on('fuga', () => {
    console.log('fuga');
});

myClass.emit('piyo', 42);
```

## シンプルに使う

```ts
const myEventEmitter = new TypedEventEmitter();

myEventEmitter.on('piyo', num => {
    myEventEmitter.emit('hoge', num + '');
    myEventEmitter.emit('fuga');
});

myEventEmitter.on('hoge', value => {
    console.log('hoge', value);
});

myEventEmitter.on('fuga', () => {
    console.log('fuga');
});

myEventEmitter.emit('piyo', 42);
```

# 最後に

ぜひ使ってください

IssueやPullRequestを歓迎します。

</samp>
