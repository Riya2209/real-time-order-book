import React, { ChangeEvent } from 'react';
import "./SelectBox.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectGrouping, setGrouping } from "../OrderBook/OrderbkSlice";

const GroupingSelectBox = ({ options }) => {
  const groupingSize = useAppSelector(selectGrouping);
  const dispatch = useAppDispatch();

  const handleChange = (event) => {
    dispatch(setGrouping(Number(event.target.value)));
  };

  return (
    <div className="grouping-select-box-container">
      <select data-testid="groupings" name="groupings" onChange={handleChange} defaultValue={groupingSize}>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            Group {option}
          </option>
        ))}
      </select>
    </div>
  );
};


export default GroupingSelectBox;
