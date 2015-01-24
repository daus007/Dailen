var macAddress = "A0:82:1F:9E:9E:A1";

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        bluetoothSerial.connect(macAddress, app.onConnect, app.onDisconnect);
        bluetoothSerial.subscribe("\n", app.onMessage, app.subscribeFailed);
        statusDiv.innerHTML="Connected to " + macAddress + ".";
    },
    onConnect: function() {
        bluetoothSerial.subscribe("\n", app.onMessage, app.subscribeFailed);
        statusDiv.innerHTML="Connected to " + macAddress + ".";
    },
    onDisconnect: function() {
        alert("Disconnected FROM pero sin div:" + macAddress + ".");
        //statusDiv.innerHTML="Disconnected." + macAddress + ".";
    },
    onMessage: function(data) {
        counter.innerHTML = data;
    },
    subscribeFailed: function() {
        alert("subscribe failed TO:" + macAddress + ".");
    }
};
