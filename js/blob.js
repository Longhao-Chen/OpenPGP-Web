function Uint8Array2blobUrl(data) {
	var blob = new Blob([data]);
	return window.URL.createObjectURL(blob);
}