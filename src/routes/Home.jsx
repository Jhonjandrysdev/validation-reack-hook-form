import Title from "../components/TitleForm"
import { useFirestore } from "../hooks/useFirestore"

const Home = () => {

    const {data, error, loading} = useFirestore()

    if (loading) {
        return <Title text="Loading data..."/>
    }

    if (error) {
        <p>{error}</p>
    }
    return(
        <>
        <div>
            <Title text="HOME"/>
            {
                data.map(item => (
                    <div key={item.nanoID}>
                        <Title text="NanoID"/>
                        <p>{item.nanoID}</p>
                        <Title text="Origin"/>
                        <p>{item.origin}</p>
                        <Title text="UID"/>
                        <p>{item.uid}</p>

                    </div>
                ))
            }
        </div>
        </>
    )
}
export default Home