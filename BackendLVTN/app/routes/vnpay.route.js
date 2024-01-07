const express = require("express");
const vnpays = require("../controllers/vnpay.controller");

const router = express.Router();

router.route('/create_payment_url')
    .post(vnpays.createPaymentUrl);
    
router.route('/querydr')
    .get(vnpays.queryDr)
    .post(vnpays.queryDrs);

router.route('/refund')
    .get(vnpays.refund)
    .post(vnpays.refunds);

router.route('/vnpay_return')
    .get(vnpays.vnpayReturn);

router.route('/vnpay_ipn')
    .get(vnpays.vnpayIpn);

module.exports = router;