/**
 * @name FakeDeafen
 * @author Ferivonus
 * @description Discord'da kendi kendine susturulmuş gibi görünmenizi sağlar.
 * @version 0.0.1
 */

module.exports = class FakeDeafen {
    constructor() {
        this.textDecoder = new TextDecoder("utf-8");
        this.originalWebSocketSend = null;
    }

    getName() { return "FakeDeafen"; }
    getDescription() { return "Discord'da kendi kendine susturulmuş gibi görünmenizi sağlar."; } // Açıklama güncellendi
    getVersion() { return "0.0.1"; }
    getAuthor() { return "Ferivonus"; }

    start() {
        this.originalWebSocketSend = WebSocket.prototype.send;
        
        const self = this;
        WebSocket.prototype.send = function(data) {
            if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
                let decodedData;
                try {
                    decodedData = self.textDecoder.decode(data);
                } catch (e) {
                    self.originalWebSocketSend.apply(this, [data]);
                    return;
                }

                if (decodedData.includes("self_deaf")) {
                    data = data.replace('"self_mute":false', 'NiceOneDiscord');
                }
            }
            self.originalWebSocketSend.apply(this, [data]);
        };
    }

    stop() {
        if (this.originalWebSocketSend) {
            WebSocket.prototype.send = this.originalWebSocketSend;
            this.originalWebSocketSend = null;
        }
    }
}