import { ICharacter } from "../types/character";
import HighlightText from "./HighLightText";

interface CharacterItemProps {
  character: ICharacter;
  queryParams: string;
  isSelected: boolean;
}

function CharacterItem({
  character,
  queryParams,
  isSelected,
}: CharacterItemProps) {
  return (
    <li
      className={`hover:bg-gray-300 cursor-pointer border-b border-gray-800 flex items-center p-2 w-full ${
        isSelected ? "bg-gray-300" : ""
      }`}
    >
      <input
        className="h-4 w-4 mr-2 cursor-pointer"
        type="checkbox"
        checked={isSelected}
        readOnly
      />
      <img
        className="h-10 w-10 rounded-md ml-2"
        src={character.image}
        alt="Photo"
      />
      <div className="ml-2">
        <p className="text-start">
          {" "}
          <HighlightText text={character.name} highlight={queryParams} />
        </p>
        <p className="text-gray-400 text-start">
          {character.episode.length} Episodes
        </p>
      </div>
    </li>
  );
}

export default CharacterItem;
