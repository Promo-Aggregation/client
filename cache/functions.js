import CacheStore from "react-native-cache-store";

export const get = (name) => {
    return CacheStore.get(name)
}

export const set = (name, value) => {
    return CacheStore.set(name, value)
}

export const purge = (name) => {
    return CacheStore.remove(name)
}

export const flush = async () => {
    await CacheStore.flush()
}