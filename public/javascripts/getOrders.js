/*
import React from 'react'
import axios from 'axios';
import OrderTable from "./orderTable.js";
*/

class ShowOrder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orders : []
        };
    }

    componentDidMount(){
        var tmp = this;
        axios.get(this.props.source)
            .then(function (res) {
                tmp.setState({
                    orders : res.data
                });
            });
    }

    render(){
        return React.createElement(
                "OrderTable",
                {data: this.state.orders},
                );
            /*<table className="table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Address</th>
                </tr>
                </thead>
                <OrderTable data = {this.state.orders} />
            </table>*/
            //<OrderTable data = {this.state.orders} />

    }
}

ReactDOM.render(
    React.createElement(
        ShowOrder,
        {source: "/users/getorders"})
    ,
    document.getElementById("orders")
);


