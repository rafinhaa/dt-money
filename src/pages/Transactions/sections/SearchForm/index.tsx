import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";

export const SearchForm = () => {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Busque uma transação" />
      <button>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
