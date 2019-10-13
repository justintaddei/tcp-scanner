# TCP-Scanner

![](https://img.shields.io/travis/justintaddei/tcp-scanner.svg?style=flat)
![](https://img.shields.io/github/issues-raw/justintaddei/tcp-scanner.svg?style=flat)
![](https://img.shields.io/npm/v/@network-utils/tcp-scanner.svg?style=flat)
![](https://img.shields.io/npm/dt/@network-utils/tcp-scanner.svg?style=flat)
![](https://img.shields.io/npm/l/@network-utils/tcp-scanner.svg?style=flat)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
![](https://img.shields.io/github/languages/top/justintaddei/tcp-scanner.svg?colorB=blue&style=flat)
![](https://img.shields.io/badge/status-awesome-red.svg?style=flat)

A dead simple promise-based TCP scanner, written in Typescript.

## Installation

```bash
$ npm install @network-utils/tcp-scanner --save
```

## Usage

### `scan(port: number, range?: string, timeout?: number): Promise<string[]>`

Scans the network for hosts with `port` open.

`port` The port to connect to.  
`range` A CIDR range or `"arp"` to limit the scan to the system's arp table  
`timeout` The timeout for each TCP connection. Defaults to `200ms`

**Throws** an `invalid CIDR subnet` error if `range` is not a CIDR range or the string `"arp"`  
**Throws** a `"Negative port"` error if `port < 1`.

---

## Testing

```bash
$ git clone https://github.com/justintaddei/tcp-scanner.git
$ cd tcp-scanner
$ npm install
$ npm test
```

## License

MIT
