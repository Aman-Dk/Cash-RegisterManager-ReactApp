import React, { useState } from "react";
import "./styles.css";

export default function App() {
  var [billAmount, setBillAmount] = useState("");
  var [cashAmount, setCashAmount] = useState("");
  var [isBillEntered, setBillEntered] = useState("disabled");
  var [isEmptyStatus, setStatus] = useState(true);
  var [isCashEmpty, setCashStatus] = useState(false);
  var [output, setOutput] = useState("");

  var warning = "please enter the bill first";
  var warning4cash = "cash can't be empty";
  var notes = ["2000", "500", "200", "100", "50", "20", "10", "5", "2", "1"];
  var numberOfNotes = document.querySelectorAll(".no_of_notes");

  function getBillAmount(event) {
    setBillAmount(Math.round(event.target.value));
    var bill = event.target.value;
    if (bill !== "") {
      setBillEntered("enabled");
      setStatus(false);
    } else {
      setBillEntered("disabled");
      setCashAmount("");
      document.querySelector("#cashAmt").value = "";
      setStatus(true);
    }
  }

  function getCashAmount(event) {
    setCashAmount(Math.round(event.target.value));
  }

  // working model
  // function calculateNote(amount){
  //   var count=0;
  //   for(let note of notes){
  //     while(amount!==0){
  //       if(amount>=note){
  //         amount=amount-note;

  //         console.log(note, count);
  //       }else{
  //         break;
  //       }
  //     }
  //       count++;
  //   }
  // }
  function clear() {
    for (let note of numberOfNotes) {
      note.innerText = "";
    }
  }
  function returnNote(index, count) {
    numberOfNotes[index].innerText = count;
  }

  function calculateNote(amount) {
    // var indexCount = 0;
    // var noteNumber = 0;

    for (var i = 0; i < notes.length; i++) {
      while (amount !== 0) {
        if (amount >= notes[i]) {
          var note = notes[i];
          var count = 0;
          while (amount >= notes[i]) {
            amount = amount - notes[i];
            count++;
          }
          console.log("note= " + note + ", index= " + i + ",count= " + count);
          returnNote(i, count);
        } else {
          break;
        }
      }
    }

    // for (let note of notes) {
    //   var noteCount = 0;
    //   while (amount !== 0) {
    //     if (amount >= note) {
    //       amount = amount - note;
    //       noteNumber = note;
    //       noteCount++;
    //       // console.log(noteNumber, indexCount, noteCount);
    //       // returnNote(noteNumber, noteCount);
    //     } else {
    //       break;
    //     }
    //   }
    //   console.log(noteNumber, noteCount);

    //   indexCount++;
    // }
  }

  function validate(bill, cash) {
    if (cash === "") {
      setCashStatus(true);
    } else {
      setCashStatus(false);
    }
    if (cash < bill) {
      setOutput('cash can"t be less than bill amount');
    } else {
      setOutput("");
    }
    if (cash > bill) {
      var amountToReturn = cash - bill;
      calculateNote(amountToReturn);
    }
  }

  function clickHandler() {
    clear();
    var bill = billAmount;
    var cash = cashAmount;
    // console.log(bill, cash);
    if (cash && bill >= 0) {
      validate(bill, cash);
    } else {
      setOutput("Only positive numbers are accepted, try again");
    }
  }

  return (
    <div className="App">
      <h1>
        <span id="col" role="img" aria-label="app-icon">
          💰{" "}
        </span>
        Cash
        <span id="col"> Register Manager</span>
      </h1>
      <p>
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </p>
      <hr />
      <h3>Bill Amount:</h3>
      <input
        type="number"
        id="billAmt"
        onChange={getBillAmount}
        min="0"
      ></input>
      <h3>Cash Given:</h3>
      <p style={{ fontSize: "0.75rem", margin: "0", padding: "0" }} id="warn">
        {isEmptyStatus ? warning : null}
      </p>
      <input
        type="number"
        id="cashAmt"
        className={isBillEntered}
        onChange={getCashAmount}
        min="0"
      ></input>
      <p style={{ fontSize: "0.75rem", margin: "0", padding: "0" }} id="warn">
        {isCashEmpty ? warning4cash : null}
      </p>
      <button onClick={clickHandler}>Check</button>

      <p id="return">Return Change</p>
      <p id="warn">{output}</p>

      <table>
        <tbody>
          <tr className="row1">
            <th>No. of Notes</th>
            <td className="no_of_notes"></td>
            <td className="no_of_notes"></td>
            <td className="no_of_notes"></td>
            <td className="no_of_notes"></td>
            <td className="no_of_notes"></td>
            <td className="no_of_notes"></td>
            <td className="no_of_notes"></td>
            <td className="no_of_notes"></td>
            <td className="no_of_notes"></td>
            <td className="no_of_notes"></td>
          </tr>
          <tr className="row2">
            <th>Note</th>
            <td>2000</td>
            <td>500</td>
            <td>200</td>
            <td>100</td>
            <td>50</td>
            <td>20</td>
            <td>10</td>
            <td>5</td>
            <td>2</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
