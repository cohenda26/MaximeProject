import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Col, Form, Card, Container} from 'react-bootstrap';
import { CbListRates } from '../components/listRates/cbListRates'

import socketIOClient from "socket.io-client";
const ENDPOINT = "https://wss.live-rates.com/";
let socket = socketIOClient(ENDPOINT);;

//Use the 'trial' as key to establish a 2-minute streaming connection with real-time data.
//After the 2-minute test, the server will drop the connection and block the IP for an Hour.
var key = 'trial';
//var key = 'XXXXXXX' //YOUR LIVE-RATES SUBSCRIPTION KEY

export function PageCurrency () {
    const [currentCurrency, setCurrentCurrency] = useState("");
    const [currentObjCurrency, setCurrentObjCurrency] = useState({})
    const labelFooter = useRef();
    const codeCurrency = useRef();


    useEffect(() => { 
      socket.on('connect', function() {
        console.log(' socket.on "connect" ');
        labelFooter.current.innerText = 'socket connected';

        //     // if you want to subscribe only specific instruments, emit instruments. To receive all instruments, comment the line below.
        //   var instruments = ['EURUSD', 'USDJPY', 'BTCUSD', 'ETH']
        //   socket.emit('instruments', instruments);
          
        //socket.emit('key', key); 
      });
  
      socket.on('rates', function(msg) {
          //Do what you want with the Incoming Rates... Enjoy!
          try {
              let obj = JSON.parse(msg);
              console.log('socket.on "rates" -> result ' , obj );
              if (codeCurrency && codeCurrency.current === obj.currency) {
                console.log(' --> Affect value ', codeCurrency.current, obj)
                setCurrentObjCurrency(obj);
              }

              if (obj.info) {
                labelFooter.current.innerText = obj.info;
              }
          } catch (e) {
              console.log('socket.on "rates" -> error ', msg)
          }
  
      });
  
      // CLEAN UP THE EFFECT
      return () => {
           console.log(' socket disconnect ')
           socket.disconnect();
      }
    }, []);
    
    //https://github.com/Live-Rates/live-rates.com/blob/master/examples/Websocket-Streaming%20API/Node/streaming_client.js
    const changeCurrency = (currency) => {
        //if you want to subscribe only specific instruments, emit instruments. To receive all instruments, comment the line below.
        var instruments = [currency];
        console.log('changeCurrency ', currency);

        codeCurrency.current = currency;
        setCurrentCurrency(currency); 
        if (socket) {
            console.log('socket.emit ', instruments);
            socket.emit('instruments', instruments);
            socket.emit('key', key);
        }      

    }

    return (
        <React.Fragment>
            <Container>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Row>
                            <Col xs={3}> 
                                <Form.Label>Currency</Form.Label>
                            </Col>
                            <Col>
                                <CbListRates OnHandleChangeCurrency={changeCurrency} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formAsk">
                                <Form.Label>Ask</Form.Label>
                                <Form.Control disabled placeholder="Ask value for currency" value={currentObjCurrency.ask}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formBid">
                                <Form.Label>Bid</Form.Label>
                                <Form.Control disabled placeholder="Bid value for currency" value={currentObjCurrency.bid}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formHigh">
                                <Form.Label>High</Form.Label>
                                <Form.Control disabled placeholder="High value for currency" value={currentObjCurrency.high}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formLow">
                                <Form.Label>Low</Form.Label>
                                <Form.Control disabled placeholder="Low value for currency" value={currentObjCurrency.low}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formOpen">
                                <Form.Label>Open</Form.Label>
                                <Form.Control disabled placeholder="Open value for currency" value={currentObjCurrency.open}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formClose">
                                <Form.Label>Close</Form.Label>
                                <Form.Control disabled placeholder="Close value for currency" value={currentObjCurrency.close}/>
                            </Form.Group>
                        </Form.Row>


                    </Form>
                    <Card.Footer><h2 ref={labelFooter}>Socket not connected</h2></Card.Footer>
                </Card.Body>
            </Card>
            </Container>

        </React.Fragment>
    )
}

export default PageCurrency;