import { test } from 'node:test';
import { TypedEventEmitter, EventType, eventTypedEmitter, eventTypedAddListener, eventEmitterLogger } from './index';
import assert from 'node:assert';

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
