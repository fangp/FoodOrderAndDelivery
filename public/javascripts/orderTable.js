//

class OrderTable extends React.Component {
    render(){
        var orderpool = this.props.data.map(function(order){
            return React.createElement(OrderEntry, {object: order});
            //(
            //    <OrderEntry object={order} />
            //);
        });
        return React.createElement("ul", orderpool);
        /*(
            <ul>
                orderpool,
            </ul>
        );*/
    }
}

class OrderEntry extends React.Component{
    render(){
        return React.createElement(
            "li",
            null,
            React.createElement("p", null, 'hello'),
            React.createElement("p", null, '{this.props.object.username}'),
            React.createElement("p", null, '{this.props.object.description}'),
            React.createElement("p", null, '{this.props.object.address}')
        );
        /*(
            <li>
                <a>{this.props.object.username}</a>
                <a>{this.props.object.description}</a>
                <a>{this.props.object.address}</a>
            </li>
        );*/
    }
}

//export default OrderTable;

