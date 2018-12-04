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
                <div style={{ marginBottom: '40px' }}>
                    <h2 className="subtitle">Serie #1</h2>
                    <table className="table is-bordered is-striped is-fullwidth">
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            );
        }

        if(serie2.length > 0) {

            rows = serie2.map(this.renderRows);

            table2 = (
                <div>
                    <h2 class="subtitle">Serie #2</h2>
                    <table className="table is-bordered is-striped is-fullwidth">
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            );
        }
        
        return (
            <div style={{ paddingBottom: '40px' }}>
                {table1}
                {table2}
            </div>
        );
    }
}