import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:false
    };
  }

  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }

  render() {

    return (
      <div>

        <Button
          onClick={ ()=>this.open() }
        >Launch demo modal
        </Button>

        <Modal show={this.state.showModal} onHide={ ()=>this.close() }>

          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ ()=>this.close() }>Close</Button>
          </Modal.Footer>

        </Modal>

      </div>
    );
  }


}

export default App;
