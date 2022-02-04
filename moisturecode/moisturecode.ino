#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "config.h"


const int mqttPort = 1883;

const int interval = 10000;

const unsigned int MOISTURE_PIN = A0;
String clientId;
String id;
unsigned int moisture;

WiFiClient espClient;
PubSubClient client(espClient);
char msg[100];

void setup()
{
  pinMode(MOISTURE_PIN, INPUT);
  Serial.begin(115200);
  //while (!Serial)
  connect_wifi();
  client.setServer(MQTT_BROKER, 1883);
  clientId = composeClientID(); 
  id = composeId(); 
  Serial.print("clientID: ");
  Serial.println(clientId);
}

void connect_wifi()
{
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(SSID);

  WiFi.begin(SSID, PSK);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect()
{
  while (!client.connected())
  {
    Serial.print("Reconnecting...");
    if (!client.connect(MQTT_CLIENT_ID))
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds");
      delay(5000);
    }
  }
}

void loop()
{
  int x = analogRead(MOISTURE_PIN);
  moisture = map(x, 0, 1023, 100, 0);
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();

  String output = "{\"sensorId\":\"" + id + "\",\"sensorUser\":\"" + clientId + "\",\"moisture\":" + moisture + "}";
  String(output).toCharArray(msg, 100);
  client.publish(MOIS_TOPIC, msg);
  Serial.println(moisture);
 // delay(10);
  delay(interval);
   Serial.println("Going to deep sleep...");
  ESP.deepSleep(3600000);
}

String composeClientID()
{
  clientId = "luca";
  return clientId;
}

String composeId()
{
  id = "47c1abbd-a66d-4381-98fa-149111c08771";
  return id;
  }
