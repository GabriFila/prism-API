const source = new EventSource("/updates");

//set up SSE and wait for 'micro-connected' event
source.addEventListener("micro-connected", () => document.location.reload());
