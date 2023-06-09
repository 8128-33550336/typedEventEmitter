import EventEmitter from "events";

type noUnionInference<T> = T extends T ? T : never;
type small<T, S> = S extends T ? S : T;

type a = noUnionInference<'a' | 'b'>;

export type EventType = { [P in string]: unknown[] };

export declare class TypedEventEmitter<E extends EventType> {
    constructor(options?: ConstructorParameters<typeof EventEmitter>[0]);
    emit<T extends keyof E>(event: T, ...args: E[noUnionInference<small<typeof event, T>>]): boolean;
    on<T extends keyof E>(event: T, listener: ((...args: E[T]) => void) | (() => void)): this;
    once<T extends keyof E>(event: T, listener: ((...args: E[T]) => void) | (() => void)): this;
    off<T extends keyof E>(event: T, listener: ((...args: E[T]) => void) | (() => void)): this;
}

export type eventTypedEmitter<E extends EventType> = Pick<TypedEventEmitter<E>, 'emit'>;

export type eventTypedAddListener<E extends EventType> = {
    on<T extends keyof E>(event: T, listener: ((...args: E[T]) => void) | (() => void)): eventTypedAddListener<E>;
    once<T extends keyof E>(event: T, listener: ((...args: E[T]) => void) | (() => void)): eventTypedAddListener<E>;
    off<T extends keyof E>(event: T, listener: ((...args: E[T]) => void) | (() => void)): eventTypedAddListener<E>;
};

