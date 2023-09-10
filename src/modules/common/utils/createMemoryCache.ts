const createMemoryCache = <V, K = string>() => {
  const cache = new Map();
  const has = (key: K) => {
    return cache.has(key);
  };
  const set = (key: K, value: V) => {
    return cache.set(key, [value, Date.now()]);
  };
  const get = (key: K): V => {
    return cache.get(key)[0];
  };
  const remove = (key: K) => {
    return cache.delete(key);
  };
  const clear = () => {
    return cache.clear();
  };

  const isExpired = (key: K, seconds: number) => {
    const [_, timestamp] = cache.get(key);

    return (Date.now() - timestamp) / 1000 > seconds;
  };
  return {
    cache,
    has,
    set,
    get,
    remove,
    clear,
    isExpired,
  };
};

export default createMemoryCache;
