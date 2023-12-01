import { PORTKEY_HEADER_PREFIX } from "./constants";

type PlatformProperties = {
	"x-portkey-runtime"?: string,
	"x-portkey-runtime-version"?: string,
}
export const getPlatformProperties = (): PlatformProperties => {
	if (Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]") {
		return {
			[`${PORTKEY_HEADER_PREFIX}runtime`]: "node",
			[`${PORTKEY_HEADER_PREFIX}runtime-version`]: process.version,
		};
	}
	return {}
}


export const readEnv = (env: string): string | undefined => {
	if (typeof process !== "undefined") {
		return process.env?.[env] ?? undefined;
	}
	return undefined;
};

export const castToError = (err: any): Error => {
	if (err instanceof Error) return err;
	return new Error(err);
};


export const getPortkeyHeader = (key: string): string => {
	return `${PORTKEY_HEADER_PREFIX}${key}`
}

type Config = Record<string, any> | string | null | undefined

export const overrideConfig = (initialConfig?: Config, updatedConfig?: Config): Config => {
	if (typeof updatedConfig === "string" || typeof initialConfig === "string") {
		return updatedConfig
	}

	if (typeof initialConfig === "object" && typeof updatedConfig === "object") {
		return { ...initialConfig, ...updatedConfig }
	}
}
