export function generateUrlFromTitle(title: string) {
	return title.toLowerCase().split(" ").join("-s")
}
