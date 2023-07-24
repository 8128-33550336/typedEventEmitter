import { test } from 'node:test';
import { TypedEventEmitter, EventType, eventTypedEmitter, eventTypedAddListener, eventEmitterLogger } from './index';
import assert from 'node:assert';
import { EventEmitter } from 'node:stream';

test('basic', (t, done) => {
    const ee = new TypedEventEmitter<{
        a: [name: 'b'];
        c: [name: 'd'];
    }>();
    ee.on('a', (name) => {
        assert.strictEqual(name, 'b');
        done();
    });

    const a: eventTypedEmitter<{
        a: [name: 'b'];
        c: [name: 'd'];
    }> = ee;

    a.emit('a', 'b');
    a.emit('a' as 'a' | 'c', 'b' as 'b' | 'd');
    //a.emit('a', 'd');
});

test('EventType test', (t) => {
    const tuple = <T extends unknown[]>(arg: [...T]): T => arg;
    const types = tuple([
        {},
        { ab: tuple([]) },
        { ab: tuple(['a']) },
        { a: tuple([]), b: tuple([]) },
        { a: tuple(['a']), b: tuple([]) },
        { a: tuple(['a']), b: tuple(['a']) },
        { a: tuple(['ab', 'cd', 'ef']) },
        { a: tuple(['ab', 0, 1, () => 0]) },
        { a: tuple(['ab', 0, tuple([tuple([])]), () => 0]) },
        { a: tuple(['a', (arg: number) => arg]) },
    ]);
    const et: EventType[] = types;
});

const k = ['a', 'b', 'c'] as const;
type j = { [P in typeof k extends readonly (infer T)[] ? T : never]: [name: P] } & { keydown: [name: string]; };

type noUnionInference<T> = T extends T ? T : never;

const ee = new TypedEventEmitter<j>();
const a: keyof j = 'b' as keyof j;
ee.emit(a, a);
//ee.emit('a', 'b');

type small<T, S> = S extends T ? S : T;

const em = <T extends keyof j>(f: T, ...s: j[noUnionInference<small<typeof f, T>>]) => f;
em('a' as 'a' | 'b', 'b' as 'a' | 'b');
//em('a', 'b');

const ee2 = new TypedEventEmitter<{ [P in 'a' | 'b']: [name: P] } & { keydown: [name: string]; }>();
//ee2.emit('a', 'c');










type type1 = { [P in 'hoge']: [P] };
type sequenceType2 = { hoge: ['hoge']; };


const ee3 = new TypedEventEmitter<type1>();

ee3.on('hoge', () => {

});

ee3.on<'hoge'>('hoge', () => {

});

ee3.on('hoge', (a) => {

});
const ee4 = new TypedEventEmitter<sequenceType2>();
ee4.on('hoge', () => {

});

ee4.on<'hoge'>('hoge', () => {

});

ee4.on('hoge', (a) => {

});

function like1<T extends keyof type1>(event: T, listener: (...args: type1[T]) => void) {

};

//like1('hoge', () => { });
function like2<T extends 'hoge'>(event: T, listener: (...args: type1[T]) => void) {

};

//like2('hoge', () => { });
like2('hoge', (a) => { });
function like5<T extends 'hoge'>(event: T, listener: ((...args: type1[T] | []) => void)) {
    listener('hoge');
};

like5('hoge', () => { });
//like5('hoge', (a) => { });
function like4<T extends 'hoge'>(event: T, listener: ((...args: type1[T]) => void) | (() => void)) {
    listener('hoge');
};

like4('hoge', () => { });
like4('hoge', (a) => { });
function like3<T extends 'hoge'>(event: T, listener: (args: type1[T]) => void) {

};

like3('hoge', () => { });

{
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
}
EventEmitter
{
    const myEventEmitter = new TypedEventEmitter<{
        hoge: [string];
        fuga: [];
        piyo: [number];
    }>();

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
}
