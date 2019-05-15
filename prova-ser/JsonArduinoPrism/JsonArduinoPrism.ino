
#include "ArduinoJson.h"

StaticJsonDocument<256> objRx;
StaticJsonDocument<256> objTx;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);

  const char* input = "{\"Nome\" : \"Gabriele\", \"Cognome\" : \"Filaferro\"}";
  StaticJsonDocument<256> objA;
  deserializeJson(objA, input);

  const char * nome = objA["Nome"];

  const char * cognome = objA["Cognome"];
  //serializeJson(objA, Serial);
  //Serial.print("dataEnd");
}

void loop() {

  if (Serial.available()) {
    deserializeJson(objRx, Serial);
    digitalWrite(LED_BUILTIN, LOW);
    /*
      int times = objRx["times"];
      for (int i = 0; i < times; i++) {
      digitalWrite(LED_BUILTIN, HIGH);
      delay((int)(objRx["delay"])*(i+1));
      //delay(2000);
      digitalWrite(LED_BUILTIN, LOW);
      delay((int)(objRx["delay"])*(i+1));
      }*/

    digitalWrite(LED_BUILTIN, HIGH);
    delay(objRx["delay"]);
    digitalWrite(LED_BUILTIN, LOW);
    delay(objRx["delay"]);
    objTx["delayRX"] = objRx["delay"];
    objTx["msg"] = "send" ;

    serializeJson(objTx, Serial);
    Serial.println();
  }

}
