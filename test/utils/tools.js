const assert = require('assert');

import { isValidHexAddr } from '../../src/utils/tools';

describe('utils/tools', function() {
    it('isValidHexAddr', function() {
        assert.equal(
            true,
            isValidHexAddr(
                'qlc_3nihnp4a5zf5iq9pz54twp1dmksxnouc4i5k4y6f8gbnkc41p1b5ewm3inpw'
            )
        );
    });
});
