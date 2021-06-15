import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

/*const App = () => {
    window.navigator.geolocation.getCurrentPosition(
        position=>console.log(position),
        err=>console.log(err)
    );
    return (
        <div>Hi there!</div>
    );
};*/

class App extends React.Component {
    /*constructor(props) {
        super(props);

        this.state = { lat: null, errorMessage: '' };
    }*/

    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    renderContent()
    {
        //Conditional Rendering
        if (this.state.lat && !this.state.errorMessage) {
            return <SeasonDisplay lat={this.state.lat} />
        }
        if (!this.state.lat && this.state.errorMessage) {
            return <div>Error:{this.state.errorMessage}</div>
        }
        return <Spinner message="Please accept Location Request"/>
    }
    //React says we have to define render!!!
    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(
    <App />, document.querySelector('#root')
);