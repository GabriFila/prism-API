#include "ArduinoJson.h"

#define BUTTON 7
StaticJsonDocument<300> objRx;
StaticJsonDocument<300> objTx;


StaticJsonDocument<40> startObj;

int offX = 100;
int offY = 200;
int offZ = 300;
int pnX = 400;
int pnY = 500;
int pnZ = 600;
int rgX = 700;
int rgY = 800;
int rgZ = 900;
int dt = 50;


void setup() {
  pinMode(BUTTON, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  randomSeed(analogRead(0));
  Serial.begin(9600);

  const char json[] = "{\"event\":\"prism-connected\"}";
  deserializeJson(startObj, json);
  delay(1000);
  /*
    Serial.print("event: ");
    const char * event= startObj["event"];
    Serial.println(event);
  */

  //serializeJson(startObj, Serial);
  //Serial.print(json);
  //Serial.println();



}

void loop() {
  /*
    if (Serial.available()) {
      deserializeJson(objRx, Serial);

      if (objRx["event"] == "updated-offset-x")
        offX = objRx["data"]["newValue"];
      if (objRx["event"] == "updated-offset-y")
        offY = objRx["data"]["newValue"];
      if (objRx["event"] == "updated-offset-z")
        offZ = objRx["data"]["newValue"];

      if (objRx["event"] == "updated-range-x")
        rgX = objRx["data"]["newValue"];
      if (objRx["event"] == "updated-range-y")
        rgY = objRx["data"]["newValue"];
      if (objRx["event"] == "updated-range-z")
        rgZ = objRx["data"]["newValue"];

      if (objRx["event"] == "updated-pixelNumber-x")
        pnX = objRx["data"]["newValue"];
      if (objRx["event"] == "updated-pixelNumber-y")
        pnY = objRx["data"]["newValue"];
      if (objRx["event"] == "updated-pixelNumber-z")
        pnZ = objRx["data"]["newValue"];

      if (objRx["event"] == "updated-dwellTime")
        dt = objRx["data"]["newValue"];
    }
  */
  if (Serial.available()) {
    deserializeJson(objRx, Serial);
    serializeJson(objRx, Serial);
  }



  // if (millis() % 1000 == 0){
  if (digitalRead(BUTTON) == HIGH) {
    //   digitalWrite(LED_BUILTIN, HIGH);
    sendSomeData();
    delay(200);
  }
}



void sendSomeData() {
  byte choice = random(0, 9);
  //Serial.println("ENTEEEEERDDD");
  switch (choice) {
    case 0:
      objTx["event"] = "micro-updated-offset-x";
      offX = random(250, 751);
      objTx["newValue"] = offX;
      serializeJson(objTx, Serial);
      Serial.println();
      break;
    case 1:
      objTx["event"] = "micro-updated-offset-y";
      offY = random(250, 751);
      objTx["newValue"] = offY;
      serializeJson(objTx, Serial);
      Serial.println();
      break;
    case 2:
      objTx["event"] = "micro-updated-offset-z";
      offZ = random(250, 751);
      objTx["newValue"] = offZ;
      serializeJson(objTx, Serial);
      Serial.println();
      break;
    case 3:
      objTx["event"] = "micro-updated-pixelNumber-x";
      pnX = random(250, 751);
      objTx["newValue"] = pnX;
      serializeJson(objTx, Serial);
      Serial.println();
      break;
    case 4:
      objTx["event"] = "micro-updated-pixelNumber-y";
      pnY = random(250, 751);
      objTx["newValue"] = pnY;
      serializeJson(objTx, Serial);
      Serial.println();
      break;
    case 5:
      objTx["event"] = "micro-updated-pixelNumber-z";
      pnZ = random(250, 751);
      objTx["newValue"] = pnZ;
      serializeJson(objTx, Serial);
      Serial.println();
      break;
    case 6:
      objTx["event"] = "micro-updated-range-x";
      rgX = random(250, 751);
      objTx["newValue"] = rgX;
      serializeJson(objTx, Serial);
      Serial.println();
      break;
    case 7:
      objTx["event"] = "micro-updated-range-y";
      rgY = random(250, 751);
      objTx["newValue"] = rgY;
      serializeJson(objTx, Serial);
      Serial.println();
      break;
    case 8:
      objTx["event"] = "micro-updated-range-z";
      rgZ = random(250, 751);
      objTx["newValue"] = rgZ;
      serializeJson(objTx, Serial);
      Serial.println();
      break;
    case 9:
      objTx["event"] = "micro-updated-dwellTime";
      dt = random(250, 751);
      objTx["newValue"] = dt;
      serializeJson(objTx, Serial);
      Serial.println();
      break;
  }
}
