import {connect} from 'mqtt';
import constant from "../config";

const mqttClient = (function () {
  let instance;
  let connected = false;

  function createInstance() {
    const  client = connect(constant.emqttPath);
    connected = true;
    return client;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
    isConnected : function () {
      return connected;
    }
  };
})();

export default mqttClient;
