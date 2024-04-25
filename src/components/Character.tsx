import { ICharacter } from "../types/character";
import HighlightText from "./HighLightText";

interface CharacterProps {
  character: ICharacter;
  queryParams: string;
  selected: boolean;
}

function Character({ character, queryParams, selected }: CharacterProps) {
  return (
    <>
      <input
        className="h-4 w-4 mr-2"
        type="checkbox"
        checked={selected}
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
    </>
  );
}

export default Character;
