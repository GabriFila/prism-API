const source = new EventSource("/updates");
source.addEventListener("micro-connected", () => document.location.reload());
//# sourceMappingURL=waitConnectUI.js.map