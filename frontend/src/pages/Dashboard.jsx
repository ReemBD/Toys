import MyChart from '../cmps/MyChart.jsx'
import { Component } from 'react'
import {Title} from '../cmps/Title.jsx'
export class Dashboard extends Component {
    render() {
        return <div className="dashboard">
            <Title classNames="title">Dashboard</Title>
            <MyChart />
        </div>
    }
}
