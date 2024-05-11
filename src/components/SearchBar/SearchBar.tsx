import { FC, FormEvent } from "react";
import { PhotoData } from "../../types";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const toastStyles = {
  borderRadius: "8px",
  background: "#333",
  color: "#fff",
};

interface SearchBarProps {
  setQuery: (query: string) => void;
  setPhotos: (photos: PhotoData[]) => void;
}

const SearchBar: FC<SearchBarProps> = ({ setQuery, setPhotos }) => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formValue = form.elements.namedItem("input") as HTMLInputElement;
    if (formValue && formValue.value.trim().length) {
      setPhotos([]);
      setQuery(formValue.value);
    } else {
      toast.error("You haven't entered anything!", {
        style: toastStyles,
      });
    }
    form.reset();
  };

  return (
    <header className={css["header"]}>
      <Toaster position="top-right" reverseOrder={false} />
      <form className={css["form"]} onSubmit={submitHandler}>
        <input
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css["input"]}
        />
        <button type="submit" className={css["button"]}>
          Search
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
