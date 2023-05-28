export { EventType, eventTypedEmitter, eventTypedAddListener } from './eventEmitter.d';
import { TypedEventEmitter as TypedEventEmitterV } from './eventEmitter';
import { EventType, TypedEventEmitter as TypedEventEmitterT } from './eventEmitter.d';
export { eventEmitterLogger } from './logger';

export type TypedEventEmitter<E extends EventType> = TypedEventEmitterT<E>;

export const TypedEventEmitter = TypedEventEmitterV as typeof TypedEventEmitterT;
