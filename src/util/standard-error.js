export default class StandardError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
