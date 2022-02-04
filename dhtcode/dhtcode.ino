#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "config.h"
#include "DHT.h"

#define DHTTYPE DHT11

const int mqttPort = 1883;

const int interval = 10000;
const int DHT_PIN = 5;
DHT dht(DHT_PIN, DHTTYPE);


const unsigned int MOISTURE_PIN = A0;
String clientId;
String id;
unsigned int moisture;

WiFiClient espClient;
PubSubClient client(espClient);
char msg[140];

void setup()
{
  pinMode(MOISTURE_PIN, INPUT);
  Serial.begin(115200);
  //Serial.setTimeout(2000);
  dht.begin();
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

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();

  //String output = "{\"sensorId\":\"" + id + "\",\"sensorUser\":\"" + clientId + "\",\"moisture\":" + moisture + "}";
  String output = "{\"sensorId\":\"" + id + "\",\"sensorUser\":\"" + clientId + "\",\"moisture\":" + moisture + ",\"temperature\":" + t + ",\"humidity\":" + h + "}";
  String(output).toCharArray(msg, 140);
  client.publish(MOIS_TOPIC, msg);
  Serial.println(moisture);
  Serial.println(t);
  Serial.println(h);
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
  id = "a105c727-a593-459c-b647-71c08ec6a170";
  return id;
  }

  
