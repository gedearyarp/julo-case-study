export default class HealthcheckService {
    static checkLiveness() {
        return 'OK';
    }
}
