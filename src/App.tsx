import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useGetCharacters } from "./services/character";
import { ICharacter } from "./types/character";
import CharacterItem from "./components/CharacterItem";
import CharacterList from "./components/CharacterList";

function App() {
  const [queryParams, setQueryParams] = useState<string>("");

  const [selectedCharacters, setSelectedCharacters] = useState<ICharacter[]>(
    []
  );

  const { data, isLoading, isError, errorMessage } = useGetCharacters({
    name: queryParams,
  });

  const handleCharacterSelect = (character: ICharacter) => {
    const isSelected = selectedCharacters.some(
      (char) => char.id === character.id
    );

    if (isSelected) {
      setSelectedCharacters((prevSelected) =>
        prevSelected.filter((char) => char.id !== character.id)
      );
      setQueryParams("");
    } else {
      setSelectedCharacters((prevSelected) => [...prevSelected, character]);
    }
  };

  const handleKeyDownEvent = (event: KeyboardEvent, character: ICharacter) => {
    if (event.key === "Enter") {
      handleCharacterSelect(character);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center -mt-40">
      <Combobox
        as="div"
        className="relative border border-gray-800 rounded-md p-2 w-3/5"
      >
        <div className="flex flex-1">
          <CharacterList
            selectedCharacters={selectedCharacters}
            onCharacterSelect={handleCharacterSelect}
            isInput={true}
          />
          <Combobox.Input
            onChange={(event) => setQueryParams(event.target.value)}
            className="py-1 pl-1 rounded-md focus:outline-none"
            placeholder=" Search..."
          />
        </div>
        {queryParams.length > 0 && (
          <Combobox.Options
            as="div"
            className="flex flex-col w-full max-h-[350px] overflow-y-auto shadow-lg bg-gray-100 border border-gray-800 list-none absolute z-10 top-14 -ml-2 rounded-md text-gray-600"
            static={queryParams.length > 0}
          >
            {isLoading && (
              <p className="h-10 w-full rounded-md ml-2 flex items-center justify-start">
                Loading...
              </p>
            )}
            {isError && (
              <p className="h-10 w-full rounded-md ml-2 flex items-center justify-start">
                {errorMessage}
              </p>
            )}
            {data?.results.map((character) => (
              <Combobox.Option
                key={character.id}
                value={character}
                onClick={() => handleCharacterSelect(character)}
                onKeyDown={(event) => {
                  handleKeyDownEvent(event, character);
                }}
              >
                <CharacterItem
                  character={character}
                  queryParams={queryParams}
                  isSelected={
                    !!selectedCharacters?.find(
                      (char) => char.id === character.id
                    )
                  }
                />
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </div>
  );
}

export default App;
