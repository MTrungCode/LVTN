const config = {
    app: {
        port: process.env.port || 5000,
    },
    default: {
        vnp_TmnCode: "DXEWQZUU",
        vnp_HashSecret: "RRRCEEPAROWOVDTKQYWTVNHDREPPIECE",
        vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
        vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
        vnp_ReturnUrl: "http://localhost:3000/vnpayReturn"
    }
};

module.exports = config;