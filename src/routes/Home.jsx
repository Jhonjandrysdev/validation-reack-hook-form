import { useState } from "react";
import Button from "../components/Button";
import Title from "../components/TitleForm";
import { useFirestore } from "../hooks/useFirestore";
import { FormValidate } from "../utils/FormValidate";
import { useForm } from "react-hook-form";
import FormErrors from "../components/FormErrors";

const Home = () => {
  const [copy, setCopy] = useState({});

  const { data, error, loading, addData, deleteData, UpdateData } =
    useFirestore();

  const { required, URLPattern } = FormValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setValue,
  } = useForm();

  const [newOrigin, setNewOrigin] = useState("");

  if (loading.getData) {
    return <Title text="Loading data..." />;
  }

  if (error) {
    <p>{error}</p>;
  }

  const onSubmit = async ({ url }) => {
    console.log(url);

    if (newOrigin) {
      await UpdateData(newOrigin, url);
      setNewOrigin("");
    } else {
      await addData(url);
    }
    resetField("url");
  };

  const deleteDataItem = async (nanoID) => {
    await deleteData(nanoID);
  };

  const updateDataItem = (item) => {
    setValue("url", item.origin);
    setNewOrigin(item.nanoID);
  };

  const pathURL = window.location.href;

  const CopyDataItem = async (nanoID) => {
    await navigator.clipboard.writeText(window.location.href + nanoID);
    setCopy({ [nanoID]: true });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <Title text="HOME" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="URL"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your URL
          </label>
          <input
            type="text"
            placeholder="Ingresa tu URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96"
            {...register("url", {
              required,
              pattern: URLPattern,
            })}
          />
          <FormErrors error={errors.url} />

          {newOrigin ? (
            <Button
              type="submit"
              text="Edit URL"
              loading={loading.UpdateData}
              color="yellow"
            />
          ) : (
            <Button
              type="submit"
              text="Add URL"
              loading={loading.addData}
              color="blue"
            />
          )}
        </form>
      </div>
      {data.map((item) => (
        <div
          key={item.nanoID}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2 mt-4"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoID}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          <div className="flex gap-3">
          <Button
            text="Delete URL"
            type="button"
            onClick={() => deleteDataItem(item.nanoID)}
            loading={loading[item.nanoID]}
            color="red"
          />
          <Button
            text="Update URL"
            type="button"
            onClick={() => updateDataItem(item)}
            color="green"
          />
          <Button
            text={copy[item.nanoID] ? "Copied" : "Copy URL"}
            type="button"
            onClick={() => CopyDataItem(item.nanoID)}
            color="purple"
          />
          </div>
        </div>
      ))}
    </>
  );
};
export default Home;
