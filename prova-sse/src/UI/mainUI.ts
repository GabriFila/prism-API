const source = new EventSource("/stream");

source.addEventListener("info", (event: any) => console.log(JSON.parse(event.data)));
