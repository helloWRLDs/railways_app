import { useEffect, useState } from "react"
import { listPollResponses } from "../../services/polls"


const ResponsesPageComponent = () => {
    const [responses, setResponses] = useState([])

    useEffect(() => {
        listPollResponses()
            .then((response) => setResponses(response.data))
            .catch((e) => console.error(e))
    }, [])

    return (
        <div className="overflow-x-auto container mx-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">User ID</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Question</th>
                        <th className="py-2 px-4 border-b">Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {responses.map((response, index) => (
                        <tr key={index} className={index % 2 === 1 ? 'bg-gray-100' : ''}>
                            <td className="py-2 px-4 border-b text-center">{response.user_id}</td>
                            <td className="py-2 px-4 border-b text-center">{response.email}</td>
                            <td className="py-2 px-4 border-b text-center">{response.question}</td>
                            <td className="py-2 px-4 border-b text-center">{response.answer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ResponsesPageComponent