import { wsProvider } from '../../../src/provider/WS';

let WS = new wsProvider({
    timeout: 200
});


let resultCount = 0;
function addResCount() {
    resultCount++;
    if (resultCount ===  2) {
        WS.disconnect();
    }
}

// WS.on('connect', ()=>{
describe('ws_rpc_notification', function () {
    it('notification_no_method', function (done) {
        let err = WS.notification();
        addResCount();
        done(!err);
    });
    
    it('notification_success', function (done) {
        let err = WS.notification('wallet.ReloadAndFixAddressFile');
        addResCount();
        done(err);
    });
});
// });