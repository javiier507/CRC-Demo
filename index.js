import React from "react";
import ReactDOM from "react-dom";

class HelloMessage extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1>Hello {this.props.name}</h1>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<HelloMessage name="Yomi" />, document.getElementById("app"));