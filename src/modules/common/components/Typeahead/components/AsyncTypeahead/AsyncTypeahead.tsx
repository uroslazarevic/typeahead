import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { AsyncTypeaheadProps } from '../../types';
import { handleKeyDown } from '../../helpers';
import { useOnValueChange, useOutsideClick } from '../../hooks';
import { createMemoryCache } from 'modules/common/utils';
import Spinner from './Spinner';
import Suggestions from '../Suggestions';

const cache = createMemoryCache<string[]>();

const AsyncTypeahead: React.FC<AsyncTypeaheadProps> = (props) => {
  const {
    options,
    noResultsLabel = 'No matches found.',
    debounceTimeMS = 250,
    placeholder = 'Search for city...',
    onSearch,
    onValueChange,
  } = props;
  const [searchOptions, setSearchOptions] = useState(options || []);
  const [inputValue, setInputValue] = useState({ current: '', initial: '' });
  const [filterBy, setFilterBy] = useState('');
  const [cursor, setCursor] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = searchOptions.filter((suggestion) =>
    suggestion.toLowerCase().includes(filterBy.toLowerCase()),
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectSuggestion = (suggestion: string) => {
    inputRef.current?.focus();
    setShowSuggestions(false);

    setInputValue((prev) => ({ ...prev, current: suggestion, initial: suggestion }));
    setFilterBy(suggestion);
    setFilterBy('');
  };

  useEffect(() => {
    setSearchOptions(options || []);
  }, [options]);

  useOnValueChange(inputValue.current, onValueChange);

  const autocompleteRef = useOutsideClick(() => {
    setShowSuggestions(false);
    setInputValue((prev) => ({ ...prev, current: prev.initial }));
    setCursor(-1);
  });

  const debouncedSearch = useRef(
    debounce((query: string) => {
      return onSearch(query)
        .then((searchOptions) => {
          cache.set(query, searchOptions as string[]);
          setSearchOptionsFromCache(searchOptions);
        })
        .finally(() => setIsLoading(false));
    }, debounceTimeMS),
  );

  const setSearchOptionsFromCache = (results) => setSearchOptions(results);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const newValue = event.target.value;
    setFilterBy(newValue);
    setInputValue((prev) => ({ ...prev, current: newValue, initial: newValue }));
    setCursor(-1);

    if (!cache.has(query) || cache.isExpired(query, 15)) {
      setIsLoading(true);
      debouncedSearch.current(query);
    } else {
      const results = cache.get(query);
      setSearchOptionsFromCache(results);
    }
  };

  const handleFocus = () => setShowSuggestions(true);

  return (
    <div ref={autocompleteRef} className="w-full relative">
      <div
        onClick={() => inputRef.current?.focus()}
        className="cursor-text w-full rounded-md min-h-[2.5rem] flex text-base mx-0 pt-1.5 pb-0 px-2.5 text-[#495057] bg-white focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,0.25)] focus:border-[#80bdff]"
      >
        <input
          className={`text-base text-[#495057] bg-white outline-none flex-1`}
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
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder}
        />
        <Spinner hidden={!isLoading} />
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

export default AsyncTypeahead;
