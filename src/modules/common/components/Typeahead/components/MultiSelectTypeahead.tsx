import React, { useRef, useState } from 'react';
import { MultiSelectTypeaheadProps } from '../types';
import Suggestions from './Suggestions';
import { handleKeyDown } from '../helpers';
import { useOnValueChange, useOutsideClick } from '../hooks';

const MultiSelectTypeahead: React.FC<MultiSelectTypeaheadProps> = (props) => {
  const {
    options,
    noResultsLabel = 'No matches found.',
    placeholder = 'Search for city...',
    onValueChange,
    onSelectionChange,
  } = props;
  const [inputValue, setInputValue] = useState({ current: '', initial: '' });
  const [filterBy, setFilterBy] = useState('');
  const [selections, setSelections] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focused, setFocused] = useState(false);

  const suggestions = options
    .filter((suggestion) => suggestion.toLowerCase().includes(filterBy.toLowerCase()))
    .filter((suggestion) => {
      const exists = !!selections.find((selection) => selection === suggestion);
      return !exists;
    });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddSelection = (selection) => setSelections((prev) => [...prev, selection]);
  const handleRemoveSelection = (selectionIndex: number) => {
    const filteredSelections = selections.filter((_, index) => selectionIndex !== index);
    setSelections(filteredSelections);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFilterBy(newValue);
    setInputValue((prev) => ({ ...prev, current: newValue, initial: newValue }));
    setCursor(-1);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    inputRef.current?.focus();
    setShowSuggestions(false);
    setInputValue((prev) => ({ ...prev, current: '', initial: '' }));
    setFilterBy('');
    handleAddSelection(suggestion);
  };

  useOnValueChange(inputValue.current, onValueChange);

  useOnValueChange(selections, onSelectionChange);

  const autocompleteRef = useOutsideClick(() => {
    setShowSuggestions(false);
    setInputValue((prev) => ({ ...prev, current: prev.initial }));
    setCursor(-1);
  });

  return (
    <div ref={autocompleteRef} className="w-full relative">
      <div
        onClick={() => inputRef.current?.focus()}
        className={`cursor-text w-full rounded-md min-h-[2.5rem] text-base mx-0 pt-1.5 pb-0 px-2.5 text-[#495057] bg-white ${
          focused ? 'shadow-[0_0_0_0.2rem_rgba(0,123,255,0.25)] border-[#80bdff]' : ''
        }`}
      >
        <ul className="flex m-0 p-0 gap-2 flex-wrap py-1.5 ">
          <>
            {selections.map((selection, selectionIndex) => (
              <li
                onClick={(e) => e.stopPropagation()}
                key={selectionIndex}
                className="cursor-pointer bg-[#e7f4ff] rounded text-[#007bff] flex px-2 hover:bg-[#007bff] hover:text-[#e7f4ff]"
              >
                <span>{selection}</span>
                <span
                  className="ml-2 hover:text-red-600"
                  onClick={() => handleRemoveSelection(selectionIndex)}
                >
                  x
                </span>
              </li>
            ))}
            <input
              className={`text-base text-[#495057] bg-white outline-none flex-1`}
              ref={inputRef}
              tabIndex={0}
              onKeyDown={(e) =>
                handleKeyDown({
                  e,
                  setCursor,
                  cursor,
                  showSuggestions,
                  setShowSuggestions,
                  suggestions,
                  onArrowUpCallback: (suggestion) =>
                    setInputValue((prev) => ({ ...prev, current: suggestion })),
                  onArrowDownCallback: (suggestion) =>
                    setInputValue((prev) => ({ ...prev, current: suggestion })),
                  onEnterCallback: (suggestion) => handleSelectSuggestion(suggestion),
                })
              }
              value={inputValue.current}
              onChange={handleChange}
              placeholder={placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </>
        </ul>
      </div>
      {showSuggestions && (
        <Suggestions
          cursor={cursor}
          inputValue={inputValue.current}
          noResultsLabel={noResultsLabel}
          selectSuggestion={handleSelectSuggestion}
          suggestions={suggestions}
        />
      )}
    </div>
  );
};

export default MultiSelectTypeahead;
