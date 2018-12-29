import React from 'react';
import { chartsData } from '../config/ChartData';
import { Layout, Card } from 'element-react';
import { Line, Bar, Doughnut, Pie, HorizontalBar, Radar, Polar, Bubble, Scatter } from 'react-chartjs-2';
import color from 'rcolor';
import styled from 'styled-components';


const ChartsDivClass = styled.div`
    .chart-div {
        margin: 0 auto;
    }
    .el-card {
        margin-top: 2vh;
    }
    h2 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;


class Charts extends React.Component {
    constructor() {
        super();
        this.state = {
            LineData: chartsData.LineData,
            BarData: chartsData.BarData,
            DoughnutData: chartsData.DoughnutData,
            DynamicDoughnutData: chartsData.getDynamicDoughnutData(),
            PieData: chartsData.PieData,
            HorizontalBarData: chartsData.HorizontalBarData,
            RadarData: chartsData.RadarData,
            PolarData: chartsData.PolarData,
            BubbleData: chartsData.BubbleData,
            ScatterData: chartsData.ScatterData,
            RandomizedLineData: chartsData.RandomizedLineData,
            CrazyLineData: chartsData.CrazyLineData,
            LegendOptsData: chartsData.LegendOptsData,
            inputValue: "",
            LegendHlsData: chartsData.LegendHlsData
        };
        this.setInput = this.setInput.bind(this);
        this.applyLegendSettings = this.applyLegendSettings.bind(this);
    }
    
    getRandomizedLineData() {
        let oldDataSet = this.state.RandomizedLineData.datasets[0];
        let newData = [];
    
        for(let x=0; x< this.state.RandomizedLineData.labels.length; x++){
            newData.push(Math.floor(Math.random() * 100));
        }
    
        let newDataSet = {
            ...oldDataSet
        };
    
        newDataSet.data = newData;
    
        return {
            ...this.state.RandomizedLineData,
            datasets: [newDataSet]
        };
    }
    
    getCrazyLineData() {
        let oldDataSet = this.state.CrazyLineData.datasets[0];
        let newData = [];
    
        for(let x = 0; x < this.state.CrazyLineData.labels.length; x++){
            newData.push(Math.floor(Math.random() * 100));
        }
    
        let newDataSet = {
            ...oldDataSet
        };
    
        newDataSet.data = newData;
        newDataSet.backgroundColor = color();
        newDataSet.borderColor = color();
        newDataSet.hoverBackgroundColor = color();
        newDataSet.hoverBorderColor = color();
    
        return {
            ...this.state.CrazyLineData,
            datasets: [newDataSet]
        };
    }
    
    applyLegendSettings() {
        const value = this.state.inputValue;
        console.log(value)
        try {
            const opts = JSON.parse(value);
            let LegendOptsData = {
                data: this.state.LegendOptsData.data,
                legendOpts: opts
            };
            this.setState({
                LegendOptsData: LegendOptsData
            });
        } catch(e) {
            alert(e.message);
        }
    }
    
    setInput(event) {
        this.setState({inputValue: event.target.value});
    }
    
    componentWillMount() {
        this.setState({
            inputValue: JSON.stringify(this.state.LegendOptsData.legendOpts, null, 2)
        });
        setInterval(() => {
            
            this.setState({
                DynamicDoughnutData: chartsData.getDynamicDoughnutData(),
                RandomizedLineData: this.getRandomizedLineData(),
                CrazyLineData: this.getCrazyLineData()
            })
        }, 5000);
    }
    
    render() {
        return (
            <ChartsDivClass className="chart-div">
                <Card>
                    <div>https://github.com/jerairrest/react-chartjs-2</div>
                </Card>
                <Layout.Row gutter="20">
                    <Layout.Col span="8">
                        <Card>
                            <h2>Line Example</h2>
                            <Line data={this.state.LineData} />
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="8">
                        <Card>
                            <h2>Bar Example (custom size)</h2>
                            <Bar
                                data={this.state.BarData}
                                width={100}
                                height={50}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="8">
                        <Card>
                            <h2>Doughnut Example</h2>
                            <Doughnut data={this.state.DoughnutData} />
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row gutter="20">
                    <Layout.Col span="8">
                        <Card>
                            <h2>Dynamicly refreshed Doughnut Example</h2>
                            <Doughnut data={this.state.DynamicDoughnutData} />
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="8">
                        <Card>
                            <h2>Pie Example</h2>
                            <Pie data={this.state.PieData} />
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="8">
                        <Card>
                            <h2>Horizontal Bar Example</h2>
                            <HorizontalBar data={this.state.HorizontalBarData} />
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row gutter="20">
                    <Layout.Col span="8">
                        <Card>
                            <h2>Radar Example</h2>
                            <Radar data={this.state.RadarData} />
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="8">
                        <Card>
                            <h2>Polar Example</h2>
                            <Polar data={this.state.PolarData} />
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="8">
                        <Card>
                            <h2>Bubble Example</h2>
                            <Bubble data={this.state.BubbleData} />
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row gutter="20">
                    <Layout.Col span="8">
                        <Card>
                            <h2>Scatter Example</h2>
                            <Scatter data={this.state.ScatterData} />
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="8">
                        <Card>
                            <h2>Random Animated Line Example</h2>
                            <Line data={this.state.RandomizedLineData} />
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="8">
                        <Card>
                            <h2>You can even make crazy graphs like this!</h2>
                            <Bar data={this.state.CrazyLineData} />
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row gutter="20">
                    <Layout.Col span="8">
                        {/*<Card>*/}
                            {/*<h2>Legend Options Example</h2>*/}
                            {/*<textarea*/}
                                {/*cols="40"*/}
                                {/*rows="15"*/}
                                {/*value={this.state.inputValue}*/}
                                {/*onChange={this.setInput} />*/}
                            {/*<div>*/}
                                {/*<button onClick={this.applyLegendSettings}>Apply legend settings</button>*/}
                            {/*</div>*/}
                            {/*<Pie data={this.state.LegendOptsData.data} legend={this.state.LegendOptsData.legendOpts} redraw />*/}
                        {/*</Card>*/}
                    </Layout.Col>
                    <Layout.Col span="8">
                        <Card>
                            <h2>Legend Handlers Example</h2>
                            <p>Hover over label and click</p>
                            <Pie data={this.state.LegendHlsData.data} legend={this.state.LegendHlsData.legendOpts} />
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
                </Layout.Row>
                
                
            </ChartsDivClass>
        );
    }
}

export default Charts