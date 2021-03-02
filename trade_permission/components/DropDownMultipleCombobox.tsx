

 import React, { useState } from 'react'
  import { useCombobox, useMultipleSelection } from 'downshift'

export default  function DropdownMultipleCombobox (props : any) {
    const [inputValue, setInputValue] = useState('')
    const {
      getSelectedItemProps,
      getDropdownProps,
      addSelectedItem,
      removeSelectedItem,
      selectedItems,
    } = useMultipleSelection({ initialSelectedItems: []})
    const getFilteredItems = () =>
      props.companies.filter(
        item =>
          selectedItems.indexOf(item) < 0 &&
          item.name.toLowerCase().startsWith(inputValue.toLowerCase()),
      )
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      inputValue,
      defaultHighlightedIndex: 0, // after selection, highlight the first item.
      selectedItem: null,
      items: getFilteredItems(),
      stateReducer: (state, actionAndChanges) => {
        const { changes, type } = actionAndChanges
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            return {
              ...changes,
              isOpen: true, // keep the menu open after selection.
            }
        }
        return changes
      },
      onStateChange: ({ inputValue, type, selectedItem }) => {
        switch (type) {
          case useCombobox.stateChangeTypes.InputChange:
            setInputValue(inputValue)
            break
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
          case useCombobox.stateChangeTypes.InputBlur:
            if (selectedItem) {
              setInputValue('')
              addSelectedItem(selectedItem)
            }
            break
          default:
            break
        }
      },
    })
    return (
      <div className="columns">
        <div className="column">
        <label className="label" {...getLabelProps()}>Valitse osakeet joihin haluat pyytää kaupankäytiluvan:</label>
        
          <div className="dropdown" {...getComboboxProps()}>
            <input className="input"
              {...getInputProps(
                getDropdownProps({ preventKeyAction: isOpen }),
              )}
            />
            <button {...getToggleButtonProps()} aria-label={'toggle menu'}>
              &#8595;
            </button>
          </div>
        <ul {...getMenuProps()}>
          {isOpen &&
            getFilteredItems(props.companies).map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: '#bde4ff' }
                    : {}
                }
                key={`${item.name}${index}`}
                {...getItemProps({ item, index })}
              >
                {item.name}
              </li>
            ))}
        </ul>
        </div>
      <div className="column">
        <label className="label">Valitut osakkeet:</label>
        {selectedItems.map((selectedItem, index) => (
          <span        
            key={`selected-item-${index}`}
            {...getSelectedItemProps({ selectedItem, index })}
          >
            {selectedItem.name}
            <span            
              onClick={e => {
                e.stopPropagation()
                removeSelectedItem(selectedItem)
              }}
            >
              &#10005;
            </span>
          </span>
        ))}
        </div>
        </div>
    )
  }

