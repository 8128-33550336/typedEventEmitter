import EventEmitter from "events";

type noUnion<T> = T[] extends (T extends T ? T[] : never) ? T : never;

export type EventType = { [P in string]: unknown[] };

export declare class TypedEventEmitter<E extends EventType> {
    constructor(options?: ConstructorParameters<typeof EventEmitter>[0]);
    emit<T extends keyof E>(event: T, ...args: E[noUnion<T>]): boolean;
    on<T extends keyof E>(event: T, listener: (...args: E[T]) => void): this;
    once<T extends keyof E>(event: T, listener: (...args: E[T]) => void): this;
    off<T extends keyof E>(event: T, listener: (...args: E[T]) => void): this;
}

export type eventTypedEmitter<E extends EventType> = Pick<TypedEventEmitter<E>, 'emit'>;

export type eventTypedAddListener<E extends EventType> = {
    on<T extends keyof E>(event: T, listener: (...args: E[T]) => void): eventTypedAddListener<E>;
    once<T extends keyof E>(event: T, listener: (...args: E[T]) => void): eventTypedAddListener<E>;
    off<T extends keyof E>(event: T, listener: (...args: E[T]) => void): eventTypedAddListener<E>;
};

