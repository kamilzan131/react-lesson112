import {Component} from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";

class App extends Component{

    state={
        selectedChar: null
    }

    onCharSelected=(id)=>{
        this.setState({
            selectedChar:id
        })
    }

    render() {

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundaries>
                        <RandomChar/>
                    </ErrorBoundaries>
                    <div className="char__content">
                        <ErrorBoundaries>
                            <CharList onCharSelected={this.onCharSelected} />
                        </ErrorBoundaries>
                        <ErrorBoundaries>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBoundaries>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }

}

export default App;