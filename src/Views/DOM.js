export default class DOM {
    static create(type) {
        return document.createElement(type);
    }

    static getById(id) {
        return document.getElementById(id);
    }

    static deleteIfExists(id) {
        const existsCheck = DOM.getById(id);
        if (existsCheck) {
            existsCheck.remove();
        }
    }
}