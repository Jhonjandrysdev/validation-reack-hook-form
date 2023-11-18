import { useState } from "react";
import Button from "../components/Button";
import Title from "../components/TitleForm";
import { useFirestore } from "../hooks/useFirestore";

const Home = () => {
  const { data, error, loading, addData } = useFirestore();

  const [link, setLink] = useState("");

  if (loading.getData) {
    return <Title text="Loading data..." />;
  }

  if (error) {
    <p>{error}</p>;
  }

  const handleSubmit = async (e) => {
    console.log(link);
    e.preventDefault();
    await addData(link);
    setLink("");
  };
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
          <Button
            type="submit"
            text="Add URL"
            loading={loading.addData}
            color="blue"
          />
        </form>
      </div>
      {data.map((item) => (
        <div key={item.nanoID}>
          <Title text="NanoID" />
          <p>{item.nanoID}</p>
          <Title text="Origin" />
          <p>{item.origin}</p>
          <Title text="UID" />
          <p>{item.uid}</p>
        </div>
      ))}
    </>
  );
};
export default Home;
