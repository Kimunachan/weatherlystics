import { useState } from "react";
import styles from "@/styles/components/dropdown.module.scss";

export type DropdownOption = {
  label: string;
  value: any;
};

type Props = {
  options: DropdownOption[];
  onChange?: (value: DropdownOption | undefined) => void;
  resetOnChange?: boolean;
  defaultValue?: string;
  className?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  clearable?: boolean;
  selectable?: boolean;
};

const Dropdown = ({
  clearable,
  width,
  height,
  fontSize,
  options,
  onChange,
  resetOnChange,
  className,
  defaultValue,
  selectable,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | undefined>();

  return (
    <div
      data-testid="dropdown-wrapper"
      style={{
        width,
        height,
        fontSize,
      }}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
      tabIndex={0}
      className={`${styles.container} ${className}`}
    >
      <span className={styles.value} data-testid="label">
        {selected ? selected.label : defaultValue ?? "Option Auswählen"}
      </span>
      {!!clearable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange && onChange(undefined);
            setSelected(undefined);
          }}
          className={styles.clearButton}
          data-testid="clear-button"
        >
          &times;
        </button>
      )}
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul
        className={`${styles.options} ${open ? styles.show : ""}`}
        data-testid="dropdown-options"
      >
        {options.map((option) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              if (!!selectable) {
                if (!resetOnChange) setSelected(option);
                onChange && onChange(option);
              }
            }}
            className={styles.option}
            key={option.value}
            data-testid="dropdown-option"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
