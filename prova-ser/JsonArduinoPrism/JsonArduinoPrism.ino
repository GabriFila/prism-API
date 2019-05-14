
#include "ArduinoJson.h"


void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  const char* input = "{\"Nome\" : \"Gabriele\", \"Cognome\" : \"Filaferro\"}";

  StaticJsonDocument<256> objA;
  StaticJsonDocument<256> objB;

  deserializeJson(objA, input);

  const char * nome = objA["Nome"];

  const char * cognome = objA["Cognome"];
  /*
    Serial.print("Nome: ");
    Serial.println(nome);
    Serial.print("Cognome: ");
    Serial.println(cognome);
  */

  deserializeJson(objB, Serial);
  digitalWrite(LED_BUILTIN, LOW);

  if (objB["led"] == true)
    digitalWrite(LED_BUILTIN,HIGH);
  serializeJson(objB, Serial);


  Serial.print("dataEnd");
}

void loop() {

}
