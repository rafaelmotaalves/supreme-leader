class Observer {
    constructor() {
        this.events = new Map()
    }

    listen(topic, cb) {
        const oldEvents = this.events.get(topic)
        if (this.events.has(topic)) {
            return this.events.set(topic, [...oldEvents, cb])
        }
        return this.events.set(topic, [cb])
    }

    emit(topic, data) {
        const listeners = this.events.get(topic)
        if (Array.isArray(listeners) && listeners.length) {
            listeners.forEach(event => event(data))
        }
    }
}