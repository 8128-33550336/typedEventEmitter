<samp>
<div align="center">

# typedEventEmitter

</div>
[![publish](https://github.com/8128-33550336/typedEventEmitter/actions/workflows/publish.yml/badge.svg?branch=main&event=push)](https://github.com/8128-33550336/typedEventEmitter/actions/workflows/publish.yml)

Language: [Japanese](./README-ja.md)

# About

This is [`EventEmiter`](https://nodejs.org/dist/latest-v18.x/docs/api/events.html#class-eventemitter) typed with TypeScript

# Install
~/.npmrc
```
@8128-33550336:registry=https://npm.pkg.github.com

//npm.pkg.github.com/:_authToken=YourTokenHere
```

```
$ npm i @8128-33550336/typedeventemitter

```

# Example

## Usage as Parent Class

```ts
class MyClass extends TypedEventEmitter<{
    foo: [value: string];
    bar: [];
    baz: [value: number];
}> {
    constructor() {
        super();
        this.on('baz', num => {
            this.emit('foo', num + '');
            this.emit('bar');
        });
    }
}

const myClass = new MyClass();

myClass.on('foo', value => {
    console.log('foo', value);
});

myClass.on('bar', () => {
    console.log('bar');
});

myClass.emit('baz', 42);
```

## Simple usage

```ts
const myEventEmitter = new TypedEventEmitter();

myEventEmitter.on('baz', num => {
    myEventEmitter.emit('foo', num + '');
    myEventEmitter.emit('bar');
});

myEventEmitter.on('foo', value => {
    console.log('foo', value);
});

myEventEmitter.on('bar', () => {
    console.log('bar');
});

myEventEmitter.emit('baz', 42);
```

# We welcome issues and pull requests.

</samp>
