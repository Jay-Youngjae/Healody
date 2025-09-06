import React, { useState } from 'react';
import SelectButton from './SelectButton';

const Select = ({options}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // const options = ['option1', 'option2', 'option3'];
    
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const styles={
        div: {
            marginTop: "15px",
        }
    }

    return (
        <div style={styles.div}>
            <SelectButton options={options} onChange={handleOptionChange} />
            {/* <p>Selected option: {selectedOption}</p> */}
        </div>
    );
};

export default Select;