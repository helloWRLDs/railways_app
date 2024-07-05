import { useEffect, useState } from "react"
import { getPolls } from "../../services/polls"

const PollsPageComponent = () => {
    const [polls, setPolls] = useState([])
    useEffect(() => {
        getPolls()
            .then((repsonse) => setPolls(repsonse.data))
            .catch((e) => console.error(e))
    }, [])

    return (
        <div className="container mx-auto">
            <button className="bg-slate-600 text-white hover:bg-slate-500 active:bg-slate-700 rounded-md mb-3 mt-3 px-3 py-2 float-right">New Poll</button>

            <div id="add-poll" className="h-96 w-1/2 bg-red-400 z-10 fixed" hidden>

            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Question</th>
                        <th className="py-2 px-4 border-b">Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {polls.map((poll, index) => (
                        <tr key={poll.id} className="cursor-pointer hover:bg-gray-100">
                            <td className="py-2 px-4 border-b text-center">{poll.id}</td>
                            <td className="py-2 px-4 border-b">{poll.question}</td>
                            <td className="py-2 px-4 border-b">
                                <ol className="list-decimal list-inside">
                                    {poll.answers.map((answer, index) => (
                                        <li key={index}>{answer}</li>
                                    ))}
                                </ol>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PollsPageComponent