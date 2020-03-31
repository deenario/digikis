package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"time"

	//"strings"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
)

//SmartContract is the data structure which represents this contract and on which  various contract lifecycle functions are attached
type SmartContract struct {
}

type Bootdevice struct {
	ObjectType string    `json:"Type"`
	ID         string    `json:"id"`
	DeviceID   string    `json:"deviceID"`
	timestamp  time.Time `json:"timestamp"`
}

type Heartrate struct {
	ObjectType string `json:"Type"`
	ID         string `json:"id"`
	DeviceID   string `json:"deviceID"`
	Heartrate  string `json:"heartrate"`
}

type Bloodpressure struct {
	ObjectType string `json:"Type"`
	ID         string `json:"id"`
	DeviceID   string `json:"deviceID"`
	Systolic   string `json:"systolic"`
	Diastolic  string `json:"diastolic"`
	Heartrate  string `json:"heartrate"`
}

type Bloodoxygen struct {
	ObjectType string `json:"Type"`
	ID         string `json:"id"`
	DeviceID   string `json:"deviceID"`
	ox         string `json:"ox"`
}

type ECG struct {
	ObjectType string `json:"Type"`
	ID         string `json:"id"`
	DeviceID   string `json:"deviceID"`
	Heartrate  string `json:"heartrate"`
}

type Sportdata struct {
	ObjectType    string `json:"Type"`
	ID            string `json:"id"`
	DeviceID      string `json:"deviceID"`
	SportStep     string `json:"sportStep"`
	SportDistance string `json:"sportDistance"`
	SportCalorie  string `json:"sportCalorie"`
	SportTime     string `json:"sportTime"`
}

type Sleepdata struct {
	ObjectType string `json:"Type"`
	ID         string `json:"id"`
	DeviceID   string `json:"deviceID"`
	SleepTotal string `json:"sleepTotal"`
	SleepLow   string `json:"sleepLow"`
	SleepDeep  string `json:"sleepDeep"`
}

type Geographicposition struct {
	ObjectType string `json:"Type"`
	ID         string `json:"id"`
	DeviceID   string `json:"deviceID"`
	Longitude  string `json:"longitude"`
	Latitude   string `json:"latitude"`
	Lbsinfo    string `json:"lbsinfo"`
	Wifi       string `json:"wifi"`
	Mt         string `json:"mt"`
}

type Alarm struct {
	ObjectType string `json:"Type"`
	ID         string `json:"id"`
	DeviceID   string `json:"deviceID"`
	Lbsinfo    string `json:"lbsinfo"`
	Longitude  string `json:"latitude"`
	Latitude   string `json:"longitude"`
	Wifi       string `json:"wifi"`
	Mt         string `json:"mt"`
	_Type      string `json:"_type"`
}

type Air struct {
	ObjectType  string `json:"Type"`
	ID          string `json:"id"`
	DeviceID    string `json:"deviceID"`
	CO          string `json:"co"`
	Ozone       string `json:"ozone"`
	LPG         string `json:"lpg"`
	Smoke       string `json:"smoke"`
	Oxides      string `json:"oxides"`
	Temperature string `json:"temperature"`
	Humidity    string `json:"humidity"`
	timestamp   time.Time `json:"timestamp"`
}

type Parking struct {
 	ObjectType      string `json:"Type"`
 	ID              string `json:"id"`
 	DeviceID        string `json:"deviceID"`
 	Place           string `json:"place"`
 	FreeSlot        string `json:"freeSlot"`
 	OccupiedSlot    string `json:"occupiedSlot"`
    timestamp       time.Time `json:"timestamp"`
 }

 type Accident struct {
  	ObjectType      string `json:"Type"`
  	ID              string `json:"id"`
  	DeviceID        string `json:"deviceID"`
  	Muscle          string `json:"muscle"`
  	Accelerometer   string `json:"accelerometer"`
  	Pulse           string `json:"pulse"`
  	timestamp       time.Time `json:"timestamp"`
  }

func (t *SmartContract) Init(stub shim.ChaincodeStubInterface) peer.Response {

	fmt.Println("Init Firing!")
	return shim.Success(nil)
}

func (t *SmartContract) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := stub.GetFunctionAndParameters()
	fmt.Println("Chaincode Invoke Is Running " + function)

	if function == "addBootdevice" {
		return t.addBootdevice(stub, args)
	}
	if function == "addHeartrate" {
		return t.addHeartrate(stub, args)
	}
	if function == "addBloodpressure" {
		return t.addBloodpressure(stub, args)
	}
	if function == "addBloodoxygen" {
		return t.addBloodoxygen(stub, args)
	}
	if function == "addECG" {
		return t.addECG(stub, args)
	}
	if function == "addSportdata" {
		return t.addSportdata(stub, args)
	}
	if function == "querySportdata" {
		return t.querySportdata(stub, args)
	}
	if function == "addSleepdata" {
		return t.addSleepdata(stub, args)
	}
	if function == "querySleepdata" {
		return t.querySleepdata(stub, args)
	}
	if function == "addGeographicposition" {
		return t.addGeographicposition(stub, args)
	}
	if function == "addAlarm" {
		return t.addAlarm(stub, args)
	}


