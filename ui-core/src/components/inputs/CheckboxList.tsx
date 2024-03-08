import { useState, useEffect } from "react";
import Checkbox from "./Checkbox";

interface Item {
    id: string;
    label: string;
  }
  
  interface CheckboxListProps {
    items: Item[];
    small?: boolean;
  }
  
  const CheckboxList: React.FC<CheckboxListProps> = ({ items, small = false }) => {
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  
    useEffect(() => {
      const newCheckedState: { [key: string]: boolean } = {};
      items.forEach(item => {
        newCheckedState[item.id] = false;
      });
      setCheckedItems(newCheckedState);
    }, [items]);
  
    const handleCheckboxChange = (id?: string) => {
      if (id) {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
      } else {
        const allChecked = items.every(item => checkedItems[item.id]);
        const newCheckedItems: { [key: string]: boolean } = {};
        items.forEach(item => {
          newCheckedItems[item.id] = !allChecked;
        });
        setCheckedItems(newCheckedItems);
      }
    };
  
    const allChecked = items.length > 0 && items.every(item => checkedItems[item.id]);
    const someChecked = items.some(item => checkedItems[item.id]);
    const isIndeterminate = someChecked && !allChecked;
  
    return (
      <>
        <Checkbox
          label="Select All"
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={() => handleCheckboxChange()}
          small={small}
        />
        {items.map(item => (
          <Checkbox
            key={item.id}
            id={item.id}
            label={item.label}
            isChecked={!!checkedItems[item.id]}
            onChange={handleCheckboxChange}
            small={small}
          />
        ))}
      </>
    );
  };
  
  export default CheckboxList;
