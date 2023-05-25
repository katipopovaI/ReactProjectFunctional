import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

const schema = yup.object({
  name: yup
    .string()
    // .name("The character was not found. Check the name and try again")
    .required("This filed is required"),
});

const CharSearchForm = () => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  //текст для посещения страницы: There is! Visit {char[0].name} page?
  //текст ошибки: The character was not found. Check the name and try again
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ charName }) => {
    // console.log(JSON.stringify(data));
    updateChar(charName);
    // console.log(data.name);
    // setChar(data);
    // console.log(char);
    reset();
  };

  const onCharLoaded = (char) => {
    setChar(char);
    console.log(char);
  };

  const updateChar = (name) => {
    console.log(char);
    // const name = char.name;
    // console.log(name);
    clearError();
    // console.log(getCharacterByName());
    getCharacterByName(name).then(onCharLoaded);
    // console.log(getCharacterByName());
  };

  return (
    <div className="char__search-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="char__search-label" htmlFor="charName">
          Or find a character by name:
        </label>
        <div className="char__search-wrapper">
          {/* input должен быть required */}
          <input
            placeholder="Enter name"
            // {...register("name", {
            //   required: "Обязательное поле",
            // })}
            {...register("name")}
          />
          <div className="error"></div>

          <button
            type="submit"
            className="button button__main"
            disabled={loading}
          >
            <div className="inner">find</div>
          </button>
        </div>
        <div className="char__search-error">
          {/* {errors.name && (
              <span>{errors.name.message || "Обязательное поле"}</span>
            )} */}
          {errors.name && <span>{errors.name.message}</span>}
        </div>
      </form>
    </div>
  );
};

export default CharSearchForm;
