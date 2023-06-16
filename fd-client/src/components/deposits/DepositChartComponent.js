import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { groupBy } from 'lodash';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const groupDepositsByMonth = (deposits, year) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const filteredDeposits = deposits.filter(
        (deposit) => new Date(deposit.maturityDate).getFullYear() === year
    );

    const groupedDeposits = groupBy(filteredDeposits, (deposit) => {
        return new Date(deposit.maturityDate).getMonth();
    });

    const result = Array.from({ length: 12 }, (_, i) => {
        const key = i.toString();
        const depositsInMonth = groupedDeposits[key] || [];
        return {
            name: months[i],
            amount: depositsInMonth.reduce((sum, deposit) => sum + deposit.amount, 0),
        };
    });

    return result;
};

export default class DepositChartComponent extends PureComponent {
    constructor(props) {
        super(props);

        const currentYear = new Date().getFullYear();
        this.state = {
            selectedYear: currentYear,
        };

        this.handleYearChange = this.handleYearChange.bind(this);
    }

    handleYearChange(event) {
        const year = parseInt(event.target.value);
        this.setState({ selectedYear: year });
    }

    render() {
        const { selectedYear } = this.state;
        const groupedDeposits = groupDepositsByMonth(this.props.deposits, selectedYear);

        return (
            <div>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl >
                        <InputLabel id="year-select-label">year</InputLabel>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            label="Year"
                            value={selectedYear}
                            onChange={this.handleYearChange}
                        >
                            <MenuItem value={2023}>2023</MenuItem>
                            <MenuItem value={2022}>2022</MenuItem>
                            <MenuItem value={2021}>2021</MenuItem>
                            <MenuItem value={2020}>2020</MenuItem>
                            <MenuItem value={2019}>2019</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={groupedDeposits}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}
