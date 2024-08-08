import { SelectOption } from "../Types/types";
import styles from '../SelectComponent/select.module.css'

type OptionListProps = {
    options: SelectOption[];
    onOptionClick: (option: SelectOption) => void;
}
//Selected Option Card Component
export function OptionCard({ options, onOptionClick }:OptionListProps){
    return (
        <div className={styles.value}>
          {options.map(option => (
            <button
              key={option.id}
              onClick={(e) => {
                e.stopPropagation();
                onOptionClick(option);
              }}
              className={styles["option-card"]}
            >
              {option.label} 
              <span className={styles["remove-btn"]}>&times;</span>
            </button>
          ))}
        </div>
      );

}