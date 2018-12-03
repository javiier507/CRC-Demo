import React from "react";

import Form from './form';
import Table from './table';

import CRC from '../modules/crc';

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serie1: [],
            serie2: []
        }

        this.calculate = this.calculate.bind(this);
    }

    calculate(message, generator) {
        let mensaje = [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1];
        let bitsRedundante = [0, 0, 0, 0];
        let generador = [1, 0, 0, 1, 1];

        let serie1 = [], serie2 = [];

        serie1 = CRC.startCRC(mensaje.slice(), bitsRedundante, generador);
        serie1 = CRC.calculateCRC(serie1.slice());

        bitsRedundante = CRC.getResidue(serie1.slice());
        serie2 = CRC.startCRC(mensaje.slice(), bitsRedundante, generador);
        serie2 = CRC.calculateCRC(serie2.slice());

        this.setState({
            serie1,
            serie2
        })
    }

    render() {
        return (
            <div className="container">
                <Form onCalculate={this.calculate} />
                <Table serie1={this.state.serie1} serie2={this.state.serie2} />
                <h1>By {this.props.name}</h1>
            </div>
        );
    }
}