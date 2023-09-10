import React, { useRef, useState } from 'react';
import { BasicTypeaheadProps } from '../types';
import Suggestions from './Suggestions';
import { handleKeyDown } from '../helpers';
import { useOnValueChange, useOutsideClick } from '../hooks';

const BasicTypeahead: React.FC<BasicTypeaheadProps> = (props) => {
  const {
    options,
    noResultsLabel = 'No matches found.',
    placeholder = 'Search for city...',
    onValueChange,
  } = props;
  const [inputValue, setInputValue] = useState({ current: '', initial: '' });
  const [filterBy, setFilterBy] = useState('');
  const [cursor, setCursor] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = options.filter((suggestion) =>
    suggestion.toLowerCase().includes(filterBy.toLowerCase()),
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFilterBy(newValue);
    setInputValue((prev) => ({ ...prev, current: newValue, initial: newValue }));
    setCursor(-1);
  };

  const handleFocus = () => setShowSuggestions(true);

  const handleSelectSuggestion = (suggestion: string) => {
    inputRef.current?.focus();
    setShowSuggestions(false);

    setInputValue((prev) => ({ ...prev, current: suggestion, initial: suggestion }));
    setFilterBy(suggestion);
    setFilterBy('');
  };

  useOnValueChange(inputValue.current, onValueChange);

  const autocompleteRef = useOutsideClick(() => {
    setShowSuggestions(false);
    setInputValue((prev) => ({ ...prev, current: prev.initial }));
    setCursor(-1);
  });

  return (
    <div ref={autocompleteRef} className="w-full relative">
      <input
        ref={inputRef}
        tabIndex={0}
        onKeyDown={(e) =>
          handleKeyDown({
            e,
            cursor,
            setCursor,
            suggestions,
            showSuggestions,
            setShowSuggestions,
            onArrowUpCallback: (suggestion) =>
              setInputValue((prev) => ({ ...prev, current: suggestion })),
            onArrowDownCallback: (suggestion) =>
              setInputValue((prev) => ({ ...prev, current: suggestion })),
            onEnterCallback: (suggestion) => handleSelectSuggestion(suggestion),
          })
        }
        value={inputValue.current}
        className="w-full rounded-md h-10 text-base mx-0 pt-1.5 pb-0 px-2.5 text-[#495057] bg-white focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,0.25)] focus:border-[#80bdff] outline-none"
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={handleFocus}
      />
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

export default BasicTypeahead;
