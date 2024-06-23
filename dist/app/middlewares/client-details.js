"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractClientDetails = void 0;
function extractClientDetails(req, res, next) {
    let ipAddr;
    let proxy;
    const agent = req.headers['user-agent'] || '';
    if (req.headers.via) {
        // yes
        ipAddr = req.headers['x-forwarded-for'];
        proxy = req.headers.via;
    }
    else {
        // no
        ipAddr = req.connection.remoteAddress;
        proxy = 'none';
    }
    req.client = { agent, ipAddr, proxy };
    next();
}
exports.extractClientDetails = extractClientDetails;
