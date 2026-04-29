interface Props {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
  }
  
  export default function SuggestionChips({ suggestions, onSelect }: Props) {
    return (
      <div className="flex flex-wrap gap-2 px-4 pb-3">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(s)}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all duration-150 shadow-sm hover:shadow"
          >
            {s}
          </button>
        ))}
      </div>
    );
  }