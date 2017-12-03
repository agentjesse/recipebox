import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, PanelGroup, Panel, ListGroupItem, ListGroup } from 'react-bootstrap';
import Editor from './Editor';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.addingNew = false;
    this.showWhenEmpty = <Panel header='No recipes, boohoo.' bsStyle='danger' />;
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
    switch(this.addingNew){
      case true:
        ReactDOM.render(<Editor
                          onHide={ this.close }
                          recipe={ {name:'', ingredients:[]} }
                          onSubmit={ data => this.onSubmit(data) }
                    />, document.getElementById('mountPoint'));
        break;
      default:
        ReactDOM.render(<Editor
                          onHide={ this.close }
                          recipe={ this.state.recipes[this.state.activeKey] }
                          onSubmit={ data => this.onSubmit(data) }
                    />, document.getElementById('mountPoint'));
        break;
    }
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
    //get recipe data from state then return modified
    let newRecipeArr = this.state.recipes;
    
    if (!this.addingNew){
      newRecipeArr[this.state.activeKey] = {
        name: data.name,
        ingredients: data.ingredients
      };
      this.setState({ recipes: newRecipeArr });
    }
    else{
      newRecipeArr.push(
        {
          name: data.name,
          ingredients: data.ingredients
        }
      );
      this.setState({ recipes: newRecipeArr });
      this.addingNew = false;
    }
  }

  render() {
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

        { this.state.recipes.length ? undefined : this.showWhenEmpty }

        <PanelGroup activeKey={this.state.activeKey} onSelect={ activeKey => this.handleSelect(activeKey) } accordion>
          {recipePanels}
        </PanelGroup>

        <Button onClick={ ()=>{ this.addingNew = true; this.open() } }>
          Add Recipe
        </Button>

      </div>
    );
  }

}

export default App;
