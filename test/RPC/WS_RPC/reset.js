const assert = require('assert');
import { wsProvider } from '../../../src/provider/WS';

let WS = new wsProvider({
    timeout: 200
});


let resultCount = 0;
function addResCount() {
    resultCount++;
    if (resultCount ===  1) {
        WS.disconnect();
    }
}

// WS.on('connect', ()=>{
describe('ws_rpc_reset', function () {
    it('reset_timeout_batch_request', function (done) {
        setTimeout(() => {
            WS.reset();
        }, 0);

        WS.batch([
            {
                type: 'request',
                methodName: 'wallet.ListAddress'
            }, {
                type: 'notification',
                methodName: 'wallet.ReloadAndFixAddressFile'
            }, {
                type: 'request',
                methodName: 'wallet.sdsdsd'
            }
        ]).then((res) => {
            addResCount();
            done(res);
        }).catch((err) => {
            addResCount();
            assert.equal(err.message, WS.ERRORS.ABORT().message);
            done();
        });
    });
});
// });