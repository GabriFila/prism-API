const source = new EventSource("/stream");
source.addEventListener("info", (event) => console.log(JSON.parse(event.data)));
//# sourceMappingURL=mainUI.js.map