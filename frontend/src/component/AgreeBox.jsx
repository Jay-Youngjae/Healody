import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
const styles={
    mainbox: {
        width: "100%",
        fontSize: "10px",
        textAlign: "center"
       
    },
    secondLabel: {
        marginTop: "15px",
        backgroundColor: "#E5E5E5",
       
    },
    inp: {
      marginRight: "20px",
    },
    lb: {
      marginRight: "40px",
    }
   
}
const AgreeBox = ({ message1, message2, agree, onAgreeChange }) => {
  return (
    <div style={styles.mainbox}>
    <div style={styles.innerbox}>
      <label style={styles.lb}>
        <input style={styles.inp}type="checkbox" checked={agree} onChange={onAgreeChange} />
        <span>
          {agree && <AiOutlineCheck className="checkmark-icon" />}
        </span>
        {message1}
        
      </label>
        <div style={styles.secondLabel}>
            {message2}
        </div>
        </div>
      <div>
        {agree ? (
          <p>약관에 동의하셨습니다.</p>
        ) : (
          <p>약관에 동의하지 않으셨습니다.</p>
        )}
      </div>
    </div>
  );
};

export default AgreeBox;