import { Persona } from "@/lib/types";

interface Props {
  personas: Persona[];
  activeId: string;
  onSwitch: (id: string) => void;
}

export default function PersonaSwitcher({ personas, activeId, onSwitch }: Props) {
  return (
    <div className="flex gap-2 p-3 bg-gray-50 border-b border-gray-200 overflow-x-auto">
      {personas.map((p) => (
        <button
          key={p.id}
          onClick={() => onSwitch(p.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap border-2 ${
            activeId === p.id
              ? `${p.bgColor} shadow-sm`
              : "bg-white border-transparent text-gray-500 hover:bg-gray-100"
          }`}
        >
          <span className="text-lg">{p.avatar}</span>
          <span className={activeId === p.id ? p.color : ""}>{p.name}</span>
        </button>
      ))}
    </div>
  );
}