



// Приклад функціонального компонента
function Welcome(props) {
    return <h1>Привіт, {props.name}</h1>;
}

// Приклад класового компонента
class Welcome extends React.Component {
    render() {
      return <h1>Привіт, {this.props.name}</h1>;
    }
}