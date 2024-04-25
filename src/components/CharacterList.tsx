import { ICharacter } from "../types/character";
import removeIcon from "../assets/remove.png";

interface CharacterListProps {
  selectedCharacters: ICharacter[];
  onCharacterSelect: (character: ICharacter) => void;
  isInput?: boolean;
}

function CharacterList({
  selectedCharacters,
  onCharacterSelect,
  isInput,
}: CharacterListProps) {
  return (
    <div className="flex flex-wrap">
      {selectedCharacters.map((character) => (
        <span
          key={character.id}
          className={`p-1 bg-gray-300 rounded-md flex items-center text-gray-600 mr-1 mb-1 ${
            isInput ? "" : "cursor-pointer"
          }`}
        >
          {character.name}
          <img
            className="h-5 w-5 p-1 bg-gray-400 rounded-md ml-1 cursor-pointer"
            src={removeIcon}
            alt="Remove"
            onClick={() => onCharacterSelect(character)}
          />
        </span>
      ))}
    </div>
  );
}

export default CharacterList;
