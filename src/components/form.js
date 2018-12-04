import React from "react";

export default class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            generator: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onCalculate(this.state.message, this.state.generator);
    }

    render() {
        return (
            <form style={{ paddingBottom: '40px' }} onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label">Mensaje</label>
                    <div className="control">
                        <input type="text" 
                        className="input" 
                        placeholder="Ingresar Mensaje"
                        name="message"
                        onChange={this.handleChange}
                        value={this.state.message} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Polinomio Generador</label>
                    <div className="control">
                        <input type="text" 
                        className="input" 
                        placeholder="Ingresar Polionomio"
                        name="generator"
                        onChange={this.handleChange}
                        value={this.state.generator} />
                    </div>
                </div>
                <button type="submit" className="button is-primary">Simular</button>
            </form>
        );
    }
}