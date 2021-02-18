import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function SimpleSelect({ name, title, optionValues, optionTitles, value, handleChange }) {

    return (
        <div>
            <FormControl style={{
                margin: '10px',
                minWidth: 120
            }}>
                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    name={name}
                    onChange={handleChange}                    >
                    {optionValues.map((value, idx) => <MenuItem key={value} value={value}>{optionTitles[idx]}</MenuItem>)}
                </Select>
            </FormControl>
        </div >
    )
}