// 	NEW FUNCTIONS
	if function == "addAir" {
    	return t.addAlarm(stub, args)
    }
    if function == "addParking" {
    	return t.addAlarm(stub, args)
    }
    if function == "addAccident" {
       return t.addAlarm(stub, args)
    }
	if function == "queryAir" {
    	return t.addAlarm(stub, args)
    }
    if function == "queryParking" {
    	return t.addAlarm(stub, args)
    }
    if function == "queryAccident" {
       return t.addAlarm(stub, args)
    }
//  End FUNCTIONS

	fmt.Println("Invoke did not find specified function " + function)
	return shim.Error("Invoke did not find specified function " + function)
}

func (s *SmartContract) queryAir(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}
	deviceID := args[0]
	queryString := fmt.Sprintf("{\"selector\":{\"Type\":\"air\",\"deviceID\":\"%s\"}}", deviceID)

	queryResults, err := getQueryResultForQueryString(APIstub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

func (s *SmartContract) queryParking(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	deviceID := args[0]
	queryString := fmt.Sprintf("{\"selector\":{\"Type\":\"parking\",\"deviceID\":\"%s\"}}", deviceID)

	queryResults, err := getQueryResultForQueryString(APIstub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

func (s *SmartContract) queryAccident(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	deviceID := args[0]
	queryString := fmt.Sprintf("{\"selector\":{\"Type\":\"accident\",\"deviceID\":\"%s\"}}", deviceID)

	queryResults, err := getQueryResultForQueryString(APIstub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

func (t *SmartContract) addParking(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 6 {
		return shim.Error("Incorrect Number of Aruments. Expecting 6")
	}

	id := args[0]
	deviceID := args[1]
    place := args[2]
 	freeSlot := args[3]
 	occupiedSlot := args[4]
	timestamp, err1 := time.Parse(time.RFC3339, args[5])
	if err1 != nil {
		return shim.Error(err.Error())
	}

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "parking"
	data := &Parking{objectType, id, deviceID, place, freeSlot, occupiedSlot, timestamp}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

func (t *SmartContract) addAccident(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 9 {
		return shim.Error("Incorrect Number of Aruments. Expecting 9")
	}

	id := args[0]
	deviceID := args[1]
    muscle := args[2]
  	accelerometer := args[3]
  	pulse := args[4]
	timestamp, err1 := time.Parse(time.RFC3339, args[5])
	if err1 != nil {
		return shim.Error(err.Error())
	}

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "accident"
	data := &Accident{objectType, id, deviceID, muscle, accelerometer, pulse, timestamp}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

func (t *SmartContract) addAir(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 10 {
		return shim.Error("Incorrect Number of Aruments. Expecting 10")
	}

	id := args[0]
	deviceID := args[1]
    co := args[2]
	ozone := args[3]
	lpg := args[4]
	smoke := args[5]
	oxides := args[6]
	temperature := args[7]
	humidity := args[8]
	timestamp, err1 := time.Parse(time.RFC3339, args[9])
	if err1 != nil {
		return shim.Error(err.Error())
	}

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "air"
	data := &Air{objectType, id, deviceID,co, ozone, lpg, smoke, oxides, temperature, humidity, timestamp}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}


func (t *SmartContract) addBootdevice(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 3 {
		return shim.Error("Incorrect Number of Aruments. Expecting 3")
	}

	id := args[0]
	deviceID := args[1]
	timestamp, err1 := time.Parse(time.RFC3339, args[2])
	if err1 != nil {
		return shim.Error(err.Error())
	}

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "bootdevice"
	data := &Bootdevice{objectType, id, deviceID, timestamp}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

func (t *SmartContract) addHeartrate(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 3 {
		return shim.Error("Incorrect Number of Aruments. Expecting 3")
	}

	id := args[0]
	deviceID := args[1]
	heartrate := args[2]

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "heartrate"
	data := &Heartrate{objectType, id, deviceID, heartrate}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

func (t *SmartContract) addBloodpressure(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 5 {
		return shim.Error("Incorrect Number of Aruments. Expecting 5")
	}

	id := args[0]
	deviceID := args[1]
	systolic := args[2]
	diastolic := args[3]
	heartrate := args[4]

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "bloodpressure"
	data := &Bloodpressure{objectType, id, deviceID, systolic, diastolic, heartrate}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

func (t *SmartContract) addBloodoxygen(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 3 {
		return shim.Error("Incorrect Number of Aruments. Expecting 3")
	}

	id := args[0]
	deviceID := args[1]
	ox := args[2]

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "bloodoxygen"
	data := &Bloodoxygen{objectType, id, deviceID, ox}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

func (t *SmartContract) addECG(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 3 {
		return shim.Error("Incorrect Number of Aruments. Expecting 3")
	}

	id := args[0]
	deviceID := args[1]
	heartrate := args[2]

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "ecg"
	data := &ECG{objectType, id, deviceID, heartrate}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

func (t *SmartContract) addSportdata(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 6 {
		return shim.Error("Incorrect Number of Aruments. Expecting 6")
	}

	id := args[0]
	deviceID := args[1]
	sportStep := args[2]
	sportDistance := args[3]
	sportCalorie := args[4]
	sportTime := args[5]

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "sportdata"
	data := &Sportdata{objectType, id, deviceID, sportStep, sportDistance, sportCalorie, sportTime}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

func (s *SmartContract) querySportdata(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	deviceID := args[0]
	queryString := fmt.Sprintf("{\"selector\":{\"Type\":\"sportdata\",\"deviceID\":\"%s\"}}", deviceID)

	queryResults, err := getQueryResultForQueryString(APIstub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

func (s *SmartContract) querySleepdata(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	deviceID := args[0]
	queryString := fmt.Sprintf("{\"selector\":{\"Type\":\"sleepdata\",\"deviceID\":\"%s\"}}", deviceID)

	queryResults, err := getQueryResultForQueryString(APIstub, queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

func (t *SmartContract) addSleepdata(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 5 {
		return shim.Error("Incorrect Number of Aruments. Expecting 5")
	}

	id := args[0]
	deviceID := args[1]
	sleepTotal := args[2]
	sleepLow := args[3]
	sleepDeep := args[4]

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "sleepdata"
	data := &Sleepdata{objectType, id, deviceID, sleepTotal, sleepLow, sleepDeep}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

func (t *SmartContract) addGeographicposition(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 7 {
		return shim.Error("Incorrect Number of Aruments. Expecting 7")
	}

	id := args[0]
	deviceID := args[1]
	longitude := args[2]
	latitude := args[3]
	lbsinfo := args[4]
	wifi := args[5]
	mt := args[6]

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "geographicposition"
	data := &Geographicposition{objectType, id, deviceID, longitude, latitude, lbsinfo, wifi, mt}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

func (t *SmartContract) addAlarm(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	var err error

	if len(args) != 8 {
		return shim.Error("Incorrect Number of Aruments. Expecting 8")
	}

	id := args[0]
	deviceID := args[1]
	lbsinfo := args[2]
	latitude := args[3]
	longitude := args[4]
	wifi := args[5]
	mt := args[6]
	_type := args[7]

	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + id)
	}

	// ===== Create Object and Marshal to JSON
	objectType := "alarm"
	data := &Alarm{objectType, id, deviceID, lbsinfo, latitude, longitude, wifi, mt, _type}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(id, dataJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Return Success
	fmt.Println("Successfully Saved Data")
	return shim.Success(nil)
}

// =========================================================================================
// getQueryResultForQueryString executes the passed in query string.
// Result set is built and returned as a byte array containing the JSON results.
// =========================================================================================
func getQueryResultForQueryString(stub shim.ChaincodeStubInterface, queryString string) ([]byte, error) {

	fmt.Printf("- getQueryResultForQueryString queryString:\n%s\n", queryString)

	resultsIterator, err := stub.GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryRecords
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- getQueryResultForQueryString queryResult:\n%s\n", buffer.String())

	return buffer.Bytes(), nil
}

//Main Function starts up the Chaincode
func main() {
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Smart Contract could not be run. Error Occured: %s", err)
	} else {
		fmt.Println("Smart Contract successfully Initiated")
	}
}

// func (t *SmartContract) queryBloodpressure(stub shim.ChaincodeStubInterface, args []string) peer.Response {

// 	if len(args) < 1 {
// 	   return shim.Error("Incorrect number of arguments. Expecting 1")
//    }

//    queryString := fmt.Sprintf("{\"selector\":{\"Type\":\"bloodpressure\",\"deviceID\":\"%s\"}}", args[0])

//    queryResults, err := getQueryResultForQueryString(stub, queryString)
//    if err != nil {
// 	   return shim.Error(err.Error())
//    }

//    return shim.Success(queryResults)
// }
