import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, PanelGroup, Panel, ListGroupItem, ListGroup } from 'react-bootstrap';
import Editor from './Editor';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          name: 'Cake',
          ingredients: ['flour','eggs','sugar','cocoa']
        },
        {
          name: 'Cookie',
          ingredients: ['flour','butter','sugar','love']
        },
        {
          name: 'Pasta',
          ingredients: ['bacon','eggs','noodles']
        }
      ],
      showModal:false,
      activeKey: 0
    };
  }
  // modal open/close functions via react dom rendering to refresh state
  close() {
    ReactDOM.unmountComponentAtNode( document.getElementById('mountPoint') )
  }
  open() {
    console.log(this.state.activeKey);
    ReactDOM.render(<Editor
                          onHide={ this.close }
                          recipe={ this.state.recipes[this.state.activeKey] }
                          onSubmit={ data => this.onSubmit(data) }
                    />, document.getElementById('mountPoint'));
  }
  //recipe viewing functions
  handleSelect(activeKey) {
    this.setState({ activeKey });
  }
  deleteRecipe(index) {
    let copyRecipes = this.state.recipes;
    copyRecipes.splice(index,1);
    this.setState({ recipes:copyRecipes });
  }
  //handle submission from Editor component
  onSubmit(data){
    console.log('App has received: ', data);
  }

  render() {
    //try moving this out of the render function later
    let showWhenEmpty = <Panel header='No recipes, boohoo.' bsStyle='danger' />;
    //make an array of jsx panels to insert into panelgroup component below
    let recipePanels = this.state.recipes.map((recipeObj,recipeIndex)=>{
        return (
          <Panel header={recipeObj.name} eventKey={recipeIndex} key={recipeIndex}>
            <ListGroup fill>
              {
                recipeObj.ingredients.map((ingredient,ingredientIndex)=>{
                    return(
                      <ListGroupItem key={ingredientIndex}>{ingredient}</ListGroupItem>
                    );
                  }
                )
              }
              <ListGroupItem>
                <Button onClick={ ()=>this.open() }>Edit Recipe</Button>
                {/* <Button onClick={ ()=>{ this.deleteRecipe(recipeIndex) } }>Delete Recipe</Button> */}
                <Button onClick={ ()=>{ this.deleteRecipe(this.state.activeKey) } }>Delete Recipe</Button> 
              </ListGroupItem>

            </ListGroup>

          </Panel>
        );
      }
    );

    return (
      <div className='App'>

        <div id="mountPoint"></div>

        { this.state.recipes.length ? undefined : showWhenEmpty }

        <PanelGroup activeKey={this.state.activeKey} onSelect={ (activeKey)=> this.handleSelect(activeKey) } accordion>
          {recipePanels}
        </PanelGroup>

      </div>
    );
  }

}

export default App;
