import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export default function AddressForm() {
	const [age, setAge] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};

	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<Typography variant="h6" gutterBottom>
						From Supertoken
					</Typography>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={age}
						label="Age"
						onChange={handleChange}
						fullWidth
					>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</Grid>

				<Grid item xs={12} sm={12}>
					<Typography variant="h6" gutterBottom>
						To Supertoken
					</Typography>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={age}
						label="Age"
						onChange={handleChange}
						fullWidth
						style={{ color: 'white' }}
					>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<SwapHorizIcon />
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="address1"
						name="address1"
						label="Amount to swap"
						fullWidth
						autoComplete="shipping address-line1"
						variant="standard"
						style={{ color: 'white' }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="address2"
						name="address2"
						label="Minimum Amount Swapped"
						fullWidth
						autoComplete="shipping address-line2"
						variant="standard"
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
