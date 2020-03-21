/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

 let dataName;
 let avgUv=0;
 let avgPv=0;

 let stddevUv=0;
 let stddevPv=0;

 // среднее значение
 for (var i = 0; i < data.length; i++) {

    dataName = data[i];
    avgUv = avgUv + dataName.uv;
    avgPv = avgPv + dataName.pv;
 }
 avgUv = avgUv / data.length;
 avgPv = avgPv / data.length;


 // среднее квадратичное отклонение
for (var i = 0; i < data.length; i++) {

    dataName = data[i];
    stddevUv = Math.pow(dataName.uv - avgUv, 2); 
    stddevUv += stddevUv; 

    stddevPv = Math.pow(dataName.pv - avgPv, 2); 
    stddevPv += stddevPv; 
 }


 stddevUv = Math.sqrt(stddevUv / data.length);
 stddevPv = Math.sqrt(stddevPv / data.length);


const MaxUv = avgUv + stddevUv;
const MinUv = avgUv - stddevUv;

const MaxPv = avgPv + stddevPv;
const MinPv = avgPv - stddevPv;



class LinePv extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;
    if (MaxPv > value && MinPv > value ) {
     return <text x={x} y={y} dy={-4} fill="blue" fontSize={15} textAnchor="middle">{value}</text>;
       
    }
    return <text x={x} y={y} dy={-4} fill="red" fontSize={15} textAnchor="middle">{value}</text>;
  }
}

class LineUv extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;
    if (MaxUv > value && MinUv > value ) {
     return <text x={x} y={y} dy={-4} fill="green" fontSize={15} textAnchor="middle">{value}</text>;
       
    }
    return <text x={x} y={y} dy={-4} fill="red" fontSize={15} textAnchor="middle">{value}</text>;
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/5br7g9d6/';

  render() {
    return (
      <LineChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
        
        <Line type="monotone" dataKey="pv" stroke="#8884d8" label={<LinePv />} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" label={<LineUv />}/>
      </LineChart>
    );
  }
}
