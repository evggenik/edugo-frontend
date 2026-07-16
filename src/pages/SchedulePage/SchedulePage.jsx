import { useState, useEffect } from "react";
import { getToken, getDecodedToken } from "../../utils/auth";
import "./SchedulePage.css";

function SchedulePage() {
    const [lessons, setLessons] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        async function fetchLessons() {
            const token = getToken();
            const decoded = getDecodedToken();

            const startOfDay = new Date(selectedDate);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(selectedDate);
            endOfDay.setHours(23, 59, 59, 999);

            const params = new URLSearchParams({
                teacherId: decoded.userId,
                from: startOfDay.toISOString(),
                to: endOfDay.toISOString()
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
    }, [selectedDate]);

    function goToPreviousDay() {
        const prevDay = new Date(selectedDate);
        prevDay.setDate(selectedDate.getDate() - 1);
        setSelectedDate(prevDay);
    }

    function goToNextDay() {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDay);
    }

    function goToToday() {
        setSelectedDate(new Date());
    }

    return (
    <div className="schedule-page">
        <h1>Мое расписание</h1>

        <div className="schedule-header">
            <div className="schedule-header-left">
                <span className="schedule-title">Мое расписание на</span>
                <button className="view-toggle active">День</button>
            </div>
            <div className="schedule-header-right">
                <button className="link-button" onClick={goToToday}>Сегодня</button>
                <button className="arrow-button" onClick={goToPreviousDay}>‹</button>
                <span className="selected-date">
                    {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', weekday: 'short' })}
                </span>
                <button className="arrow-button" onClick={goToNextDay}>›</button>
            </div>
        </div>

        <table className="schedule-table">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Время</th>
                    <th>Урок</th>
                    <th>Тема урока</th>
                    <th>Домашнее задание</th>
                </tr>
            </thead>
            <tbody>
                {lessons.map((lesson, index) => (
                    <tr key={lesson.id}>
                        <td>{index + 1}</td>
                        <td>
                            {lesson.startTime.slice(11, 16)} - {lesson.endTime.slice(11, 16)}
                        </td>
                        <td>
                            <div className="lesson-subject">{lesson.subjectName}</div>
                            <div className="lesson-room">кабинет {lesson.room}</div>
                        </td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)
}

export default SchedulePage;