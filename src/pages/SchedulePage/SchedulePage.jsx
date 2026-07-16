import { useState, useEffect } from "react";
import { getToken, getDecodedToken } from "../../utils/auth";

function SchedulePage() {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        async function fetchLessons() {
            const token = getToken();
            const decoded = getDecodedToken();

            // ВРЕМЕННО захардкожено — в базе сейчас нет уроков на реальное "сегодня",
            // только тестовые в диапазоне 3 четверти. Вернём динамическую дату,
            // когда заведём актуальную четверть.
            const from = "2026-02-01T00:00:00.000Z";
            const to = "2026-02-28T23:59:59.000Z";

            const params = new URLSearchParams({
                teacherId: decoded.userId,
                from: from,
                to: to
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