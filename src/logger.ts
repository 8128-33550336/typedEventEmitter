import { eventTypedEmitter, EventType } from "./eventEmitter.d";

export function eventEmitterLogger<T extends eventTypedEmitter<EventType>>(ee: T, logger: typeof console.log = console.log) {
    const defaultEmit = ee.emit.bind(ee);

    ee.emit = (type, ...arg) => {
        logger(`event emitter emitted. type: `, JSON.stringify(type), `, data: `, ...arg);
        return defaultEmit(type, ...arg);;
    };
    return ee;
}
