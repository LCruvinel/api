/*
async componentDidMount() {
    let accessString = localStorage.getItem('JWT');
    if (accessString == null) {
        this.setState({
            isLoading: false,
            error: true,
        });
    }
    await axios
    .get('http://localhost:3000/findUser', {
        params: {
            username: this.props.match.params.username,
        },
        headers: { Authorization: `JWT ${accessString}` },
    })
    .then(response => {
        this.setState({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            username: response.data.username,
            password: response.data.password,
            isLoading: false,
            error: false,
        });
    })
    .catch(error => {
        console.log(error.data);
    });
}
*/