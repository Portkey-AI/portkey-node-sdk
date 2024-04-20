import { getPortkeyHeader, isEmpty } from "../utils"

export const createHeaders = (config: Record<string, any>): Record<string, string> => {
	const headers: Record<string, string> = {}

	for (let k in config) {
		let v = config[k];
		if (isEmpty(v)) continue;

		// convert to snakecase
		if (k.toLocaleLowerCase() === "authorization") {
			headers[k.toLowerCase()] = v || ""
			continue
		}

		// false logic (enter all the cases here, where we take a boolean input)
		if (k.toLocaleLowerCase() === "debug" || k.toLocaleLowerCase() === "cacheforcerefresh") {
			v = v.toString()
		}

		k = k.replace('ID', 'Id')
			.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
		if (!isEmpty(v) && typeof v == "object") {
			v = JSON.stringify(v)
		}
		headers[getPortkeyHeader(k)] = v || ""
	}
	return headers

}