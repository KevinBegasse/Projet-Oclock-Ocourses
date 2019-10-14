import React from 'react';
import { Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import axios from 'axios';

//Local imports
import './styles.scss';

import Fred from './fred2.png';
import Jamy from './jamy1.png';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            name: "",
            surname:"",
            email: "",
        }
        console.log('state', this.state)
        if(window.localStorage.getItem('cool-jwt') === null){
            console.log('pas de jwt');
        } else {
            console.log('jwt detécté')
            let userId= jwtDecode((window.localStorage.getItem('cool-jwt')));
            console.log(userId._id);
            axios.get(`http://localhost:8800/api/user/getuser/${userId._id}`)
                    .then(res => {
                    console.log('voila la réponses suite à connected user', res.data)
                    this.setState({...this.state, isConnected : true,
                    name: res.data.name,
                    surname: res.data.surname,
                    email: res.data.email,})
                    console.log('state après connexion', this.state)
                    console.log(this.state.isConnected)
                })
            
    }
}

componentDidUpdate(){
    console.log('state du CDM', this.state)
}

    render(){
        console.log('state du main après le construct:', this.state)
        return (
        <div className="mainContainer">
            <p className="navigation">▶ Accueil</p>
            {this.state.isConnected && 
            <p>Bonjour {this.state.name} !
            </p>
        }
        <div className="gradient-box">
        <div className="topSpeech">
                    
            <h2 className="slogan">On ne peut pas pousser pas votre caddie 
            mais on peut vous aider pour le reste !</h2>
            <div className="description">
                <div className="fred">
                    <img className="fred-img" src={Fred}/>
                    <div className="fred-text">Mais alors dis-moi Jamy, qu'est-ce que c'est O'Courses ?</div>
                </div>
            
                <div className="jamy">
                    <div className="jamy-text">O'Courses, c'est l'application qui va te faciliter la vie 
                    en te permettant de créer et gérer tes listes de courses. 
                    Parce que moins de temps à faire les courses,
                    c'est plus de temps pour manger !
                    </div>
                    <img className="jamy-img" src={Jamy}/>
                    
                    </div>
                </div>
            </div>
        </div>


                <div className="mainContent"><a href="">
                <div className="title">Lasagnes à l'italienne</div>
                <div className="lasagnes"> 
                    <div className="summary">
                    <Responsive minWidth={1024}>
                        <ul className="recipe-items">
                            <li>- 1 Carotte </li>
                            <li>- 1 Branche de céleri </li>
                            <li>- 800gr hâché mélangé </li>
                            <li>- Sauce tomate </li>
                            
                        </ul>
                        </Responsive>
                        </div>    
                    </div>
                    </a>
                </div>
                <div className="mainContent"><a href="">
                    <div className="title">Crêpes au suc'</div>
                    <div className="crepes"> 
                        <div className="summary">
                        <Responsive minWidth={1024}>
                        <ul className="recipe-items">
                            <li>- 300gr de farine</li>
                            <li>- 3 oeufs</li>
                            <li>- 50gr de beurre fondu</li>
                            <li>- 60cl de lait</li>
                            <li>- Du suc'</li>
                        </ul>
                        </Responsive>
                        </div>    
                    </div>
                    </a>
                </div>
                <div className="mainContent"><a href="">
                    <div className="title">Pizza maison</div>
                    <div className="pizza"> 
                        <div className="summary">
                        <Responsive minWidth={1024}>
                        <ul className="recipe-items">
                            <li>- Mortadelle</li>
                            <li>- 1 poivron</li>
                            <li>- 3 champignons</li>
                            <li>- Mozzarella</li>
                            
                        </ul>
                        </Responsive>
                        </div>    
                    </div>
                    </a>
                </div>
                <div className="mainContent"><a href="">
                    <div className="title">Pizza maison</div>
                    <div className="pizza"> 
                        <div className="summary">
                        <Responsive minWidth={1024}>
                        <ul className="recipe-items">
                            <li>- Mortadelle</li>
                            <li>- 1 poivron</li>
                            <li>- 3 champignons</li>
                            <li>- Mozzarella</li>
                            
                        </ul>
                        </Responsive>
                        </div>    
                    </div>
                    </a>
                </div>
            </div>
        )
            
};
}
// Étape 1 : on définit des stratégies de connexion au store de l'app.
const connectionStrategies = connect(
    // 1er argument : stratégie de lecture (dans le state privé global)
    (state, ownProps) => {
      return {
        ...state,
      };
    },
  
    // 2d argument : stratégie d'écriture (dans le state privé global)
    (dispatch, ownProps) => {
      return {
        updateState: (newState) => {
            dispatch({ type : 'UPDATE_STATE', value : newState })
        },
        setConnecterUser: (userId) => {
            dispatch({ type : 'USER_CONNECTED', value : userId })
        }
        
      };
    },
  );
  
  // Étape 2 : on applique ces stratégies à un composant spécifique.
  const MainContainer = connectionStrategies(Main);
  
  // Étape 3 : on exporte le composant connecté qui a été généré
  export default MainContainer;