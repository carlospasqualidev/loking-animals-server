#include <SPI.h>    
#include <WiFi.h>   //biblioteca para conexao WIFI
#include <HTTPClient.h>   //biblioteca para conexao http
#include <MFRC522.h>    //Biblioteca RFID
#include <PubSubClient.h> 

#define TOPICO_PUBLISH   "RFID_PUBLISH"  
#define ID_MQTT  "RFID_ID"

//definir os pinos do RFID
#define SS_PIN 5        
#define RST_PIN 4
MFRC522 mfrc522(SS_PIN, RST_PIN);
byte nuidPICC[4] = {0, 0, 0, 0};
MFRC522::MIFARE_Key key;
MFRC522 rfid = MFRC522(SS_PIN, RST_PIN);

WiFiClient client;
PubSubClient MQTT(client);

//define a conexao com o servidor mqtt
const char* BROKER_MQTT = "192.168.0.98"; 
int BROKER_PORT = 1883;

//defini nome e senha do WIFI
const char* ssid = "sinalfraco";
const char* password = "12345678";
//declarar variaveis
String MSGJSON; //
String conteudo2= ""; //variavel para exportar o codigo RFID da Funcao
String mensagemMqtt;
//define url para fazer o POST
const char* serverName = "http://192.168.0.98:8080/api/backoffice/animals/create/action";

unsigned long lastTime = 0;
unsigned long timerDelay = 500;

void setup() {
  //inicia conexao com servidor mqtt
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  //inicia as conexoes 
  Serial.begin(115200);   
  rfid.PCD_Init();
  SPI.begin();
  mfrc522.PCD_Init();
  // conecta no WIFI
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}
void loop() {
  
  readRFID();  //abre funcao RFID
}
void readRFID() 
{
  if ( ! mfrc522.PICC_IsNewCardPresent()) // serve para executar o codigo apenas quando ler o RFID
  {
    return;
  }
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
  Serial.println();
  Serial.print("UID da tag :");
  byte letra;
  String conteudo= ""; //variavel local pois a mesma vai concatenadno
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  conteudo2 = conteudo; //para exportar o codigo RFID
  conteudo.toUpperCase();
  Serial.println(conteudo2); //printa o RFID
  Serial.println();
  json();  //abre a funcao do HTTP
  mqtt();  //abre funcao para mqtt
} 

void json() {
    //CONECTA AO SERVER
    if(WiFi.status()== WL_CONNECTED){

      HTTPClient http;
    
      http.begin(client, serverName);

      // monta o json para ser enviado
      MSGJSON = "{\"animalId\":\"";
      MSGJSON += conteudo2;
      MSGJSON += "\",\"animalActionId\":\"5ac9de0d-ab8b-4414-8f07-5632cce68801\",\"localId\":\"5880f069-c836-41eb-b4d9-ca4ea18475b8\"}";
      
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(MSGJSON);  //faz o post do json

      Serial.print("Mensagem : ");
      Serial.println(MSGJSON);   //printa o json enviado na serial
      Serial.print("HTTP Response code: ");  
      Serial.println(httpResponseCode);  // printa o codigo de resposta do servidor
        
      http.end();
      delay(timerDelay);
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
}

//Funcao que se reconecta ao mqtt
void reconnect_mqtt() { 
    while (!MQTT.connected()) 
    {
        Serial.print("* Tentando se conectar ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) 
        {
            Serial.println("Conectado com sucesso ao broker MQTT!");
        } 
        else
        {
            Serial.println("Falha ao reconectar no broker.");
            Serial.println("Havera nova tentatica de conexao em 2s");
            delay(2000);
        }
    }
}
void mqtt() 
{   
    reconnect_mqtt();    //abre funcao para se conectar ao servidor
    char MSGMQTT[50];
    conteudo2.toCharArray(MSGMQTT, 50);
    MQTT.publish(TOPICO_PUBLISH, MSGMQTT); // envia dados ao servidor 
    MQTT.loop();
    delay(1000);   
}
