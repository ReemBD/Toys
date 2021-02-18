import { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toyService.js'


export default class MyChart extends Component {
    state = {
        data: null
    }
    componentDidMount() {
        toyService.getChartData()
            .then(data => this.setState({ data },()=>{
                console.log('state: ', this.state);
            }))
    }
    render() {
        const { data } = this.state
        if (!data) return <h1>Loading...</h1>
        return (
            <div>
                <h2>Doughnut Example</h2>
                <Doughnut data={data} />
            </div>
        );
    }
}

