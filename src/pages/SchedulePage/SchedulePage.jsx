import { useState, useEffect } from "react";
import { getToken, getDecodedToken } from "../../utils/auth";

function SchedulePage() {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        async function fetchLessons() {
            const token = getToken();
            const decoded = getDecodedToken();

            const today = new Date();
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 7);

            const params = new URLSearchParams({
                teacherId: decoded.userId,
                from: today.toISOString(),
                to: nextWeek.toISOString()
            });

            const response = await fetch(
                `http://localhost:8080/api/v1/lessons?${params}`,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            const data = await response.json();
            setLessons(data);
        }

        fetchLessons();
    }, []);

    return (
        <div>
            <h1>Расписание</h1>
            <pre>{JSON.stringify(lessons, null, 2)}</pre>
        </div>
    )
}

export default SchedulePage;