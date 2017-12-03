import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Modal } from 'react-bootstrap';

//passed in props: onHide, recipe, onSubmit
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        recipeName: this.props.recipe.name,
        ingredientList: this.props.recipe.ingredients.join()
    };
  }

  render() {
    return (
      <Modal
            show={true}
            onHide={ this.props.onHide }
      >
      
        <Modal.Header>
          <Modal.Title>Edit Recipe</Modal.Title>
          {/* <Modal.Title>{this.state.recipes[this.state.activeKey].name}</Modal.Title> */}
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup controlId="formRecipeInput">{/* controlId is for accessibility*/}
            
            <ControlLabel>Recipe Name</ControlLabel>
            <FormControl
                        type="text"
                        value={this.state.recipeName}
                        onChange={ e => this.setState({recipeName: e.target.value}) }
            />
            <ControlLabel>Ingredients</ControlLabel>
            <FormControl
                        type="text"
                        value={this.state.ingredientList}
                        onChange={ e => this.setState({ingredientList: e.target.value}) }
            />

            </FormGroup>
          </form>
        </Modal.Body>
      
        <Modal.Footer>
          <Button onClick={ ()=> this.props.onSubmit(this.state) }>Submit</Button>
          <Button onClick={ this.props.onHide }>Close</Button>
        </Modal.Footer>

      </Modal>
    );
  }

}

export default Editor;
