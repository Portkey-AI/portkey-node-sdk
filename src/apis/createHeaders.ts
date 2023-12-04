import { getPortkeyHeader } from "../utils"

export const createHeaders = (config: Record<string, any>): Record<string, string> => {
	const headers: Record<string, string> = {}

	for (let k in config) {
		let v = config[k]
		// convert to snakecase
		k = k.replace('ID', 'Id')
			.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
			.split("_")
			.join("-")
		if (typeof v == "object") {
			v = JSON.stringify(v)
		}
		headers[getPortkeyHeader(k)] = v || ""
	}
	return headers

}