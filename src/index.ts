import { getTable } from '@network-utils/arp-lookup'
import { probe } from '@network-utils/tcp-ping'
import { cidrSubnet, fromLong, toLong } from 'ip'

/**
 * Parses a CIDR range into an array of IP addresses.
 * @param cidr An IP range in CIDR Notation
 */
function parseCIDR(cidr: string) {
  const range = cidrSubnet(cidr)
  const start = toLong(range.networkAddress)
  const end = toLong(range.broadcastAddress)
  const out = []

  for (let i = start; i <= end; i++) {
    out.push(fromLong(i))
  }

  return out
}

async function getIPs(range: string) {
  if (range === 'arp') {
    const arpTable = await getTable()
    return arpTable.map(({ ip }) => ip)
  }

  return parseCIDR(range)
}

/**
 * Scans the network for hosts with `port` open.
 * @param port The port to connect to
 * @param range A valid range in CIDR Notation or `"arp"` to limit the scanned hosts to those present on the arp table (faster, but might not find every host)
 * @param timeout The timeout before giving up on any one host
 */
export function scan(port: number, range: string = 'arp', timeout = 200) {
  return new Promise(async resolve => {
    if (port < 1) throw new Error('Negative port')

    const ips = await getIPs(range)

    const connections = []

    for (const IP of ips) {
      ;(ip => {
        connections.push(
          probe(port, ip, timeout).then(open => {
            return { ip, open }
          })
        )
      })(IP)
    }

    const hosts = await Promise.all(connections)
    resolve(hosts.filter(({ open }) => open).map(({ ip }) => ip))
  })
}
