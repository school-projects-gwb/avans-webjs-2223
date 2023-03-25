export default class DOM {
    static create(type) {
        return document.createElement(type);
    }

    static getById(id) {
        return document.getElementById(id);
    }
}