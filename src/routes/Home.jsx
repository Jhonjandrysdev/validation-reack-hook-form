import { useState } from "react";
import Button from "../components/Button";
import Title from "../components/TitleForm";
import { useFirestore } from "../hooks/useFirestore";

const Home = () => {
  const { data, error, loading, addData, deleteData, UpdateData } =
    useFirestore();

  const [link, setLink] = useState("");
  const [newOrigin, setNewOrigin] = useState("")

  if (loading.getData) {
    return <Title text="Loading data..." />;
  }

  if (error) {
    <p>{error}</p>;
  }

  const handleSubmit = async (e) => {
    console.log(link);
    e.preventDefault();

    if(newOrigin){
        await UpdateData(newOrigin, link)
        setNewOrigin("")
        setLink("")
        return
    }

    await addData(link);
    setLink("");
  };

  const deleteDataItem = async (nanoID) => {
    await deleteData(nanoID);
  };

  const updateDataItem = (item) => {
    setLink(item.origin)
    setNewOrigin(item.nanoID)
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <Title text="HOME" />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Link de pagina web"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex items-center"
          />
          
          {newOrigin ? <Button
            type="submit"
            text="Edit URL"
            loading={loading.updateDataItem}
            className="`text-white bg-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-600 dark:border-blue-600 mt-4 w-96"
          /> :  <Button
          type="submit"
          text="Add URL"
          loading={loading.addData}
          className="`text-white bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-600 dark:border-green-600 mt-4 w-96"
        />}
          
        </form>
      </div>
      {data.map((item) => (
        <div key={item.nanoID}>
          <p>{item.nanoID}</p>
          <p>{item.origin}</p>
          <p>{item.uid}</p>
          <Button
            text="Delete URL"
            type="button"
            onClick={() => deleteDataItem(item.nanoID)}
            className="`text-white bg-red-600 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-600 dark:border-red-600 mt-4 w-32"
          />
          <Button
            text="Update URL"
            type="button"
            onClick={() => updateDataItem(item)}
            className="`text-white bg-red-600 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-600 dark:border-red-600 mt-4 w-32"
          />
        </div>
      ))}
    </>
  );
};
export default Home;
