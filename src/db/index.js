

import mongoose from "mongoose"
import dns from "node:dns"

const dnsServers = (process.env.DNS_SERVERS || "8.8.8.8,1.1.1.1,8.8.4.4")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
dns.setServers(dnsServers)

export const connectDB = async (uri, { timeoutMs = 15000 } = {}) => {
    return mongoose.connect(uri, {
        serverSelectionTimeoutMS: timeoutMs,
        family: 4,
    })
}

export const disconnectDB = () => mongoose.disconnect() 