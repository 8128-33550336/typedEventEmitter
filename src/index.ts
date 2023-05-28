export { EventType, eventTypedEmitter, eventTypedAddListener } from './eventEmitter.d';
import { TypedEventEmitter as TypedEventEmitterV } from './eventEmitter';
import { EventType, TypedEventEmitter as TypedEventEmitterT } from './eventEmitter.d';
export { eventEmitterLogger } from './logger';

export const TypedEventEmitter = TypedEventEmitterV;
export type TypedEventEmitter<E extends EventType> = TypedEventEmitterT<E>;
