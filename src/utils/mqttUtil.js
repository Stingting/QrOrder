import {connect} from 'mqtt';
import constant from "../config";

const mqttClient = (function () {
  let instance;

  function createInstance() {
    const  client = connect(constant.emqttPath);
    return client;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

export default mqttClient;
