import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Well, Button, PanelGroup, Panel, ListGroupItem, ListGroup } from 'react-bootstrap';
import Editor from './Editor';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.addingNew = false;
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
      activeKey: 0
    };
  }

  //page load and app will mount? retrieve data from localStorage if modified.
  componentWillMount(){
    //check if a recipe array has been saved in local storage via its key, then...
    localStorage.getItem('savedRecipes') ?
      //make a js value from the json string value in local storage, then use it to set state.
      this.setState({recipes: JSON.parse( localStorage.getItem('savedRecipes') ) })
      :
      console.log('no recipes in local storage, defaults will load.');

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
  deleteRecipe(activeKey) {
    let moddedRecipeArr = this.state.recipes;
    moddedRecipeArr.splice(activeKey,1);
    //now that you have a modded recipe array, pass it to saveToLocalFirst() like you did with onSubmit()
    this.saveToLocalFirst(moddedRecipeArr);
  }

  //receive modded state from onSubmit() and save it to local storage before updating component state
  saveToLocalFirst(recipeArr){
    //save to Window.localStorage via Web Storage API methods 
    let JSONArr = JSON.stringify(recipeArr); //convert the JS value (in this case an array of strings) to JSON encoded string
    localStorage.setItem('savedRecipes', JSONArr );
    //update state
    this.setState(
      {
        recipes: recipeArr,
        changedFromDefault: true
      }
    );
  }
  //handle submission from Editor component
  onSubmit(data){
    console.log('App has received: ', data);
    //copy recipes from state to modify
    let newRecipeArr = this.state.recipes;
    //if editing a recipe then...
    if (!this.addingNew){
      newRecipeArr[this.state.activeKey] = {
        name: data.name,
        ingredients: data.ingredients
      };
      this.saveToLocalFirst(newRecipeArr);
    }
    //adding a new recipe! then...
    else{
      newRecipeArr.push(
        {
          name: data.name,
          ingredients: data.ingredients
        }
      );
      this.saveToLocalFirst(newRecipeArr);
      //reset new recipe checker
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

        {/* nice output on no recipes with a reset */}
        { this.state.recipes.length ?
            undefined
            :
            <div className='noRecipesOutput'>
              <Well>No recipes, boohoo.</Well>
              <Button 
                     bsStyle="info"
                     onClick={ ()=>{ 
                      localStorage.removeItem('savedRecipes');
                      this.setState(
                        { 
                          recipes:
                            [ 
                              {name: 'Cake', ingredients: ['flour','eggs','sugar','cocoa']},
                              {name: 'Cookie', ingredients: ['flour','butter','sugar','love']},
                              {name: 'Pasta', ingredients: ['bacon','eggs','noodles'] }
                            ]
                        }
                      );
                     }
                     }
              >
                Get default recipes
              </Button>
            </div>
        }

        <PanelGroup activeKey={this.state.activeKey} onSelect={ activeKey => this.handleSelect(activeKey) } accordion>
          {recipePanels}
        </PanelGroup>

        <Button 
                bsSize="large"
                bsStyle="primary"
                onClick={ ()=>{ this.addingNew = true; this.open() } }
        >
          Add Recipe
        </Button>

      </div>
    );
  }

}

export default App;
