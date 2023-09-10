export const handleKeyDown = ({
  e,
  suggestions,
  cursor,
  setCursor,
  onArrowUpCallback,
  onArrowDownCallback,
  onEnterCallback,
  setShowSuggestions,
  showSuggestions,
}: {
  e: React.KeyboardEvent<HTMLInputElement>;
  suggestions: string[];
  cursor: number;
  setCursor: (number) => void;
  onArrowUpCallback: (suggestion: string) => void;
  onArrowDownCallback: (suggestion: string) => void;
  onEnterCallback: (suggestion: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
}) => {
  const keyboardKey = e.key;
  const minOptionIndex = 0;
  const maxOptionIndex = suggestions.length - 1;

  if (!showSuggestions) {
    setShowSuggestions(true);
  }

  if (keyboardKey === 'ArrowUp') {
    const nextCursor = cursor - 1;
    const newCursor = nextCursor < 0 ? maxOptionIndex : nextCursor;
    setCursor(newCursor);
    const suggestion = suggestions[newCursor];
    suggestion && onArrowUpCallback(suggestion);
  }

  if (keyboardKey === 'ArrowDown') {
    const nextCursor = cursor + 1;
    const newCursor = nextCursor > maxOptionIndex ? minOptionIndex : nextCursor;
    setCursor(newCursor);
    const suggestion = suggestions[newCursor];
    suggestion && onArrowDownCallback(suggestion);
  }

  if (keyboardKey === 'Enter') {
    const suggestion = suggestions[cursor];
    suggestion && onEnterCallback(suggestion);
  }
};
