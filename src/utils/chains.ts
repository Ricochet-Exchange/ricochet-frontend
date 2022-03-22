const supportedChains = [
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/',
  },
  {
    name: 'Ethereum Ropsten',
    short_name: 'rop',
    chain: 'ETH',
    network: 'ropsten',
    chain_id: 3,
    network_id: 3,
    rpc_url: 'https://ropsten.infura.io/',
  },
  {
    name: 'Ethereum Rinkeby',
    short_name: 'rin',
    chain: 'ETH',
    network: 'rinkeby',
    chain_id: 4,
    network_id: 4,
    rpc_url: 'https://rinkeby.infura.io/',
  },
  {
    name: 'Ethereum Görli',
    short_name: 'gor',
    chain: 'ETH',
    network: 'goerli',
    chain_id: 5,
    network_id: 5,
    rpc_url: 'https://rpc.goerli.mudit.blog/',
  },
  {
    name: 'Ethereum Kovan',
    short_name: 'kov',
    chain: 'ETH',
    network: 'kovan',
    chain_id: 42,
    network_id: 42,
    rpc_url: 'https://kovan.infura.io/',
  },
  {
    name: 'Ethereum Classic Mainnet',
    short_name: 'etc',
    chain: 'ETC',
    network: 'mainnet',
    chain_id: 61,
    network_id: 1,
    rpc_url: 'https://ethereumclassic.network',
  },
  {
    name: 'POA Network Sokol',
    short_name: 'poa',
    chain: 'POA',
    network: 'sokol',
    chain_id: 77,
    network_id: 1,
    rpc_url: 'https://sokol.poa.network',
  },
  {
    name: 'POA Network Core',
    short_name: 'skl',
    chain: 'POA',
    network: 'core',
    chain_id: 99,
    network_id: 2,
    rpc_url: 'https://core.poa.network',
  },
  {
    name: 'xDAI Chain',
    short_name: 'xdai',
    chain: 'xDAI',
    network: 'mainnet',
    chain_id: 100,
    network_id: 1,
    rpc_url: 'https://dai.poa.network',
  },
  {
    name: 'Polygon Network',
    short_name: 'polygon',
    chain: 'Polygon',
    network: 'mainnet',
    chain_id: 1337,
    network_id: 1,
    rpc_url: 'http://127.0.0.1:7545',
  },
  {
    name: 'Polygon Network',
    short_name: 'polygon',
    chain: 'Polygon',
    network: 'mainnet',
    chain_id: 137,
    network_id: 1,
    rpc_url: '',
  },
];

export function getChainData(chainId: any) {
  const chainData = supportedChains.filter(
    (chain) => chain.chain_id === chainId,
  )[0];

  if (!chainData) {
    throw new Error('ChainId missing or not supported');
  }

  const API_KEY = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export default supportedChains;
