const eventEmitter = {
    listeners: new Map(),

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    },

    emit(event, ...args) {
        if (this.listeners.has(event)) {
            const listeners = this.listeners.get(event);
            for (let i = 0; i < listeners.length; i++) {
                listeners[i].apply(null, args);
            }
        }
    }
};

export default eventEmitter;