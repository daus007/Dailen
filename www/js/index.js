var macAddress = "A0:82:1F:9E:9E:A1";


var exec = require('cordova/exec');
var platform = require('cordova/platform');

/**
 * Provides access to bluetooth on the device.
 */
var bluetooth = {

	initialBluetooth: function(){

	},

    startScan: function(successFunc,errorFunc,serviceUUIDs) {
        cordova.exec(successFunc,errorFunc, "BCBluetooth", "startScan", serviceUUIDs);
    },

    stopScan: function(successFunc,errorFunc){
    	cordova.exec(successFunc,errorFunc, "BCBluetooth", "stopScan", []);
    },

    connectDevice: function(successFunc,errorFunc,deviceAddress,appID){
    	cordova.exec(successFunc,errorFunc, "BCBluetooth", "connect", [{"deviceAddress":deviceAddress,"appID":appID}]);
    },

    disconnectDevice: function(successFunc,errorFunc,deviceAddress,appID){
    	cordova.exec(successFunc,errorFunc, "BCBluetooth", "disconnect", [{"deviceAddress":deviceAddress,"appID":appID}]);
    },

    discoverServices: function(successFunc,errorFunc,deviceAddress){
    	cordova.exec(successFunc,errorFunc, "BCBluetooth", "getServices", [{"deviceAddress":deviceAddress}]);
    },

    discoverCharacteristics: function(successFunc,errorFunc,deviceAddress,serviceIndex){
    	cordova.exec(successFunc,errorFunc, "BCBluetooth", "getCharacteristics", [{"deviceAddress":deviceAddress,"serviceIndex":serviceIndex}]);
    },

    discoverDescriptors: function(successFunc,errorFunc,deviceAddress,serviceIndex,charcteristicIndex){
    	cordova.exec(successFunc,errorFunc, "BCBluetooth", "getDescriptors", [{"deviceAddress":deviceAddress,"serviceIndex":serviceIndex,"characteristicIndex":charcteristicIndex}]);
    },

    readCharacteristic: function(successFunc,errorFunc,deviceAddress,serviceIndex,characteristicIndex){
    	cordova.exec(successFunc,errorFunc, "BCBluetooth", "readValue", [{"deviceAddress":deviceAddress,"serviceIndex":serviceIndex,"characteristicIndex":characteristicIndex,"descriptorIndex":""}]);
    },

    writeCharacteristic: function(successFunc,errorFunc,deviceAddress,serviceIndex,characteristicIndex,writeValue){
    	cordova.exec(successFunc,errorFunc, "BCBluetooth", "writeValue", [{"deviceAddress":deviceAddress,"serviceIndex":serviceIndex,"characteristicIndex":characteristicIndex,"descriptorIndex":"","writeValue":writeValue}]);
    },

    subscribe: function(successFunc,errorFunc,deviceAddress,serviceIndex,characteristicIndex,notifyEventName){
        cordova.exec(successFunc,errorFunc, "BCBluetooth", "setNotification", [{"deviceAddress":deviceAddress,"serviceIndex":serviceIndex,"characteristicIndex":characteristicIndex,"enable":"true"}]);
    },

    unsubscribe: function(successFunc,errorFunc,deviceAddress,serviceIndex,characteristicIndex,notifyEventName){
        cordova.exec(successFunc,errorFunc, "BCBluetooth", "setNotification", [{"deviceAddress":deviceAddress,"serviceIndex":serviceIndex,"characteristicIndex":characteristicIndex,"enable":"false"}]);
    },

	notify: function(successFunc,errorFunc,uniqueID,characteristicIndex,data){
		cordova.exec(successFunc,errorFunc, "BCBluetooth", "notify" , [{"uniqueID":uniqueID,"characteristicIndex":characteristicIndex,"data":data}]);
	},

	readDescriptor: function(successFunc,errorFunc,deviceAddress,serviceIndex,characteristicIndex,descriptorIndex){
    	cordova.exec(successFunc,errorFunc, "BCBluetooth", "readValue", [{"deviceAddress":deviceAddress,"serviceIndex":serviceIndex,"characteristicIndex":characteristicIndex,"descriptorIndex":descriptorIndex}]);
    },

	getDeviceAllData : function(successFunc,errorFunc,deviceAddress){
		cordova.exec(successFunc,errorFunc, "BCBluetooth", "getDeviceAllData",[{"deviceAddress":deviceAddress}]);
	},

	getRSSI : function(successFunc,errorFunc,deviceAddress){
		cordova.exec(successFunc,errorFunc, "BCBluetooth", "getRSSI",[{"deviceAddress":deviceAddress}]);
	},

	addServices : function(successFunc,errorFunc,servicesData){
		cordova.exec(successFunc,errorFunc, "BCBluetooth", "addServices",[servicesData]);
	},

	removeService : function(successFunc,errorFunc,uniqueID){
		cordova.exec(successFunc,errorFunc, "BCBluetooth", "removeServices",[{"uniqueID":uniqueID}]);
	},

	getConnectedDevices : function(successFunc,errorFunc){
		cordova.exec(successFunc,errorFunc,"BCBluetooth","getConnectedDevices",[]);
	},

	getPairedDevices : function(successFunc,errorFunc){
		cordova.exec(successFunc,errorFunc,"BCBluetooth","getPairedDevices",[]);
	},

	createPair : function(successFunc,errorFunc,deviceAddress){
		cordova.exec(successFunc,errorFunc, "BCBluetooth", "createPair",[{"deviceAddress":deviceAddress}]);
	},

	removePair : function(successFunc,errorFunc,deviceAddress){
		cordova.exec(successFunc,errorFunc, "BCBluetooth", "removePair",[{"deviceAddress":deviceAddress}]);
	},

	getEnvironment : function(successFunc,errorFunc){
		cordova.exec(successFunc,errorFunc, "BCBluetooth", "getEnvironment",[]);
	},

	getBluetoothState : function(successFunc,errorFunc){
		cordova.exec(successFunc,errorFunc,"BCBluetooth","getBluetoothState",[]);
	},

	openBluetooth : function(successFunc,errorFunc){
		cordova.exec(successFunc,errorFunc,"BCBluetooth","openBluetooth",[]);
	},

	addEventListener : function(callback,errorFunc,arg){
		cordova.exec(callback,errorFunc,"BCBluetooth","addEventListener",[{"eventName":arg.eventName,"arg":arg.arg}]);
	},
=======
var app = {
    initialize: function() {
        this.bind();
        listButton.style.display = "none";
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.foo(), and not this.foo()

        // wire buttons to functions
        connectButton.ontouchstart = app.connect;
        listButton.ontouchstart = app.list;

        sendButton.ontouchstart = app.sendData;
        chatform.onsubmit = app.sendData;
        disconnectButton.ontouchstart = app.disconnect;

        // listen for messages
        bluetoothSerial.subscribe("\n", app.onmessage, app.generateFailureFunction("Subscribe Failed"));

        // get a list of peers
        setTimeout(app.list, 2000);
    },
    list: function(event) {
        deviceList.firstChild.innerHTML = "Discovering...";
        app.setStatus("Looking for Bluetooth Devices...");
        bluetoothSerial.list(app.ondevicelist, app.generateFailureFunction("List Failed"));
    },
    connect: function() {
        var device = deviceList[deviceList.selectedIndex].value;
        app.disable(connectButton);
        app.setStatus("Connecting...");
        alert("Requesting connection to " + device);
        bluetoothSerial.connect(device, app.onconnect, app.ondisconnect);
    },
    disconnect: function(event) {
        if (event) {
            event.preventDefault();
        }

        app.setStatus("Disconnecting...");
        bluetoothSerial.disconnect(app.ondisconnect);
    },
    sendData: function(event) {
        event.preventDefault();

        var text = message.value + "\n";
        var success = function () {
            message.value = "";
            messages.value += ("Us: " + text);
            messages.scrollTop = messages.scrollHeight;
        };

        bluetoothSerial.write(text, success);
        return false;
    },
    ondevicelist: function(devices) {
        var option;

        // remove existing devices
        deviceList.innerHTML = "";
        app.setStatus("");

        devices.forEach(function(device) {

            option = document.createElement('option');
            if (device.hasOwnProperty("uuid")) {
                option.value = device.uuid;
            } else if (device.hasOwnProperty("address")) {
                option.value = device.address;
            } else {
                option.value = "ERROR " + JSON.stringify(device);
            }
            option.innerHTML = device.name;
            deviceList.appendChild(option);
        });

        if (devices.length === 0) {

            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            deviceList.appendChild(option);

            if (cordova.platformId === "ios") { // BLE
                app.setStatus("No Bluetooth Peripherals Discovered.");
            } else { // Android
                app.setStatus("Please Pair a Bluetooth Device.");
            }

            app.disable(connectButton);
            listButton.style.display = "";
        } else {
            app.enable(connectButton);
            listButton.style.display = "none";
            app.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
        }

    },
    onconnect: function() {
        connection.style.display = "none";
        chat.style.display = "block";
        app.setStatus("Connected");
    },
    ondisconnect: function(reason) {
        var details = "";
        if (reason) {
            details += ": " + JSON.stringify(reason);
        }
        connection.style.display = "block";
        app.enable(connectButton);
        chat.style.display = "none";
        app.setStatus("Disconnected");
    },
    onmessage: function(message) {
        messages.value += "Them: " + message;
        messages.scrollTop = messages.scrollHeight;
    },
    setStatus: function(message) { // setStatus
        console.log(message);

        window.clearTimeout(app.statusTimeout);
        statusMessage.innerHTML = message;
        statusMessage.className = 'fadein';

        // automatically clear the status with a timer
        app.statusTimeout = setTimeout(function () {
            statusMessage.className = 'fadeout';
        }, 5000);
    },
    enable: function(button) {
        button.className = button.className.replace(/\bis-disabled\b/g,'');
    },
    disable: function(button) {
        if (!button.className.match(/is-disabled/)) {
            button.className += " is-disabled";
        }
    },
    generateFailureFunction: function(message) {
        var func = function(reason) { // some failure callbacks pass a reason
            var details = "";
            if (reason) {
                details += ": " + JSON.stringify(reason);
            }
            app.setStatus(message + details);
        };
        return func;
    }
>>>>>>> origin/master
};
module.exports = bluetooth;
