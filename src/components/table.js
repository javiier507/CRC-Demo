import React from "react";

export default class Table extends React.Component {
    
    renderRows(items, index) {
        let result = [];

        result = items.map( (elem, i) => {
            return (
                <td key={i}>{elem}</td>
            )
        });

        return (
            <tr key={index}>{result}</tr>
        );
    }
    
    render() {
        
        let {serie1, serie2} = this.props;
        
        let table1, table2, rows; 

        if(serie1.length > 0) {

            rows = serie1.map(this.renderRows);

            table1 = (
                <table className="table is-bordered is-striped is-fullwidth">
                    <tbody>{rows}</tbody>
                </table>
            );
        }

        if(serie2.length > 0) {

            rows = serie2.map(this.renderRows);

            table2 = (
                <table className="table is-bordered is-striped is-fullwidth">
                    <tbody>{rows}</tbody>
                </table>
            );
        }
        
        return (
            <div className="tableCustom">
                {table1}
                {table2}
            </div>
        );
    }
}