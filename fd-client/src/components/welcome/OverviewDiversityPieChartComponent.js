import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

// const data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
// ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class OverviewDiversityPieChartComponent extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

    render() {
        const { data } = this.props;
        return (
            <ResponsiveContainer width="95%" height="100%">
                <PieChart onMouseEnter={this.onPieEnter}>
                    {/* <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie> */}
        
                    <Pie
                        data={data}
                        //   cx={420}
                        //   cy={200}
                        //   startAngle={180}
                        //   endAngle={0}
                        innerRadius={50}
                        outerRadius={120}
                        fill="#8884d8"
                        //   paddingAngle={5}
                        dataKey="value"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}
