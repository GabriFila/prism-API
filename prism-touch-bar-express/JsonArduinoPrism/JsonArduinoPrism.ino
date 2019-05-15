
#include "ArduinoJson.h"

StaticJsonDocument<170> objRx;
StaticJsonDocument<170> objTx;

StaticJsonDocument<550> prismState;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  const char* input = "{\"scanParams\":{\"offset\":{\"x\":{\"current\":500,\"max\":1000,\"min\":0},\"y\":{\"current\":500,\"max\":1000,\"min\":0},\"z\":{\"current\":500,\"max\":1000,\"min\":0}},\"pixelNumber\":{\"x\":{\"current\":500,\"max\":1000,\"min\":0},\"y\":{\"current\":500,\"max\":1000,\"min\":0},\"z\":{\"current\":500,\"max\":1000,\"min\":0}},\"range\":{\"x\":{\"current\":500,\"max\":1000,\"min\":0},\"y\":{\"current\":500,\"max\":1000,\"min\":0},\"z\":{\"current\":500,\"max\":1000,\"min\":0}},\"dwellTime\":40}}";
  deserializeJson(prismState, input);
  digitalWrite(LED_BUILTIN, LOW);
}

void loop() {

  if (Serial.available()) {
    deserializeJson(objRx, Serial);

    if (objRx["event"] == "updated-offset-x") {
        prismState["scanParams"]["offset"]["x"]["current"] = objRx["data"]["newValue"];
      
    }

    objTx["event"] = "micro-updated-offset-x";
    objTx["newValue"] = prismState["scanParams"]["offset"]["x"]["current"];
    serializeJson(objTx, Serial);
    Serial.println();
  }
}
