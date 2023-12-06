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

export const isEmpty = (value: unknown) => {
	// Check if the value is null or undefined
	if (value == null) {
		return true;
	}

	// Check if the value is a string and has zero length
	if (typeof value === 'string' && value.trim().length === 0) {
		return true;
	}

	// Check if the value is an array and has zero elements
	if (Array.isArray(value) && value.length === 0) {
		return true;
	}

	// Check if the value is an object and has zero keys
	if (typeof value === 'object' && Object.keys(value).length === 0) {
		return true;
	}

	// If none of the above conditions are met, the value is not empty
	return false;
}

export const getPortkeyHeader = (key: string): string => {
	return `${PORTKEY_HEADER_PREFIX}${key}`
}

type Config = Record<string, any> | string | null | undefined

export const overrideConfig = (initialConfig?: Config, updatedConfig?: Config): Config => {
	if (isEmpty(updatedConfig)) {
		return initialConfig
	}
	return updatedConfig
}
