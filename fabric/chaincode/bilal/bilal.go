package main
import (
	"bytes"
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Define the car structure, with 4 properties.  Structure tags are used by encoding/json library
type User struct {
	ObjectType string `json:"Type"`
	Fname     string `json:"fname"`
	Lname     string `json:"lname"`
	Age       string `json:"age"`
	Password  string `json:"password"`
}

/*
 * The Init method is called when the Smart Contract "fabcar" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "fabcar"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "queryUser" {
		return s.queryUser(APIstub, args)
	} else if function == "createUser" {
		return s.createUser(APIstub, args)
	} 
	 
	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) queryUser(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

		if len(args) < 1 {
			return shim.Error("Incorrect number of arguments. Expecting 1")
		}
	
		from := args[0]
		queryString := fmt.Sprintf("{\"selector\":{\"Type\":\"user\",\"fname\":\"%s\"}}", from)
	
		queryResults, err := getQueryResultForQueryString(APIstub, queryString)
		if err != nil {
			return shim.Error(err.Error())
		}
		return shim.Success(queryResults)
}


func (t *SmartContract) createUser(stub shim.ChaincodeStubInterface, args []string) sc.Response {

	var err error

	if len(args) != 4 {
		return shim.Error("Incorrect Number of Aruments. Expecting 4")
	}

	fname   := args[0]
	lname   := args[1]
	age     := args[2]
	password:= args[3]
	if err != nil {
		return shim.Error(err.Error())
	}
	
	// ======Check if id Already exists
	dataAsBytes, err := stub.GetState(fname)
	if err != nil {
		return shim.Error("Transaction Failed with Error: " + err.Error())
	} else if dataAsBytes != nil {
		return shim.Error("The Inserted ID already Exists: " + fname)
	}

	// ===== Create Object and Marshal to JSON
	ObjectType := "user"
	data := &User{ObjectType,fname, lname, age , password}
	dataJSONasBytes, err := json.Marshal(data)

	if err != nil {
		return shim.Error(err.Error())
	}

	// ======= Save to State
	err = stub.PutState(fname, dataJSONasBytes)
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


// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
