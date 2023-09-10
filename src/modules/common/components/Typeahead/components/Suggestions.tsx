import React from 'react';

interface Props {
  suggestions: string[];
  selectSuggestion: (suggestion: string) => void;
  cursor: number;
  inputValue: string;
  noResultsLabel: string;
}

const Suggestions: React.FC<Props> = ({
  suggestions,
  selectSuggestion,
  cursor,
  inputValue,
  noResultsLabel,
}) => {
  const highlightMatchingValue = (matchingValue: string, suggestion: string) => {
    const startIndex = suggestion.toLowerCase().indexOf(matchingValue.toLowerCase());
    const endIndex = startIndex + matchingValue.length;

    if (!matchingValue.length || startIndex === -1) return suggestion;

    const startPart = suggestion.slice(0, startIndex);
    const matchingPart = suggestion.slice(startIndex, endIndex);
    const endPart = suggestion.slice(endIndex);
    return (
      <>
        {startPart}
        <span className="font-bold">{matchingPart}</span>
        {endPart}
      </>
    );
  };

  const showNoResults = suggestions.length === 0;

  return (
    <ul className="m-0 mt-1 z-10 bg-[#f7f7f7] p-0 rounded-[0_0_10px_10px] border-t border-solid max-h-[300px] overflow-scroll absolute w-full">
      {suggestions.map((suggestion, index) => (
        <li
          role="suggestion"
          tabIndex={-1}
          className={`cursor-pointer p-2.5 hover:text-[#16181b] ${
            cursor === index ? 'hover:bg-blue-500 hover:text-white' : 'hover:bg-gray-200'
          } ${cursor === index ? 'text-white bg-blue-500' : ''} `}
          onClick={() => selectSuggestion(suggestion)}
          key={suggestion}
        >
          {highlightMatchingValue(inputValue, suggestion)}
        </li>
      ))}
      {showNoResults && <li className="p-2.5 pointer-events-none">{noResultsLabel}</li>}
    </ul>
  );
};

export default Suggestions;
