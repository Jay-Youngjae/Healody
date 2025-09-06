import React, { useState } from 'react';

const SelectButton = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        onChange(option);
    };

    const styles = {
        label: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            marginLeft: "10px",
            width: "50px",
            height: "50px",
            whiteSpace: "nowrap",
            backgroundColor: selectedOption === options ? "black" : "#D9D9D9",
            color: selectedOption === options ? "white" : "black",
            borderRadius: "50%",
            fontSize: '70%'
        },
        circle: {
            display: "none",
        },
        cont: {
            display: "flex",
            justifyContent: "center",
            width: "365px",
        },
    };

    return (
        <div style={styles.cont}>
            {options.map((options) => (
                <label
                    key={options}
                    style={styles.label}
                    onClick={() => handleOptionChange(options)}
                        >
                  <span style={styles.circle}>
                    {selectedOption === options && <span>&#10003;</span>}
                  </span>
                    {options}
                </label>
            ))}
        </div>
    );
};

export default SelectButton;
