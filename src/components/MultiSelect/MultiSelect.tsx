import React, { useState, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';

const optionsList = ['Apple', 'Banana', 'Cherry', 'Mango', 'Pineapple'];

const MultiSelect = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSelect = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const removeItem = (item: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening when removing item
    setSelected(selected.filter((i) => i !== item));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const styles: Record<string, CSSProperties> = {
    container: {
      position: 'relative',
      width: '16rem',
    },
    selector: {
      border: '1px solid #cbd5e0',
      borderRadius: '0.25rem',
      padding: '0.5rem',
      cursor: 'pointer',
      backgroundColor: 'white',
      position: 'relative',
      zIndex: 1,
    },
    placeholder: {
      color: '#a0aec0',
    },
    dropdown: {
      position: 'absolute',
      zIndex: 5,
      marginTop: '0.25rem',
      backgroundColor: 'grey',
      border: '1px solid #e2e8f0',
      borderRadius: '0.25rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxHeight: '15rem',
      overflowY: 'auto',
    },
    option: {
      padding: '0.5rem',
      cursor: 'pointer',
    },
    optionHover: {
      backgroundColor: '#f7fafc',
    },
    selectedOption: {
      backgroundColor: '#ebf8ff',
      fontWeight: 600,
    },
    selectedContainer: {
      marginTop: '0.5rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
    },
    selectedTag: {
      backgroundColor: '#bee3f8',
      color: '#2c5282',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      borderRadius: '0.25rem',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    removeButton: {
      marginLeft: '0.25rem',
      fontWeight: 'bold',
      color: '#2c5282',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
  };

  return (
    <div style={styles.container} ref={dropdownRef}>
      <div style={styles.selector} onClick={() => setOpen(!open)}>
        {selected.length > 0 ? (
          selected.join(', ')
        ) : (
          <span style={styles.placeholder}>Select fruits...</span>
        )}
      </div>

      {open && (
        <div style={styles.dropdown}>
          {optionsList.map((option) => (
            <div
              key={option}
              style={{
                ...styles.option,
                ...(selected.includes(option) ? styles.selectedOption : {}),
              }}
              onClick={() => toggleSelect(option)}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f7fafc';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = selected.includes(
                  option
                )
                  ? '#ebf8ff'
                  : '';
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}

      <div style={styles.selectedContainer}>
        {selected.map((item) => (
          <span
            key={item}
            style={styles.selectedTag}
            onClick={(e) => removeItem(item, e)}
          >
            {item}
            <span style={styles.removeButton}>×</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
