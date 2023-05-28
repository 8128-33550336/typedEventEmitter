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
