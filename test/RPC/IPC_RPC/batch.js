import ipcProvider from 'provider/IPC_RPC';

const IPC_RPC = new ipcProvider({
    path: '/Users/sisi/viteisbest/vite.ipc',
    timeout: 3000
});

let resultCount = 0;
function addResCount() {
    resultCount++;
    if (resultCount ===  4) {
        IPC_RPC.disconnect();
    }
}

// IPC_RPC.on('connect', ()=>{
describe('ipc_rpc_batch', function () {
    it('batch_no_requests', function (done) {
        IPC_RPC.batch().then(() => {
            addResCount();
            done('the test case don\'t have param \'methodName\', should return error, but now, return success.');
        }).catch(() => {
            addResCount();
            done();
        });
    });

    it('batch_requests_no_length', function (done) {
        IPC_RPC.batch([]).then(() => {
            addResCount();
            done('the test case don\'t have param \'methodName\', should return error, but now, return success.');
        }).catch(() => {
            addResCount();
            done();
        });
    });

    it('batch_requests_all_request_all_success', function (done) {
        IPC_RPC.batch([
            {
                type: 'request',
                methodName: 'wallet_listAddress'
            }, {
                type: 'notification',
                methodName: 'wallet_reloadAndFixAddressFile'
            }, {
                type: 'request',
                methodName: 'wallet_status'
            }
        ]).then(() => {
            addResCount();
            done();
        }).catch((err) => {
            addResCount();
            done(err);
        });
    });

    it('batch_requests_all_notification_all_success', function (done) {
        let err = IPC_RPC.batch([
            {
                type: 'notification',                    
                methodName: 'wallet_reloadAndFixAddressFile'
            }, {
                type: 'notification',
                methodName: 'wallet_reloadAndFixAddressFile'
            }, {
                type: 'notification',
                methodName: 'wallet_reloadAndFixAddressFile'
            }
        ]);
        addResCount();
        done(err);
    });
});
// });