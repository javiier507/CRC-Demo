import React from "react";

import Form from './form';
import Table from './table';

import CRC from '../modules/crc';
import Polinomial from '../modules/polinomial';
//import Scraping from '../modules/webscrap';

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
        
        if(!isNaN(message)) {

            let mensaje = message.split("").map(Number);
            let generador = Polinomial(generator);
            let bitsRedundante = CRC.getRedundantBits(generador.length);

            //Scraping();
        
            //mensaje = 11010111011;
            //generador = 10011 = X^4+x+1;

            let serie1 = [], serie2 = [];

            serie1 = CRC.startCRC(mensaje.slice(), bitsRedundante, generador);
            serie1 = CRC.calculateCRC(serie1.slice());

            bitsRedundante = CRC.getResidue(serie1.slice(), generador.length);
            serie2 = CRC.startCRC(mensaje.slice(), bitsRedundante, generador);
            serie2 = CRC.calculateCRC(serie2.slice());

            this.setState({
                serie1,
                serie2
            });
        }
    }

    render() {
        return (
            <div className="container">
                <section className="hero is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Universidad Tecnológica de Panamá
                            </h1>
                            <h2 className="subtitle">
                                Teleinformática 2018. <span>By {this.props.name}</span>
                            </h2>
                        </div>
                    </div>
                </section>
                <Form onCalculate={this.calculate} />
                <Table serie1={this.state.serie1} serie2={this.state.serie2} />
            </div>
        );
    }
}